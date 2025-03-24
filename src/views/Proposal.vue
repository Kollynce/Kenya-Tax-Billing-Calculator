<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <div v-if="proposalData" class="mb-6 text-right">
      <Button 
        @click="downloadAsPDF"
        variant="kenya"
        class="mr-4"
      >
        Download as PDF
      </Button>
      <Button 
        @click="goBack"
        variant="secondary"
      >
        Back to Planner
      </Button>
    </div>
    
    <div ref="proposalContainer" v-if="proposalData" class="bg-gradient-to-br from-green-50 to-emerald-50 p-8 shadow-lg rounded-lg">
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
      <div class="mb-8 p-4 bg-white rounded-md shadow-sm">
        <h2 class="text-lg font-medium text-gray-900 mb-2">Prepared For:</h2>
        <div v-if="proposalData.client?.name">
          <p class="font-medium">{{ proposalData.client.name }}</p>
          <p v-if="proposalData.client?.email">{{ proposalData.client.email }}</p>
          <p v-if="proposalData.client?.phone">{{ proposalData.client.phone }}</p>
          <p v-if="proposalData.client?.address">{{ proposalData.client.address }}</p>
        </div>
      </div>
      
      <!-- Service Details -->
      <div class="mb-8 p-4 bg-white rounded-md shadow-sm">
        <h2 class="text-xl font-bold text-gray-900 border-b pb-2 mb-4">Service Details</h2>
        <div class="space-y-4">
          <div>
            <h3 class="text-lg font-medium text-gray-800 mb-2">{{ proposalData.serviceName }}</h3>
            <p class="text-gray-600">{{ proposalData.serviceDescription }}</p>
          </div>
          
          <div class="mt-4">
            <h3 class="text-lg font-medium text-gray-800 mb-2">Pricing</h3>
            <div class="bg-gray-50 p-4 rounded-lg">
              <div class="flex justify-between mb-2">
                <span class="text-gray-600">{{ proposalData.pricingLabel }}</span>
                <span class="font-medium">{{ formatCurrency(proposalData.rate) }}</span>
              </div>
              
              <div v-if="proposalData.quantity > 1" class="flex justify-between mb-2">
                <span class="text-gray-600">Quantity</span>
                <span>× {{ proposalData.quantity }}</span>
              </div>
              
              <div v-if="proposalData.hours" class="flex justify-between mb-2">
                <span class="text-gray-600">Hours</span>
                <span>× {{ proposalData.hours }}</span>
              </div>
              
              <div v-if="proposalData.expenses.length > 0">
                <div class="border-t border-gray-200 my-2"></div>
                <h4 class="text-sm font-medium text-gray-700 mb-2">Additional Expenses:</h4>
                <div v-for="expense in proposalData.expenses" :key="expense.name" class="flex justify-between text-sm">
                  <span class="text-gray-600">{{ expense.name }}</span>
                  <span>{{ formatCurrency(expense.cost) }}</span>
                </div>
              </div>
              
              <div v-if="proposalData.isVATRegistered || proposalData.includeDigitalServiceTax" class="border-t border-gray-200 mt-2 pt-2">
                <div v-if="proposalData.isVATRegistered" class="flex justify-between text-sm">
                  <span class="text-gray-600">VAT (16%)</span>
                  <span>{{ formatCurrency(calculateVAT()) }}</span>
                </div>
                
                <div v-if="proposalData.includeDigitalServiceTax" class="flex justify-between text-sm">
                  <span class="text-gray-600">Digital Service Tax (1.5%)</span>
                  <span>{{ formatCurrency(calculateDST()) }}</span>
                </div>
              </div>
              
              <div class="border-t border-gray-200 mt-2 pt-2">
                <div class="flex justify-between text-lg font-bold">
                  <span class="text-gray-900">Total</span>
                  <span class="text-green-600">{{ formatCurrency(calculateTotal()) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Timeline -->
      <div v-if="proposalData.timeline" class="mb-8 p-4 bg-white rounded-md shadow-sm">
        <h2 class="text-xl font-bold text-gray-900 border-b pb-2 mb-4">Project Timeline</h2>
        <div class="text-gray-600 whitespace-pre-line">{{ proposalData.timeline }}</div>
      </div>
      
      <!-- Terms -->
      <div v-if="proposalData.terms" class="mb-8 p-4 bg-white rounded-md shadow-sm">
        <h2 class="text-xl font-bold text-gray-900 border-b pb-2 mb-4">Terms & Conditions</h2>
        <div class="text-gray-600 whitespace-pre-line">{{ proposalData.terms }}</div>
      </div>
      
      <!-- Notes -->
      <div v-if="proposalData.notes" class="mb-8 p-4 bg-white rounded-md shadow-sm">
        <h2 class="text-xl font-bold text-gray-900 border-b pb-2 mb-4">Additional Notes</h2>
        <div class="text-gray-600 whitespace-pre-line">{{ proposalData.notes }}</div>
      </div>
      
      <!-- Signature Area -->
      <div class="mt-12 p-4 bg-white rounded-md shadow-sm">
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
      <p class="text-gray-600">No proposal data available</p>
      <Button 
        @click="goBack"
        variant="secondary"
        class="mt-4"
      >
        Back to Planner
      </Button>
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