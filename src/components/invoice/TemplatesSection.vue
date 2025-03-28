<template>
  <div class="bg-gradient-to-br from-gray-50 to-slate-100 rounded-xl border border-gray-100 hover:border-gray-200 transition-all duration-300">
    <button 
      @click="$emit('toggle-section', 'templates')"
      class="w-full p-4 flex items-start space-x-3 text-left"
    >
      <div class="p-2 bg-white rounded-lg shadow-sm">
        <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"/>
        </svg>
      </div>
      <div>
        <h3 class="font-medium text-gray-900">Templates</h3>
        <p class="text-sm text-gray-600 mt-1">Choose and customize invoice templates</p>
      </div>
    </button>
    <div v-show="isActive" class="p-4 pt-0">
      <div class="border-t border-gray-200 pt-4">
        <div class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Choose Template</label>
            <div class="grid grid-cols-2 gap-4">
              <div 
                v-for="template in templates" 
                :key="template.id"
                @click="selectTemplate(template.id)"
                class="border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md overflow-hidden"
                :class="selectedTemplate === template.id ? 'border-amber-400 ring-2 ring-amber-200' : 'border-gray-200'"
              >
                <div class="h-36 bg-white border-b border-gray-100 p-2">
                  <!-- Template thumbnail preview with distinct styles -->
                  <div class="w-full h-full flex items-center justify-center"
                      :class="{
                        'bg-green-50': template.id === 1, 
                        'bg-blue-50': template.id === 2,
                        'bg-gray-50': template.id === 3
                      }">
                    <!-- Classic Template (ID: 1) -->
                    <div class="w-full p-2" v-if="template.id === 1">
                      <div class="flex justify-between text-xs border-b border-green-200 pb-1 mb-1">
                        <div class="font-medium">INVOICE</div>
                        <div>#12345</div>
                      </div>
                      <div class="h-2 bg-green-200 rounded w-3/4 mb-1"></div>
                      <div class="h-2 bg-gray-200 rounded w-1/2 mb-2"></div>
                      <div class="flex justify-between mb-1">
                        <div class="h-1 bg-gray-200 rounded w-1/4"></div>
                        <div class="h-1 bg-gray-200 rounded w-1/4"></div>
                      </div>
                      <div class="h-1 bg-gray-200 rounded w-full mb-1"></div>
                      <div class="h-1 bg-gray-200 rounded w-full mb-1"></div>
                      <div class="h-4 bg-green-100 rounded-full w-1/3 mt-2 mx-auto"></div>
                    </div>
                    
                    <!-- Modern Template (ID: 2) -->
                    <div class="w-full p-2" v-if="template.id === 2">
                      <!-- Modern has a horizontal layout with logos on the side -->
                      <div class="flex mb-1">
                        <div class="w-1/4">
                          <div class="h-5 w-5 mx-auto rounded-full bg-blue-300"></div>
                        </div>
                        <div class="w-3/4 pl-1">
                          <div class="h-2 bg-blue-200 rounded w-3/4 mb-1"></div>
                          <div class="h-2 bg-gray-200 rounded w-1/2 mb-1"></div>
                          <div class="h-1 bg-gray-100 rounded w-full mb-2"></div>
                        </div>
                      </div>
                      <div class="h-px bg-blue-200 w-full mb-1"></div>
                      <div class="flex justify-between items-center mb-1">
                        <div class="h-2 bg-gray-200 rounded w-1/2"></div>
                        <div class="h-2 bg-blue-200 rounded w-1/4"></div>
                      </div>
                      <div class="flex justify-between items-center mb-1">
                        <div class="h-2 bg-gray-200 rounded w-1/3"></div>
                        <div class="h-2 bg-blue-200 rounded w-1/4"></div>
                      </div>
                      <div class="h-3 bg-blue-200 rounded-sm w-1/2 mt-2 ml-auto"></div>
                    </div>
                    
                    <!-- Minimal Template (ID: 3) -->
                    <div class="w-full p-2" v-if="template.id === 3">
                      <!-- Minimal has a centered design with lots of white space -->
                      <div class="text-center mb-2">
                        <div class="h-3 bg-gray-300 rounded w-1/3 mx-auto mb-1"></div>
                      </div>
                      <div class="w-full flex justify-center mb-2">
                        <div class="h-px bg-gray-300 w-1/4"></div>
                      </div>
                      <div class="flex flex-col items-center">
                        <div class="h-1 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div class="h-1 bg-gray-200 rounded w-2/3 mb-2"></div>
                        <div class="h-1 bg-gray-200 rounded w-1/2 mb-2"></div>
                      </div>
                      <div class="mt-2 flex justify-between px-2">
                        <div class="h-2 bg-gray-300 rounded w-1/5"></div>
                        <div class="h-2 bg-gray-300 rounded w-1/5"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="p-3">
                  <p class="font-medium" :class="selectedTemplate === template.id ? 'text-amber-700' : 'text-gray-700'">{{ template.name }}</p>
                  <p class="text-xs text-gray-500 mt-1">{{ template.description }}</p>
                </div>
              </div>
            </div>
          </div>

          <div v-if="selectedTemplateObj" class="bg-white p-3 rounded-lg border border-gray-100">
            <h4 class="font-medium text-gray-800 mb-2">Template Options</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Color Scheme</label>
                <div class="flex space-x-2">
                  <div 
                    v-for="color in templateColors" 
                    :key="color.name"
                    @click="updateTemplateStyle(color.value)"
                    class="w-6 h-6 rounded-full cursor-pointer border template-style-indicator"
                    :class="[selectedTemplateObj.style === color.value ? 'ring-2 ring-offset-2 ring-gray-400' : '', 
                            `bg-${color.value}-500 border-${color.value}-600`]"
                  ></div>
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Layout Style</label>
                <select
                  v-model="selectedTemplateObj.layout"
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-amber-600 focus:ring-amber-600"
                  @change="updateTemplateLayout(selectedTemplateObj.layout)"
                >
                  <option value="standard">Standard</option>
                  <option value="compact">Compact</option>
                  <option value="detailed">Detailed</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Custom Footer Text</label>
            <input
              :value="invoice.footer"
              @input="updateFooter($event.target.value)"
              type="text"
              placeholder="Thank you for your business"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-600 focus:ring-amber-600"
            />
            <p class="text-xs text-gray-500 mt-1">This text will appear at the bottom of your invoice</p>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Reference Number (Optional)</label>
            <input
              :value="invoice.reference"
              @input="updateReference($event.target.value)"
              type="text"
              placeholder="e.g., Project ID or PO number"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-600 focus:ring-amber-600"
            />
            <p class="text-xs text-gray-500 mt-1">Add an optional reference for your records</p>
          </div>

          <div class="flex justify-center">
            <button
              @click="scrollToPreview"
              class="inline-flex items-center px-4 py-2 bg-amber-500 border border-amber-600 rounded-md font-semibold text-white shadow-sm hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-colors duration-200"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Preview Invoice
            </button>
          </div>
        </div>

        <!-- Section navigation -->
        <div class="flex justify-between mt-6">
          <button @click="$emit('prev-section', 'taxes')" class="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200 flex items-center">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TemplatesSection',
  props: {
    invoice: {
      type: Object,
      required: true
    },
    isActive: {
      type: Boolean,
      default: false
    },
    selectedTemplate: {
      type: Number,
      required: true
    },
    templates: {
      type: Array,
      required: true
    }
  },
  emits: [
    'toggle-section', 
    'prev-section', 
    'update:selectedTemplate', 
    'update:invoice',
    'update:templateStyle',
    'update:templateLayout'
  ],
  data() {
    return {
      templateColors: [
        { name: 'Green', value: 'green' },
        { name: 'Blue', value: 'blue' },
        { name: 'Purple', value: 'purple' },
        { name: 'Amber', value: 'amber' },
        { name: 'Classic', value: 'gray' }
      ],
      previewAnimationInProgress: false
    }
  },
  computed: {
    selectedTemplateObj() {
      return this.templates.find(t => t.id === this.selectedTemplate);
    }
  },
  methods: {
    updateFooter(value) {
      this.$emit('update:invoice', { ...this.invoice, footer: value });
      this.animatePreviewUpdate();
    },
    updateReference(value) {
      this.$emit('update:invoice', { ...this.invoice, reference: value });
      this.animatePreviewUpdate();
    },
    selectTemplate(id) {
      // Get the selected template
      const template = this.templates.find(t => t.id === id);
      
      if (template) {
        this.$emit('update:selectedTemplate', id);
        
        // If the template has a specific style, apply it
        if (template.style) {
          this.updateTemplateStyle(template.style);
        }
        
        // If the template has a specific layout, apply it
        if (template.layout) {
          this.updateTemplateLayout(template.layout);
        }
        
        // Visual feedback
        this.animatePreviewUpdate();
      }
    },
    updateTemplateStyle(style) {
      this.$emit('update:templateStyle', style);
      
      // Update all color-based UI elements
      document.querySelectorAll('.template-style-indicator').forEach(el => {
        el.classList.remove('pulse-animation');
      });
      
      setTimeout(() => {
        document.querySelectorAll('.template-style-indicator').forEach(el => {
          el.classList.add('pulse-animation');
        });
      }, 50);
      
      this.animatePreviewUpdate();
    },
    updateTemplateLayout(layout) {
      this.$emit('update:templateLayout', layout);
      this.animatePreviewUpdate();
    },
    animatePreviewUpdate() {
      // Visual feedback that changes are being applied
      this.previewAnimationInProgress = true;
      
      // Show a small toast notification
      this.showUpdateToast();
      
      setTimeout(() => {
        this.previewAnimationInProgress = false;
      }, 600);
    },
    scrollToPreview() {
      // Scroll to the invoice preview section
      const previewElement = document.querySelector('.invoice-preview') || 
                            document.querySelector('.lg\\:sticky');
      
      if (previewElement) {
        previewElement.scrollIntoView({ behavior: 'smooth' });
        // Add a highlight effect
        previewElement.classList.add('highlight-preview');
        setTimeout(() => {
          previewElement.classList.remove('highlight-preview');
        }, 1500);
      }
    },
    showUpdateToast() {
      // Create a toast notification element
      const toast = document.createElement('div');
      toast.className = 'fixed bottom-4 right-4 bg-green-100 border border-green-200 text-green-800 px-4 py-2 rounded-lg shadow-lg transform transition-all duration-300 z-50 toast-notification';
      toast.innerText = 'Updating preview...';
      
      // Add it to the DOM
      document.body.appendChild(toast);
      
      // Animate it
      setTimeout(() => {
        toast.classList.add('show');
      }, 10);
      
      // Remove it after a delay
      setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
          document.body.removeChild(toast);
        }, 300);
      }, 2000);
    }
  }
};
</script>

<style scoped>
:deep(.highlight-preview) {
  animation: flash-preview 1.5s;
}

@keyframes flash-preview {
  0%, 100% {
    box-shadow: 0 0 0 2px rgba(251, 191, 36, 0);
  }
  25% {
    box-shadow: 0 0 0 10px rgba(251, 191, 36, 0.3);
  }
  50% {
    box-shadow: 0 0 0 10px rgba(251, 191, 36, 0.3);
  }
}

.pulse-animation {
  animation: pulse 0.6s ease-in-out;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
}

.toast-notification.show {
  opacity: 1;
  transform: translateY(0);
}

.toast-notification {
  opacity: 0;
  transform: translateY(20px);
}
</style>