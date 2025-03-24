<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Hero Section with Calculator -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
      <div class="flex flex-col justify-center space-y-6">
        <div class="mb-2">
          <span class="inline-block px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-800">
            2025 Updated
          </span>
        </div>
        <h1 class="text-4xl md:text-5xl font-bold mb-4 gradient-heading">
          Tax & Billing for<br />Kenyan Creatives
        </h1>
        <p class="text-lg text-gray-600">
          Simplified tax calculations and professional billing for content creators, artists, 
          and freelancers. Kenya's essential tool for creative financial management.
        </p>
        <div class="mt-8 flex flex-wrap gap-4">
          <router-link
            to="/auth"
            class="inline-flex items-center px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-green-600 to-green-500 rounded-lg shadow-lg hover:from-green-500 hover:to-green-400 transform transition-all duration-200 hover:scale-105"
          >
            <span>Get Started</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </router-link>
          <router-link
            to="/tax-calculator"
            class="btn-secondary inline-flex items-center space-x-2 whitespace-nowrap"
          >
            <span>Try Calculator</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-3 3a1 1 0 100 2h.01a1 1 0 100-2H10zm-4 0a1 1 0 100 2h.01a1 1 0 100-2H6z" clip-rule="evenodd" />
            </svg>
          </router-link>
        </div>
      </div>
      
      <!-- Enhanced Calculator Card -->
      <div class="bg-white rounded-2xl p-8 shadow-2xl border border-gray-100 transform hover:scale-[1.02] transition-all duration-300 relative overflow-hidden">
        <div class="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-green-100 to-blue-50 rounded-bl-full opacity-50"></div>
        
        <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mr-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0118 0z" />
          </svg>
          Creative Rate Calculator
        </h2>

        <div class="space-y-6 relative z-10">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Your Craft</label>
              <select
                v-model="selectedProfession"
                class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              >
                <option v-for="option in professionOptions" :key="option.value" :value="option.value">
                  {{ option.label }}
                </option>
              </select>
            </div>

            <div class="grid grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Experience (Years)</label>
                <input
                  type="number"
                  v-model="experienceYears"
                  min="0"
                  max="20"
                  class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              
              <div class="space-y-3">
                <div class="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                  <input
                    type="checkbox"
                    v-model="hasPortfolio"
                    class="w-5 h-5 text-green-600 rounded focus:ring-green-500"
                  />
                  <label class="text-sm text-gray-700">Creative Portfolio</label>
                </div>
                <div class="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                  <input
                    type="checkbox"
                    v-model="isVATRegistered"
                    class="w-5 h-5 text-green-600 rounded focus:ring-green-500"
                  />
                  <label class="text-sm text-gray-700">VAT Registered</label>
                </div>
              </div>
            </div>
          </div>

          <!-- Results Card -->
          <div class="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 shadow-lg border border-gray-100">
            <h3 class="font-semibold text-gray-900 mb-4">Your Creative Value</h3>
            <div class="grid grid-cols-2 gap-4">
              <div class="p-3 bg-white rounded-lg shadow-sm">
                <div class="text-sm text-gray-600">Hourly Rate</div>
                <div class="text-xl font-bold text-green-600">{{ formatCurrency(professionRates.recommended) }}</div>
              </div>
              <div class="p-3 bg-white rounded-lg shadow-sm">
                <div class="text-sm text-gray-600">Daily Rate</div>
                <div class="text-xl font-bold text-green-600">{{ formatCurrency(professionRates.daily) }}</div>
              </div>
              <div class="p-3 bg-white rounded-lg shadow-sm">
                <div class="text-sm text-gray-600">Monthly</div>
                <div class="text-xl font-bold text-green-600">{{ formatCurrency(professionRates.monthly) }}</div>
              </div>
              <div class="p-3 bg-white rounded-lg shadow-sm" v-if="isVATRegistered">
                <div class="text-sm text-gray-600">With VAT</div>
                <div class="text-xl font-bold text-green-600">{{ formatCurrency(professionRates.recommendedWithVAT) }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Market Position -->
    <div class="bg-gradient-to-br from-gray-50 to-green-50 rounded-xl p-8 mb-12 border border-gray-100 shadow-lg">
      <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
        Kenya's Growing Creative Economy
      </h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100 transition hover:shadow-md">
          <div class="text-3xl font-bold gradient-text mb-1">9th</div>
          <p class="text-sm text-gray-600">Global Ranking for Creative Talent</p>
        </div>
        <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100 transition hover:shadow-md">
          <div class="text-3xl font-bold gradient-text mb-1">25k+</div>
          <p class="text-sm text-gray-600">Registered Kenyan Freelancers</p>
        </div>
        <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100 transition hover:shadow-md">
          <div class="text-3xl font-bold gradient-text mb-1">17.7%</div>
          <p class="text-sm text-gray-600">Annual Market Growth Rate</p>
        </div>
        <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100 transition hover:shadow-md">
          <div class="text-3xl font-bold gradient-text mb-1">5M</div>
          <p class="text-sm text-gray-600">VAT Registration Threshold (KES)</p>
        </div>
      </div>
      
      <!-- Live Tax Updates -->
      <div class="mt-6 border-t border-green-100 pt-4">
        <h3 class="text-xl font-semibold text-gray-900 mb-3 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0118 0z" />
          </svg>
          2025 Tax Updates for Creatives
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-white rounded-lg p-4 shadow-sm border border-gray-100 flex items-center gap-3">
            <div class="bg-green-100 p-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h4 class="font-medium text-gray-800">New NSSF Rates</h4>
              <p class="text-sm text-gray-600">Updated 2.4% contribution rate effective February 2025</p>
            </div>
          </div>
          <div class="bg-white rounded-lg p-4 shadow-sm border border-gray-100 flex items-center gap-3">
            <div class="bg-green-100 p-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h4 class="font-medium text-gray-800">SHIF Integration</h4>
              <p class="text-sm text-gray-600">2.75% SHIF rate replacing NHIF with new limits</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Feature Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
      <!-- Tax Calculator Card -->
      <div class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 transition-all duration-200 hover:shadow-xl hover:border-green-100 transform hover:-translate-y-1">
        <div class="p-6">
          <div class="p-3 bg-green-50 rounded-full inline-block mb-4">
            <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Creative Tax Calculator</h3>
          <p class="text-gray-600 mb-4">
            Calculate PAYE, NSSF, SHIF, and Digital Service Tax with our updated 2025 rates for creative professionals.
          </p>
          <router-link
            to="/tax-calculator"
            class="inline-flex items-center text-green-600 hover:text-green-500 font-medium"
          >
            <span>Calculate Taxes</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </router-link>
        </div>
      </div>

      <!-- Billing Generator Card -->
      <div class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 transition-all duration-200 hover:shadow-xl hover:border-green-100 transform hover:-translate-y-1">
        <div class="p-6">
          <div class="p-3 bg-green-50 rounded-full inline-block mb-4">
            <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Creative Billing Generator</h3>
          <p class="text-gray-600 mb-4">
            Professional invoices with market-based rates for Kenyan creatives. Includes M-PESA integration and digital contracts.
          </p>
          <router-link
            to="/billing"
            class="inline-flex items-center text-green-600 hover:text-green-500 font-medium"
          >
            <span>Create Invoice</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </router-link>
        </div>
      </div>

      <!-- Billing Planner Card -->
      <div class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 transition-all duration-200 hover:shadow-xl hover:border-green-100 transform hover:-translate-y-1">
        <div class="p-6">
          <div class="p-3 bg-green-50 rounded-full inline-block mb-4">
            <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Creative Project Planner</h3>
          <p class="text-gray-600 mb-4">
            Create detailed project proposals with profession-specific templates for artists, designers, writers and more.
          </p>
          <router-link
            to="/billing-planner"
            class="inline-flex items-center text-green-600 hover:text-green-500 font-medium"
          >
            <span>Plan Project</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </router-link>
        </div>
      </div>
    </div>

    <!-- Tax Rate Summary -->
    <div class="bg-white rounded-xl shadow-lg p-8 mb-12 border border-gray-100">
      <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        2025 Creative Tax Rates
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-gray-50 rounded-lg p-5 border border-gray-100 transition-all duration-200 hover:shadow-md">
          <h3 class="text-lg font-semibold text-gray-900 mb-3 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
            Income Tax Brackets
          </h3>
          <ul class="space-y-2 text-sm">
            <li class="flex justify-between p-2 rounded hover:bg-gray-100">
              <span>Up to 24,000</span>
              <span class="font-medium text-green-600">10%</span>
            </li>
            <li class="flex justify-between p-2 rounded hover:bg-gray-100">
              <span>24,001 - 32,333</span>
              <span class="font-medium text-green-600">25%</span>
            </li>
            <li class="flex justify-between p-2 rounded hover:bg-gray-100">
              <span>32,334 - 500,000</span>
              <span class="font-medium text-green-600">30%</span>
            </li>
            <li class="flex justify-between p-2 rounded hover:bg-gray-100">
              <span>500,001 - 800,000</span>
              <span class="font-medium text-green-600">32.5%</span>
            </li>
            <li class="flex justify-between p-2 rounded hover:bg-gray-100">
              <span>Above 800,000</span>
              <span class="font-medium text-green-600">35%</span>
            </li>
          </ul>
        </div>
        
        <div class="bg-gray-50 rounded-lg p-5 border border-gray-100 transition-all duration-200 hover:shadow-md">
          <h3 class="text-lg font-semibold text-gray-900 mb-3 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
            </svg>
            Statutory Deductions
          </h3>
          <ul class="space-y-2 text-sm">
            <li class="flex justify-between p-2 rounded hover:bg-gray-100">
              <span>NSSF (Tier I & II)</span>
              <span class="font-medium text-green-600">2.4% each</span>
            </li>
            <li class="flex justify-between p-2 rounded hover:bg-gray-100">
              <span>SHIF Rate</span>
              <span class="font-medium text-green-600">2.75%</span>
            </li>
            <li class="flex justify-between p-2 rounded hover:bg-gray-100">
              <span>Housing Levy</span>
              <span class="font-medium text-green-600">1.5%</span>
            </li>
            <li class="flex justify-between p-2 rounded hover:bg-gray-100">
              <span>DST (Digital)</span>
              <span class="font-medium text-green-600">1.5%</span>
            </li>
          </ul>
        </div>

        <div class="bg-gray-50 rounded-lg p-5 border border-gray-100 transition-all duration-200 hover:shadow-md">
          <h3 class="text-lg font-semibold text-gray-900 mb-3 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0118 0z" />
            </svg>
            Creative Rates
          </h3>
          <ul class="space-y-2 text-sm">
            <li class="flex justify-between p-2 rounded hover:bg-gray-100">
              <span>Designer (per hour)</span>
              <span class="font-medium text-green-600">2,500 KES</span>
            </li>
            <li class="flex justify-between p-2 rounded hover:bg-gray-100">
              <span>Writer (per hour)</span>
              <span class="font-medium text-green-600">2,000 KES</span>
            </li>
            <li class="flex justify-between p-2 rounded hover:bg-gray-100">
              <span>Musician (per hour)</span>
              <span class="font-medium text-green-600">3,000 KES</span>
            </li>
            <li class="flex justify-between p-2 rounded hover:bg-gray-100">
              <span>Content Creator (per hour)</span>
              <span class="font-medium text-green-600">1,500 KES</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Example Showcase -->
    <div class="mb-16 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-8 border border-gray-100 shadow-lg">
      <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">See Your Creative Tools</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Tax Calculator Example -->
        <div class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 transition-all duration-200 hover:shadow-xl hover:border-green-100">
          <div class="p-6">
            <div class="flex items-center mb-4">
              <div class="p-2 bg-green-50 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900">Tax Calculator for Creatives</h3>
            </div>
            <div class="rounded-lg mb-4 w-full h-48 bg-gradient-to-br from-green-50 to-blue-50 border border-gray-100 flex items-center justify-center shadow-inner p-4">
              <img src="https://placeholder.pics/svg/300x150/DEDEDE/555555/Tax%20Calculator%20Preview" alt="Tax Calculator Preview" class="max-h-full rounded shadow" />
            </div>
            <p class="text-gray-600 mb-4">
              Calculate your PAYE, NSSF, and SHIF contributions with updated 2025 rates. Get complete breakdowns of your freelance tax obligations.
            </p>
            <router-link
              to="/tax-calculator"
              class="inline-flex items-center mt-2 text-green-600 hover:text-green-500 font-medium"
            >
              <span>Try Calculator</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </router-link>
          </div>
        </div>
        
        <!-- Billing Planner Example -->
        <div class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 transition-all duration-200 hover:shadow-xl hover:border-green-100">
          <div class="p-6">
            <div class="flex items-center mb-4">
              <div class="p-2 bg-green-50 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900">Creative Billing Planner</h3>
            </div>
            <div class="rounded-lg mb-4 w-full h-48 bg-gradient-to-br from-green-50 to-blue-50 border border-gray-100 flex items-center justify-center shadow-inner p-4">
              <img src="https://placeholder.pics/svg/300x150/DEDEDE/555555/Billing%20Planner%20Preview" alt="Billing Planner Preview" class="max-h-full rounded shadow" />
            </div>
            <p class="text-gray-600 mb-4">
              Create professional proposals and invoices with tailored templates for artists, designers, writers, musicians, and content creators.
            </p>
            <router-link
              to="/billing-planner"
              class="inline-flex items-center mt-2 text-green-600 hover:text-green-500 font-medium"
            >
              <span>Try Billing Planner</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </router-link>
          </div>
        </div>
      </div>
      
      <div class="mt-8 text-center">
        <router-link
          to="/examples"
          class="btn-primary inline-flex items-center gap-2"
        >
          <span>View More Examples</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </router-link>
      </div>
    </div>

    <!-- Call to Action -->
    <div class="text-center mb-12 bg-gradient-to-br from-gray-800 to-gray-900 text-white p-12 rounded-xl shadow-lg">
      <h2 class="text-3xl font-bold mb-6">
        Ready to Elevate Your Creative Business?
      </h2>
      <p class="text-gray-300 max-w-2xl mx-auto mb-8">
        Join thousands of Kenyan creatives who are streamlining their finances, creating professional invoices, and navigating taxes with confidence.
      </p>
      <div class="flex flex-wrap justify-center gap-4">
        <router-link
          to="/auth"
          class="btn-primary bg-green-600 hover:bg-green-500 text-white flex items-center gap-2 transform transition hover:scale-105"
        >
          <span>Get Started Free</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </router-link>
        <router-link
          to="/tax-calculator"
          class="btn-secondary bg-transparent border border-gray-600 hover:bg-gray-800 text-white flex items-center gap-2"
        >
          <span>Try Calculator</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-3 3a1 1 0 100 2h.01a1 1 0 100-2H10zm-4 0a1 1 0 100 2h.01a1 1 0 100-2H6z" clip-rule="evenodd" />
          </svg>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { BILLING_CONSTANTS } from '../services/billingService';
import { calculateMarketBasedPricing } from '../services/billingService';
import { formatCurrency } from '../utils/taxUtils';

export default {
  name: 'HomePage',
  setup() {
    const selectedProfession = ref('designer');
    const experienceYears = ref(1);
    const hasPortfolio = ref(false);
    const isVATRegistered = ref(false);

    const professionRates = computed(() => {
      return calculateMarketBasedPricing({
        profession: selectedProfession.value,
        experienceYears: experienceYears.value,
        hasPortfolio: hasPortfolio.value,
        isVATRegistered: isVATRegistered.value
      });
    });

    const professionOptions = [
      // Design Professionals
      { value: 'designer', label: 'General Designer' },
      { value: 'ui-designer', label: 'UI/UX Designer' },
      { value: 'graphic-designer', label: 'Graphic Designer' },
      { value: 'motion-designer', label: 'Motion Designer' },
      
      // Content Creation
      { value: 'writer', label: 'General Writer' },
      { value: 'technical-writer', label: 'Technical Writer' },
      { value: 'content-writer', label: 'Content Writer' },
      { value: 'scriptwriter', label: 'Script Writer' },
      
      // Audio/Music Professionals
      { value: 'musician', label: 'Musician' },
      { value: 'music-producer', label: 'Music Producer' },
      { value: 'sound-engineer', label: 'Sound Engineer' },
      { value: 'session-musician', label: 'Session Musician' },
      { value: 'voice-artist', label: 'Voice Artist' },
      
      // Visual Media
      { value: 'photographer', label: 'Photographer' },
      { value: 'videographer', label: 'Videographer' },
      { value: 'animator', label: 'Animator' },
      { value: 'digital-artist', label: 'Digital Artist' },
      
      // Digital & Social
      { value: 'social-media', label: 'Social Media Manager' },
      { value: 'game-developer', label: 'Game Developer' },
      
      // Other
      { value: 'general', label: 'Other Creative Professional' }
    ];

    return {
      selectedProfession,
      experienceYears,
      hasPortfolio,
      isVATRegistered,
      professionRates,
      professionOptions,
      BILLING_CONSTANTS,
      formatCurrency
    };
  }
};
</script>

<style>
.gradient-text {
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  background-image: linear-gradient(135deg, #1F2937 0%, #374151 100%);
}

.gradient-heading {
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  background-image: linear-gradient(135deg, #16A34A 0%, #22C55E 100%);
}

.card-gradient {
  background-image: linear-gradient(to bottom, var(--tw-gradient-stops));
  --tw-gradient-from: #fff;
  --tw-gradient-to: rgb(255 255 255 / 0);
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
  --tw-gradient-to: rgb(249 250 251 / 0.8);
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  background-color: #16A34A;
  color: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}

.btn-primary:hover {
  background-color: #22C55E;
}

.btn-secondary {
  display: inline-flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  background-color: white;
  color: #374151;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}

.btn-secondary:hover {
  background-color: #F9FAFB;
}

.input-field {
  width: 100%;
  border-radius: 0.375rem;
  border-color: #D1D5DB;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.input-field:focus {
  border-color: #16A34A;
  box-shadow: 0 0 0 2px rgba(22, 163, 74, 0.25);
  outline: none;
}

.shadow-lg {
  --tw-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  box-shadow: var(--tw-shadow);
}

.shadow-2xl {
  --tw-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  box-shadow: var(--tw-shadow);
}
</style>