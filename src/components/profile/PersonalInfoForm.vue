<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl font-bold text-gray-900 flex items-center">
        <svg class="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        Personal Information
      </h2>
    </div>

    <form @submit.prevent="$emit('submit')" class="space-y-6">
      <div class="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label for="firstName" class="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <input
              id="firstName"
              :value="modelValue.firstName"
              @input="$emit('update:modelValue', { ...modelValue, firstName: $event.target.value })"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div>
            <label for="lastName" class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
            <input
              id="lastName"
              :value="modelValue.lastName"
              @input="$emit('update:modelValue', { ...modelValue, lastName: $event.target.value })"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div>
            <label for="displayName" class="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
            <input
              id="displayName"
              :value="modelValue.displayName"
              @input="$emit('update:modelValue', { ...modelValue, displayName: $event.target.value })"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            />
            <p class="mt-1 text-xs text-gray-500">This is how your name will appear on invoices and proposals</p>
          </div>
          <div>
            <label for="emailAddress" class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              id="emailAddress"
              :value="modelValue.email"
              type="email"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 bg-gray-50"
              disabled
            />
            <p class="mt-1 text-xs text-gray-500">Your email address cannot be changed</p>
          </div>
        </div>
      </div>

      <div class="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              id="phone"
              :value="modelValue.phone"
              @input="$emit('update:modelValue', { ...modelValue, phone: $event.target.value })"
              type="tel"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div>
            <label for="address" class="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input
              id="address"
              :value="modelValue.address"
              @input="$emit('update:modelValue', { ...modelValue, address: $event.target.value })"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div>
            <label for="city" class="block text-sm font-medium text-gray-700 mb-1">City</label>
            <input
              id="city"
              :value="modelValue.city"
              @input="$emit('update:modelValue', { ...modelValue, city: $event.target.value })"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div>
            <label for="postalCode" class="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
            <input
              id="postalCode"
              :value="modelValue.postalCode"
              @input="$emit('update:modelValue', { ...modelValue, postalCode: $event.target.value })"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div class="md:col-span-2">
            <label for="country" class="block text-sm font-medium text-gray-700 mb-1">Country</label>
            <select
              id="country"
              :value="modelValue.country"
              @change="$emit('update:modelValue', { ...modelValue, country: $event.target.value })"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            >
              <option value="Kenya">Kenya</option>
              <option value="Uganda">Uganda</option>
              <option value="Tanzania">Tanzania</option>
              <option value="Rwanda">Rwanda</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
      </div>
      
      <div class="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Tax Information</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label for="taxId" class="block text-sm font-medium text-gray-700 mb-1">Tax ID / PIN</label>
            <input
              id="taxId"
              :value="modelValue.taxId"
              @input="$emit('update:modelValue', { ...modelValue, taxId: $event.target.value })"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div>
            <label for="vatNumber" class="block text-sm font-medium text-gray-700 mb-1">VAT Number (if applicable)</label>
            <input
              id="vatNumber"
              :value="modelValue.vatNumber"
              @input="$emit('update:modelValue', { ...modelValue, vatNumber: $event.target.value })"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            />
          </div>
        </div>
      </div>

      <div class="flex justify-end">
        <button
          type="submit"
          class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          :disabled="loading"
        >
          <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Save Changes
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'PersonalInfoForm',
  props: {
    modelValue: {
      type: Object,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  emits: ['submit', 'update:modelValue']
};
</script>