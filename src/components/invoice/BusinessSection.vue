<template>
  <div class="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl border border-blue-100 hover:border-blue-200 transition-all duration-300">
    <button 
      @click="$emit('toggle-section', 'business')"
      class="w-full p-4 flex items-start space-x-3 text-left"
    >
      <div class="p-2 bg-white rounded-lg shadow-sm">
        <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z"/>
        </svg>
      </div>
      <div>
        <h3 class="font-medium text-gray-900">Business Details</h3>
        <p class="text-sm text-gray-600 mt-1">Add your business information and contact details</p>
      </div>
    </button>
    <div v-show="isActive" class="p-4 pt-0">
      <div class="border-t border-blue-200 pt-4">
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Business Name</label>
            <input :value="invoice.from.name"
                   @input="updateFromField('name', $event.target.value)"
                   type="text" 
                   class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600 transition-all duration-200"/>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Address</label>
            <textarea
              :value="invoice.from.address"
              @input="updateFromField('address', $event.target.value)"
              rows="2"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600 transition-all duration-200"
            ></textarea>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Email</label>
              <input
                :value="invoice.from.email"
                @input="updateFromField('email', $event.target.value)"
                type="email"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600 transition-all duration-200"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Phone</label>
              <input
                :value="invoice.from.phone"
                @input="updateFromField('phone', $event.target.value)"
                type="tel"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600 transition-all duration-200"
              />
            </div>
          </div>
        </div>

        <!-- Section navigation -->
        <div class="flex justify-between mt-6">
          <button @click="$emit('prev-section', 'branding')" class="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200 flex items-center">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>
          <button @click="$emit('next-section', 'client')" class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 flex items-center">
            Next: Client Details
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
  name: 'BusinessSection',
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
    updateFromField(field, value) {
      this.$emit('update:invoice', {
        ...this.invoice,
        from: {
          ...this.invoice.from,
          [field]: value
        }
      });
    }
  }
};
</script>