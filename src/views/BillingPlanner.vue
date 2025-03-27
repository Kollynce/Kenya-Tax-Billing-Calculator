<template>
  <div class="max-w-8xl mx-auto px-4 py-8">
    <!-- Header Section -->
    <div class="mb-8">
      <div class="flex items-center space-x-3 mb-4">
        <span class="inline-block px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-800">
          Professional Billing
        </span>
      </div>
      <h1 class="text-3xl font-bold text-gray-900 mb-3 gradient-heading">Billing Planner</h1>
      <p class="text-lg text-gray-600">Create professional proposals and invoices for your creative projects</p>
    </div>

    <!-- Example Section with Bill Preview -->
    <div v-if="!isProjectStarted" class="mb-8">
      <div class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <!-- Example Header -->
        <div class="bg-gradient-to-r from-green-50 to-blue-50 p-6 border-b border-gray-200">
          <div class="flex justify-between items-center mb-2">
            <h3 class="text-xl font-medium text-gray-900">Example: Logo Design Project</h3>
            <span class="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">KRA Compliant</span>
          </div>
          <p class="text-sm text-gray-600">See how a typical project is structured and billed</p>
        </div>
        
        <!-- Bill Preview Section -->
        <div class="p-6 grid grid-cols-1 lg:grid-cols-5 gap-4">
          <!-- Left Side: Steps Process -->
          <div class="lg:col-span-2 space-y-6">
            <h4 class="font-medium text-gray-800 mb-4">How It Works</h4>
            
            <div class="grid grid-cols-1 gap-4">
              <div class="p-4 bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl border border-green-100 hover:border-green-200 transition-all duration-300">
                <div class="flex items-start space-x-3">
                  <div class="flex-shrink-0 h-8 w-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <span class="text-green-600 font-semibold">1</span>
                  </div>
                  <div>
                    <h5 class="font-medium text-gray-800">Project Details</h5>
                    <p class="text-sm text-gray-600 mt-1">Define your project scope and select services</p>
                    <div class="mt-2 text-xs text-green-600">✓ Corporate Logo Design Package</div>
                  </div>
                </div>
              </div>
              
              <div class="p-4 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl border border-blue-100 hover:border-blue-200 transition-all duration-300">
                <div class="flex items-start space-x-3">
                  <div class="flex-shrink-0 h-8 w-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <span class="text-blue-600 font-semibold">2</span>
                  </div>
                  <div>
                    <h5 class="font-medium text-gray-800">Pricing Options</h5>
                    <p class="text-sm text-gray-600 mt-1">Choose how you want to bill your client</p>
                    <div class="mt-2 text-xs text-blue-600">✓ Fixed rate with revisions included</div>
                  </div>
                </div>
              </div>
              
              <div class="p-4 bg-gradient-to-br from-purple-50 to-pink-100 rounded-xl border border-purple-100 hover:border-purple-200 transition-all duration-300">
                <div class="flex items-start space-x-3">
                  <div class="flex-shrink-0 h-8 w-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <span class="text-purple-600 font-semibold">3</span>
                  </div>
                  <div>
                    <h5 class="font-medium text-gray-800">Tax & Expenses</h5>
                    <p class="text-sm text-gray-600 mt-1">Add expenses and calculate taxes accurately</p>
                    <div class="mt-2 text-xs text-purple-600">✓ VAT and digital service tax included</div>
                  </div>
                </div>
              </div>
              
              <div class="p-4 bg-gradient-to-br from-teal-50 to-cyan-100 rounded-xl border border-teal-100 hover:border-teal-200 transition-all duration-300">
                <div class="flex items-start space-x-3">
                  <div class="flex-shrink-0 h-8 w-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <span class="text-teal-600 font-semibold">4</span>
                  </div>
                  <div>
                    <h5 class="font-medium text-gray-800">Documentation</h5>
                    <p class="text-sm text-gray-600 mt-1">Generate professional client-ready documents</p>
                    <div class="mt-2 text-xs text-teal-600">✓ Branded proposal and invoice</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Right Side: Bill Preview -->
          <div class="lg:col-span-3 border rounded-lg overflow-hidden">
            <div class="p-4 bg-gray-50 border-b border-gray-200">
              <div class="flex justify-between items-center">
                <h4 class="font-medium text-gray-800">Invoice Preview</h4>
                <span class="text-xs text-gray-500">Example</span>
              </div>
            </div>
            
            <div class="p-4">
              <div class="mb-6">
                <div class="flex justify-between items-start mb-4">
                  <div>
                    <div class="font-medium text-lg text-gray-800">Creative Design Agency</div>
                    <div class="text-sm text-gray-600">Nairobi, Kenya</div>
                  </div>
                  <div class="text-right">
                    <div class="font-medium text-gray-800">INVOICE</div>
                    <div class="text-sm text-gray-600">#INV-2023-001</div>
                  </div>
                </div>
                
                <div class="flex justify-between text-sm text-gray-600 mb-4">
                  <div>
                    <div>To: ABC Company Ltd.</div>
                    <div>contact@abccompany.com</div>
                  </div>
                  <div class="text-right">
                    <div>Issue Date: 01/06/2023</div>
                    <div>Due Date: 15/06/2023</div>
                  </div>
                </div>
              </div>
              
              <!-- Items Table -->
              <table class="w-full text-sm mb-4">
                <thead>
                  <tr class="border-b border-gray-200">
                    <th class="text-left py-2 font-medium text-gray-600">Description</th>
                    <th class="text-right py-2 font-medium text-gray-600">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="border-b border-gray-100">
                    <td class="py-2 text-gray-800">Corporate Logo Design Package</td>
                    <td class="py-2 text-gray-800 text-right">KES 45,000</td>
                  </tr>
                  <tr class="border-b border-gray-100">
                    <td class="py-2 text-gray-600 pl-4 text-xs">- Brand strategy session</td>
                    <td class="py-2 text-gray-600 text-right"></td>
                  </tr>
                  <tr class="border-b border-gray-100">
                    <td class="py-2 text-gray-600 pl-4 text-xs">- 3 concept designs</td>
                    <td class="py-2 text-gray-600 text-right"></td>
                  </tr>
                  <tr class="border-b border-gray-100">
                    <td class="py-2 text-gray-600 pl-4 text-xs">- 2 rounds of revisions</td>
                    <td class="py-2 text-gray-600 text-right"></td>
                  </tr>
                  <tr class="border-b border-gray-100">
                    <td class="py-2 text-gray-800">Stock image licensing</td>
                    <td class="py-2 text-gray-800 text-right">KES 3,500</td>
                  </tr>
                  <tr class="border-b border-gray-100">
                    <td class="py-2 text-gray-800">Font purchase</td>
                    <td class="py-2 text-gray-800 text-right">KES 2,800</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td class="pt-2 text-right font-medium">Subtotal</td>
                    <td class="pt-2 text-right font-medium">KES 51,300</td>
                  </tr>
                  <tr>
                    <td class="py-1 text-right text-sm text-gray-600">VAT (16%)</td>
                    <td class="py-1 text-right text-sm text-gray-600">KES 8,208</td>
                  </tr>
                  <tr>
                    <td class="py-1 text-right text-sm text-gray-600">Digital Service Tax (1.5%)</td>
                    <td class="py-1 text-right text-sm text-gray-600">KES 770</td>
                  </tr>
                  <tr>
                    <td class="py-2 text-right font-medium text-green-700">Total</td>
                    <td class="py-2 text-right font-medium text-green-700">KES 60,278</td>
                  </tr>
                </tfoot>
              </table>
              
              <!-- Payment Info -->
              <div class="mt-6 text-sm text-gray-600 border-t border-gray-100 pt-4">
                <div class="font-medium text-gray-700 mb-1">Payment Details:</div>
                <div>M-PESA Till Number: 123456</div>
                <div>Bank: Kenya Commercial Bank</div>
                <div>Account: 1234567890</div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Example Footer -->
        <div class="bg-gray-50 p-6 flex items-center justify-between border-t border-gray-200">
          <button 
            @click="startProject"
            class="px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg hover:from-green-500 hover:to-green-400 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
          >
            Create Your Own Project
          </button>

          <!-- Add Tax Guide Toggle -->
          <button
            @click="showTaxGuide = !showTaxGuide"
            class="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-300 text-gray-700 flex items-center space-x-2"
          >
            <span>{{ showTaxGuide ? 'Hide Tax Guide' : 'Show Tax Guide' }}</span>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
        
        <!-- Tax Guide Panel -->
        <div v-if="showTaxGuide" class="border-t border-gray-200">
          <TaxGuidePanel :profession="profession" />
        </div>
      </div>
    </div>

    <!-- Project Creation Form -->
    <ProjectCreationForm 
      v-if="isProjectStarted" 
      :initialStep="currentStep"
      @update:currentStep="updateCurrentStep"
      @cancel="cancelProjectCreation"
    >
      <!-- Tax Insights slot in summary step -->
      <template #taxInsights>
        <TaxInsights 
          :profession="project.profession"
          :annualIncome="pricingCalculation.serviceSubtotal * 12"
        />
      </template>

      <!-- Right sidebar slot -->
      <template #rightSidebar>
        <TaxInsights 
          :profession="project.profession"
          :annualIncome="pricingCalculation.serviceSubtotal * 12"
          class="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300"
        />
      </template>
    </ProjectCreationForm>
  </div>
