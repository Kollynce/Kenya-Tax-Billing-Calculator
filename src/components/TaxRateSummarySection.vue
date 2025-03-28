<template>
  <section class="bg-white py-16 rounded-2xl border border-gray-100 shadow-xl relative overflow-hidden">
    <div class="relative z-10 px-8">
      <h2 class="text-3xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        2025 Creative Tax Rates
      </h2>
      <p class="text-lg text-gray-600 mb-10 text-center max-w-3xl mx-auto">
        Understand how these rates apply to your income and stay compliant with the latest tax regulations. 
        <router-link to="/tax-guide" class="text-green-600 hover:underline font-medium">Learn More</router-link>
      </p>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Income Tax Brackets -->
        <div class="bg-gradient-to-br from-white to-gray-50 rounded-xl p-8 border border-gray-100 shadow-lg transition-all duration-300 hover:shadow-xl hover:border-green-200 transform hover:-translate-y-1">
          <h3 class="text-xl font-semibold text-gray-900 mb-5 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
            Income Tax Brackets
          </h3>
          <ul class="space-y-3 text-sm">
            <li v-for="(bracket, index) in taxBrackets" :key="index" class="flex justify-between p-3 rounded bg-white shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-green-200">
              <span class="relative group">
                {{ bracket.range }}
                <span v-if="bracket.tooltip" class="absolute hidden group-hover:block bg-gray-800 text-white text-xs p-2 rounded -top-10 left-0 z-10 shadow-lg">
                  {{ bracket.tooltip }}
                </span>
              </span>
              <span class="font-medium text-green-600">{{ bracket.rate }}%</span>
            </li>
          </ul>
        </div>
        
        <!-- Statutory Deductions -->
        <div class="bg-gradient-to-br from-white to-gray-50 rounded-xl p-8 border border-gray-100 shadow-lg transition-all duration-300 hover:shadow-xl hover:border-blue-200 transform hover:-translate-y-1">
          <h3 class="text-xl font-semibold text-gray-900 mb-5 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
            </svg>
            Statutory Deductions
          </h3>
          <ul class="space-y-3 text-sm">
            <li v-for="(deduction, index) in statutoryDeductions" :key="index" class="flex justify-between p-3 rounded bg-white shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-blue-200">
              <span class="relative group">
                {{ deduction.name }}
                <span v-if="deduction.tooltip" class="absolute hidden group-hover:block bg-gray-800 text-white text-xs p-2 rounded -top-10 left-0 z-10 shadow-lg">
                  {{ deduction.tooltip }}
                </span>
              </span>
              <span class="font-medium text-blue-600">{{ deduction.rate }}</span>
            </li>
          </ul>
        </div>

        <!-- Creative Rates -->
        <div class="bg-gradient-to-br from-white to-gray-50 rounded-xl p-8 border border-gray-100 shadow-lg transition-all duration-300 hover:shadow-xl hover:border-purple-200 transform hover:-translate-y-1">
          <h3 class="text-xl font-semibold text-gray-900 mb-5 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Creative Rates
          </h3>
          <ul class="space-y-3 text-sm">
            <li v-for="(rate, index) in creativeRates" :key="index" class="flex justify-between p-3 rounded bg-white shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-purple-200">
              <span>{{ rate.title }}</span>
              <span class="font-medium text-purple-600">{{ rate.amount }}</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div class="mt-12 text-center">
        <router-link to="/tax-calculator" class="btn-primary inline-flex items-center px-8 py-4 text-base font-medium text-white bg-gradient-to-r from-green-600 to-green-500 rounded-lg shadow-lg hover:from-green-500 hover:to-green-400 transition-all duration-300 transform hover:scale-105">
          Calculate My Taxes
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'TaxRateSummarySection',
  data() {
    return {
      taxBrackets: [
        { range: 'Up to 24,000', rate: 10, tooltip: 'First tax bracket for monthly income' },
        { range: '24,001 - 32,333', rate: 25 },
        { range: '32,334 - 500,000', rate: 30 },
        { range: '500,001 - 800,000', rate: 32.5 },
        { range: 'Above 800,000', rate: 35 }
      ],
      statutoryDeductions: [
        { name: 'NSSF (Tier I & II)', rate: '2.4% each', tooltip: 'National Social Security Fund contributions' },
        { name: 'SHIF Rate', rate: '2.75%', tooltip: 'Social Health Insurance Fund' },
        { name: 'Housing Levy', rate: '1.5%' },
        { name: 'DST (Digital)', rate: '1.5%', tooltip: 'Digital Service Tax for online earnings' }
      ],
      creativeRates: [
        { title: 'Designer (per hour)', amount: '2,500 KES' },
        { title: 'Writer (per hour)', amount: '2,000 KES' },
        { title: 'Musician (per hour)', amount: '2,500 KES' },
        { title: 'Content Creator (per hour)', amount: '2,000 KES' }
      ]
    }
  }
}
</script>