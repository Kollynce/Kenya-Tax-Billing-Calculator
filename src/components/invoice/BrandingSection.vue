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
                   type="text" placeholder="Invoice" 
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
          
          <div class="space-y-3">
            <label class="block text-sm font-medium text-gray-700">Company Logo</label>
            <div class="flex items-center space-x-2 mb-2">
              <input
                type="checkbox"
                id="addLogo"
                :checked="addLogo"
                class="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                @change="$emit('update:addLogo', $event.target.checked)"
              />
              <label for="addLogo" class="text-sm text-gray-700">Include Logo on Invoice</label>
            </div>
            
            <div v-if="addLogo" 
                 class="relative border-2 border-dashed border-gray-300 rounded-lg p-6 transition-all duration-200"
                 :class="{'border-green-300 bg-green-50': isDragging}"
                 @dragenter.prevent="isDragging = true"
                 @dragleave.prevent="isDragging = false"
                 @dragover.prevent
                 @drop.prevent="onDrop">
              
              <div v-if="!logoUrl" class="text-center">
                <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4-4m4-12h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <div class="mt-4 flex text-sm text-gray-600">
                  <label for="file-upload" class="relative cursor-pointer rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none">
                    <span>Upload a file</span>
                    <input id="file-upload" ref="logoUpload" type="file" class="sr-only" accept="image/*" @change="onLogoUpload"/>
                  </label>
                  <p class="pl-1">or drag and drop</p>
                </div>
                <p class="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
              </div>
              
              <div v-else class="space-y-3">
                <div class="relative w-full h-32 bg-white rounded-lg overflow-hidden">
                  <img :src="logoUrl" alt="Logo Preview" class="w-full h-full object-contain"/>
                  <button @click="removeLogo" 
                          class="absolute top-2 right-2 p-1 bg-red-100 rounded-full text-red-600 hover:bg-red-200">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  </button>
                </div>
                <div class="flex justify-end">
                  <button @click="$refs.logoUpload.click()" 
                          class="text-sm text-green-600 hover:text-green-700">
                    Change Logo
                  </button>
                </div>
              </div>
            </div>
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
  data() {
    return {
      isDragging: false
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
      this.handleFile(file);
    },
    onDrop(event) {
      this.isDragging = false;
      const file = event.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) {
        this.handleFile(file);
      }
    },
    handleFile(file) {
      if (file && file.size <= 5 * 1024 * 1024) { // 5MB limit
        const reader = new FileReader();
        reader.onload = (e) => {
          this.$emit('logo-uploaded', e.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        alert('Please upload an image file under 5MB');
      }
    },
    removeLogo() {
      this.$emit('logo-uploaded', '');
      if (this.$refs.logoUpload) {
        this.$refs.logoUpload.value = '';
      }
    }
  }
};
</script>