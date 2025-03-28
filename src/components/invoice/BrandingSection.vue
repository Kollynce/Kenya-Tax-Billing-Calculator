<template>
  <div class="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl border border-green-100 hover:border-green-200 transition-all duration-300">
    <button 
      @click="$emit('toggle-section', 'branding')"
      class="w-full p-4 flex items-start space-x-3 text-left"
    >
      <div class="p-2 bg-white rounded-lg shadow-sm">
        <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
        </svg>
      </div>
      <div>
        <h3 class="font-medium text-gray-900">Invoice Branding</h3>
        <p class="text-sm text-gray-600 mt-1">Customize your invoice appearance and branding</p>
      </div>
    </button>
    <div v-show="isActive" class="p-4 pt-0">
      <div class="border-t border-green-200 pt-4">
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Invoice Title</label>
            <input :value="invoice.title" @input="$emit('update:invoice', { ...invoice, title: $event.target.value })" 
                   type="text" placeholder="Professional Invoice / Service Invoice" 
                   class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600 transition-all duration-200"/>
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Invoice Number</label>
              <input :value="invoice.invoiceNumber" 
                     @input="$emit('update:invoice', { ...invoice, invoiceNumber: $event.target.value })"
                     type="text" 
                     class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600 transition-all duration-200"/>
              <p class="mt-1 text-xs text-gray-500">Automatically generated</p>
            </div>
            <!-- Color Theme removed since it's now in the Templates section -->
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Issue Date</label>
              <input :value="invoice.date" 
                     @input="$emit('update:invoice', { ...invoice, date: $event.target.value })"
                     type="date" 
                     class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600 transition-all duration-200"/>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Due Date</label>
              <input :value="invoice.dueDate" 
                     @input="$emit('update:invoice', { ...invoice, dueDate: $event.target.value })"
                     type="date" 
                     class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600 transition-all duration-200"/>
            </div>
          </div>
          
          <div class="flex items-center space-x-2">
            <input
              type="checkbox"
              id="addLogo"
              :checked="addLogo"
              class="w-4 h-4 text-green-600 rounded focus:ring-green-500"
              @change="$emit('update:addLogo', $event.target.checked)"
            />
            <label for="addLogo" class="text-sm text-gray-700">Include Logo</label>
            <input
              v-if="addLogo"
              ref="logoUpload"
              type="file"
              accept="image/*"
              class="hidden"
              @change="onLogoUpload"
            />
            <button 
              v-if="addLogo"
              @click="$refs.logoUpload.click()"
              type="button"
              class="ml-2 inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200"
            >
              {{ logoUrl ? 'Change Logo' : 'Upload Logo' }}
            </button>
          </div>
          <div v-if="addLogo && logoUrl" class="mt-2">
            <img :src="logoUrl" alt="Logo Preview" class="h-16 object-contain" />
          </div>
        </div>

        <!-- Section navigation -->
        <div class="flex justify-end mt-6">
          <button @click="$emit('next-section', 'business')" class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 flex items-center">
            Next: Your Details
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
  name: 'BrandingSection',
  props: {
    invoice: {
      type: Object,
      required: true
    },
    isActive: {
      type: Boolean,
      default: false
    },
    selectedTheme: {
      type: String,
      required: true
    },
    addLogo: {
      type: Boolean,
      required: true
    },
    logoUrl: {
      type: String,
      default: ''
    },
    colorThemes: {
      type: Array,
      required: true
    }
  },
  emits: [
    'toggle-section', 
    'next-section', 
    'update:selectedTheme', 
    'update:addLogo', 
    'logo-uploaded',
    'update:invoice'
  ],
  methods: {
    onLogoUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.$emit('logo-uploaded', e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  }
};
</script>