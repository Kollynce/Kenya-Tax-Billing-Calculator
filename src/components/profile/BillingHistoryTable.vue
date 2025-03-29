<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl font-bold text-gray-900">Billing History</h2>
      <router-link to="/billing" class="text-sm text-green-600 hover:text-green-700">
        Create New Invoice
      </router-link>
    </div>
    
    <div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div v-if="loading || isLoading" class="flex justify-center py-8">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>

      <div v-else-if="sortedInvoices.length === 0" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">No billing history</h3>
        <p class="mt-1 text-sm text-gray-500">Generate your first invoice to get started.</p>
        <div class="mt-6">
          <router-link to="/billing" class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none">
            <svg class="mr-2 -ml-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Create Invoice
          </router-link>
        </div>
      </div>
      
      <table v-else class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice #</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="(invoice, index) in sortedInvoices" :key="index" class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {{ invoice.invoiceNumber }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ invoice.client?.name || 'Draft' }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ formatDate(invoice.date) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {{ formatCurrency(calculateTotal(invoice)) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
              <span :class="getStatusClasses(invoice.status)" class="px-2 py-1 rounded-md text-xs font-medium">
                {{ invoice.status }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <template v-if="invoice.status === 'draft'">
                <button 
                  @click="editDraft(invoice)" 
                  class="text-green-600 hover:text-green-900 mr-3 flex items-center"
                >
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit
                </button>
              </template>
              <template v-else>
                <button @click="$emit('view', invoice)" class="text-green-600 hover:text-green-900 mr-3">
                  View
                </button>
              </template>
              <button @click="$emit('download', invoice)" class="text-indigo-600 hover:text-indigo-900">
                Download
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { auth, db } from '@/firebase';
import { formatCurrency } from '@/utils/taxUtils';

export default {
  name: 'BillingHistoryTable',
  props: {
    invoices: {
      type: Array,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  emits: ['view', 'download'],
  
  setup(props) {
    const router = useRouter();
    const drafts = ref([]);
    const unsubscribe = ref(null);
    const isLoading = ref(false);
    
    const sortedInvoices = computed(() => {
      // Combine regular invoices and drafts
      const allInvoices = [...props.invoices, ...drafts.value];
      return allInvoices.sort((a, b) => {
        const dateA = b.date ? new Date(b.date) : new Date(0);
        const dateB = a.date ? new Date(a.date) : new Date(0);
        return dateA - dateB;
      });
    });

    const fetchDrafts = async () => {
      if (!auth.currentUser) return;
      
      try {
        isLoading.value = true;
        const draftsQuery = query(
          collection(db, 'invoiceDrafts'),
          where('userId', '==', auth.currentUser.uid)
        );

        // Set up real-time listener
        unsubscribe.value = onSnapshot(draftsQuery, 
          (snapshot) => {
            drafts.value = snapshot.docs.map(doc => ({
              ...doc.data(),
              id: doc.id
            }));
            isLoading.value = false;
          },
          (error) => {
            console.error('Error fetching drafts:', error);
            isLoading.value = false;
            if (error.code === 'permission-denied') {
              console.log('User does not have permission to access drafts');
            }
          }
        );
      } catch (error) {
        console.error('Error setting up drafts listener:', error);
        isLoading.value = false;
      }
    };

    // Clean up listener on component unmount
    onUnmounted(() => {
      if (unsubscribe.value) {
        unsubscribe.value();
      }
    });

    onMounted(() => {
      // Only fetch if user is authenticated
      if (auth.currentUser) {
        fetchDrafts();
      }

      // Listen for auth state changes
      const unsubscribeAuth = auth.onAuthStateChanged((user) => {
        if (user) {
          fetchDrafts();
        } else {
          if (unsubscribe.value) {
            unsubscribe.value();
          }
          drafts.value = [];
        }
      });

      // Clean up auth listener on unmount
      onUnmounted(() => {
        unsubscribeAuth();
      });
    });

    const editDraft = (draft) => {
      router.push({
        name: 'InvoiceCreate',
        query: { 
          draftId: draft.id,
          edit: 'true'
        }
      });
    };

    const calculateTotal = (invoice) => {
      if (!invoice.items) return 0;
      
      const subtotal = invoice.items.reduce((sum, item) => {
        return sum + (item.quantity * item.rate);
      }, 0);

      let total = subtotal;
      
      // Add VAT if applicable
      if (invoice.includeVAT) {
        total += subtotal * 0.16;
      }

      // Add Digital Service Tax if applicable
      if (invoice.includeDigitalServiceTax) {
        total += subtotal * 0.015;
      }

      return total;
    };

    const getStatusClasses = (status) => {
      status = status?.toLowerCase() || '';
      
      switch (status) {
        case 'paid':
          return 'bg-green-100 text-green-800';
        case 'pending':
          return 'bg-yellow-100 text-yellow-800';
        case 'overdue':
          return 'bg-red-100 text-red-800';
        case 'draft':
          return 'bg-gray-100 text-gray-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    };

    const formatDate = (date) => {
      if (!date) return 'N/A';
      
      if (typeof date === 'string') {
        date = new Date(date);
      }
      
      if (date instanceof Date && !isNaN(date)) {
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });
      }
      
      return 'N/A';
    };

    return {
      formatCurrency,
      formatDate,
      getStatusClasses,
      editDraft,
      calculateTotal,
      sortedInvoices,
      isLoading
    };
  }
};
</script>