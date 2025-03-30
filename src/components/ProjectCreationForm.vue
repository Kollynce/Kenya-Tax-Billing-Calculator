<template>
  <!-- Add loading overlay -->
<LoadingSpinner 
  v-if="isLoading"
  size="lg"
  color="green-600"
  :label="loadingMessage"
  :overlay="true"
/>

<!-- Add progress indicator -->
<ProgressIndicator 
  :steps="formSteps"
  :currentStep="currentStep"
  class="mb-6"
/>

<!-- Form content -->
<div class="flex flex-col lg:flex-row gap-6 animate-fade-in">
    <!-- Main Form Section -->
    <div class="w-full lg:w-2/3">
      <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100 space-y-6">
        <!-- Form Content -->
        <div class="mt-8">
          <!-- Step 1: Project Setup -->
          <div v-if="currentStep === 0">
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
          <div v-if="currentStep === 1">
            <TieredPricing
              :profession="project.profession"
              @select="handlePackageSelection"
            />
          </div>

          <!-- Step 3: Additional Services -->
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
          </div>

          <!-- Step 4: Client Information -->
          <div v-if="currentStep === 3">
            <div class="space-y-6">
              <h3 class="text-lg font-medium text-gray-900">Client Information</h3>
              <p class="text-gray-600 mb-4">Add details about your client for the proposal</p>
              

              <form @submit.prevent="validateAndProceed" class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Client Name</label>
                    <input 
                      type="text" 
                      v-model="v$.client.name.$model"
                      :class="[

                        'w-full rounded-md border-gray-300',
                        {'border-red-300 focus:border-red-500 focus:ring-red-500': v$.client.name.$error}
                      ]"
                      aria-required="true"
                      aria-invalid="v$.client.name.$error"
                      @blur="v$.client.name.$touch"
                    />
                    <p v-if="v$.client.name.$error" class="mt-1 text-sm text-red-600">
                      {{ v$.client.name.$errors[0].$message }}
                    </p>
                  </div>
                  

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Client Email</label>
                    <input 
                      type="email" 
                      v-model="v$.client.email.$model"
                      :class="[

                        'w-full rounded-md border-gray-300',
                        {'border-red-300 focus:border-red-500 focus:ring-red-500': v$.client.email.$error}
                      ]"
                      aria-required="true"
                      aria-invalid="v$.client.email.$error"
                      @blur="v$.client.email.$touch"
                    />
                    <p v-if="v$.client.email.$error" class="mt-1 text-sm text-red-600">
                      {{ v$.client.email.$errors[0].$message }}
                    </p>
                  </div>
                </div>

                <!-- Tax Settings -->
                <TaxSettings
                  :base-amount="pricingCalculation.subtotal"
                  :profession="project.profession"
                  @update="handleTaxSettingsUpdate"
                />

                <div class="flex justify-between">
                  <button 
                    type="button"
                    @click="currentStep--"
                    class="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                  <button 
                    type="submit"
                    :disabled="loading"
                    class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500 transition-colors flex items-center space-x-2"
                  >
                    <span>Continue</span>
                    <LoadingSpinner v-if="loading" class="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Sidebar -->
    <div class="w-full lg:w-1/3">
      <div class="sticky top-4 space-y-6">
        <!-- Summary Card -->
        <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
          <h3 class="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <svg class="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Project Summary
          </h3>
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

        <slot name="rightSidebar"></slot>
      </div>
    </div>
  </div>

  <!-- Add validation error messages -->
  <div v-if="currentStepErrors.length" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
    <h4 class="text-red-700 font-medium mb-2">Please fix the following errors:</h4>
    <ul class="list-disc list-inside text-sm text-red-600">
      <li v-for="error in currentStepErrors" :key="error">{{ error }}</li>
    </ul>
  </div>

  <!-- Add aria labels and keyboard navigation -->
  <div class="space-y-6" role="form">
    <slot name="formContent"></slot>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useProjectStore } from '@/store/projectStore'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import ProgressIndicator from '@/components/ProgressIndicator.vue'
