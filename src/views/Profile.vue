<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <!-- Profile Header -->
    <div class="mb-8">
      <div class="flex items-center space-x-3 mb-4">
        <span class="inline-block px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-800">
          My Account
        </span>
      </div>
      <h1 class="text-3xl font-bold text-gray-900 mb-3 gradient-heading">User Profile</h1>
      <p class="text-lg text-gray-600">Manage your account, saved items, and settings</p>
    </div>

    <div class="flex flex-col lg:flex-row gap-6">
      <!-- Left Column - Navigation -->
      <div class="w-full lg:w-1/3">
        <ProfileNavigation
          v-model="activeTab"
          :user-name="userName"
          :user-email="userEmail"
          @logout="logout"
        />
      </div>

      <!-- Right Column - Content Area -->
      <div class="w-full lg:w-2/3">
        <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100 min-h-[600px]">
          <!-- Saved Items Tab -->
          <SavedItemsList
            v-if="activeTab === 'saved'"
            :items="combinedItems"
            :loading="loading"
            @view="viewItem"
            @delete="deleteItem"
          />

          <!-- Billing History Tab -->
          <BillingHistoryTable
            v-if="activeTab === 'billing'"
            :invoices="billingHistory"
            :loading="loading"
            @view="viewInvoice"
            @download="downloadInvoice"
          />

          <!-- Proposals Tab -->
          <ProposalsList
            v-if="activeTab === 'proposals'"
            :proposals="proposals"
            :loading="loading"
            @view="viewProposal"
          />

          <!-- Personal Information Tab -->
          <PersonalInfoForm
            v-if="activeTab === 'personal'"
            v-model="personalInfo"
            :loading="profileLoading"
            @submit="updatePersonalInfo"
          />

          <!-- Company Information Tab -->
          <CompanyDetailsForm
            v-if="activeTab === 'company'"
            v-model="companyInfo"
            :loading="profileLoading"
            @submit="updateCompanyInfo"
          />

          <!-- Settings Tab -->
          <div v-if="activeTab === 'settings'" class="space-y-6">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-xl font-bold text-gray-900 flex items-center">
                <svg class="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Tax Settings
              </h2>
            </div>
            <Settings />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Vue and router imports
import { ref, onMounted, computed, watch } from 'vue';
import { useRouter } from 'vue-router';

// Firebase imports
import { auth, db } from '../firebase';
import { doc, getDoc, setDoc, serverTimestamp, collection, query, where, onSnapshot } from 'firebase/firestore';

// Component imports
import Settings from '../views/Settings.vue';
import ProfileNavigation from '../components/profile/ProfileNavigation.vue';
import PersonalInfoForm from '../components/profile/PersonalInfoForm.vue';
import CompanyDetailsForm from '../components/profile/CompanyDetailsForm.vue';
import SavedItemsList from '../components/profile/SavedItemsList.vue';
import BillingHistoryTable from '../components/profile/BillingHistoryTable.vue';
import ProposalsList from '../components/profile/ProposalsList.vue';

// Store imports  
import { useAuthStore } from '../store/authStore.js';

