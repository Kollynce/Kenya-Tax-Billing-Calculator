<template>
  <div class="space-y-6">
    <form @submit.prevent="$emit('submit')" class="space-y-6">
      <!-- Company Information -->
      <div class="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Company Information</h3>
        <div class="grid grid-cols-1 gap-6">
          <div>
            <label for="companyName" class="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
            <input
              id="companyName"
              :value="modelValue.name"
              @input="$emit('update:modelValue', { ...modelValue, name: $event.target.value })"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div>
            <label for="companyEmail" class="block text-sm font-medium text-gray-700 mb-1">Company Email</label>
            <input
              id="companyEmail"
              :value="modelValue.email"
              @input="$emit('update:modelValue', { ...modelValue, email: $event.target.value })"
              type="email"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div>
            <label for="companyPhone" class="block text-sm font-medium text-gray-700 mb-1">Company Phone</label>
            <input
              id="companyPhone"
              :value="modelValue.phone"
              @input="$emit('update:modelValue', { ...modelValue, phone: $event.target.value })"
              type="tel"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div>
            <label for="website" class="block text-sm font-medium text-gray-700 mb-1">Website</label>
            <input
              id="website"
              :value="modelValue.website"
              @input="$emit('update:modelValue', { ...modelValue, website: $event.target.value })"
              type="url"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            />
          </div>
        </div>
      </div>

      <!-- Company Address -->
      <div class="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Company Address</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="md:col-span-2">
            <label for="companyAddress" class="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input
              id="companyAddress"
              :value="modelValue.address"
              @input="$emit('update:modelValue', { ...modelValue, address: $event.target.value })"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div>
            <label for="companyCity" class="block text-sm font-medium text-gray-700 mb-1">City</label>
            <input
              id="companyCity"
              :value="modelValue.city"
              @input="$emit('update:modelValue', { ...modelValue, city: $event.target.value })"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div>
            <label for="companyPostalCode" class="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
            <input
              id="companyPostalCode"
              :value="modelValue.postalCode"
              @input="$emit('update:modelValue', { ...modelValue, postalCode: $event.target.value })"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div class="md:col-span-2">
            <label for="companyCountry" class="block text-sm font-medium text-gray-700 mb-1">Country</label>
            <select
              id="companyCountry"
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

      <!-- Business Registration & Tax -->
      <div class="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Business Registration & Tax</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label for="businessRegNumber" class="block text-sm font-medium text-gray-700 mb-1">Business Registration Number</label>
            <input
              id="businessRegNumber"
              :value="modelValue.regNumber"
              @input="$emit('update:modelValue', { ...modelValue, regNumber: $event.target.value })"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div>
            <label for="companyTaxId" class="block text-sm font-medium text-gray-700 mb-1">Tax ID / PIN</label>
            <input
              id="companyTaxId"
              :value="modelValue.taxId"
              @input="$emit('update:modelValue', { ...modelValue, taxId: $event.target.value })"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div>
            <label for="companyVatNumber" class="block text-sm font-medium text-gray-700 mb-1">VAT Number (if applicable)</label>
            <input
              id="companyVatNumber"
              :value="modelValue.vatNumber"
              @input="$emit('update:modelValue', { ...modelValue, vatNumber: $event.target.value })"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div>
            <label for="vatRate" class="block text-sm font-medium text-gray-700 mb-1">Default VAT Rate (%)</label>
            <input
              id="vatRate"
              :value="modelValue.vatRate"
              @input="$emit('update:modelValue', { ...modelValue, vatRate: parseFloat($event.target.value) || 0 })"
              type="number"
              min="0"
              max="100"
              step="0.01"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            />
          </div>
        </div>
      </div>

      <!-- Payment Information -->
      <div class="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Payment Information</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="md:col-span-2">
            <label for="bankName" class="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
            <input
              id="bankName"
              :value="modelValue.bankName"
              @input="$emit('update:modelValue', { ...modelValue, bankName: $event.target.value })"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div>
            <label for="accountName" class="block text-sm font-medium text-gray-700 mb-1">Account Name</label>
            <input
              id="accountName"
              :value="modelValue.accountName"
              @input="$emit('update:modelValue', { ...modelValue, accountName: $event.target.value })"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div>
            <label for="accountNumber" class="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
            <input
              id="accountNumber"
              :value="modelValue.accountNumber"
              @input="$emit('update:modelValue', { ...modelValue, accountNumber: $event.target.value })"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div>
            <label for="branchCode" class="block text-sm font-medium text-gray-700 mb-1">Branch / Sort Code</label>
            <input
              id="branchCode"
              :value="modelValue.branchCode"
              @input="$emit('update:modelValue', { ...modelValue, branchCode: $event.target.value })"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div>
            <label for="swiftCode" class="block text-sm font-medium text-gray-700 mb-1">SWIFT Code</label>
            <input
              id="swiftCode"
              :value="modelValue.swiftCode"
              @input="$emit('update:modelValue', { ...modelValue, swiftCode: $event.target.value })"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            />
          </div>
        </div>
      </div>

      <!-- Submit Button -->
      <div class="flex justify-end">
        <button
          type="submit"
          class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          :disabled="loading"
        >
          <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Save Changes
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'CompanyDetailsForm',
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
  emits: ['submit', 'update:modelValue'],
  setup() {
    return {};
  }
};
</script>