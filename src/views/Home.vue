<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Hero Section -->
    <section class="bg-gradient-to-b from-white to-gray-50 py-12 my-16 rounded-xl border border-gray-100 shadow-lg transform hover:shadow-xl transition-all duration-500">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="flex flex-col justify-center space-y-6 px-6 md:px-8">
          <div class="mb-2 flex space-x-2">
            <span class="inline-block px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-800 animate-pulse">
              2025 Rates
            </span>
            <span class="inline-block px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800">
              Made for Creatives
            </span>
          </div>
          <h1 class="text-4xl md:text-5xl font-bold mb-4 gradient-heading leading-tight">
            Calculate Your True Worth.<br/>Build Your Creative Empire.
          </h1>
          <p class="text-lg text-gray-600 leading-relaxed">
            Stop underpricing your creative work. Our intelligent platform helps you understand your market value, account for all business costs, and set rates that reflect your true worth.
          </p>
          
          <div class="space-y-3 mt-4">
            <div class="flex items-center space-x-2">
              <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="text-gray-700">Market-informed rate calculations</span>
            </div>
            <div class="flex items-center space-x-2">
              <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="text-gray-700">Clear breakdown of business expenses</span>
            </div>
            <div class="flex items-center space-x-2">
              <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="text-gray-700">Tax planning & compliance guidance</span>
            </div>
            <div class="flex items-center space-x-2">
              <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="text-gray-700">Professional billing templates</span>
            </div>
          </div>

          <div class="mt-8 flex flex-wrap gap-4">
            <router-link
              to="/auth"
              class="btn-primary inline-flex items-center px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-green-600 to-green-500 rounded-lg shadow-lg hover:from-green-500 hover:to-green-400 transform transition-all duration-200 hover:scale-105"
            >
              <span>Start Building Today</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </router-link>
            <router-link
              to="/examples"
              class="btn-secondary group inline-flex items-center px-6 py-3 text-lg font-semibold text-gray-700 bg-white border-2 border-gray-200 rounded-lg shadow-sm hover:border-green-300 transition-all duration-200"
            >
              <span>See Success Stories</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z" />
              </svg>
            </router-link>
          </div>
        </div>
        
        <div class="bg-white rounded-2xl p-8 shadow-2xl border border-gray-100 transform hover:scale-[1.02] transition-all duration-300 relative overflow-hidden mx-6 md:mx-8">
          <div class="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-green-100 to-blue-50 rounded-bl-full opacity-50"></div>
          
          <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mr-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Value-Based Rate Calculator
          </h2>

          <div class="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-green-200 transition-all duration-300">
            <h3 class="font-medium text-gray-900 mb-2">Understanding Your Rate Factors</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div v-for="(factor, key) in PRICING_FACTORS" :key="key" class="flex items-start space-x-2">
                <div class="mt-1">
                  <svg class="w-4 h-4" :class="factor.impact === 'High' ? 'text-green-600' : 'text-blue-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <p class="font-medium text-gray-900">{{ factor.title }}</p>
                  <p class="text-gray-600 text-xs">{{ factor.description }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="space-y-6 relative z-10">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Your Creative Field
                <span class="text-xs text-gray-500 ml-1">(Required)</span>
              </label>
              <div class="relative">
                <select
                  v-model="selectedProfession"
                  class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                >
                  <optgroup label="Design & Visual Arts">
                    <option v-for="option in professionOptions.filter(o => o.category === 'design')" 
                            :key="option.value" 
                            :value="option.value">
                      {{ option.label }}
                    </option>
                  </optgroup>
                  <optgroup label="Content Creation">
                    <option v-for="option in professionOptions.filter(o => o.category === 'content')" 
                            :key="option.value" 
                            :value="option.value">
                      {{ option.label }}
                    </option>
                  </optgroup>
                </select>
                <div class="absolute right-3 top-3 text-gray-400">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              <p class="mt-1 text-xs text-gray-500">Choose your primary creative field for tailored rate suggestions</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Experience Level
                  <span class="text-xs text-gray-500 ml-1">(Years)</span>
                </label>
                <div class="flex items-center space-x-4">
                  <input
                    type="number"
                    v-model="experienceYears"
                    min="0"
                    max="20"
                    class="w-24 px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                  />
                  <div class="text-sm text-gray-600">
                    <span class="font-medium">Impact:</span>
                    <span class="text-green-600">+{{ Math.round((professionRates.multipliers.experience - 1) * 100) }}%</span>
                  </div>
                </div>
                <p class="mt-1 text-xs text-gray-500">Each year adds 5-10% to your base rate (up to 100%)</p>
              </div>

              <div class="space-y-3">
                <div class="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200 group cursor-pointer border border-transparent hover:border-green-200"
                     @click="hasPortfolio = !hasPortfolio">
                  <input
                    type="checkbox"
                    v-model="hasPortfolio"
                    class="w-5 h-5 text-green-600 rounded focus:ring-green-500"
                  />
                  <div>
                    <label class="text-sm text-gray-700 font-medium cursor-pointer">Portfolio Available</label>
                    <p class="text-xs text-gray-500">Impact: <span class="text-green-600">+15%</span></p>
                  </div>
                </div>
                <div class="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200 group cursor-pointer border border-transparent hover:border-green-200"
                     @click="isVATRegistered = !isVATRegistered">
                  <input
                    type="checkbox"
                    v-model="isVATRegistered"
                    class="w-5 h-5 text-green-600 rounded focus:ring-green-500"
                  />
                  <div>
                    <label class="text-sm text-gray-700 font-medium cursor-pointer">VAT Registered</label>
                    <p class="text-xs text-gray-500">Adds 16% VAT to your rates</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 shadow-lg border border-gray-100 hover:border-green-200 transition-all duration-300">
              <div class="mb-4">
                <h3 class="font-semibold text-gray-900 flex items-center">
                  <svg class="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Your Professional Value
                </h3>
                <p class="text-sm text-gray-600 mt-1">Based on market research and your qualifications</p>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div class="relative p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:border-green-200 transition-all duration-200 group">
                  <div class="absolute top-2 right-2">
                    <div class="group-hover:visible invisible transition-opacity">
                      <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div class="text-sm text-gray-600 mb-1">Recommended Hourly Rate</div>
                  <div class="text-xl font-bold text-green-600">{{ formatCurrency(professionRates.recommended) }}</div>
                  <p class="text-xs text-gray-500 mt-1">Market-aligned base rate</p>
                </div>
                
                <div class="relative p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:border-green-200 transition-all duration-200 group">
                  <div class="absolute top-2 right-2">
                    <div class="group-hover:visible invisible transition-opacity">
                      <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div class="text-sm text-gray-600 mb-1">Daily Rate (8hrs)</div>
                  <div class="text-xl font-bold text-green-600">{{ formatCurrency(professionRates.daily) }}</div>
                  <p class="text-xs text-gray-500 mt-1">Standard workday equivalent</p>
                </div>
                
                <div class="relative p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:border-green-200 transition-all duration-200 group">
                  <div class="absolute top-2 right-2">
                    <div class="group-hover:visible invisible transition-opacity">
                      <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div class="text-sm text-gray-600 mb-1">Monthly Earning Potential</div>
                  <div class="text-xl font-bold text-green-600">{{ formatCurrency(professionRates.monthly) }}</div>
                  <p class="text-xs text-gray-500 mt-1">Based on 22 working days</p>
                </div>
                
                <div v-if="isVATRegistered" class="relative p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:border-green-200 transition-all duration-200 group">
                  <div class="absolute top-2 right-2">
                    <div class="group-hover:visible invisible transition-opacity">
                      <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div class="text-sm text-gray-600 mb-1">Rate with VAT (16%)</div>
                  <div class="text-xl font-bold text-green-600">{{ formatCurrency(professionRates.recommendedWithVAT) }}</div>
                  <p class="text-xs text-gray-500 mt-1">For VAT registered businesses</p>
                </div>
              </div>

              <div class="mt-4 space-y-3">
                <div class="p-3 bg-blue-50 rounded-lg border border-blue-100 hover:border-blue-200 transition-all duration-200">
                  <div class="flex items-start">
                    <svg class="w-5 h-5 text-blue-600 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <div>
                      <p class="text-sm text-blue-900">
                        Your {{ experienceYears }} years of experience adds a 
                        <span class="font-medium">{{ Math.round((professionRates.multipliers.experience - 1) * 100) }}%</span> 
                        premium to your base rate
                      </p>
                    </div>
                  </div>
                </div>

                <div v-if="hasPortfolio" class="p-3 bg-green-50 rounded-lg border border-green-100 hover:border-green-200 transition-all duration-200">
                  <div class="flex items-start">
                    <svg class="w-5 h-5 text-green-600 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <p class="text-sm text-green-900">
                        Your portfolio demonstrates expertise, adding a 15% premium to your rates
                      </p>
                    </div>
                  </div>
                </div>

                <div class="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200">
                  <p class="text-sm text-gray-700">
                    These rates are based on current market standards in Kenya, considering your experience{{ hasPortfolio ? ', portfolio' : '' }}{{ isVATRegistered ? ', and VAT registration' : '' }}. Use them as a starting point for your pricing strategy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Divider -->
    <div class="relative my-16">
      <div class="absolute inset-0 flex items-center">
        <div class="w-full border-t border-gray-200"></div>
      </div>
      <div class="relative flex justify-center">
        <span class="bg-white px-4 text-sm text-gray-500">Creative Economy</span>
      </div>
    </div>

    <!-- Market Position Section -->
    <section class="bg-white py-16 rounded-2xl border border-gray-100 shadow-xl relative overflow-hidden">
      <div class="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-green-50 rounded-full opacity-70"></div>
      <div class="absolute bottom-0 left-0 -mb-10 -ml-10 w-60 h-60 bg-blue-50 rounded-full opacity-70"></div>
      
      <div class="relative z-10 px-8">
        <h2 class="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          The Creative Scene in Kenya
        </h2>
        <p class="text-lg text-gray-600 mb-10 max-w-3xl">Explore the growth and opportunities in Kenya's creative economy. Stay ahead of trends and position yourself strategically in this expanding market.</p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="md:col-span-2 bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group transform hover:-translate-y-1">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center space-x-3">
                <div class="p-2 bg-white rounded-lg shadow-md">
                  <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <h3 class="text-xl font-bold text-gray-900">Creative Economy Growth</h3>
              </div>
              <span class="text-sm text-green-600 font-medium px-3 py-1 bg-white shadow-sm rounded-full">2025 Outlook</span>
            </div>
            <div class="grid grid-cols-2 gap-4 mb-4">
              <div class="bg-white/70 backdrop-blur p-4 rounded-lg shadow-sm border border-green-100 group-hover:border-green-200 transition-all duration-200">
                <div class="text-3xl font-bold text-green-600 mb-1">9th</div>
                <p class="text-sm text-gray-600">Global Creative Hub Ranking</p>
              </div>
              <div class="bg-white/70 backdrop-blur p-4 rounded-lg shadow-sm border border-green-100 group-hover:border-green-200 transition-all duration-200">
                <div class="text-3xl font-bold text-green-600 mb-1">17.7%</div>
                <p class="text-sm text-gray-600">Annual Growth Rate</p>
              </div>
            </div>
            <div class="bg-white/70 backdrop-blur p-4 rounded-lg shadow-sm border border-green-100 group-hover:border-green-200 transition-all duration-200">
              <div class="flex items-center justify-between">
                <span class="text-sm font-medium text-gray-600">Industry Growth Timeline</span>
                <span class="text-xs text-green-600">2023-2025</span>
              </div>
              <div class="mt-2 h-2 bg-white rounded-full overflow-hidden">
                <div class="h-full bg-green-500 w-3/4 rounded-full"></div>
              </div>
            </div>
          </div>

          <div class="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div class="flex items-center space-x-3 mb-4">
              <div class="p-2 bg-white rounded-lg shadow-md">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900">Community</h3>
            </div>
            <div class="text-3xl font-bold text-blue-600 mb-2">25,000+</div>
            <p class="text-sm text-gray-600 mb-4">Registered Creative Professionals</p>
            <div class="flex flex-wrap gap-2">
              <span class="px-2 py-1 text-xs bg-white/70 backdrop-blur rounded-full text-blue-600 shadow-sm border border-blue-100">Artists</span>
              <span class="px-2 py-1 text-xs bg-white/70 backdrop-blur rounded-full text-blue-600 shadow-sm border border-blue-100">Designers</span>
              <span class="px-2 py-1 text-xs bg-white/70 backdrop-blur rounded-full text-blue-600 shadow-sm border border-blue-100">Writers</span>
              <span class="px-2 py-1 text-xs bg-white/70 backdrop-blur rounded-full text-blue-600 shadow-sm border border-blue-100">Musicians</span>
            </div>
          </div>

          <div class="bg-gradient-to-br from-purple-50 to-pink-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div class="flex items-center space-x-3 mb-4">
              <div class="p-2 bg-white rounded-lg shadow-md">
                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900">VAT Registration</h3>
            </div>
            <div class="text-3xl font-bold text-purple-600 mb-2">5M KES</div>
            <p class="text-sm text-gray-600 mb-4">Annual Income Threshold</p>
            <div class="bg-white/70 backdrop-blur p-3 rounded-lg text-sm shadow-sm border border-purple-100">
              <span class="text-purple-600 font-medium">≈ 417K KES</span> monthly revenue needed for VAT registration
            </div>
          </div>

          <div class="md:col-span-2 bg-gradient-to-br from-orange-50 to-amber-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center space-x-3">
                <div class="p-2 bg-white rounded-lg shadow-md">
                  <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 class="text-xl font-bold text-gray-900">2025 Tax Updates</h3>
              </div>
              <span class="animate-pulse text-sm text-orange-600 font-medium px-3 py-1 bg-white rounded-full shadow-sm">New</span>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div class="bg-white/70 backdrop-blur p-4 rounded-lg shadow-sm border border-orange-100 group-hover:border-orange-200 transition-all duration-200">
                <div class="flex items-center space-x-2 mb-2">
                  <svg class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <h4 class="font-semibold text-gray-900">NSSF Rate</h4>
                </div>
                <p class="text-sm text-gray-600">Reduced to 2.4% from 6% - Now more affordable!</p>
              </div>
              <div class="bg-white/70 backdrop-blur p-4 rounded-lg shadow-sm border border-orange-100 group-hover:border-orange-200 transition-all duration-200">
                <div class="flex items-center space-x-2 mb-2">
                  <svg class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <h4 class="font-semibold text-gray-900">SHIF Benefits</h4>
                </div>
                <p class="text-sm text-gray-600">Enhanced healthcare at 2.75% with 5K KES cap</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Divider -->
    <div class="relative my-16">
      <div class="absolute inset-0 flex items-center">
        <div class="w-full border-t border-gray-200"></div>
      </div>
      <div class="relative flex justify-center">
        <span class="bg-white px-4 text-sm text-gray-500">Essential Tools</span>
      </div>
    </div>

            <!-- filepath: c:\Users\Collins\Documents\billing artist and freelance\my-tax-calculator\src\views\Home.vue -->
            <!-- Service Cards Section (Redesigned with 2x2 Grid Layout) -->
            <section class="bg-gradient-to-b from-white to-gray-50 py-20 rounded-2xl border border-gray-100 shadow-xl relative overflow-hidden my-16">
              <!-- Background elements -->
              <div class="absolute top-0 left-0 -mt-20 -ml-20 w-80 h-80 bg-green-50 rounded-full opacity-30"></div>
              <div class="absolute bottom-0 right-0 -mb-20 -mr-20 w-80 h-80 bg-blue-50 rounded-full opacity-30"></div>
              <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-50 rounded-full opacity-20"></div>
              
              <div class="relative z-10 container mx-auto px-6 lg:px-8">
                <!-- Section Header -->
                <div class="max-w-3xl mx-auto mb-16 text-center">
                  <h2 class="text-4xl font-bold text-gray-900 mb-6">Our Tools for Creatives</h2>
                  <div class="h-1 w-24 bg-gradient-to-r from-green-400 to-blue-500 mx-auto mb-6 rounded-full"></div>
                  <p class="text-xl text-gray-600">Empower your creative business with these essential tools designed specifically for your growth and success.</p>
                </div>
                
                <!-- Card Grid - Modified to 2x2 layout (2 on top, 2 at bottom) -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                  
                  <!-- Tax Calculator Card -->
                  <div class="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-2xl hover:scale-102 hover:border-green-200 flex flex-col h-full">
                    <!-- Card Header with Icon -->
                    <div class="p-6 pb-0 relative">
                      <!-- Decorative corner -->
                      <div class="absolute top-0 right-0 w-20 h-20 bg-green-50 rounded-bl-full opacity-70"></div>
                      
                      <div class="relative z-10">
                        <div class="p-4 bg-green-50 rounded-2xl inline-block mb-4 shadow-sm">
                          <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M9 12h6m-3 8a9 9 0 110-18 9 9 0 010 18z" />
                          </svg>
                        </div>
                        <h3 class="text-2xl font-bold text-gray-900">Smart Tax Calculator</h3>
                        <p class="text-gray-500 mt-2">Plan Your 2025 Taxes with Ease</p>
                      </div>
                    </div>
                    
                    <!-- Card Body -->
                    <div class="p-6 pt-4 flex-grow">
                      <ul class="text-gray-600 mb-6 space-y-3">
                        <li class="flex items-start">
                          <svg class="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Supports PAYE, NSSF, SHIF, and DST</span>
                        </li>
                        <li class="flex items-start">
                          <svg class="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Real-time 2025 tax calculations</span>
                        </li>
                        <li class="flex items-start">
                          <svg class="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Accurate statutory deductions</span>
                        </li>
                      </ul>
                    </div>
                    
                    <!-- Card Footer -->
                    <div class="p-6 pt-0 mt-auto">
                      <router-link to="/tax-calculator" class="btn-primary w-full inline-flex items-center justify-center px-5 py-3 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-500 transition-all duration-200 shadow-md hover:shadow-lg">
                        Calculate Taxes
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                      </router-link>
                    </div>
                  </div>
            
                  <!-- Professional Billing Card -->
                  <div class="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-2xl hover:scale-102 hover:border-blue-200 flex flex-col h-full">
                    <!-- Card Header with Icon -->
                    <div class="p-6 pb-0 relative">
                      <!-- Decorative corner -->
                      <div class="absolute top-0 right-0 w-20 h-20 bg-blue-50 rounded-bl-full opacity-70"></div>
                      
                      <div class="relative z-10">
                        <div class="p-4 bg-blue-50 rounded-2xl inline-block mb-4 shadow-sm">
                          <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                          </svg>
                        </div>
                        <h3 class="text-2xl font-bold text-gray-900">Professional Billing</h3>
                        <p class="text-gray-500 mt-2">Create Invoices That Impress</p>
                      </div>
                    </div>
                    
                    <!-- Card Body -->
                    <div class="p-6 pt-4 flex-grow">
                      <ul class="text-gray-600 mb-6 space-y-3">
                        <li class="flex items-start">
                          <svg class="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Market-informed rates by profession</span>
                        </li>
                        <li class="flex items-start">
                          <svg class="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Automatic VAT calculation (16%)</span>
                        </li>
                        <li class="flex items-start">
                          <svg class="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                          </svg>
                          <span>M-PESA integration</span>
                        </li>
                      </ul>
                    </div>
                    
                    <!-- Card Footer -->
                    <div class="p-6 pt-0 mt-auto">
                      <router-link to="/billing" class="btn-primary w-full inline-flex items-center justify-center px-5 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-all duration-200 shadow-md hover:shadow-lg">
                        Create Invoice
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                      </router-link>
                    </div>
                  </div>
            
                  <!-- Project Planner Card -->
                  <div class="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-2xl hover:scale-102 hover:border-purple-200 flex flex-col h-full">
                    <!-- Card Header with Icon -->
                    <div class="p-6 pb-0 relative">
                      <!-- Decorative corner -->
                      <div class="absolute top-0 right-0 w-20 h-20 bg-purple-50 rounded-bl-full opacity-70"></div>
                      
                      <div class="relative z-10">
                        <div class="p-4 bg-purple-50 rounded-2xl inline-block mb-4 shadow-sm">
                          <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5h6m-6 4h6m-6 4h6m-6 4h6" />
                          </svg>
                        </div>
                        <h3 class="text-2xl font-bold text-gray-900">Project Planner</h3>
                        <p class="text-gray-500 mt-2">Build Winning Proposals Fast</p>
                      </div>
                    </div>
                    
                    <!-- Card Body -->
                    <div class="p-6 pt-4 flex-grow">
                      <ul class="text-gray-600 mb-6 space-y-3">
                        <li class="flex items-start">
                          <svg class="w-5 h-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Profession-specific templates</span>
                        </li>
                        <li class="flex items-start">
                          <svg class="w-5 h-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Detailed cost breakdowns</span>
                        </li>
                        <li class="flex items-start">
                          <svg class="w-5 h-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Timeline planning</span>
                        </li>
                      </ul>
                    </div>
                    
                    <!-- Card Footer -->
                    <div class="p-6 pt-0 mt-auto">
                      <router-link to="/billing-planner" class="btn-primary w-full inline-flex items-center justify-center px-5 py-3 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-500 transition-all duration-200 shadow-md hover:shadow-lg">
                        Plan Project
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                      </router-link>
                    </div>
                  </div>
            
                  <!-- Creative Billing Planner Card -->
                  <div class="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-2xl hover:scale-102 hover:border-teal-200 flex flex-col h-full">
                    <!-- Card Header with Icon -->
                    <div class="p-6 pb-0 relative">
                      <!-- Decorative corner -->
                      <div class="absolute top-0 right-0 w-20 h-20 bg-teal-50 rounded-bl-full opacity-70"></div>
                      
                      <div class="relative z-10">
                        <div class="p-4 bg-teal-50 rounded-2xl inline-block mb-4 shadow-sm">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <h3 class="text-2xl font-bold text-gray-900">Creative Billing Planner</h3>
                        <p class="text-gray-500 mt-2">Craft Professional Proposals</p>
                      </div>
                    </div>
                    
                    <!-- Card Body with Image Preview -->
                    <div class="p-6 pt-4 flex-grow">
                      <div class="rounded-lg mb-6 w-full h-36 bg-gradient-to-br from-teal-50 to-blue-50 border border-gray-100 flex items-center justify-center shadow-inner p-3 group-hover:shadow-md transition-all duration-300 relative">
                        <img src="https://placeholder.pics/svg/300x150/DEDEDE/555555/Billing%20Planner%20Preview" alt="Billing Planner Preview" class="max-h-full rounded shadow" />
                        
                        <!-- Tooltip that appears on hover -->
                        <div class="absolute invisible group-hover:visible bg-gray-800 text-white text-xs p-2 rounded -top-8 left-1/2 transform -translate-x-1/2 transition-opacity duration-200 opacity-0 group-hover:opacity-100 z-10 whitespace-nowrap">
                          Preview of Billing Planner Template
                        </div>
                      </div>
                    </div>
                    
                    <!-- Card Footer -->
                    <div class="p-6 pt-0 mt-auto">
                      <router-link to="/billing-planner" class="btn-primary w-full inline-flex items-center justify-center px-5 py-3 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-500 transition-all duration-200 shadow-md hover:shadow-lg">
                        Try Billing Planner
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                      </router-link>
                    </div>
                  </div>
                </div>
                
                <!-- Call to Action Button -->
                <div class="mt-16 text-center">
                  <router-link to="/examples" class="btn-primary inline-flex items-center gap-2 px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-green-600 to-green-500 rounded-xl shadow-lg hover:from-green-500 hover:to-green-400 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                    <span>View More Examples</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                  </router-link>
                </div>
              </div>
            </section>

    <!-- Divider -->
    <div class="relative my-16">
      <div class="absolute inset-0 flex items-center">
        <div class="w-full border-t border-gray-200"></div>
      </div>
      <div class="relative flex justify-center">
        <span class="bg-white px-4 text-sm text-gray-500">Tax Information</span>
      </div>
    </div>

    <!-- Tax Rate Summary Section -->
    <section class="bg-white py-16 rounded-2xl border border-gray-100 shadow-xl relative overflow-hidden">
      <div class="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-green-50 rounded-full opacity-40"></div>
      <div class="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-blue-50 rounded-full opacity-40"></div>
      
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
          <div class="bg-gradient-to-br from-white to-gray-50 rounded-xl p-8 border border-gray-100 shadow-lg transition-all duration-300 hover:shadow-xl hover:border-green-200 transform hover:-translate-y-1">
            <h3 class="text-xl font-semibold text-gray-900 mb-5 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
              Income Tax Brackets
            </h3>
            <ul class="space-y-3 text-sm">
              <li class="flex justify-between p-3 rounded bg-white shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-green-200">
                <span class="relative group">
                  Up to 24,000
                  <span class="absolute hidden group-hover:block bg-gray-800 text-white text-xs p-2 rounded -top-10 left-0 z-10 shadow-lg">
                    First tax bracket for monthly income
                  </span>
                </span>
                <span class="font-medium text-green-600">10%</span>
              </li>
              <li class="flex justify-between p-3 rounded bg-white shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-green-200">
                <span>24,001 - 32,333</span>
                <span class="font-medium text-green-600">25%</span>
              </li>
              <li class="flex justify-between p-3 rounded bg-white shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-green-200">
                <span>32,334 - 500,000</span>
                <span class="font-medium text-green-600">30%</span>
              </li>
              <li class="flex justify-between p-3 rounded bg-white shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-green-200">
                <span>500,001 - 800,000</span>
                <span class="font-medium text-green-600">32.5%</span>
              </li>
              <li class="flex justify-between p-3 rounded bg-white shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-green-200">
                <span>Above 800,000</span>
                <span class="font-medium text-green-600">35%</span>
              </li>
            </ul>
          </div>
          
          <div class="bg-gradient-to-br from-white to-gray-50 rounded-xl p-8 border border-gray-100 shadow-lg transition-all duration-300 hover:shadow-xl hover:border-blue-200 transform hover:-translate-y-1">
            <h3 class="text-xl font-semibold text-gray-900 mb-5 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
              </svg>
              Statutory Deductions
            </h3>
            <ul class="space-y-3 text-sm">
              <li class="flex justify-between p-3 rounded bg-white shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-blue-200">
                <span class="relative group">
                  NSSF (Tier I & II)
                  <span class="absolute hidden group-hover:block bg-gray-800 text-white text-xs p-2 rounded -top-10 left-0 z-10 shadow-lg">
                    National Social Security Fund contributions
                  </span>
                </span>
                <span class="font-medium text-blue-600">2.4% each</span>
              </li>
              <li class="flex justify-between p-3 rounded bg-white shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-blue-200">
                <span class="relative group">
                  SHIF Rate
                  <span class="absolute hidden group-hover:block bg-gray-800 text-white text-xs p-2 rounded -top-10 left-0 z-10 shadow-lg">
                    Social Health Insurance Fund
                  </span>
                </span>
                <span class="font-medium text-blue-600">2.75%</span>
              </li>
              <li class="flex justify-between p-3 rounded bg-white shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-blue-200">
                <span>Housing Levy</span>
                <span class="font-medium text-blue-600">1.5%</span>
              </li>
              <li class="flex justify-between p-3 rounded bg-white shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-blue-200">
                <span class="relative group">
                  DST (Digital)
                  <span class="absolute hidden group-hover:block bg-gray-800 text-white text-xs p-2 rounded -top-10 left-0 z-10 shadow-lg">
                    Digital Service Tax for online earnings
                  </span>
                </span>
                <span class="font-medium text-blue-600">1.5%</span>
              </li>
            </ul>
          </div>

          <div class="bg-gradient-to-br from-white to-gray-50 rounded-xl p-8 border border-gray-100 shadow-lg transition-all duration-300 hover:shadow-xl hover:border-purple-200 transform hover:-translate-y-1">
            <h3 class="text-xl font-semibold text-gray-900 mb-5 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Creative Rates
            </h3>
            <ul class="space-y-3 text-sm">
              <li class="flex justify-between p-3 rounded bg-white shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-purple-200">
                <span>Designer (per hour)</span>
                <span class="font-medium text-purple-600">2,500 KES</span>
              </li>
              <li class="flex justify-between p-3 rounded bg-white shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-purple-200">
                <span>Writer (per hour)</span>
                <span class="font-medium text-purple-600">2,000 KES</span>
              </li>
              <li class="flex justify-between p-3 rounded bg-white shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-purple-200">
                <span>Musician (per hour)</span>
                <span class="font-medium text-purple-600">2,500 KES</span>
              </li>
              <li class="flex justify-between p-3 rounded bg-white shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-purple-200">
                <span>Content Creator (per hour)</span>
                <span class="font-medium text-purple-600">2,000 KES</span>
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

    <!-- Divider -->
    <div class="relative my-16">
      <div class="absolute inset-0 flex items-center">
        <div class="w-full border-t border-gray-200"></div>
      </div>
      <div class="relative flex justify-center">
        <span class="bg-white px-4 text-sm text-gray-500">Get Started</span>
      </div>
    </div>

    <!-- Call to Action Section -->
    <section class="text-center mb-12 bg-gradient-to-br from-gray-800 to-gray-900 text-white p-12 rounded-xl shadow-lg relative overflow-hidden">
      <div class="absolute top-0 left-0 w-40 h-40 bg-green-500 opacity-10 rounded-full transform -translate-x-20 -translate-y-20"></div>
      <div class="absolute bottom-0 right-0 w-40 h-40 bg-blue-500 opacity-10 rounded-full transform translate-x-20 translate-y-20"></div>
      <div class="relative z-10">
        <h2 class="text-4xl font-bold mb-6 animate-fade-in">
          Ready to Elevate Your Creative Business?
        </h2>
        <p class="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
          Join thousands of Kenyan creatives who are streamlining their finances, creating professional invoices, and navigating taxes with confidence.
        </p>
        <div class="flex flex-wrap justify-center gap-6">
          <router-link to="/auth" class="btn-primary inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-green-600 to-green-500 rounded-lg shadow-lg hover:from-green-500 hover:to-green-400 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <span>Get Started Free</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </router-link>
          <router-link to="/tax-calculator" class="btn-secondary inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-transparent border-2 border-gray-600 rounded-lg hover:bg-gray-800 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <span>Try Calculator</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-3 3a1 1 0 100 2h.01a1 1 0 100-2H10zm-4 0a1 1 0 100 2h.01a1 1 0 100-2H6z" clip-rule="evenodd" />
            </svg>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { BILLING_CONSTANTS } from '../services/billingService';
import { calculateMarketBasedPricing, PRICING_FACTORS } from '../services/billingService';
import { formatCurrency } from '../utils/taxUtils';

export default {
  name: 'HomePage',
  setup() {
    const selectedProfession = ref('designer');
    const experienceYears = ref(1);
    const hasPortfolio = ref(false);
    const isVATRegistered = ref(false);

    const professionOptions = ref([
      {
        category: 'design',
        value: 'designer',
        label: 'Graphic Designer'
      },
      {
        category: 'content',
        value: 'writer',
        label: 'Content Writer'
      },
      {
        category: 'content',
        value: 'musician',
        label: 'Musician/Producer'
      },
      {
        category: 'design',
        value: 'photographer',
        label: 'Photographer'
      },
      {
        category: 'content',
        value: 'general',
        label: 'Other Creative'
      }
    ]);

    const professionRates = computed(() => {
      return calculateMarketBasedPricing({
        profession: selectedProfession.value,
        experienceYears: experienceYears.value,
        hasPortfolio: hasPortfolio.value,
        isVATRegistered: isVATRegistered.value
      });
    });

    return {
      selectedProfession,
      experienceYears,
      hasPortfolio,
      isVATRegistered,
      professionRates,
      professionOptions,
      BILLING_CONSTANTS,
      PRICING_FACTORS,
      formatCurrency
    };
  }
};
</script>

<style scoped>
.gradient-heading {
  background: linear-gradient(to right, #10B981, #3B82F6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

section {
  transition: transform 0.3s ease-in-out;
}

section:hover {
  transform: translateY(-2px);
}

.divider {
  height: 1px;
  background: linear-gradient(to right, transparent, rgba(156, 163, 175, 0.5), transparent);
}

.animate-fade-in {
  animation: fadeIn 1s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

</style>