export default {
  name: 'UserProfile',
  components: {
    Settings,
    ProfileNavigation,
    PersonalInfoForm,
    CompanyDetailsForm,
    SavedItemsList,
    BillingHistoryTable,
    ProposalsList
  },
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();
    const loading = ref(true);
    const profileLoading = ref(false);
    const activeTab = ref('saved');
    const userEmail = ref('');
    const userName = ref('');
    
    // Data storage
    const savedItems = ref([]);
    const billingHistory = ref([]);
    const proposals = ref([]);
    const unsubscribeBilling = ref(null);

    // Combined items computed property for dashboard
    const combinedItems = computed(() => {
      const invoiceItems = billingHistory.value.map(invoice => ({
        ...invoice,
        type: 'invoice',
        title: `Invoice ${invoice.invoiceNumber || ''}`,
        date: invoice.date || new Date(),
      }));
      
      const proposalItems = proposals.value.map(proposal => ({
        ...proposal,
        type: 'proposal',
        title: `Proposal for ${proposal.clientName || 'Client'}`,
        date: proposal.date || new Date(),
      }));
      
      return [...savedItems.value, ...invoiceItems, ...proposalItems];
    });

    // Personal information form data
    const personalInfo = ref({
      firstName: '',
      lastName: '',
      displayName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      postalCode: '',
      country: 'Kenya',
      taxId: '',
      vatNumber: ''
    });

    // Company information form data
    const companyInfo = ref({
      name: '',
      email: '',
      phone: '',
      website: '',
      address: '',
      city: '',
      postalCode: '',
      country: 'Kenya',
      regNumber: '',
      taxId: '',
      vatNumber: '',
      vatRate: 16,
      bankName: '',
      accountName: '',
      accountNumber: '',
      branchCode: '',
      swiftCode: ''
    });
    
    const logout = async () => {
      try {
        await auth.signOut();
        router.push('/auth');
      } catch (error) {
        console.error('Error during logout:', error);
      }
    };

    const viewItem = (item) => {
      switch (item.type) {
        case 'tax':
          router.push('/tax-calculator');
          break;
        case 'invoice':
          viewInvoice(item);
          break;
        case 'proposal':
          viewProposal(item);
          break;
        default:
          console.log('Viewing item:', item);
      }
    };

    const deleteItem = (item) => {
      // Implementation would delete the item from your database
      console.log('Deleting item:', item);
      
      if (item.type === 'tax') {
        savedItems.value = savedItems.value.filter(i => i.id !== item.id);
      } else if (item.type === 'invoice') {
        billingHistory.value = billingHistory.value.filter(i => i.id !== item.id);
      } else if (item.type === 'proposal') {
        proposals.value = proposals.value.filter(i => i.id !== item.id);
      }
    };

    const viewInvoice = (invoice) => {
      if (invoice.status === 'draft') {
        router.push({
          name: 'InvoiceCreate',
          query: { 
            draftId: invoice.id,
            edit: 'true'
          }
        });
      } else {
        router.push('/billing');
      }
      console.log('Viewing invoice:', invoice);
    };

    const downloadInvoice = (invoice) => {
      console.log('Downloading invoice:', invoice);
    };

    const viewProposal = (proposal) => {
      router.push('/proposal');
      console.log('Viewing proposal:', proposal);
    };
    
    const updatePersonalInfo = async () => {
      profileLoading.value = true;
      try {
        if (!auth.currentUser) throw new Error('No user authenticated');
        
        // Update the user document
        const userRef = doc(db, 'users', auth.currentUser.uid);
        await setDoc(userRef, {
          ...personalInfo.value,
          updatedAt: serverTimestamp()
        }, { merge: true });

        // Update the Firestore auth profile
        await authStore.updateUserProfile({
          displayName: personalInfo.value.displayName || `${personalInfo.value.firstName} ${personalInfo.value.lastName}`.trim()
        });

        // Update local state
        userName.value = personalInfo.value.displayName || `${personalInfo.value.firstName} ${personalInfo.value.lastName}`.trim();
        
        alert('Personal information updated successfully');
      } catch (error) {
        console.error('Error updating personal info:', error);
        alert(`Error updating personal information: ${error.message}`);
      } finally {
        profileLoading.value = false;
      }
    };

    const updateCompanyInfo = async () => {
      profileLoading.value = true;
      try {
        if (!auth.currentUser) throw new Error('No user authenticated');
        
        // Update the user document with company info
        const userRef = doc(db, 'users', auth.currentUser.uid);
        await setDoc(userRef, {
          company: {
            ...companyInfo.value
          },
          updatedAt: serverTimestamp()
        }, { merge: true });
        
        alert('Company information updated successfully');
      } catch (error) {
        console.error('Error updating company info:', error);
        alert(`Error updating company information: ${error.message}`);
      } finally {
        profileLoading.value = false;
      }
    };
    
    const fetchBillingHistory = () => {
      if (!auth.currentUser) return;
      
      try {
        // Fetch invoices
        const invoicesQuery = query(
          collection(db, 'invoices'),
          where('userId', '==', auth.currentUser.uid)
        );

        // Fetch invoice drafts
        const draftsQuery = query(
          collection(db, 'invoiceDrafts'),
          where('userId', '==', auth.currentUser.uid)
        );

        // Set up real-time listeners
        const unsubscribeInvoices = onSnapshot(invoicesQuery, 
          (snapshot) => {
            const invoices = snapshot.docs.map(doc => ({
              ...doc.data(),
              id: doc.id
            }));
            billingHistory.value = invoices;  // Only set invoices first
          },
          (error) => {
            console.error('Error fetching invoices:', error);
          }
        );

        const unsubscribeDrafts = onSnapshot(draftsQuery, 
          (snapshot) => {
            const drafts = snapshot.docs.map(doc => ({
              ...doc.data(),
              id: doc.id,
              status: 'draft'
            }));
            // Filter out any drafts that have the same invoice number as existing invoices
            const uniqueDrafts = drafts.filter(draft => 
              !billingHistory.value.some(invoice => 
                invoice.invoiceNumber === draft.invoiceNumber
              )
            );
            // Combine unique drafts with existing invoices
            billingHistory.value = [...billingHistory.value, ...uniqueDrafts];
          },
          (error) => {
            console.error('Error fetching drafts:', error);
          }
        );

        // Set cleanup function
        unsubscribeBilling.value = () => {
          unsubscribeInvoices();
          unsubscribeDrafts();
        };
      } catch (error) {
        console.error('Error setting up billing listeners:', error);
      }
    };

    // Fetch proposals
    const fetchProposals = () => {
      if (!auth.currentUser) return;
      
      try {
        const proposalsQuery = query(
          collection(db, 'proposals'),
          where('userId', '==', auth.currentUser.uid)
        );

        const unsubscribeProposals = onSnapshot(proposalsQuery, 
          (snapshot) => {
            proposals.value = snapshot.docs.map(doc => ({
              ...doc.data(),
              id: doc.id
            }));
          },
          (error) => {
            console.error('Error fetching proposals:', error);
          }
        );

        return unsubscribeProposals;
      } catch (error) {
        console.error('Error setting up proposals listener:', error);
        return null;
      }
    };
    
    const loadUserData = async () => {
      loading.value = true;
      try {
        const user = auth.currentUser;
        if (user) {
          userEmail.value = user.email;
          userName.value = user.displayName || '';
          
          // Populate initial personal info form with existing user data
          personalInfo.value.email = user.email;
          personalInfo.value.displayName = user.displayName || '';
          
          // Fetch user data from Firestore
          const userRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userRef);
          
          if (userDoc.exists()) {
            const userData = userDoc.data();
            
            // Populate personal info
            personalInfo.value = {
              firstName: userData.firstName || '',
              lastName: userData.lastName || '',
              displayName: userData.displayName || user.displayName || '',
              email: user.email,
              phone: userData.phone || '',
              address: userData.address || '',
              city: userData.city || '',
              postalCode: userData.postalCode || '',
              country: userData.country || 'Kenya',
              taxId: userData.taxId || '',
              vatNumber: userData.vatNumber || ''
            };
            
            // Populate company info if it exists
            if (userData.company) {
              companyInfo.value = {
                name: userData.company.name || '',
                email: userData.company.email || '',
                phone: userData.company.phone || '',
                website: userData.company.website || '',
                address: userData.company.address || '',
                city: userData.company.city || '',
                postalCode: userData.company.postalCode || '',
                country: userData.company.country || 'Kenya',
                regNumber: userData.company.regNumber || '',
                taxId: userData.company.taxId || '',
                vatNumber: userData.company.vatNumber || '',
                vatRate: userData.company.vatRate || 16,
                bankName: userData.company.bankName || '',
                accountName: userData.company.accountName || '',
                accountNumber: userData.company.accountNumber || '',
                branchCode: userData.company.branchCode || '',
                swiftCode: userData.company.swiftCode || ''
              };
            }
          }

          // Fetch billing history and proposals
          fetchBillingHistory();
          const unsubscribeProposals = fetchProposals();
          
          // Clean up listeners when component is unmounted
          onMounted(() => {
            return () => {
              if (unsubscribeBilling.value) {
                unsubscribeBilling.value();
              }
              if (unsubscribeProposals) {
                unsubscribeProposals();
              }
            };
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        loading.value = false;
      }
    };

    // Watch for auth state changes
    watch(
      () => auth.currentUser,
      (newUser) => {
        if (newUser) {
          loadUserData();
        } else {
          // Clear data when user logs out
          savedItems.value = [];
          billingHistory.value = [];
          proposals.value = [];
          
          // Clean up listeners
          if (unsubscribeBilling.value) {
            unsubscribeBilling.value();
            unsubscribeBilling.value = null;
          }
        }
      },
      { immediate: true }
    );

    onMounted(async () => {
      await loadUserData();
    });

    return {
      activeTab,
      userEmail,
      userName,
      loading,
      profileLoading,
      savedItems,
      billingHistory,
      proposals,
      combinedItems,
      personalInfo,
      companyInfo,
      logout,
      viewItem,
      deleteItem,
      viewInvoice,
      downloadInvoice,
      viewProposal,
      updatePersonalInfo,
      updateCompanyInfo
    };
  }
};
</script>

<style scoped>
.gradient-heading {
  background: linear-gradient(to right, #10B981, #3B82F6);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>