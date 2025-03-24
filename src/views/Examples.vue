<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-gray-900 mb-8 text-center">Feature Examples</h1>
    
    <TaxCalculatorExample />
    <BillingPlannerExample />
    
    <!-- Call to Action -->
    <div class="text-center">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">Ready to Create Your Own?</h2>
      <p class="text-gray-600 mb-6 max-w-3xl mx-auto">
        Start using the Kenya Tax Calculator and Billing Planner to streamline your freelance business operations.
        Generate professional invoices, create detailed proposals, and manage your tax obligations with ease.
      </p>
      <div class="space-x-4">
        <router-link
          to="/tax-calculator"
          class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          Try Tax Calculator
        </router-link>
        <router-link
          to="/billing-planner"
          class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
        >
          Start Billing Planner
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import TaxCalculatorExample from '../components/TaxCalculatorExample.vue';
import BillingPlannerExample from '../components/BillingPlannerExample.vue';

export default {
  name: 'ExamplesView',
  components: {
    TaxCalculatorExample,
    BillingPlannerExample
  }
};
</script>