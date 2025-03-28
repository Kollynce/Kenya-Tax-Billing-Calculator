<template>
  <div class="bg-gradient-to-br from-red-50 to-rose-100 rounded-xl border border-red-100 hover:border-red-200 transition-all duration-300">
    <button 
      @click="$emit('toggle-section', 'taxes')"
      class="w-full p-4 flex items-start space-x-3 text-left"
    >
      <div class="p-2 bg-white rounded-lg shadow-sm">
        <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z"/>
        </svg>
      </div>
      <div>
        <h3 class="font-medium text-gray-900">Tax Settings</h3>
        <p class="text-sm text-gray-600 mt-1">Configure VAT and other tax settings</p>
      </div>
    </button>
    <div v-show="isActive" class="p-4 pt-0">
      <div class="border-t border-red-200 pt-4">
        <div class="space-y-4">
          <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div class="flex items-center space-x-2">
              <input
                type="checkbox"
                id="includeVAT"
                :checked="invoice.includeVAT"
                @change="$emit('update:invoice', { ...invoice, includeVAT: $event.target.checked })"
                class="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
              />
              <label for="includeVAT" class="text-sm text-gray-700">Include VAT (16%)</label>
            </div>
            <span class="text-xs px-2 py-1 bg-indigo-100 text-indigo-600 font-medium rounded-full">Required if registered</span>
          </div>
          
          <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div class="flex items-center space-x-2">
              <input
                type="checkbox"
                id="includeDigitalServiceTax"
                :checked="includeDigitalServiceTax"
                class="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                @change="$emit('update:includeDigitalServiceTax', $event.target.checked)"
              />
              <label for="includeDigitalServiceTax" class="text-sm text-gray-700">Include Digital Service Tax (1.5%)</label>
            </div>
            <span class="text-xs px-2 py-1 bg-indigo-100 text-indigo-600 font-medium rounded-full">For digital services</span>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">VAT Number (if registered)</label>
            <input
              :value="invoice.from.vatNumber"
              @input="updateVatNumber($event.target.value)"
              type="text"
              placeholder="e.g., P051234567T"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring-indigo-600"
            />
          </div>
        </div>

        <!-- Section navigation -->
        <div class="flex justify-between mt-6">
          <button @click="$emit('prev-section', 'additional')" class="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200 flex items-center">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>
          <button @click="$emit('next-section', 'templates')" class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 flex items-center">
            Next: Templates
            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaxSection',
  props: {
    invoice: {
      type: Object,
      required: true
    },
    isActive: {
      type: Boolean,
      default: false
    },
    includeDigitalServiceTax: {
      type: Boolean,
      required: true
    }
  },
  emits: ['toggle-section', 'next-section', 'prev-section', 'update:includeDigitalServiceTax', 'update:invoice'],
  methods: {
    updateVatNumber(value) {
      this.$emit('update:invoice', {
        ...this.invoice,
        from: {
          ...this.invoice.from,
          vatNumber: value
        }
      });
    },
    updateVAT(value) {
      this.$emit('update:invoice', {
        ...this.invoice,
        includeVAT: value
      });
    },
    updateDigitalServiceTax(value) {
      this.$emit('update:include-digital-service-tax', value);
    }
  }
};
</script>