</template>

<script>
import { ref, computed, reactive } from 'vue';
import ProjectCreationForm from '../components/ProjectCreationForm.vue';
import TaxInsights from '../components/TaxInsights.vue';
import TaxGuidePanel from '../components/TaxGuidePanel.vue';
import { calculateProjectPricing } from '../services/billingService';

export default {
  name: 'BillingPlanner',
  
  components: {
    ProjectCreationForm,
    TaxInsights,
    TaxGuidePanel
  },

  setup() {
    const currentStep = ref(0);
    const isProjectStarted = ref(false);
    const showTaxGuide = ref(true); // Changed to true so tax guide is open by default
    const profession = ref('designer'); // Add profession prop
    
    // Project data - minimal version for tax insights
    const project = reactive({
      profession: '',
      pricingModel: '',
      rate: 0,
      quantity: 1,
      hours: 0,
      wordCount: 0,
      expenses: []
    });
    
    // Computed properties for Tax Insights component
    const pricingCalculation = computed(() => {
      return calculateProjectPricing({
        pricingModel: project.pricingModel,
        quantity: project.quantity,
        rate: project.rate,
        hours: project.hours,
        wordCount: project.wordCount,
        expenses: project.expenses
      });
    });
    
    // Start project creation
    const startProject = () => {
      isProjectStarted.value = true; // Show the project creation form
      currentStep.value = 0;
    };
    
    // Cancel project creation
    const cancelProjectCreation = () => {
      isProjectStarted.value = false; // Hide the project creation form
    };
    
    // Update current step
    const updateCurrentStep = (step) => {
      currentStep.value = step;
    };

    const deductibleExpenses = [
      'Home office expenses',
      'Professional development',
      'Equipment and tools',
      'Internet and phone costs',
      'Business insurance',
      'Marketing expenses'
    ];

    const recommendations = [
      'Keep separate business and personal accounts',
      'Track all business-related expenses',
      'Save for tax payments quarterly',
      'Consider professional tax advice'
    ];

    const recordKeepingDeadlines = [
      {
        title: 'Receipt Storage',
        description: 'Keep all receipts and invoices for 5 years',
        bgClass: 'from-green-50 to-emerald-100 border border-green-200'
      },
      {
        title: 'PAYE Returns',
        description: 'File monthly by 9th of following month',
        bgClass: 'from-blue-50 to-indigo-100 border border-blue-200'
      },
      {
        title: 'VAT Returns',
        description: 'Submit by 20th of following month if registered',
        bgClass: 'from-purple-50 to-pink-100 border border-purple-200'
      },
      {
        title: 'Annual Returns',
        description: 'Due by June 30th each year',
        bgClass: 'from-orange-50 to-amber-100 border border-orange-200'
      }
    ];

    return {
      currentStep,
      isProjectStarted,
      startProject,
      project,
      pricingCalculation,
      cancelProjectCreation,
      updateCurrentStep,
      deductibleExpenses,
      recommendations,
      recordKeepingDeadlines,
      showTaxGuide,
      profession
    };
  }
};
</script>

<style scoped>
.gradient-heading {
  background: linear-gradient(to right, #10B981, #3B82F6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.max-w-8xl {
  max-width: 88rem;
}

.card-hover {
  transition: all 0.3s ease-in-out;
}

.card-hover:hover {
  transform: translateY(-2px);
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.text-primary {
  color: #16A34A;  /* text-green-600 equivalent */
}

.bg-primary {
  background-color: #16A34A;  /* bg-green-600 equivalent */
}

.bg-primary-dark {
  background-color: #15803D;  /* bg-green-700 equivalent */
}
</style>