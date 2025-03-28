<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl font-bold text-gray-900">Proposals</h2>
      <router-link to="/proposal" class="text-sm text-green-600 hover:text-green-700">
        Create New Proposal
      </router-link>
    </div>
    
    <div v-if="loading" class="flex justify-center py-8">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
    </div>
    
    <div v-else-if="proposals.length === 0" class="text-center py-12">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-900">No proposals yet</h3>
      <p class="mt-1 text-sm text-gray-500">Create your first project proposal to get started.</p>
      <div class="mt-6">
        <router-link to="/proposal" class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none">
          <svg class="mr-2 -ml-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Create Proposal
        </router-link>
      </div>
    </div>
    
    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div 
        v-for="(proposal, index) in proposals" 
        :key="index"
        class="bg-white p-5 rounded-lg border border-gray-200 hover:border-green-300 hover:shadow-md transition-all duration-200"
      >
        <div class="flex justify-between items-start">
          <div>
            <h3 class="text-base font-medium text-gray-900">{{ proposal.title }}</h3>
            <p class="text-sm text-gray-500 mt-1">Client: {{ proposal.clientName }}</p>
          </div>
          <span :class="getStatusClasses(proposal.status)" class="px-2 py-1 rounded-md text-xs font-medium">
            {{ proposal.status }}
          </span>
        </div>
        
        <div class="mt-4 flex items-center text-sm">
          <svg class="h-5 w-5 text-gray-400 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span class="text-gray-600">{{ formatDate(proposal.date) }}</span>
        </div>
        
        <div class="mt-4 flex justify-between items-center">
          <div class="text-sm">
            <span class="text-gray-500">Project Value:</span>
            <span class="ml-1 font-medium">{{ formatCurrency(proposal.projectValue) }}</span>
          </div>
          <div>
            <button @click="$emit('view', proposal)" class="text-green-600 hover:text-green-800 text-sm font-medium">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatCurrency } from '@/utils/taxUtils';

export default {
  name: 'ProposalsList',
  props: {
    proposals: {
      type: Array,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  emits: ['view'],
  setup() {
    const getStatusClasses = (status) => {
      status = status?.toLowerCase() || '';
      
      switch (status) {
        case 'accepted':
          return 'bg-green-100 text-green-800';
        case 'pending':
          return 'bg-yellow-100 text-yellow-800';
        case 'rejected':
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
      getStatusClasses
    };
  }
};
</script>