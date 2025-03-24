<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <div class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg shadow-lg p-6">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Examples & Tutorials</h1>
        <p class="mt-2 text-gray-600">Learn how to use our tools with these practical examples</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Tax Calculator Example -->
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-4">Tax Calculator</h2>
          <TaxCalculatorExample />
          <div class="mt-6">
            <router-link 
              to="/tax-calculator"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-500"
            >
              Try Tax Calculator
              <svg class="ml-2 -mr-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </router-link>
          </div>
        </div>

        <!-- Billing Planner Example -->
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-4">Billing Planner</h2>
          <BillingPlannerExample />
          <div class="mt-6">
            <router-link 
              to="/billing-planner"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-500"
            >
              Try Billing Planner
              <svg class="ml-2 -mr-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </router-link>
          </div>
        </div>

        <!-- Quick Tips -->
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-4">Quick Tips</h2>
          <div class="space-y-4">
            <div>
              <h3 class="font-medium text-gray-900">Tax Deductions</h3>
              <p class="mt-1 text-sm text-gray-600">Keep track of business expenses like software subscriptions, equipment, and home office costs - they're tax-deductible!</p>
            </div>
            <div>
              <h3 class="font-medium text-gray-900">Invoice Best Practices</h3>
              <p class="mt-1 text-sm text-gray-600">Always include clear payment terms, itemized services, and your tax registration details if applicable.</p>
            </div>
            <div>
              <h3 class="font-medium text-gray-900">Filing Returns</h3>
              <p class="mt-1 text-sm text-gray-600">File your iTax returns by June 30th each year to avoid penalties. Keep your records organized throughout the year.</p>
            </div>
          </div>
        </div>

        <!-- Resources -->
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-4">Helpful Resources</h2>
          <div class="space-y-4">
            <a 
              href="https://itax.kra.go.ke/" 
              target="_blank"
              rel="noopener noreferrer"
              class="block p-4 border border-gray-200 rounded-lg hover:border-green-500 transition-colors"
            >
              <h3 class="font-medium text-gray-900">KRA iTax Portal</h3>
              <p class="mt-1 text-sm text-gray-600">Official portal for filing returns and managing your tax obligations</p>
            </a>
            
            <a 
              href="https://nssf.or.ke/" 
              target="_blank"
              rel="noopener noreferrer"
              class="block p-4 border border-gray-200 rounded-lg hover:border-green-500 transition-colors"
            >
              <h3 class="font-medium text-gray-900">NSSF Portal</h3>
              <p class="mt-1 text-sm text-gray-600">Manage your NSSF contributions and benefits</p>
            </a>
            
            <a 
              href="https://www.nhif.or.ke/" 
              target="_blank"
              rel="noopener noreferrer"
              class="block p-4 border border-gray-200 rounded-lg hover:border-green-500 transition-colors"
            >
              <h3 class="font-medium text-gray-900">SHIF/NHIF Portal</h3>
              <p class="mt-1 text-sm text-gray-600">Information about health insurance contributions and coverage</p>
            </a>
          </div>
        </div>
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

<style scoped>
.text-primary {
  color: #16A34A;  /* text-green-600 equivalent */
}

.bg-primary {
  background-color: #16A34A;  /* bg-green-600 equivalent */
}

.bg-primary-dark {
  background-color: #15803D;  /* bg-green-700 equivalent */
}
</style>