import TieredPricing from '@/components/planner/TieredPricing.vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email, helpers } from '@vuelidate/validators'
import { formatCurrency } from '@/utils/taxUtils'
import { useKeyboardNav } from '@/composables/useKeyboardNav'

export default {
  name: 'ProjectCreationForm',
  components: {
    LoadingSpinner,
    ProgressIndicator,
    TieredPricing
  },
  emits: ['update:currentStep', 'cancel'],

  props: {
    initialStep: {
      type: Number,
      default: 0
    }
  },

  setup(props, { emit }) {
    const router = useRouter()
    const projectStore = useProjectStore()
    const isLoading = ref(false)
    const loadingMessage = ref('')
    const currentStep = ref(props.initialStep)
    
    // Add missing reactive variables
    const serviceTemplates = computed(() => {
      const templates = {
        designer: [
          {
            name: 'Logo Design',
            description: 'Professional logo and brand identity design',
            commonExpenses: [
              { name: 'Stock Assets', defaultCost: 2000, included: false },
              { name: 'Font Licensing', defaultCost: 3000, included: false }
            ]
          },
          {
            name: 'Web Design',
            description: 'Custom website design and UI/UX',
            commonExpenses: [
              { name: 'UI Kit', defaultCost: 5000, included: false },
              { name: 'Stock Photos', defaultCost: 3000, included: false }
            ]
          }
        ],
        writer: [
          {
            name: 'Content Writing',
            description: 'SEO-optimized content for your website',
            commonExpenses: [
              { name: 'Research Tools', defaultCost: 2000, included: false },
              { name: 'Editing Software', defaultCost: 1500, included: false }
            ]
          }
        ]
      }
      return templates[project.profession] || []
    })

    const selectedService = computed(() => {
      return serviceTemplates.value.find(service => service.name === project.serviceName)
    })

    const pricingCalculation = computed(() => {
      let subtotal = project.rate * (project.quantity || 1)
      const expenses = project.expenses.reduce((sum, expense) => sum + (expense.cost || 0), 0)
      
      return {
        subtotal,
        expenses,
        total: subtotal + expenses
      }
    })

    // Form steps with validation
    const formSteps = reactive([
      {
        name: 'Project Setup',
        description: 'Basic project information',
        complete: false,
        validate: () => {
          const errors = []
          if (!project.profession) errors.push('Please select a profession')
          if (!project.title) errors.push('Project title is required')
          if (!project.serviceName) errors.push('Please select a service type')
          return errors
        }
      },
      {
        name: 'Pricing Model',
        description: 'Set your pricing structure',
        complete: false,
        validate: () => {
          const errors = []
          if (!project.pricingModel) errors.push('Please select a pricing model')
          if (project.rate <= 0) errors.push('Rate must be greater than 0')
          return errors
        }
      },
      {
        name: 'Expenses',
        description: 'Add project expenses',
        complete: false,
        validate: () => []
      },
      {
        name: 'Client Details',
        description: 'Client information',
        complete: false,
        validate: () => {
          const errors = []
          if (!project.client.name) errors.push('Client name is required')
          if (!project.client.email) errors.push('Client email is required')
          return errors
        }
      }
    ])

    const currentStepErrors = computed(() => {
      if (!formSteps[currentStep.value]) return []
      return formSteps[currentStep.value].validate()
    })

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
    })

    // Save form state periodically
    const autoSave = () => {
      projectStore.saveFormDraft(project)
    }
    const autoSaveInterval = setInterval(autoSave, 30000)

    // Methods
    const handleProfessionChange = () => {
      project.serviceName = ''
      project.serviceDescription = ''
      project.pricingModel = ''
      project.pricingLabel = ''
      project.expenses = []
    }
    
    const selectService = (service) => {
      project.serviceName = service.name
      project.serviceDescription = service.description
    }
    
    const handlePackageSelection = (packageData) => {
      project.pricingModel = 'tiered'
      project.selectedPackage = packageData.package
      project.rate = packageData.total
      project.pricingLabel = `${packageData.package.name} Package`
      nextStep()
    }

    const handleTaxSettingsUpdate = (settings) => {
      Object.assign(project, {
        isVATRegistered: settings.isVatRegistered,
        vatNumber: settings.vatNumber,
        includeDigitalServiceTax: settings.hasDigitalServiceTax,
        includeWithholdingTax: settings.hasWithholdingTax,
        taxSummary: settings.summary
      })
    }
    
    const toggleExpense = (expense) => {
      if (expense.included) {
        project.expenses.push({
          name: expense.name,
          cost: expense.defaultCost
        })
      } else {
        const index = project.expenses.findIndex(e => e.name === expense.name)
        if (index !== -1) {
          project.expenses.splice(index, 1)
        }
      }
    }
    
    const addCustomExpense = () => {
      project.expenses.push({
        name: '',
        cost: 0
      })
    }
    
    const removeExpense = (index) => {
      project.expenses.splice(index, 1)
    }

    // Update nextStep to use Vuelidate
    const nextStep = async () => {
      const isValid = await v$.value.$validate()
      if (!isValid) return

      formSteps[currentStep.value].complete = true
      if (currentStep.value < formSteps.length - 1) {
        currentStep.value++
        emit('update:currentStep', currentStep.value)
        v$.value.$reset()
      } else {
        try {
          isLoading.value = true
          loadingMessage.value = 'Generating proposal...'
          await projectStore.saveProject(project)
          router.push({ name: 'ProjectPitch', params: { id: project.id }})
        } catch (error) {
          console.error('Error saving project:', error)
        } finally {
          isLoading.value = false
        }
      }
    }

    const cancelProject = () => {
      emit('cancel')
    }

    // Restore form data if available
    onMounted(() => {
      const savedData = projectStore.getFormDraft()
      if (savedData) {
        Object.assign(project, savedData)
      }
    })

    onBeforeUnmount(() => {
      clearInterval(autoSaveInterval)
    })
    
    // Validation rules
    const rules = {
      profession: { required: helpers.withMessage('Please select your profession', required) },
      title: { required: helpers.withMessage('Project title is required', required) },
      serviceName: { required: helpers.withMessage('Please select a service type', required) },
      client: {
        name: { required: helpers.withMessage('Client name is required', required) },
        email: { 
          required: helpers.withMessage('Client email is required', required),
          email: helpers.withMessage('Please enter a valid email address', email)
        }
      }
    }

    const v$ = useVuelidate(rules, project)

    // Keyboard navigation
    const isFormEnabled = computed(() => !isLoading.value)
    
    useKeyboardNav({
      isEnabled: isFormEnabled,
      onNext: () => {
        if (currentStepErrors.value.length === 0) {
          nextStep()
        }
      },
      onPrevious: () => {
        if (currentStep.value > 0) {
          currentStep.value--
          emit('update:currentStep', currentStep.value)
        }
      },
      onEscape: cancelProject
    })

    return {
      isLoading,
      loadingMessage,
      formSteps,
      currentStep,
      currentStepErrors,
      project,
      handleProfessionChange,
      selectService,
      handlePackageSelection,
      handleTaxSettingsUpdate,
      toggleExpense,
      addCustomExpense,
      removeExpense,
      nextStep,
      cancelProject,
      formatCurrency,
      v$,
      serviceTemplates,
      selectedService,
      pricingCalculation,
    }
  }
}
</script>

<style scoped>
/* Add responsive styles */
@media (max-width: 768px) {
  .lg\:flex-row {
    flex-direction: column;
  }
  .lg\:w-2\/3 {
    width: 100%;
  }
  .lg\:w-1\/3 {
    width: 100%;
  }
}

/* Improve accessibility */
[role="button"]:focus {
  @apply outline-none ring-2 ring-offset-2 ring-green-500;
}

/* Add smooth transitions */
.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
