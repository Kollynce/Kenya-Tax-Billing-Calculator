<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <!-- Example Section -->
    <BillingPlannerExample v-if="!isProjectStarted" class="mb-8" />

    <div class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg shadow-lg p-6">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Billing Planner</h1>
        <p class="mt-2 text-gray-600">Create professional proposals and invoices for your creative projects</p>
      </div>

      <!-- Multi-step Form -->
      <div class="bg-white rounded-lg shadow p-6">
        <!-- Progress Steps -->
        <div class="mb-8">
          <div class="flex justify-between">
            <div v-for="(step, index) in steps" :key="index" class="flex-1">
              <div class="relative">
                <div class="flex items-center justify-center">
                  <div :class="[
                    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium',
                    currentStep >= index ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
                  ]">
                    {{ index + 1 }}
                  </div>
                </div>
                <div class="mt-2 text-center">
                  <p class="text-sm font-medium" :class="currentStep >= index ? 'text-green-600' : 'text-gray-500'">
                    {{ step.name }}
                  </p>
                </div>
                <div v-if="index < steps.length - 1" :class="[
                  'absolute top-4 w-full h-0.5',
                  currentStep > index ? 'bg-green-600' : 'bg-gray-200'
                ]"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Step Content -->
        <!-- Step 1: Project Setup -->
        <div v-if="currentStep === 0" class="space-y-6">
          <h3 class="text-lg font-medium text-gray-900">Project Setup</h3>
        
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Profession Selection -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Select Your Profession</label>
              <select v-model="project.profession" class="w-full rounded-md border-gray-300" @change="handleProfessionChange">
                <option value="designer">Graphic Designer</option>
                <option value="writer">Content Writer</option>
                <option value="musician">Musician/Producer</option>
                <option value="general">Other Freelancer</option>
              </select>
            </div>
            
            <!-- Project Title -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Project Title</label>
              <input type="text" v-model="project.title" class="w-full rounded-md border-gray-300" placeholder="e.g. Corporate Logo Design">
            </div>
          </div>
          
          <!-- Service Selection -->
          <div v-if="serviceTemplates.length > 0">
            <label class="block text-sm font-medium text-gray-700 mb-2">Service Type</label>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div 
                v-for="service in serviceTemplates" 
                :key="service.name"
                @click="selectService(service)"
                :class="[
                  'p-4 border rounded-md cursor-pointer transition-colors',
                  project.serviceName === service.name ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
                ]"
              >
                <h4 class="font-medium text-gray-900">{{ service.name }}</h4>
                <p class="text-sm text-gray-600">{{ service.description }}</p>
              </div>
            </div>
          </div>
          
          <div class="flex justify-end">
            <button 
              @click="nextStep"
              class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              :disabled="!project.profession || !project.serviceName"
            >
              Continue
            </button>
          </div>
        </div>

        <!-- Step 2: Pricing Model -->
        <div v-if="currentStep === 1" class="space-y-6">
          <h3 class="text-lg font-medium text-gray-900">Pricing Model</h3>
        
          <div v-if="selectedService">
            <p class="text-gray-600 mb-4">Select a pricing model for "{{ selectedService.name }}"</p>
            
            <!-- Pricing Options -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div 
                v-for="option in selectedService.pricingOptions" 
                :key="option.label"
                @click="selectPricingOption(option)"
                :class="[
                  'p-4 border rounded-md cursor-pointer transition-colors',
                  project.pricingModel === option.type && project.pricingLabel === option.label ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
                ]"
              >
                <h4 class="font-medium text-gray-900">{{ option.label }}</h4>
                <p v-if="option.type === 'fixed'" class="text-sm text-gray-600">Fixed price: {{ formatCurrency(option.defaultRate) }}</p>
                <p v-if="option.type === 'hourly'" class="text-sm text-gray-600">{{ formatCurrency(option.defaultRate) }} per hour × {{ option.defaultHours }} hours</p>
                <p v-if="option.type === 'wordCount'" class="text-sm text-gray-600">{{ formatCurrency(option.defaultRate) }} per 1000 words</p>
              </div>
            </div>
            
            <!-- Custom Rate Input -->
            <div v-if="project.pricingModel" class="mb-6">
              <h4 class="text-md font-medium text-gray-900 mb-3">Customize Your Pricing</h4>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Fixed Price or Hourly Rate -->
                <div v-if="project.pricingModel === 'fixed' || project.pricingModel === 'hourly'">
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    {{ project.pricingModel === 'fixed' ? 'Fixed Price (KES)' : 'Hourly Rate (KES)' }}
                  </label>
                  <input 
                    type="number" 
                    v-model.number="project.rate" 
                    class="w-full rounded-md border-gray-300"
                    min="0"
                  >
                </div>
                
                <!-- Word Count Rate -->
                <div v-if="project.pricingModel === 'wordCount'">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Rate per 1000 words (KES)</label>
                  <input 
                    type="number" 
                    v-model.number="project.rate" 
                    class="w-full rounded-md border-gray-300"
                    min="0"
                  >
                </div>
                
                <!-- Quantity -->
                <div v-if="project.pricingModel === 'fixed'">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                  <input 
                    type="number" 
                    v-model.number="project.quantity" 
                    class="w-full rounded-md border-gray-300"
                    min="1"
                  >
                </div>
                
                <!-- Hours -->
                <div v-if="project.pricingModel === 'hourly'">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Estimated Hours</label>
                  <input 
                    type="number" 
                    v-model.number="project.hours" 
                    class="w-full rounded-md border-gray-300"
                    min="0"
                  >
                </div>
                
                <!-- Word Count -->
                <div v-if="project.pricingModel === 'wordCount'">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Word Count</label>
                  <input 
                    type="number" 
                    v-model.number="project.wordCount" 
                    class="w-full rounded-md border-gray-300"
                    min="0"
                  >
                </div>
              </div>
            </div>
          </div>
          
          <div class="flex justify-between">
            <button 
              @click="currentStep = 0"
              class="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
            <button 
              @click="nextStep"
              class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500 transition-colors"
              :disabled="!project.pricingModel"
            >
              Continue
            </button>
          </div>
        </div>

        <!-- Step 3: Expenses -->
        <div v-if="currentStep === 2" class="space-y-6">
          <h3 class="text-lg font-medium text-gray-900">Project Expenses</h3>
          <p class="text-gray-600 mb-4">Add any additional expenses associated with this project</p>
          
          <!-- Suggested Expenses -->
          <div v-if="selectedService && selectedService.commonExpenses.length > 0" class="mb-6">
            <h4 class="text-md font-medium text-gray-900 mb-3">Common Expenses for {{ selectedService.name }}</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div 
                v-for="expense in selectedService.commonExpenses" 
                :key="expense.name"
                class="flex items-center p-3 border rounded-md border-gray-200"
              >
                <input 
                  type="checkbox" 
                  :id="expense.name"
                  v-model="expense.included"
                  @change="toggleExpense(expense)"
                  class="mr-3 rounded border-gray-300"
                >
                <div class="flex-grow">
                  <label :for="expense.name" class="text-sm font-medium text-gray-700">{{ expense.name }}</label>
                  <p class="text-xs text-gray-500">{{ formatCurrency(expense.defaultCost) }}</p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Custom Expenses -->
          <div class="mb-6">
            <div class="flex justify-between items-center mb-3">
              <h4 class="text-md font-medium text-gray-900">Custom Expenses</h4>
              <button 
                @click="addCustomExpense"
                class="px-3 py-1 text-sm border border-blue-500 text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
              >
                Add Expense
              </button>
            </div>
            
            <div class="space-y-4">
              <div 
                v-for="(expense, index) in project.expenses" 
                :key="index"
                class="grid grid-cols-12 gap-2 items-center"
              >
                <div class="col-span-6">
                  <input 
                    type="text" 
                    v-model="expense.name" 
                    class="w-full rounded-md border-gray-300"
                    placeholder="Expense name"
                  >
                </div>
                <div class="col-span-4">
                  <input 
                    type="number" 
                    v-model.number="expense.cost" 
                    class="w-full rounded-md border-gray-300"
                    placeholder="Cost in KES"
                    min="0"
                  >
                </div>
                <div class="col-span-2 text-right">
                  <button 
                    @click="removeExpense(index)"
                    class="p-1 text-red-600 hover:text-red-800 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Tax Settings -->
          <div class="p-4 border rounded-md border-gray-200 bg-gray-50 mb-6">
            <h4 class="text-md font-medium text-gray-900 mb-3">Tax Settings</h4>
            <div class="space-y-3">
              <div class="flex items-center">
                <input 
                  type="checkbox" 
                  id="vatRegistered"
                  v-model="project.isVATRegistered"
                  class="mr-3 rounded border-gray-300"
                >
                <label for="vatRegistered" class="text-sm text-gray-700">I am VAT registered (16% VAT will be added)</label>
              </div>
              
              <div v-if="isDigitalProfession" class="flex items-center">
                <input 
                  type="checkbox" 
                  id="digitalServiceTax"
                  v-model="project.includeDigitalServiceTax"
                  class="mr-3 rounded border-gray-300"
                >
                <label for="digitalServiceTax" class="text-sm text-gray-700">Include Digital Service Tax (1.5%)</label>
              </div>
            </div>
          </div>
          
          <div class="flex justify-between">
            <button 
              @click="currentStep = 1"
              class="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
            <button 
              @click="nextStep"
              class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500 transition-colors"
            >
              Continue
            </button>
          </div>
        </div>

        <!-- Step 4: Client Information -->
        <div v-if="currentStep === 3" class="space-y-6">
          <h3 class="text-lg font-medium text-gray-900">Client Information</h3>
          <p class="text-gray-600 mb-4">Add details about your client for the proposal</p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Client Name</label>
              <input type="text" v-model="project.client.name" class="w-full rounded-md border-gray-300" placeholder="Company or individual name">
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Client Email</label>
              <input type="email" v-model="project.client.email" class="w-full rounded-md border-gray-300" placeholder="client@example.com">
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Client Phone</label>
              <input type="text" v-model="project.client.phone" class="w-full rounded-md border-gray-300" placeholder="e.g. +254 700 000 000">
            </div>
            
            <div class="col-span-1 md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2">Client Address</label>
              <textarea v-model="project.client.address" rows="2" class="w-full rounded-md border-gray-300" placeholder="Physical address"></textarea>
            </div>
          </div>
          
          <div class="p-4 border rounded-md border-gray-200 bg-gray-50 mb-6">
            <h4 class="text-md font-medium text-gray-900 mb-3">Your Business Details</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Your Name/Business Name</label>
                <input type="text" v-model="project.from.name" class="w-full rounded-md border-gray-300" placeholder="Your business name">
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input type="email" v-model="project.from.email" class="w-full rounded-md border-gray-300" placeholder="your@email.com">
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input type="text" v-model="project.from.phone" class="w-full rounded-md border-gray-300" placeholder="e.g. +254 700 000 000">
              </div>
              
              <div class="col-span-1 md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-2">Business Address</label>
                <textarea v-model="project.from.address" rows="2" class="w-full rounded-md border-gray-300" placeholder="Your address"></textarea>
              </div>
            </div>
          </div>
          
          <div class="flex justify-between">
            <button 
              @click="currentStep = 2"
              class="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
            <button 
              @click="nextStep"
              class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Continue
            </button>
          </div>
        </div>

        <!-- Step 5: Summary and Generation -->
        <div v-if="currentStep === 4" class="space-y-6">
          <h3 class="text-lg font-medium text-gray-900">Project Summary</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-white rounded-lg border border-gray-200 p-4">
              <div class="space-y-4">
                <div>
                  <h4 class="text-sm font-medium text-gray-500">Project</h4>
                  <p class="text-gray-900">{{ project.title }}</p>
                </div>
                
                <div>
                  <h4 class="text-sm font-medium text-gray-500">Service</h4>
                  <p class="text-gray-900">{{ project.serviceName }}: {{ project.serviceDescription }}</p>
                </div>
                
                <div>
                  <h4 class="text-sm font-medium text-gray-500">Pricing Model</h4>
                  <p class="text-gray-900">
                    {{ project.pricingLabel }}
                    <span v-if="project.pricingModel === 'fixed'"> ({{ formatCurrency(project.rate) }} × {{ project.quantity }})</span>
                    <span v-if="project.pricingModel === 'hourly'"> ({{ formatCurrency(project.rate) }}/hr × {{ project.hours }} hours)</span>
                    <span v-if="project.pricingModel === 'wordCount'"> ({{ formatCurrency(project.rate) }}/1000 words × {{ project.wordCount }} words)</span>
                  </p>
                </div>
              </div>
            </div>
            
            <div class="bg-white rounded-lg border border-gray-200 p-4">
              <div class="space-y-4">
                <div>
                  <h4 class="text-sm font-medium text-gray-500">Client</h4>
                  <p class="text-gray-900">{{ project.client.name || 'Not specified' }}</p>
                </div>
                
                <div>
                  <h4 class="text-sm font-medium text-gray-500">Tax Settings</h4>
                  <div>
                    <p v-if="project.isVATRegistered" class="text-gray-900">VAT Registered (16%)</p>
                    <p v-else class="text-gray-900">No VAT</p>
                    <p v-if="project.includeDigitalServiceTax" class="text-gray-900">Digital Service Tax (1.5%)</p>
                  </div>
                </div>
                
                <div v-if="project.expenses.length > 0">
                  <h4 class="text-sm font-medium text-gray-500">Expenses</h4>
                  <ul class="text-gray-900 list-disc list-inside">
                    <li v-for="expense in project.expenses" :key="expense.name">
                      {{ expense.name }}: {{ formatCurrency(expense.cost) }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- Total Calculation -->
          <div class="bg-white rounded-lg border border-gray-200 p-4">
            <h4 class="text-lg font-medium text-gray-900 mb-3">Project Total</h4>
            <div class="space-y-2">
              <div class="flex justify-between">
                <span class="text-gray-600">Services Subtotal:</span>
                <span class="font-medium">{{ formatCurrency(pricingCalculation.serviceSubtotal) }}</span>
              </div>
              
              <div v-if="pricingCalculation.expensesTotal > 0" class="flex justify-between">
                <span class="text-gray-600">Expenses:</span>
                <span class="font-medium">{{ formatCurrency(pricingCalculation.expensesTotal) }}</span>
              </div>
              
              <div v-if="project.isVATRegistered" class="flex justify-between">
                <span class="text-gray-600">VAT (16%):</span>
                <span class="font-medium">{{ formatCurrency(pricingCalculation.vat) }}</span>
              </div>
              
              <div v-if="project.includeDigitalServiceTax" class="flex justify-between">
                <span class="text-gray-600">Digital Service Tax (1.5%):</span>
                <span class="font-medium">{{ formatCurrency(pricingCalculation.dst) }}</span>
              </div>
              
              <div class="flex justify-between pt-2 border-t border-gray-300">
                <span class="font-medium text-gray-900">Total:</span>
                <span class="font-bold text-lg text-green-600">{{ formatCurrency(pricingCalculation.total) }}</span>
              </div>
            </div>
          </div>
          
          <!-- Document Generation -->
          <div class="bg-white rounded-lg border border-gray-200 p-6">
            <h4 class="text-lg font-medium text-gray-900 mb-3">Document Generation</h4>
            <p class="text-sm text-gray-600 mb-4">Create professional documents for your client</p>
            
            <div class="flex flex-wrap gap-4">
              <button 
                @click="generateProposal"
                class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-500"
              >
                Generate Proposal
              </button>
              
              <button 
                @click="createInvoice"
                class="inline-flex items-center px-6 py-3 border border-green-600 text-base font-medium rounded-md text-green-600 hover:bg-green-50"
              >
                Create Invoice
              </button>
              
              <button 
                @click="saveProject"
                class="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 hover:bg-gray-50"
              >
                Save Project
              </button>
            </div>
          </div>
        </div>

        <!-- Navigation Buttons -->
        <div class="flex justify-between mt-8">
          <button 
            v-if="currentStep > 0"
            @click="currentStep--"
            class="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 hover:bg-gray-50 hover:border-green-500"
          >
            Back
          </button>
          <button 
            v-if="currentStep < steps.length - 1"
            @click="nextStep"
            class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-500"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { auth } from '../firebase';
import { 
  PROJECT_PRICING_MODELS, 
  calculateProjectPricing, 
  saveProjectPlan,
  convertProjectToInvoice,
  saveInvoice
} from '../services/billingService';
import { formatCurrency } from '../utils/taxUtils';
import BillingPlannerExample from '../components/BillingPlannerExample.vue';

export default {
  name: 'BillingPlanner',
  
  components: {
    BillingPlannerExample
  },

  setup() {
    const isProjectStarted = computed(() => currentStep.value > 0);
    const router = useRouter();
    const currentStep = ref(0);
    const steps = [
      { name: 'Project Setup' },
      { name: 'Pricing Model' },
      { name: 'Expenses' },
      { name: 'Client Info' },
      { name: 'Summary' }
    ];
    
    // Project data
    const project = reactive({
      profession: '',
      title: '',
      serviceName: '',
      serviceDescription: '',
      pricingModel: '',
      pricingLabel: '',
      rate: 0,
      quantity: 1,
      hours: 0,
      wordCount: 0,
      expenses: [],
      isVATRegistered: false,
      includeDigitalServiceTax: false,
      client: {
        name: '',
        email: '',
        phone: '',
        address: ''
      },
      from: {
        name: '',
        email: '',
        phone: '',
        address: ''
      },
      notes: '',
      timeline: '',
      terms: ''
    });
    
    // User authentication
    const userId = ref(null);
    onMounted(() => {
      auth.onAuthStateChanged((user) => {
        userId.value = user ? user.uid : null;
        if (user) {
          // Pre-fill business details if available
          project.from.name = user.displayName || '';
          project.from.email = user.email || '';
        }
      });
    });
    
    // Computed properties
    const serviceTemplates = computed(() => {
      return PROJECT_PRICING_MODELS[project.profession] || [];
    });
    
    const selectedService = computed(() => {
      return serviceTemplates.value.find(service => service.name === project.serviceName);
    });
    
    const isDigitalProfession = computed(() => {
      return ['designer', 'writer'].includes(project.profession);
    });
    
    const pricingCalculation = computed(() => {
      return calculateProjectPricing({
        pricingModel: project.pricingModel,
        quantity: project.quantity,
        rate: project.rate,
        hours: project.hours,
        wordCount: project.wordCount,
        expenses: project.expenses,
        isVATRegistered: project.isVATRegistered,
        includeDigitalServiceTax: project.includeDigitalServiceTax
      });
    });
    
    // Methods
    const handleProfessionChange = () => {
      // Reset service selection when profession changes
      project.serviceName = '';
      project.serviceDescription = '';
      project.pricingModel = '';
      project.pricingLabel = '';
      project.expenses = [];
    };
    
    const selectService = (service) => {
      project.serviceName = service.name;
      project.serviceDescription = service.description;
    };
    
    const selectPricingOption = (option) => {
      project.pricingModel = option.type;
      project.pricingLabel = option.label;
      project.rate = option.defaultRate;
      
      if (option.type === 'hourly' && option.defaultHours) {
        project.hours = option.defaultHours;
      }
      
      if (option.type === 'wordCount' && option.defaultCount) {
        project.wordCount = option.defaultCount;
      }
    };
    
    const toggleExpense = (expense) => {
      if (expense.included) {
        // Add to expenses
        project.expenses.push({
          name: expense.name,
          cost: expense.defaultCost
        });
      } else {
        // Remove from expenses
        const index = project.expenses.findIndex(e => e.name === expense.name);
        if (index !== -1) {
          project.expenses.splice(index, 1);
        }
      }
    };
    
    const addCustomExpense = () => {
      project.expenses.push({
        name: '',
        cost: 0
      });
    };
    
    const removeExpense = (index) => {
      project.expenses.splice(index, 1);
    };
    
    const nextStep = () => {
      if (currentStep.value < steps.length - 1) {
        currentStep.value++;
      }
    };
    
    const generateProposal = () => {
      // Navigate to proposal view with project data
      router.push({
        name: 'Proposal',
        query: { project: JSON.stringify(project) }
      });
    };
    
    const createInvoice = async () => {
      try {
        if (!userId.value) {
          alert('Please log in to create an invoice');
          return;
        }
        
        // Convert project to invoice format
        const invoice = convertProjectToInvoice(project);
        
        // Save invoice to Firestore
        const invoiceId = await saveInvoice(userId.value, invoice);
        
        // Navigate to invoice view
        router.push({
          path: `/invoice/${invoiceId}`
        });
      } catch (error) {
        console.error('Error creating invoice:', error);
        alert('Failed to create invoice. Please try again.');
      }
    };
    
    const saveProject = async () => {
      try {
        if (!userId.value) {
          alert('Please log in to save your project');
          return;
        }
        
        // Save project to Firestore
        await saveProjectPlan(userId.value, project);
        
        alert('Project saved successfully!');
      } catch (error) {
        console.error('Error saving project:', error);
        alert('Failed to save project. Please try again.');
      }
    };
    
    return {
      currentStep,
      steps,
      project,
      serviceTemplates,
      selectedService,
      isDigitalProfession,
      pricingCalculation,
      handleProfessionChange,
      selectService,
      selectPricingOption,
      toggleExpense,
      addCustomExpense,
      removeExpense,
      nextStep,
      generateProposal,
      createInvoice,
      saveProject,
      formatCurrency,
      isProjectStarted
    };
  }
};
</script>

<style scoped>
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