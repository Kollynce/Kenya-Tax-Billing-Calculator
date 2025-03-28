<template>
  <div class="bg-gradient-to-br from-amber-50 to-yellow-100 rounded-xl border border-amber-100 hover:border-amber-200 transition-all duration-300">
    <button 
      @click="$emit('toggle-section', 'additional')"
      class="w-full p-4 flex items-start space-x-3 text-left"
    >
      <div class="p-2 bg-white rounded-lg shadow-sm">
        <svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      </div>
      <div>
        <h3 class="font-medium text-gray-900">Additional Information</h3>
        <p class="text-sm text-gray-600 mt-1">Add payment details and other information</p>
      </div>
    </button>
    <div v-show="isActive" class="p-4 pt-0">
      <div class="border-t border-amber-200 pt-4">
        <div class="space-y-4">
          <div v-for="(info, index) in invoice.paymentInfo" :key="index" class="flex items-center space-x-2">
            <input
              :value="info"
              @input="updatePaymentInfo(index, $event.target.value)"
              type="text"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600"
            />
            <button
              @click="removePaymentInfo(index)"
              class="text-red-600 hover:text-red-800"
            >
              <span class="sr-only">Remove payment info</span>
              ×
            </button>
          </div>
          <button
            @click="addPaymentInfo"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 transition-all duration-200"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Payment Info
          </button>
        </div>

        <!-- Section navigation -->
        <div class="flex justify-between mt-6">
          <button @click="$emit('prev-section', 'items')" class="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200 flex items-center">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>
          <button @click="$emit('next-section', 'taxes')" class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 flex items-center">
            Next: Tax Settings
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
  name: 'AdditionalSection',
  props: {
    invoice: {
      type: Object,
      required: true
    },
    isActive: {
      type: Boolean,
      default: false
    }
  },
  emits: ['toggle-section', 'next-section', 'prev-section', 'update:invoice'],
  methods: {
    addPaymentInfo() {
      const newPaymentInfo = [...this.invoice.paymentInfo, ''];
      this.$emit('update:invoice', { ...this.invoice, paymentInfo: newPaymentInfo });
    },
    removePaymentInfo(index) {
      const newPaymentInfo = [...this.invoice.paymentInfo];
      newPaymentInfo.splice(index, 1);
      this.$emit('update:invoice', { ...this.invoice, paymentInfo: newPaymentInfo });
    },
    updatePaymentInfo(index, value) {
      const newPaymentInfo = [...this.invoice.paymentInfo];
      newPaymentInfo[index] = value;
      this.$emit('update:invoice', { ...this.invoice, paymentInfo: newPaymentInfo });
    }
  }
};
</script>