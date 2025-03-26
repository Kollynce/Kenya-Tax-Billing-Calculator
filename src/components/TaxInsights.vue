<template>
  <div class="bg-white rounded-lg shadow p-6 mb-6">
    <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
      <svg class="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      Tax Insights for {{ formatProfessionName(profession) }}s
    </h3>

    <div class="space-y-6">
      <!-- Tax Deductibles -->
      <div>
        <h4 class="text-md font-medium text-gray-800 mb-3">Tax-Deductible Expenses</h4>
        <ul class="space-y-2">
          <li v-for="(item, index) in taxTips.deductibles" :key="index" class="flex items-start">
            <svg class="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span class="text-gray-600">{{ item }}</span>
          </li>
        </ul>
      </div>

      <!-- Recommendations -->
      <div>
        <h4 class="text-md font-medium text-gray-800 mb-3">Professional Recommendations</h4>
        <ul class="space-y-2">
          <li v-for="(item, index) in taxTips.recommendations" :key="index" class="flex items-start">
            <svg class="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span class="text-gray-600">{{ item }}</span>
          </li>
        </ul>
      </div>

      <!-- VAT Registration Notice -->
      <div v-if="showVatAdvice" class="bg-blue-50 p-4 rounded-lg">
        <p class="text-blue-800 font-medium">VAT Registration Reminder</p>
        <p class="text-sm text-blue-600 mt-1">
          If your annual income exceeds KES {{ formatCurrency(vatThreshold) }}, you should register for VAT.
          This will allow you to claim VAT on your business expenses.
        </p>
      </div>

      <!-- Record Keeping Tips -->
      <div class="bg-amber-50 p-4 rounded-lg">
        <p class="text-amber-800 font-medium">Record Keeping Tips</p>
        <ul class="mt-2 space-y-1 text-sm text-amber-700">
          <li>• Keep all receipts and invoices for 5 years</li>
          <li>• File monthly PAYE returns by 9th of following month</li>
          <li>• Submit VAT returns by 20th of following month (if registered)</li>
          <li>• Annual tax returns due by June 30th</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { PROFESSION_TAX_TIPS } from '../services/billingService';
import { TAX_CONSTANTS } from '../utils/taxUtils';
import { formatCurrency } from '../utils/taxUtils';

export default {
  name: 'TaxInsights',
  props: {
    profession: {
      type: String,
      required: true
    },
    annualIncome: {
      type: Number,
      default: 0
    }
  },
  computed: {
    taxTips() {
      return PROFESSION_TAX_TIPS[this.profession] || PROFESSION_TAX_TIPS.general;
    },
    showVatAdvice() {
      return this.annualIncome > TAX_CONSTANTS.VAT_REGISTRATION_THRESHOLD * 0.8;
    },
    vatThreshold() {
      return TAX_CONSTANTS.VAT_REGISTRATION_THRESHOLD;
    }
  },
  methods: {
    formatProfessionName(profession) {
      return profession.charAt(0).toUpperCase() + profession.slice(1);
    },
    formatCurrency
  }
};
</script>