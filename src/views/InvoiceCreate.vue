<template>
  <div class="max-w-8xl mx-auto px-4 py-8">
    <!-- Enhanced Header Section -->
    <div class="mb-8 flex-shrink-0">
      <button 
        @click="goBack"
        class="mb-4 flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back
      </button>
      <div class="flex items-center space-x-3 mb-4">
        <span class="inline-block px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-800">
          Professional Invoice
        </span>
        <span class="inline-block px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800">
          KRA Compliant
        </span>
      </div>
      <h1 class="text-3xl font-bold text-gray-900 mb-3 gradient-heading">Create Professional Invoice</h1>
      <p class="text-lg text-gray-600">Generate detailed invoices that reflect your expertise</p>
    </div>

    <!-- Bento Box Layout: 3 sections with adjusted height to prevent footer overlap -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-220px)] mb-6">
      <!-- Box 1: Left Column - Input Sections (spans 5 columns) -->
      <div class="lg:col-span-5 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden flex flex-col">
        <div class="p-4 bg-gradient-to-r from-green-50 to-blue-50 border-b border-gray-100">
          <div class="flex justify-between items-center">
            <h3 class="font-medium text-gray-800">Invoice Details</h3>
            <span class="bg-white text-xs font-medium px-2 py-1 rounded-full text-gray-500 shadow-sm">
              {{ titleCase(activeSection) }} Section
            </span>
          </div>
        </div>
        
        <!-- Scrollable Input Area with improved spacing -->
        <div class="flex-1 overflow-y-auto custom-scrollbar p-6">
          <div class="space-y-8"> <!-- Added space-y-8 for better spacing between sections -->
            <BrandingSection
              v-model:invoice="invoice"
              :is-active="activeSection === 'branding'"
              :selected-theme="selectedTheme"
              :add-logo="addLogo"
              :logo-url="logoUrl"
              :color-themes="colorThemes"
              @toggle-section="setActiveSection"
              @next-section="setActiveSection"
              @update:selected-theme="selectedTheme = $event"
              @update:add-logo="addLogo = $event"
              @logo-uploaded="logoUrl = $event"
              class="mb-6"
            />

            <BusinessSection
              v-model:invoice="invoice"
              :is-active="activeSection === 'business'"
              @toggle-section="setActiveSection"
              @next-section="setActiveSection"
              @prev-section="setActiveSection"
              class="mb-6"
            />

            <ClientSection
              v-model:invoice="invoice"
              :is-active="activeSection === 'client'"
              @toggle-section="setActiveSection"
              @next-section="setActiveSection"
              @prev-section="setActiveSection"
              class="mb-6"
            />

            <ItemsSection
              v-model:invoice="invoice"
              :is-active="activeSection === 'items'"
              @toggle-section="setActiveSection"
              @next-section="setActiveSection"
              @prev-section="setActiveSection"
              class="mb-6"
            />

            <AdditionalSection
              v-model:invoice="invoice"
              :is-active="activeSection === 'additional'"
              @toggle-section="setActiveSection"
              @next-section="setActiveSection"
              @prev-section="setActiveSection"
              class="mb-6"
            />

            <TaxSection
              v-model:invoice="invoice"
              :is-active="activeSection === 'taxes'"
              :include-digital-service-tax="includeDigitalServiceTax"
              @toggle-section="setActiveSection"
              @next-section="setActiveSection"
              @prev-section="setActiveSection"
              @update:include-digital-service-tax="includeDigitalServiceTax = $event"
              class="mb-6"
            />

            <TemplatesSection
              v-model:invoice="invoice"
              :is-active="activeSection === 'templates'"
              :selected-template="selectedTemplate"
              :templates="invoiceTemplates"
              @toggle-section="setActiveSection"
              @prev-section="setActiveSection"
              @update:selected-template="selectedTemplate = $event"
              @update:templateStyle="updateTemplateStyle"
              @update:templateLayout="updateTemplateLayout"
              class="mb-6"
            />
          </div>
        </div>
      </div>
      
      <!-- Right Side: Box 2 & 3 (spans 7 columns) -->
      <div class="lg:col-span-7 flex flex-col gap-6 h-full">
        <!-- Box 2: Live Preview -->
        <div class="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden flex-1">
          <div class="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-100">
            <div class="flex justify-between items-center">
              <h3 class="font-medium text-gray-800">Live Preview</h3>
              <span class="bg-white text-xs font-medium px-2 py-1 rounded-full text-gray-500 shadow-sm">
                <svg class="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Preview
              </span>
            </div>
          </div>
          
          <div class="overflow-y-auto custom-scrollbar h-full p-6">
            <InvoicePreview 
              :invoice="invoice"
              :selected-theme="selectedTheme"
              :add-logo="addLogo"
              :logo-url="logoUrl"
              :include-digital-service-tax="includeDigitalServiceTax"
            />
          </div>
        </div>
        
        <!-- Box 3: Navigation and Actions -->
        <div class="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div class="p-4 bg-gradient-to-r from-purple-50 to-pink-50 border-b border-gray-100">
            <div class="flex justify-between items-center">
              <h3 class="font-medium text-gray-800">Actions</h3>
              <span class="bg-white text-xs font-medium px-2 py-1 rounded-full text-gray-500 shadow-sm">
                <svg class="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Step {{ currentStepIndex + 1 }} of {{ formSections.length }}
              </span>
            </div>
          </div>
          
          <div class="p-6">
            <!-- Section Navigation - Fixed ESLint error by removing unused 'index' variable -->
            <div class="mb-4">
              <div class="flex overflow-x-auto custom-scrollbar-horizontal space-x-2 pb-2">
                <button
                  v-for="section in formSections"
                  :key="section.id"
                  @click="setActiveSection(section.id)"
                  :class="[
                    'px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200',
                    activeSection === section.id 
                      ? 'bg-green-100 text-green-800 shadow-sm' 
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  ]"
                >
                  {{ section.name }}
                </button>
              </div>
            </div>
            
            <!-- Progress Bar -->
            <div class="w-full h-2 bg-gray-100 rounded-full mb-6">
              <div 
                class="h-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-full transition-all duration-300"
                :style="{ width: `${((currentStepIndex + 1) / formSections.length) * 100}%` }"
              ></div>
            </div>
            
            <!-- Action Buttons -->
            <div class="grid grid-cols-2 gap-4 mb-6">
              <button 
                @click="saveDraft"
                class="flex items-center justify-center px-6 py-3 bg-gradient-to-br from-gray-50 to-gray-100 text-gray-700 rounded-xl border border-gray-200 hover:border-gray-300 hover:from-white hover:to-gray-50 transition-all duration-200 group"
              >
                <svg class="w-5 h-5 mr-2 text-gray-500 group-hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                </svg>
                Save Draft
              </button>
              <button 
                @click="downloadPDF"
                class="flex items-center justify-center px-6 py-3 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-400 hover:to-emerald-500 transition-all duration-200 transform hover:scale-[1.02] group shadow-md hover:shadow-lg"
              >
                <svg class="w-5 h-5 mr-2 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download PDF
              </button>
            </div>
            
            <!-- Navigation Buttons -->
            <div class="flex justify-between">
              <button 
                v-if="currentStepIndex > 0"
                @click="navigateToPrevious" 
                class="group flex items-center space-x-2 px-4 py-2 bg-white text-gray-600 hover:text-gray-800 transition-colors duration-200 rounded-lg border border-gray-100 hover:border-gray-200"
              >
                <svg class="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
                <span>Previous</span>
              </button>
              <button 
                v-if="currentStepIndex < formSections.length - 1"
                @click="navigateToNext"
                class="group flex items-center space-x-2 px-4 py-2 bg-white text-gray-600 hover:text-gray-800 transition-colors duration-200 rounded-lg border border-gray-100 hover:border-gray-200"
              >
                <span>Next</span>
                <svg class="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <button 
                @click="sendInvoice"
                class="flex items-center px-4 py-2 text-sm bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-all duration-200 rounded-lg"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Send Invoice
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import InvoicePreview from '@/components/InvoicePreview.vue';
import BrandingSection from '@/components/invoice/BrandingSection.vue';
import BusinessSection from '@/components/invoice/BusinessSection.vue';
import ClientSection from '@/components/invoice/ClientSection.vue';
import ItemsSection from '@/components/invoice/ItemsSection.vue';
import AdditionalSection from '@/components/invoice/AdditionalSection.vue';
import TaxSection from '@/components/invoice/TaxSection.vue';
import TemplatesSection from '@/components/invoice/TemplatesSection.vue';

