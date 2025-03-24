<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <div v-if="proposalData" class="mb-6 text-right">
      <button 
        @click="downloadAsPDF"
        class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors mr-4"
      >
        Download as PDF
      </button>
      <button 
        @click="goBack"
        class="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
      >
        Back to Planner
      </button>
    </div>
    
    <div ref="proposalContainer" v-if="proposalData" class="bg-white p-8 shadow-lg rounded-lg">
      <!-- Header -->
      <div class="flex justify-between items-start mb-10">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">{{ proposalData.title }}</h1>
          <p class="text-gray-600 mt-2">Prepared on: {{ formatDate(proposalData.date) }}</p>
          <p class="text-gray-600">Valid until: {{ formatDate(proposalData.validUntil) }}</p>
        </div>
        
        <div class="text-right">
          <p v-if="proposalData.provider?.name" class="font-medium text-gray-900">{{ proposalData.provider.name }}</p>
          <p v-if="proposalData.provider?.email">{{ proposalData.provider.email }}</p>
          <p v-if="proposalData.provider?.phone">{{ proposalData.provider.phone }}</p>
        </div>
      </div>
      
      <!-- Client Information -->
      <div class="mb-8 p-4 bg-gray-50 rounded-md">
        <h2 class="text-lg font-medium text-gray-900 mb-2">Prepared For:</h2>
        <div v-if="proposalData.client?.name">
          <p class="font-medium">{{ proposalData.client.name }}</p>
          <p v-if="proposalData.client?.address">{{ proposalData.client.address }}</p>
          <p v-if="proposalData.client?.email">{{ proposalData.client.email }}</p>
          <p v-if="proposalData.client?.phone">{{ proposalData.client.phone }}</p>
        </div>
        <p v-else class="text-gray-600 italic">No client information provided.</p>
      </div>
      
      <!-- Service Overview -->
      <div class="mb-8">
        <h2 class="text-xl font-bold text-gray-900 border-b pb-2 mb-4">Service Overview</h2>
        <div class="mb-4">
          <h3 class="font-medium text-gray-900">{{ proposalData.serviceName }}</h3>
          <p class="text-gray-600">{{ proposalData.serviceDescription }}</p>
        </div>
      </div>
      
      <!-- Proposal Content Sections -->
      <div v-if="proposalData.sections && proposalData.sections.length > 0" class="mb-8 space-y-6">
        <div v-for="(section, index) in proposalData.sections" :key="index" class="mb-6">
          <h2 class="text-xl font-bold text-gray-900 border-b pb-2 mb-4">{{ section.title }}</h2>
          <div class="text-gray-600 whitespace-pre-line">{{ section.content }}</div>
        </div>
      </div>
      
      <!-- Pricing -->
      <div class="mb-8">
        <h2 class="text-xl font-bold text-gray-900 border-b pb-2 mb-4">Investment</h2>
        
        <div class="mt-4">
          <table class="w-full">
            <thead>
              <tr class="border-b-2 border-gray-200">
                <th class="py-2 px-2 text-left text-gray-700">Description</th>
                <th class="py-2 px-2 text-right text-gray-700">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-gray-200">
                <td class="py-2 px-2 text-gray-600">{{ proposalData.serviceName }}</td>
                <td class="py-2 px-2 text-gray-600 text-right">{{ formatCurrency(proposalData.pricing.serviceSubtotal) }}</td>
              </tr>
              
              <tr v-if="proposalData.pricing.expensesTotal > 0" class="border-b border-gray-200">
                <td class="py-2 px-2 text-gray-600">Additional Expenses</td>
                <td class="py-2 px-2 text-gray-600 text-right">{{ formatCurrency(proposalData.pricing.expensesTotal) }}</td>
              </tr>
              
              <tr v-if="proposalData.pricing.vat > 0" class="border-b border-gray-200">
                <td class="py-2 px-2 text-gray-600">VAT (16%)</td>
                <td class="py-2 px-2 text-gray-600 text-right">{{ formatCurrency(proposalData.pricing.vat) }}</td>
              </tr>
              
              <tr v-if="proposalData.pricing.dst > 0" class="border-b border-gray-200">
                <td class="py-2 px-2 text-gray-600">Digital Service Tax (1.5%)</td>
                <td class="py-2 px-2 text-gray-600 text-right">{{ formatCurrency(proposalData.pricing.dst) }}</td>
              </tr>
              
              <tr class="font-medium">
                <td class="py-3 px-2 text-gray-800">Total Investment</td>
                <td class="py-3 px-2 text-gray-800 text-right font-bold">{{ formatCurrency(proposalData.pricing.total) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <!-- Terms -->
      <div class="mb-8">
        <h2 class="text-xl font-bold text-gray-900 border-b pb-2 mb-4">Terms & Conditions</h2>
        <div class="text-gray-600 whitespace-pre-line">{{ proposalData.terms }}</div>
      </div>
      
      <!-- Notes -->
      <div v-if="proposalData.notes" class="mb-8">
        <h2 class="text-xl font-bold text-gray-900 border-b pb-2 mb-4">Additional Notes</h2>
        <div class="text-gray-600 whitespace-pre-line">{{ proposalData.notes }}</div>
      </div>
      
      <!-- Signature Area -->
      <div class="mt-12 border-t pt-8">
        <div class="grid grid-cols-2 gap-12">
          <div>
            <p class="text-gray-600 mb-12">Client Acceptance:</p>
            <div class="border-b border-gray-400 pb-2"></div>
            <p class="text-sm text-gray-500 mt-2">Name and Signature</p>
          </div>
          <div>
            <p class="text-gray-600 mb-12">Date:</p>
            <div class="border-b border-gray-400 pb-2"></div>
            <p class="text-sm text-gray-500 mt-2">DD/MM/YYYY</p>
          </div>
        </div>
      </div>
    </div>
    
    <div v-else class="bg-white p-8 shadow-lg rounded-lg text-center">
      <p class="text-lg text-gray-600">No proposal data found. Please return to the Billing Planner.</p>
      <button 
        @click="goBack"
        class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Back to Planner
      </button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { formatCurrency } from '../utils/taxUtils';
import { generateProposal } from '../services/billingService';
import html2pdf from 'html2pdf.js';

export default {
  name: 'ProposalDocument',
  
  setup() {
    const router = useRouter();
    const route = useRoute();
    const proposalData = ref(null);
    const proposalContainer = ref(null);
    
    onMounted(() => {
      try {
        // Get project data from route query params
        if (route.query.project) {
          const projectData = JSON.parse(route.query.project);
          
          // Generate proposal from project data
          proposalData.value = generateProposal(projectData);
        }
      } catch (error) {
        console.error('Error generating proposal:', error);
      }
    });
    
    const formatDate = (date) => {
      if (!date) return '';
      
      const dateObj = date instanceof Date ? date : new Date(date);
      
      return dateObj.toLocaleDateString('en-KE', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };
    
    const goBack = () => {
      router.push('/billing-planner');
    };
    
    const downloadAsPDF = () => {
      const element = proposalContainer.value;
      
      const options = {
        margin: 10,
        filename: `Proposal-${proposalData.value.serviceName.replace(/\s+/g, '-')}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };
      
      html2pdf().set(options).from(element).save();
    };
    
    return {
      proposalData,
      proposalContainer,
      formatDate,
      formatCurrency,
      goBack,
      downloadAsPDF
    };
  }
};
</script>

<style scoped>
@media print {
  .proposal-container {
    padding: 0;
    margin: 0;
    box-shadow: none;
  }
}
</style>