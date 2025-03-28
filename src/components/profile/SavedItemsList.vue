<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl font-bold text-gray-900 flex items-center">
        <svg class="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
        Saved Items
      </h2>
    </div>

    <div v-if="loading" class="flex justify-center py-8">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
    </div>
    
    <div v-else-if="items.length === 0" class="text-center py-12">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-900">No saved items</h3>
      <p class="mt-1 text-sm text-gray-500">Get started by saving your tax calculations, invoices, or proposals.</p>
      <div class="mt-6">
        <router-link to="/tax-calculator" class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none">
          <svg class="mr-2 -ml-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Create calculation
        </router-link>
      </div>
    </div>
    
    <div v-else class="grid grid-cols-1 gap-6">
      <div 
        v-for="(item, index) in items" 
        :key="index"
        class="bg-white p-4 rounded-lg border border-gray-200 hover:border-green-300 hover:shadow-md transition-all duration-200"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <div class="p-2 mr-4" :class="getItemTypeClasses(item.type)">
              <svg v-if="item.type === 'tax'" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <svg v-else-if="item.type === 'invoice'" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              <svg v-else-if="item.type === 'proposal'" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            
            <div>
              <h3 class="text-sm font-medium text-gray-900">{{ item.title || getDefaultTitle(item) }}</h3>
              <p class="text-xs text-gray-500">
                {{ formatDate(item.date) }} · {{ getItemTypeLabel(item.type) }}
              </p>
            </div>
          </div>
          
          <div class="flex space-x-2">
            <button @click="$emit('view', item)" class="text-gray-400 hover:text-gray-600">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
            <button @click="$emit('delete', item)" class="text-gray-400 hover:text-red-600">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
        
        <div class="mt-3 border-t border-gray-100 pt-3">
          <div v-if="item.type === 'tax'" class="flex justify-between text-sm">
            <span class="text-gray-600">Annual Income:</span>
            <span class="font-medium">{{ formatCurrency(item.grossIncome) }}</span>
          </div>
          <div v-else-if="item.type === 'invoice'" class="flex justify-between text-sm">
            <span class="text-gray-600">Amount:</span>
            <span class="font-medium">{{ formatCurrency(item.totalAmount) }}</span>
          </div>
          <div v-else-if="item.type === 'proposal'" class="flex justify-between text-sm">
            <span class="text-gray-600">Project Value:</span>
            <span class="font-medium">{{ formatCurrency(item.projectValue) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatCurrency } from '@/utils/taxUtils';

export default {
  name: 'SavedItemsList',
  props: {
    items: {
      type: Array,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  emits: ['view', 'delete'],
  setup() {
    const getItemTypeClasses = (type) => {
      switch (type) {
        case 'tax':
          return 'bg-green-100 rounded-lg text-green-700';
        case 'invoice':
          return 'bg-blue-100 rounded-lg text-blue-700';
        case 'proposal':
          return 'bg-purple-100 rounded-lg text-purple-700';
        default:
          return 'bg-gray-100 rounded-lg text-gray-700';
      }
    };

    const getItemTypeLabel = (type) => {
      switch (type) {
        case 'tax':
          return 'Tax Calculation';
        case 'invoice':
          return 'Invoice';
        case 'proposal':
          return 'Proposal';
        default:
          return 'Item';
      }
    };

    const getDefaultTitle = (item) => {
      switch (item.type) {
        case 'tax':
          return `Tax Calculation - ${formatCurrency(item.grossIncome)}`;
        case 'invoice':
          return `Invoice ${item.invoiceNumber || ''}`;
        case 'proposal':
          return `Proposal for ${item.clientName || 'Client'}`;
        default:
          return 'Untitled Item';
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
      getItemTypeClasses,
      getItemTypeLabel,
      getDefaultTitle
    };
  }
};
</script>