export default {
  name: 'InvoiceCreate',
  components: {
    InvoicePreview,
    BrandingSection,
    BusinessSection,
    ClientSection,
    ItemsSection,
    AdditionalSection,
    TaxSection,
    TemplatesSection
  },

  setup() {
    const route = useRoute();
    const router = useRouter();
    const profession = route.query.profession || 'general';

    // Form sections for tab navigation
    const formSections = [
      { id: 'branding', name: 'Branding' },
      { id: 'business', name: 'Your Details' },
      { id: 'client', name: 'Client' },
      { id: 'items', name: 'Items' },
      { id: 'additional', name: 'Additional Info' },
      { id: 'taxes', name: 'Taxes' },
      { id: 'templates', name: 'Templates' }
    ];

    // Track active section
    const activeSection = ref('branding');
    
    // Helper method to convert strings to title case (replace filter)
    const titleCase = (value) => {
      if (!value) return '';
      return value.charAt(0).toUpperCase() + value.slice(1);
    };
    
    // Computed for current step index
    const currentStepIndex = computed(() => {
      return formSections.findIndex(section => section.id === activeSection.value);
    });

    // Invoice state with expanded functionality
    const invoice = ref({
      title: `Professional ${route.query.professionLabel || 'Creative'} Services`,
      invoiceNumber: `INV-${new Date().getTime().toString().slice(-4)}`,
      date: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      from: {
        name: '',
        address: '',
        email: '',
        phone: '',
        vatNumber: route.query.isVATRegistered === 'true' ? '' : undefined
      },
      client: {
        name: '',
        address: '',
        email: '',
        phone: ''
      },
      items: [
        {
          description: `${route.query.professionLabel || 'Professional'} Services`,
          quantity: 1,
          rate: Number(Number(route.query.rate || 3000).toFixed(2)),
          details: route.query.skills ? route.query.skills.split(',').map(skill => skill.trim()) : []
        }
      ],
      expenses: [],
      includeVAT: route.query.isVATRegistered === 'true',
      paymentInfo: [
        'Bank: Your Bank Name',
        'Account Number: Your Account Number',
        'Branch: Your Branch'
      ],
      pricingModel: 'fixed',
      hoursWorked: 0,
      wordCount: 0,
      reference: '',
      footer: '',
      notes: route.query.hasPortfolio === 'true' ? 'Portfolio and work samples available upon request.' : ''
    });

    const isDigitalProfession = computed(() => {
      return ['designer', 'writer'].includes(profession);
    });

    // Styling and customization
    const colorThemes = [
      { color: '#10B981', value: 'green' },
      { color: '#3B82F6', value: 'blue' },
      { color: '#8B5CF6', value: 'purple' },
      { color: '#EC4899', value: 'pink' },
      { color: '#F59E0B', value: 'yellow' }
    ];

    const selectedTheme = ref('green');
    const addLogo = ref(false);
    const logoUrl = ref('');
    const includeDigitalServiceTax = ref(['designer', 'writer'].includes(route.query.profession));

    const invoiceTemplates = [
      { 
        id: 1, 
        name: 'Classic', 
        description: 'A professional classic invoice layout',
        style: 'green',
        layout: 'standard'
      },
      { 
        id: 2, 
        name: 'Modern', 
        description: 'Clean minimal design with contemporary feel',
        style: 'blue',
        layout: 'compact'
      },
      { 
        id: 3, 
        name: 'Minimal', 
        description: 'Streamlined design with essential elements only',
        style: 'gray',
        layout: 'detailed'
      }
    ];

    const selectedTemplate = ref(1);

    // Navigation methods
    const setActiveSection = (sectionId) => {
      activeSection.value = sectionId;
    };

    const navigateToPrevious = () => {
      const currentIndex = formSections.findIndex(section => section.id === activeSection.value);
      if (currentIndex > 0) {
        setActiveSection(formSections[currentIndex - 1].id);
      }
    };

    const navigateToNext = () => {
      const currentIndex = formSections.findIndex(section => section.id === activeSection.value);
      if (currentIndex < formSections.length - 1) {
        setActiveSection(formSections[currentIndex + 1].id);
      }
    };

    // Navigation method for back button
    const goBack = () => {
      router.back();
    };

    // Action methods
    const saveDraft = () => {
      console.log('Saving draft...');
    };

    const downloadPDF = () => {
      console.log('Downloading PDF...');
    };

    const sendInvoice = () => {
      console.log('Sending invoice...');
    };

    const updateTemplateStyle = (style) => {
      // Update the selected theme to match the template style
      selectedTheme.value = style;
      
      // Find the template and update its style
      const templateIndex = invoiceTemplates.findIndex(t => t.id === selectedTemplate.value);
      if (templateIndex !== -1) {
        invoiceTemplates[templateIndex].style = style;
      }
      
      // Trigger a visual feedback on the preview
      highlightPreview();
    };

    const updateTemplateLayout = (layout) => {
      // Find the template and update its layout
      const templateIndex = invoiceTemplates.findIndex(t => t.id === selectedTemplate.value);
      if (templateIndex !== -1) {
        invoiceTemplates[templateIndex].layout = layout;
        
        // Update invoice properties based on layout
        if (layout === 'compact') {
          invoice.value = {
            ...invoice.value,
            compactLayout: true,
            detailedLayout: false
          };
        } else if (layout === 'detailed') {
          invoice.value = {
            ...invoice.value,
            compactLayout: false,
            detailedLayout: true
          };
        } else {
          invoice.value = {
            ...invoice.value,
            compactLayout: false,
            detailedLayout: false
          };
        }
      }
      
      // Trigger a visual feedback on the preview
      highlightPreview();
    };
    
    const highlightPreview = () => {
      // Add a short delay to let Vue update the DOM
      setTimeout(() => {
        const previewElement = document.querySelector('.preview-container');
        if (previewElement) {
          previewElement.classList.add('highlight-preview');
          setTimeout(() => {
            previewElement.classList.remove('highlight-preview');
          }, 1500);
        }
      }, 50);
    };

    return {
      invoice,
      profession,
      isDigitalProfession,
      colorThemes,
      selectedTheme,
      addLogo,
      logoUrl,
      includeDigitalServiceTax,
      invoiceTemplates,
      selectedTemplate,
      formSections,
      activeSection,
      currentStepIndex,
      titleCase, // Add the titleCase method to the returned object
      setActiveSection,
      navigateToPrevious,
      navigateToNext,
      saveDraft,
      downloadPDF,
      sendInvoice,
      goBack,
      updateTemplateStyle,
      updateTemplateLayout,
    };
  }
};
</script>

<style scoped>
.max-w-8xl {
  max-width: 88rem;
}

.gradient-heading {
  background: linear-gradient(to right, #10B981, #3B82F6);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.card-hover {
  transition: all 0.3s ease-in-out;
}

.card-hover:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Custom scrollbar styles for vertical scrolling */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f3f4f6;
  border-radius: 9999px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 9999px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

/* Custom scrollbar for horizontal scrolling */
.custom-scrollbar-horizontal::-webkit-scrollbar {
  height: 6px;
}

.custom-scrollbar-horizontal::-webkit-scrollbar-track {
  background: #f3f4f6;
  border-radius: 9999px;
}

.custom-scrollbar-horizontal::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 9999px;
}

.custom-scrollbar-horizontal::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

/* Highlight effect for preview */
.highlight-preview {
  animation: highlight-animation 1.5s ease-in-out;
}

@keyframes highlight-animation {
  0%, 100% {
    box-shadow: 0 0 0 rgba(0, 0, 0, 0);
  }
  50% {
    box-shadow: 0 0 20px rgba(16, 185, 129, 0.5);
  }
}
</style>