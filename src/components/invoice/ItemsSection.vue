<template>
  <div class="bg-gradient-to-br from-teal-50 to-cyan-100 rounded-xl border border-teal-100 hover:border-teal-200 transition-all duration-300">
    <button 
      @click="$emit('toggle-section', 'items')"
      class="w-full p-4 flex items-start space-x-3 text-left"
    >
      <div class="p-2 bg-white rounded-lg shadow-sm">
        <svg class="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
        </svg>
      </div>
      <div>
        <h3 class="font-medium text-gray-900">Invoice Items</h3>
        <p class="text-sm text-gray-600 mt-1">Add and manage your invoice line items</p>
      </div>
    </button>
    <div v-show="isActive" class="p-4 pt-0">
      <div class="border-t border-teal-200 pt-4">
        <div class="space-y-4">
          <div v-for="(item, index) in invoice.items" :key="index" class="p-4 bg-white/70 rounded-lg hover:bg-white/90 transition-all duration-200">
            <div class="grid grid-cols-12 gap-4">
              <div class="col-span-6">
                <label class="block text-sm font-medium text-gray-700">Description</label>
                <input
                  :value="item.description"
                  @input="updateItem(index, 'description', $event.target.value)"
                  type="text"
                  class="mt-1 block w-full rounded-md border-teal-200 bg-white/80 shadow-sm focus:border-teal-400 focus:ring-teal-400"
                />
              </div>
              <div class="col-span-2">
                <label class="block text-sm font-medium text-gray-700">Quantity</label>
                <input
                  :value="item.quantity"
                  @input="updateItem(index, 'quantity', Number($event.target.value))"
                  type="number"
                  min="1"
                  class="mt-1 block w-full rounded-md border-teal-200 bg-white/80 shadow-sm focus:border-teal-400 focus:ring-teal-400"
                />
              </div>
              <div class="col-span-3">
                <label class="block text-sm font-medium text-gray-700">Rate</label>
                <input
                  :value="item.rate"
                  @input="updateItem(index, 'rate', Number($event.target.value))"
                  type="number"
                  min="0"
                  class="mt-1 block w-full rounded-md border-teal-200 bg-white/80 shadow-sm focus:border-teal-400 focus:ring-teal-400"
                />
              </div>
              <div class="col-span-1 flex items-end justify-end">
                <button @click="removeItem(index)" class="text-red-600 hover:text-red-800 focus:outline-none">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <button
            @click="addItem"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 transition-all duration-200"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Add Item
          </button>
        </div>

        <!-- Section navigation -->
        <div class="flex justify-between mt-6">
          <button @click="$emit('prev-section', 'client')" class="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200 flex items-center">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>
          <button @click="$emit('next-section', 'additional')" class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 flex items-center">
            Next: Additional Info
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
  name: 'ItemsSection',
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
    updateItem(index, field, value) {
      const updatedItems = [...this.invoice.items];
      updatedItems[index] = {
        ...updatedItems[index],
        [field]: value
      };
      
      this.$emit('update:invoice', {
        ...this.invoice,
        items: updatedItems
      });
    },
    
    addItem() {
      const newItems = [...this.invoice.items, {
        description: '',
        quantity: 1,
        rate: 0,
        details: []
      }];
      
      this.$emit('update:invoice', {
        ...this.invoice,
        items: newItems
      });
    },
    
    removeItem(index) {
      const newItems = this.invoice.items.filter((_, i) => i !== index);
      this.$emit('update:invoice', {
        ...this.invoice,
        items: newItems
      });
    }
  }
};
</script>