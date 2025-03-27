<template>
  <div class="space-y-8">
    <!-- Example Header -->
    <div class="flex items-center justify-between">
      <div>
        <h3 class="text-2xl font-bold text-gray-900 gradient-heading">Creative Tax Example</h3>
        <p class="text-gray-600 mt-1">See how your taxes are calculated using 2025 rates</p>
      </div>
      <span class="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium">
        <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Interactive Example
      </span>
    </div>

    <!-- Quick Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div class="bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:border-green-200 transition-all duration-200">
        <div class="text-sm text-gray-500 mb-1">Monthly Gross</div>
        <div class="text-2xl font-bold text-gray-900">KES 100,000</div>
        <div class="text-xs text-gray-500 mt-1">Annual: KES 1,200,000</div>
      </div>
      <div class="bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:border-green-200 transition-all duration-200">
        <div class="text-sm text-gray-500 mb-1">Take Home Pay</div>
        <div class="text-2xl font-bold text-green-600">KES 71,580</div>
        <div class="text-xs text-gray-500 mt-1">After all deductions</div>
      </div>
      <div class="bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:border-green-200 transition-all duration-200">
        <div class="text-sm text-gray-500 mb-1">Effective Tax Rate</div>
        <div class="text-2xl font-bold text-blue-600">28.42%</div>
        <div class="text-xs text-gray-500 mt-1">Including all deductions</div>
      </div>
    </div>

    <!-- Deductions Breakdown -->
    <div class="bg-white rounded-xl shadow-lg border border-gray-100">
      <div class="border-b border-gray-100 p-4">
        <h4 class="text-lg font-semibold text-gray-900">Monthly Deductions Breakdown</h4>
      </div>
      <div class="p-4">
        <div class="space-y-4">
          <!-- PAYE Section -->
          <div class="bg-gray-50 p-4 rounded-lg">
            <div class="flex justify-between items-center mb-2">
              <span class="font-medium text-gray-700">PAYE Tax</span>
              <span class="text-red-600 font-medium">KES 22,400</span>
            </div>
            <div class="text-xs text-gray-500">After personal relief of KES 2,400</div>
          </div>

          <!-- Statutory Deductions -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="bg-gray-50 p-4 rounded-lg">
              <div class="flex justify-between items-center mb-1">
                <span class="font-medium text-gray-700">NSSF</span>
                <span class="text-red-600 font-medium">KES 2,400</span>
              </div>
              <div class="text-xs text-gray-500">2.4% of gross pay</div>
            </div>
            <div class="bg-gray-50 p-4 rounded-lg">
              <div class="flex justify-between items-center mb-1">
                <span class="font-medium text-gray-700">SHIF</span>
                <span class="text-red-600 font-medium">KES 2,750</span>
              </div>
              <div class="text-xs text-gray-500">2.75% of gross pay</div>
            </div>
            <div class="bg-gray-50 p-4 rounded-lg">
              <div class="flex justify-between items-center mb-1">
                <span class="font-medium text-gray-700">Housing Levy</span>
                <span class="text-red-600 font-medium">KES 1,500</span>
              </div>
              <div class="text-xs text-gray-500">1.5% of gross pay</div>
            </div>
          </div>

          <!-- Total Deductions -->
          <div class="bg-red-50 p-4 rounded-lg border border-red-100">
            <div class="flex justify-between items-center">
              <span class="font-medium text-gray-900">Total Deductions</span>
              <span class="text-red-600 font-bold">KES 28,420</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tax Brackets -->
    <div class="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      <div class="border-b border-gray-100 p-4">
        <h4 class="text-lg font-semibold text-gray-900">2025 Tax Brackets</h4>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monthly Income (KES)</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Tax Rate</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">0 - 24,000</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-right text-green-600 font-medium">10%</td>
            </tr>
            <tr class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">24,001 - 32,333</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-right text-green-600 font-medium">25%</td>
            </tr>
            <tr class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">32,334 - 500,000</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-right text-green-600 font-medium">30%</td>
            </tr>
            <tr class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">500,001 - 800,000</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-right text-green-600 font-medium">32.5%</td>
            </tr>
            <tr class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Above 800,000</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-right text-green-600 font-medium">35%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Important Notes -->
    <div class="bg-blue-50 rounded-xl p-6 border border-blue-100">
      <h4 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <svg class="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Important Updates for 2025
      </h4>
      <ul class="space-y-3 text-sm text-gray-600">
        <li class="flex items-start">
          <svg class="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4" />
          </svg>
          <span>Personal Relief: <span class="font-medium">KES 2,400</span> monthly (KES 28,800 annually)</span>
        </li>
        <li class="flex items-start">
          <svg class="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4" />
          </svg>
          <span>SHIF and Housing Levy are now tax-deductible (effective December 2024)</span>
        </li>
        <li class="flex items-start">
          <svg class="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4" />
          </svg>
          <span>New reduced NSSF rate of 2.4% effective February 2025</span>
        </li>
        <li class="flex items-start">
          <svg class="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4" />
          </svg>
          <span>Monthly tax returns due by 9th of the following month</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaxCalculatorExample',
  emits: ['startCalculation']
}
</script>

<style scoped>
.gradient-heading {
  background: linear-gradient(to right, #10B981, #3B82F6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>