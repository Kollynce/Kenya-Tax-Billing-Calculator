<template>
  <div class="max-w-8xl mx-auto px-4 py-8">
    <!-- Header Section -->
    <div class="mb-8">
      <div class="flex items-center space-x-3 mb-4">
        <span class="inline-block px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-800 animate-pulse">
          2025 Rates
        </span>
        <span class="inline-block px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800">
          KRA Compliant
        </span>
      </div>
      <h1 class="text-3xl font-bold text-gray-900 mb-3 gradient-heading">Tax Calculator</h1>
      <p class="text-lg text-gray-600">Calculate your income tax, NSSF, SHIF, and housing levy contributions with confidence</p>
    </div>

    <div class="flex flex-col lg:flex-row gap-6">
      <!-- Left Column - Calculator Form -->
      <div class="w-full lg:w-1/3">
        <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100 sticky top-4 space-y-6">
          <form @submit.prevent="calculateTax" class="space-y-6">
            <!-- Income Details Section -->
            <div class="bg-gray-50 rounded-lg p-4 border border-gray-100 input-section">
              <h3 class="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <svg class="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Income Details
              </h3>

              <div class="space-y-4">
                <!-- Creative Profession Selection -->
                <div class="bg-white p-4 rounded-lg border border-gray-200 hover:border-green-200 transition-all duration-200">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Your Creative Profession</label>
                  <select v-model="profession" class="w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600">
                    <option value="">Select your profession</option>
                    <option value="designer">Graphic/UI Designer</option>
                    <option value="writer">Content Writer</option>
                    <option value="musician">Musician/Producer</option>
                    <option value="photographer">Photographer</option>
                    <option value="videographer">Videographer</option>
                    <option value="digital-artist">Digital Artist</option>
                    <option value="animator">Animator</option>
                    <option value="voice-artist">Voice Artist</option>
                    <option value="social-media">Social Media Creator</option>
                    <option value="general">Other Creative Professional</option>
                  </select>
                </div>

                <!-- Basic Income Field First -->
                <div class="mt-2">
                  <InputField
                    id="income"
                    v-model="income"
                    :label="incomeType === 'basic' ? 'Basic Income (KES)' : 'Net Income (KES)'"
                    type="number"
                    :error="errors.income"
                    :placeholder="paymentPeriod === 'monthly' ? '50,000' : '600,000'"
                    @input="validateIncome"
                    :formatNumber="true"
                    :decimalPlaces="0"
                  />
                </div>

                <!-- Income Type -->
                <div class="bg-white p-4 rounded-lg border border-gray-200 hover:border-green-200 transition-all duration-200">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Income Type</label>
                  <div class="flex space-x-4">
                    <label class="inline-flex items-center">
                      <input type="radio" v-model="incomeType" value="basic" class="form-radio text-green-600"/>
                      <span class="ml-2">Basic Pay</span>
                    </label>
                    <label class="inline-flex items-center">
                      <input type="radio" v-model="incomeType" value="net" class="form-radio text-green-600"/>
                      <span class="ml-2">Net Pay</span>
                    </label>
                  </div>
                </div>

                <!-- Payment Period -->
                <div class="bg-white p-4 rounded-lg border border-gray-200 hover:border-green-200 transition-all duration-200">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Payment Period</label>
                  <div class="flex space-x-4">
                    <label class="inline-flex items-center">
                      <input type="radio" v-model="paymentPeriod" value="monthly" class="form-radio text-green-600"/>
                      <span class="ml-2">Monthly</span>
                    </label>
                    <label class="inline-flex items-center">
                      <input type="radio" v-model="paymentPeriod" value="annual" class="form-radio text-green-600"/>
                      <span class="ml-2">Annual</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <!-- Deductions & Relief Section -->
            <div class="bg-gray-50 rounded-lg p-4 border border-gray-100 input-section">
              <h3 class="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <svg class="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Deductions & Relief
              </h3>

              <div class="space-y-3">
                <!-- NSSF Section -->
                <div class="bg-white p-4 rounded-lg border border-gray-200 hover:border-green-200 transition-all duration-200">
                  <div class="flex items-center justify-between mb-2">
                    <div class="flex items-center">
                      <input type="checkbox" id="includeNSSF" v-model="includeNSSF" class="form-checkbox text-green-600"/>
                      <label for="includeNSSF" class="ml-2 text-sm font-medium text-gray-700">Include NSSF</label>
                    </div>
                    <span class="text-xs text-green-600 font-medium">2.4%</span>
                  </div>

                  <div v-if="includeNSSF" class="ml-6 space-y-2 mt-2 border-t border-gray-100 pt-2">
                    <label class="flex items-center">
                      <input type="checkbox" v-model="nssfTiers.includeTierI" class="form-checkbox text-green-600"/>
                      <span class="ml-2 text-sm text-gray-600">Tier I</span>
                    </label>
                    <label class="flex items-center">
                      <input type="checkbox" v-model="nssfTiers.includeTierII" class="form-checkbox text-green-600"/>
                      <span class="ml-2 text-sm text-gray-600">Tier II</span>
                    </label>
                  </div>
                </div>

                <!-- SHIF Section -->
                <div class="bg-white p-4 rounded-lg border border-gray-200 hover:border-green-200 transition-all duration-200">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center">
                      <input type="checkbox" id="includeSHIF" v-model="includeSHIF" class="form-checkbox text-green-600"/>
                      <label for="includeSHIF" class="ml-2 text-sm font-medium text-gray-700">Include SHIF</label>
                    </div>
                    <span class="text-xs text-green-600 font-medium">2.75%</span>
                  </div>
                </div>

                <!-- Housing Levy Section -->
                <div class="bg-white p-4 rounded-lg border border-gray-200 hover:border-green-200 transition-all duration-200">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center">
                      <input type="checkbox" id="includeHousing" v-model="includeHousingLevy" class="form-checkbox text-green-600"/>
                      <label for="includeHousing" class="ml-2 text-sm font-medium text-gray-700">Include Housing Levy</label>
                    </div>
                    <span class="text-xs text-green-600 font-medium">1.5%</span>
                  </div>
                </div>

                <!-- Tax Relief Section -->
                <div class="bg-white p-4 rounded-lg border border-gray-200 hover:border-green-200 transition-all duration-200">
                  <h4 class="text-sm font-medium text-gray-900 mb-3">Tax Relief</h4>
                  
                  <div class="space-y-3">
                    <label class="flex items-center justify-between">
                      <div class="flex items-center">
                        <input type="checkbox" v-model="includePersonalRelief" class="form-checkbox text-green-600"/>
                        <span class="ml-2 text-sm text-gray-700">Personal Relief</span>
                      </div>
                      <span class="text-xs text-green-600">2,400 KES/month</span>
                    </label>
                    
                    <div>
                      <label class="flex items-center mb-2">
                        <input type="checkbox" v-model="includeInsuranceRelief" class="form-checkbox text-green-600"/>
                        <span class="ml-2 text-sm text-gray-700">Insurance Relief</span>
                      </label>
                      
                      <div v-if="includeInsuranceRelief" class="ml-6">
                        <InputField
                          id="insurancePremium"
                          v-model="insurancePremium"
                          label="Monthly Premium (KES)"
                          type="number"
                          :error="errors.insurancePremium"
                          placeholder="5,000"
                          @input="validateInsurancePremiumInput"
                          :formatNumber="true"
                          :decimalPlaces="0"
                        />
                        <p class="mt-1 text-xs text-gray-500">15% of premiums paid (max 5,000/month)</p>
                      </div>
                    </div>
                    
                    <div>
                      <label class="flex items-center mb-2">
                        <input type="checkbox" v-model="includeHousingRelief" class="form-checkbox text-green-600"/>
                        <span class="ml-2 text-sm text-gray-700">Housing Relief</span>
                      </label>
                      
                      <div v-if="includeHousingRelief" class="ml-6">
                        <InputField
                          id="housingContribution"
                          v-model="housingContribution"
                          label="Monthly Contribution (KES)"
                          type="number"
                          :error="errors.housingContribution"
                          placeholder="9,000"
                          @input="validateHousingContributionInput"
                          :formatNumber="true"
                          :decimalPlaces="0"
                        />
                        <p class="mt-1 text-xs text-gray-500">15% of contribution (max 108,000/year)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Calculate Button -->
            <div class="flex justify-end">
              <Button
                type="submit"
                variant="kenya"
                :loading="calculating"
                :disabled="calculating || !income"
              >
                Calculate Tax
              </Button>
            </div>
          </form>
        </div>
      </div>

      <!-- Right Column - Results or Example -->
      <div class="w-full lg:w-2/3">
        <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100 sticky top-4" id="tax-results-section">
          <!-- Toggle between Example and Results -->
          <div v-if="!taxSummary" class="space-y-6 mb-6">
            <div class="flex items-center justify-between mb-6">
              <div>
                <h3 class="text-2xl font-bold text-gray-900 gradient-heading">Creative Tax Guide</h3>
                <p class="text-gray-600 mt-1">Understanding your tax obligations made simple</p>
              </div>
              <span class="inline-block px-3 py-1 text-sm font-medium rounded-full bg-purple-100 text-purple-800">
                Interactive Guide
              </span>
            </div>
            
            <!-- Quick Overview Cards -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div class="bg-gradient-to-br from-green-50 to-emerald-100 p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                <h4 class="text-sm font-medium text-gray-700 mb-2">Monthly Income Sample</h4>
                <p class="text-2xl font-bold text-green-600">KES 100,000</p>
                <span class="text-xs text-gray-500">Typical creative earnings</span>
              </div>

              <div class="bg-gradient-to-br from-blue-50 to-indigo-100 p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                <h4 class="text-sm font-medium text-gray-700 mb-2">Take Home</h4>
                <p class="text-2xl font-bold text-blue-600">KES 82,500</p>
                <span class="text-xs text-gray-500">After tax & deductions</span>
              </div>

              <div class="bg-gradient-to-br from-purple-50 to-pink-100 p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                <h4 class="text-sm font-medium text-gray-700 mb-2">Monthly Savings</h4>
                <p class="text-2xl font-bold text-purple-600">KES 17,500</p>
                <span class="text-xs text-gray-500">For retirement & health</span>
              </div>
            </div>

            <!-- Interactive Tax Breakdown -->
            <div class="space-y-4">
              <h4 class="text-lg font-semibold text-gray-900 flex items-center">
                <svg class="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                </svg>
                Your Tax Benefits
              </h4>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- NSSF Benefits -->
                <div class="p-4 bg-white rounded-lg border border-gray-200 hover:border-green-200 transition-all duration-200">
                  <div class="flex items-start space-x-3">
                    <div class="p-2 bg-green-50 rounded-lg">
                      <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                      </svg>
                    </div>
                    <div>
                      <h5 class="font-medium text-gray-900">NSSF Benefits</h5>
                      <p class="text-sm text-gray-600 mt-1">Only 2.4% secures your retirement with matched employer contribution</p>
                    </div>
                  </div>
                </div>

                <!-- SHIF Benefits -->
                <div class="p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-200 transition-all duration-200">
                  <div class="flex items-start space-x-3">
                    <div class="p-2 bg-blue-50 rounded-lg">
                      <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                      </svg>
                    </div>
                    <div>
                      <h5 class="font-medium text-gray-900">SHIF Coverage</h5>
                      <p class="text-sm text-gray-600 mt-1">Comprehensive healthcare at 2.75% for you and your family</p>
                    </div>
                  </div>
                </div>

                <!-- Personal Relief -->
                <div class="p-4 bg-white rounded-lg border border-gray-200 hover:border-purple-200 transition-all duration-200">
                  <div class="flex items-start space-x-3">
                    <div class="p-2 bg-purple-50 rounded-lg">
                      <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </div>
                    <div>
                      <h5 class="font-medium text-gray-900">Tax Relief</h5>
                      <p class="text-sm text-gray-600 mt-1">KES 2,400 monthly personal relief reduces your tax burden</p>
                    </div>
                  </div>
                </div>

                <!-- Insurance Benefits -->
                <div class="p-4 bg-white rounded-lg border border-gray-200 hover:border-teal-200 transition-all duration-200">
                  <div class="flex items-start space-x-3">
                    <div class="p-2 bg-teal-50 rounded-lg">
                      <svg class="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                      </svg>
                    </div>
                    <div>
                      <h5 class="font-medium text-gray-900">Insurance Relief</h5>
                      <p class="text-sm text-gray-600 mt-1">15% relief on insurance premiums up to KES 5,000 monthly</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Actual Results Section -->
          <div v-else class="space-y-6">
            <div class="border-t border-gray-200 pt-6">
              <div class="flex justify-between items-center mb-6">
                <h2 class="text-xl font-bold text-gray-900 flex items-center">
                  <svg class="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  Tax Summary
                </h2>
                
                <!-- Summary View Toggle -->
                <div class="flex items-center bg-gray-100 rounded-lg p-1">
                  <button 
                    @click="summaryViewMode = 'monthly'" 
                    :class="[
                      'px-3 py-1 text-sm font-medium rounded-md transition-colors', 
                      summaryViewMode === 'monthly' 
                        ? 'bg-white text-green-700 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-800'
                    ]"
                  >
                    Monthly
                  </button>
                  <button 
                    @click="summaryViewMode = 'annual'" 
                    :class="[
                      'px-3 py-1 text-sm font-medium rounded-md transition-colors', 
                      summaryViewMode === 'annual' 
                        ? 'bg-white text-green-700 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-800'
                    ]"
                  >
                    Annual
                  </button>
                </div>
              </div>

              <!-- Summary Cards -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-xl shadow-lg card-hover">
                  <h3 class="text-sm font-medium text-gray-600 mb-1">Gross Income</h3>
                  <p class="text-2xl font-bold text-gray-900">
                    {{ formatCurrency(summaryViewMode === 'monthly' ? taxSummary.grossIncome / 12 : taxSummary.grossIncome) }}
                  </p>
                  <p class="text-sm text-gray-500">{{ summaryViewMode === 'monthly' ? 'per month' : 'per year' }}</p>
                </div>

                <div class="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-xl shadow-lg card-hover">
                  <h3 class="text-sm font-medium text-gray-600 mb-1">Net Income</h3>
                  <p class="text-2xl font-bold text-green-600">
                    {{ formatCurrency(summaryViewMode === 'monthly' ? taxSummary.netIncome / 12 : taxSummary.netIncome) }}
                  </p>
                  <p class="text-sm text-gray-500">{{ summaryViewMode === 'monthly' ? 'per month' : 'per year' }}</p>
                </div>

                <div class="bg-gradient-to-br from-red-50 to-pink-100 p-6 rounded-xl shadow-lg card-hover">
                  <h3 class="text-sm font-medium text-gray-600 mb-1">Total Deductions</h3>
                  <p class="text-2xl font-bold text-red-600">
                    {{ formatCurrency(summaryViewMode === 'monthly' ? taxSummary.totalDeductions / 12 : taxSummary.totalDeductions) }}
                  </p>
                  <p class="text-sm text-gray-500">{{ formatPercentage(taxSummary.totalDeductions / taxSummary.grossIncome) }} of gross</p>
                </div>
              </div>

              <!-- Detailed Breakdown -->
              <div class="mt-8">
                <h3 class="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <svg class="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Deductions Breakdown <span class="ml-2 text-sm text-gray-500">({{ summaryViewMode === 'monthly' ? 'Monthly' : 'Annual' }})</span>
                </h3>

                <div class="bg-white shadow overflow-hidden sm:rounded-lg">
                  <div class="border-t border-gray-200">
                    <dl>
                      <div class="px-4 py-3 grid grid-cols-3 gap-4 bg-gray-50">
                        <dt class="text-sm font-medium text-gray-500">PAYE Tax</dt>
                        <dd class="text-sm text-gray-900 col-span-2">
                          {{ formatCurrency(summaryViewMode === 'monthly' ? taxSummary.payeTax / 12 : taxSummary.payeTax) }}
                          <span class="text-gray-500">
                            ({{ formatPercentage(taxSummary.payeTax / taxSummary.grossIncome) }})
                          </span>
                        </dd>
                      </div>
                      
                      <div v-if="includeNSSF" class="px-4 py-3 grid grid-cols-3 gap-4">
                        <dt class="text-sm font-medium text-gray-500">NSSF Contribution</dt>
                        <dd class="text-sm text-gray-900 col-span-2">
                          {{ formatCurrency(summaryViewMode === 'monthly' ? taxSummary.nssfContribution / 12 : taxSummary.nssfContribution) }}
                          <span class="text-gray-500">
                            ({{ formatPercentage(taxSummary.nssfContribution / taxSummary.grossIncome) }})
                          </span>
                        </dd>
                      </div>

                      <div v-if="includeNSSF && nssfTiers.includeTierI" class="px-4 py-3 grid grid-cols-3 gap-4 pl-8 bg-gray-50">
                        <dt class="text-sm font-medium text-gray-500">NSSF Tier I</dt>
                        <dd class="text-sm text-gray-900 col-span-2">
                          {{ formatCurrency(summaryViewMode === 'monthly' ? taxSummary.nssfTierI / 12 : taxSummary.nssfTierI) }}
                        </dd>
                      </div>

                      <div v-if="includeNSSF && nssfTiers.includeTierII" class="px-4 py-3 grid grid-cols-3 gap-4 pl-8">
                        <dt class="text-sm font-medium text-gray-500">NSSF Tier II</dt>
                        <dd class="text-sm text-gray-900 col-span-2">
                          {{ formatCurrency(summaryViewMode === 'monthly' ? taxSummary.nssfTierII / 12 : taxSummary.nssfTierII) }}
                        </dd>
                      </div>
                      
                      <div v-if="includeSHIF" class="px-4 py-3 grid grid-cols-3 gap-4 bg-gray-50">
                        <dt class="text-sm font-medium text-gray-500">SHIF Contribution</dt>
                        <dd class="text-sm text-gray-900 col-span-2">
                          {{ formatCurrency(summaryViewMode === 'monthly' ? taxSummary.shifContribution / 12 : taxSummary.shifContribution) }}
                          <span class="text-gray-500">
                            ({{ formatPercentage(taxSummary.shifContribution / taxSummary.grossIncome) }})
                          </span>
                        </dd>
                      </div>
                      
                      <div v-if="includeHousingLevy" class="px-4 py-3 grid grid-cols-3 gap-4">
                        <dt class="text-sm font-medium text-gray-500">Housing Levy</dt>
                        <dd class="text-sm text-gray-900 col-span-2">
                          {{ formatCurrency(summaryViewMode === 'monthly' ? taxSummary.housingLevy / 12 : taxSummary.housingLevy) }}
                          <span class="text-gray-500">
                            ({{ formatPercentage(taxSummary.housingLevy / taxSummary.grossIncome) }})
                          </span>
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>

              <!-- Tax Relief Summary -->
              <div class="mt-8">
                <h3 class="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <svg class="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Tax Relief Summary <span class="ml-2 text-sm text-gray-500">({{ summaryViewMode === 'monthly' ? 'Monthly' : 'Annual' }})</span>
                </h3>

                <div class="bg-white shadow overflow-hidden sm:rounded-lg">
                  <div class="border-t border-gray-200">
                    <dl>
                      <div v-if="includePersonalRelief" class="px-4 py-3 grid grid-cols-3 gap-4 bg-gray-50">
                        <dt class="text-sm font-medium text-gray-500">Personal Relief</dt>
                        <dd class="text-sm text-gray-900 col-span-2">
                          {{ formatCurrency(summaryViewMode === 'monthly' ? taxSummary.personalRelief / 12 : taxSummary.personalRelief) }}
                          <span class="text-gray-500">
                            (Standard personal relief)
                          </span>
                        </dd>
                      </div>

                      <div v-if="includeInsuranceRelief" class="px-4 py-3 grid grid-cols-3 gap-4">
                        <dt class="text-sm font-medium text-gray-500">Insurance Relief</dt>
                        <dd class="text-sm text-gray-900 col-span-2">
                          {{ formatCurrency(summaryViewMode === 'monthly' ? taxSummary.insuranceRelief / 12 : taxSummary.insuranceRelief) }}
                          <span class="text-gray-500">
                            (15% of {{ formatCurrency(summaryViewMode === 'monthly' ? insurancePremium : insurancePremium * 12) }} {{ summaryViewMode === 'monthly' ? 'monthly' : 'annual' }} premium)
                          </span>
                        </dd>
                      </div>

                      <div v-if="includeHousingRelief" class="px-4 py-3 grid grid-cols-3 gap-4 bg-gray-50">
                        <dt class="text-sm font-medium text-gray-500">Housing Relief</dt>
                        <dd class="text-sm text-gray-900 col-span-2">
                          {{ formatCurrency(summaryViewMode === 'monthly' ? taxSummary.housingRelief / 12 : taxSummary.housingRelief) }}
                          <span class="text-gray-500">
                            (15% of {{ formatCurrency(summaryViewMode === 'monthly' ? housingContribution : housingContribution * 12) }} {{ summaryViewMode === 'monthly' ? 'monthly' : 'annual' }} contribution)
                          </span>
                        </dd>
                      </div>

                      <!-- Total Relief -->
                      <div class="px-4 py-3 grid grid-cols-3 gap-4 bg-green-50 border-t border-green-100">
                        <dt class="text-sm font-medium text-gray-700">Total Relief</dt>
                        <dd class="text-sm font-medium text-green-600 col-span-2">
                          {{ formatCurrency(summaryViewMode === 'monthly' ? taxSummary.totalRelief / 12 : taxSummary.totalRelief) }}
                          <span class="text-gray-500">
                            ({{ formatPercentage(taxSummary.totalRelief / taxSummary.grossIncome) }} of gross)
                          </span>
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>

              <!-- Monthly Breakdown - Only show in Annual view -->
              <div v-if="summaryViewMode === 'annual' && monthlyBreakdown" class="mt-8">
                <h3 class="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <svg class="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Monthly Breakdown
                </h3>

                <div class="bg-white shadow overflow-hidden rounded-lg">
                  <table class="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
                        <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Gross</th>
                        <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Deductions</th>
                        <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Net</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                      <tr v-for="(month, index) in monthlyBreakdown" :key="index">
                        <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{{ month.name }}</td>
                        <td class="px-4 py-2 whitespace-nowrap text-sm text-right text-gray-900">
                          {{ formatCurrency(month.gross) }}
                        </td>
                        <td class="px-4 py-2 whitespace-nowrap text-sm text-right text-red-600">
                          {{ formatCurrency(month.deductions) }}
                        </td>
                        <td class="px-4 py-2 whitespace-nowrap text-sm text-right text-green-600 font-medium">
                          {{ formatCurrency(month.net) }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <!-- Example Section -->
          <div v-if="!taxSummary">
            <TaxCalculatorExample />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import { useAuthStore } from '../store/authStore';
import {
  calculateNetIncome,
  calculateGrossFromNet,
  formatCurrency,
  formatPercentage,
  generateMonthlyBreakdown
} from '../utils/taxUtils';
import { getTaxRates, saveTaxCalculation } from '../services/taxService';
import { 
  validateNumericInput, 
  validateInsurancePremium, 
  validateHousingContribution 
} from '../utils/errorHandler';
import Button from '../components/Button.vue';
import InputField from '../components/InputField.vue';
import TaxCalculatorExample from '../components/TaxCalculatorExample.vue';

export default {
  name: 'TaxCalculator',
  components: {
    Button,
    InputField,
    TaxCalculatorExample
  },
  setup() {
    const authStore = useAuthStore();
    const income = ref('');
    const taxYear = ref(new Date().getFullYear());
    const includeNSSF = ref(true);
    const includeSHIF = ref(true);
    const includeHousingLevy = ref(false);
    const loading = ref(false);
    const calculating = ref(false);
    const saving = ref(false);
    const errors = ref({});
    const calculation = ref(null);
    const incomeType = ref('basic');
    const paymentPeriod = ref('annual');
    const nssfTiers = ref({
      includeTierI: true,
      includeTierII: true
    });

    // Tax Relief options
    const includePersonalRelief = ref(true);
    const includeInsuranceRelief = ref(false);
    const insurancePremium = ref('');
    const includeHousingRelief = ref(false);
    const housingContribution = ref('');
    const profession = ref('');
    const taxSummary = computed(() => calculation.value);
    const summaryViewMode = ref('monthly'); // Default view mode for results

    const validateIncome = (value) => {
      return value > 0;
    };

    const validateInsurancePremiumInput = (value) => {
      // Only validate if there's actually a value
      if (value === '') {
        delete errors.value.insurancePremium;
        return true;
      }
      
      const error = validateInsurancePremium(value);
      if (error) {
        errors.value = { ...errors.value, insurancePremium: error };
        return false;
      }
      delete errors.value.insurancePremium;
      return true;
    };

    const validateHousingContributionInput = (value) => {
      // Only validate if there's actually a value
      if (value === '') {
        delete errors.value.housingContribution;
        return true;
      }
      
      const error = validateHousingContribution(value);
      if (error) {
        errors.value = { ...errors.value, housingContribution: error };
        return false;
      }
      delete errors.value.housingContribution;
      return true;
    };

    const monthlyBreakdown = computed(() => {
      if (!taxSummary.value) return [];
      return generateMonthlyBreakdown(taxSummary.value);
    });

    const validateForm = () => {
      const newErrors = {};

      const incomeError = validateNumericInput(Number(income.value), {
        min: 0,
        label: `${incomeType.value === 'basic' ? 'Basic' : 'Net'} ${paymentPeriod.value === 'monthly' ? 'Monthly' : 'Annual'} Income`
      });
      if (incomeError) newErrors.income = incomeError;

      if (includeInsuranceRelief.value) {
        const insuranceError = validateInsurancePremium(Number(insurancePremium.value));
        if (insuranceError) newErrors.insurancePremium = insuranceError;
      }

      if (includeHousingRelief.value) {
        const housingError = validateHousingContribution(Number(housingContribution.value));
        if (housingError) newErrors.housingContribution = housingError;
      }

      const yearError = validateNumericInput(Number(taxYear.value), {
        min: 2020,
        max: 2030,
        label: 'Tax Year'
      });
      if (yearError) newErrors.taxYear = yearError;

      errors.value = newErrors;
      return Object.keys(newErrors).length === 0;
    };

    const calculateTax = async () => {
      if (!validateForm()) return;

      calculating.value = true;
      try {
        const taxRates = await getTaxRates(taxYear.value);
        
        let annualValue = Number(income.value);
        if (paymentPeriod.value === 'monthly') {
          annualValue *= 12; // Convert monthly input to annual
        }

        // If net income is provided, calculate gross
        if (incomeType.value === 'net') {
          const annualNet = paymentPeriod.value === 'monthly' ? annualValue : annualValue;
          annualValue = calculateGrossFromNet(annualNet / 12, {
            includeNSSF: includeNSSF.value,
            includeSHIF: includeSHIF.value,
            includeHousingLevy: includeHousingLevy.value,
            taxRates,
            nssfTiers: nssfTiers.value,
            personalRelief: includePersonalRelief.value ? taxRates.personalRelief : 0
          });
        }

        // Calculate net income based on annual gross
        calculation.value = calculateNetIncome({
          annualIncome: annualValue,
          includeNSSF: includeNSSF.value,
          includeSHIF: includeSHIF.value,
          includeHousingLevy: includeHousingLevy.value,
          taxRates,
          nssfTiers: nssfTiers.value,
          includePersonalRelief: includePersonalRelief.value,
          personalRelief: taxRates.personalRelief,
          includeInsuranceRelief: includeInsuranceRelief.value,
          insurancePremium: insurancePremium.value,
          includeHousingRelief: includeHousingRelief.value,
          housingContribution: housingContribution.value
        });

        // Scroll to results section after calculation completes
        setTimeout(() => {
          const resultsSection = document.getElementById('tax-results-section');
          if (resultsSection) {
            resultsSection.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }, 100);
      } catch (error) {
        console.error('Calculation error:', error);
      } finally {
        calculating.value = false;
      }
    };

    const saveCalculation = async () => {
      saving.value = true;
      try {
        if (taxSummary.value) {
          await saveTaxCalculation(authStore.userId || 'anonymous', {
            ...taxSummary.value,
            taxYear: taxYear.value,
            includeNSSF: includeNSSF.value,
            includeSHIF: includeSHIF.value,
            includeHousingLevy: includeHousingLevy.value
          });
        }
      } catch (error) {
        console.error('Save error:', error);
      } finally {
        saving.value = false;
      }
    };

    const downloadReport = () => {
      if (!taxSummary.value) return;
      console.log('Downloading report:', taxSummary.value);
    };

    const hasStartedCalculation = computed(() => income.value > 0);

    // Auto-recalculate when inputs change after first calculation
    watch([
      income, 
      incomeType, 
      paymentPeriod, 
      includeNSSF, 
      includeSHIF,
      includeHousingLevy,
      nssfTiers,
      includePersonalRelief,
      includeInsuranceRelief,
      insurancePremium,
      includeHousingRelief,
      housingContribution
    ], async () => {
      // Only auto-recalculate if we've already calculated once before
      if (calculation.value) {
        await calculateTax();
      }
    }, { deep: true });

    return {
      income,
      taxYear,
      includeNSSF,
      includeSHIF,
      includeHousingLevy,
      loading,
      calculating,
      saving,
      errors,
      calculation,
      monthlyBreakdown,
      calculateTax,
      saveCalculation,
      downloadReport,
      formatCurrency,
      formatPercentage,
      authStore,
      hasStartedCalculation,
      incomeType,
      paymentPeriod,
      nssfTiers,
      validateIncome,
      validateInsurancePremiumInput,
      validateHousingContributionInput,
      includePersonalRelief,
      includeInsuranceRelief,
      insurancePremium,
      includeHousingRelief,
      housingContribution,
      taxSummary,
      profession,
      summaryViewMode
    };
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

.gradient-heading {
  background: linear-gradient(to right, #10B981, #3B82F6);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.hover\:scale-102:hover {
  transform: scale(1.02);
}

.transition-transform {
  transition: transform 0.3s ease-in-out;
}

.card-hover {
  transition: all 0.3s ease-in-out;
}

.card-hover:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.input-section {
  transition: border-color 0.2s ease-in-out;
}

.input-section:hover {
  border-color: #10B981;
}

@media print {
  .no-print {
    display: none;
  }
}

@media (max-width: 1024px) {
  .sticky {
    position: relative;
    top: 0;
  }
}

.max-w-8xl {
  max-width: 88rem;
}

/* Smooth transitions */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>