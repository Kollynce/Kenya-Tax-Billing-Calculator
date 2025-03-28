<template>
  <div class="bg-gradient-to-br from-purple-50 to-pink-100 rounded-xl border border-purple-100 hover:border-purple-200 transition-all duration-300">
    <button 
      @click="$emit('toggle-section', 'client')"
      class="w-full p-4 flex items-start space-x-3 text-left"
    >
      <div class="p-2 bg-white rounded-lg shadow-sm">
        <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
        </svg>
      </div>
      <div>
        <h3 class="font-medium text-gray-900">Client Details</h3>
        <p class="text-sm text-gray-600 mt-1">Add your client's information and contact details</p>
      </div>
    </button>
    <div v-show="isActive" class="p-4 pt-0">
      <div class="border-t border-purple-200 pt-4">
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Client Name</label>
            <input
              :value="invoice.client.name"
              @input="updateClientField('name', $event.target.value)"
              type="text"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Address</label>
            <textarea
              :value="invoice.client.address"
              @input="updateClientField('address', $event.target.value)"
              rows="2"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600"
            ></textarea>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Email</label>
              <input
                :value="invoice.client.email"
                @input="updateClientField('email', $event.target.value)"
                type="email"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Phone</label>
              <input
                :value="invoice.client.phone"
                @input="updateClientField('phone', $event.target.value)"
                type="tel"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600"
              />
            </div>
          </div>
        </div>

        <!-- Section navigation -->
        <div class="flex justify-between mt-6">
          <button @click="$emit('prev-section', 'business')" class="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200 flex items-center">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>
          <button @click="$emit('next-section', 'items')" class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 flex items-center">
            Next: Invoice Items
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
  name: 'ClientSection',
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
    updateClientField(field, value) {
      this.$emit('update:invoice', {
        ...this.invoice,
        client: {
          ...this.invoice.client,
          [field]: value
        }
      });
    }
  }
};
</script>