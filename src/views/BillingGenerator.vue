<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <!-- Enhanced Header Section -->
    <div class="mb-8">
      <div class="flex items-center space-x-3 mb-4">
        <span class="inline-block px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-800 animate-pulse">
          2025 Rates
        </span>
        <span class="inline-block px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800">
          Made for Creatives
        </span>
      </div>
      <h1 class="text-4xl font-bold text-gray-900 mb-3 gradient-heading">Smart Billing Generator</h1>
      <p class="text-lg text-gray-600">Create professional invoices that reflect your true value as a creative professional</p>
    </div>

    <div class="flex flex-col lg:flex-row gap-8">
      <!-- Left Column - Generator Form -->
      <div class="w-full lg:w-1/3">
        <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100 sticky top-4">
          <!-- Form Header -->
          <h3 class="text-xl font-bold text-gray-900 mb-4 gradient-heading">Creative Rate Calculator</h3>
          <p class="text-sm text-gray-600 mb-6">Fill in your details to get personalized rate recommendations</p>
          
          <!-- Form Content -->
          <form @submit.prevent="calculateTax" class="space-y-6">
            <!-- Profession Selection -->
            <div class="form-group">
              <label class="block text-sm font-medium text-gray-700 mb-2">Your Profession</label>
              <select
                v-model="profession"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600"
              >
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

            <!-- Experience Years -->
            <div class="form-group">
              <label class="block text-sm font-medium text-gray-700 mb-2">Years Experience</label>
              <input
                type="number"
                v-model.number="experienceYears"
                min="0"
                max="20"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600"
              />
              <p class="mt-1 text-xs text-gray-500">Experience directly impacts your recommended rates</p>
            </div>
            
            <!-- Professional Options -->
            <div class="space-y-3">
              <h4 class="text-sm font-medium text-gray-700 mb-2">Professional Options</h4>
              
              <!-- Portfolio Available -->
              <div class="p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200 border border-transparent hover:border-purple-200 flex items-center justify-between group cursor-pointer"
                   @click="hasPortfolio = !hasPortfolio">
                <div class="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    v-model="hasPortfolio"
                    class="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                  />
                  <span class="text-sm text-gray-700">Portfolio Available</span>
                </div>
                <span class="text-xs px-2 py-1 bg-purple-100 text-purple-600 font-medium rounded-full">+15%</span>
                
                <!-- Portfolio tooltip -->
                <div class="hidden group-hover:block absolute z-20 w-64 p-3 bg-white rounded-lg shadow-lg border border-purple-100 right-0 mt-2 transform translate-y-8 -translate-x-1/3">
                  <p class="text-xs text-gray-600">A well-curated portfolio showing your best work allows you to charge premium rates.</p>
                </div>
              </div>
              
              <!-- VAT Registered -->
              <div class="p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200 border border-transparent hover:border-purple-200 flex items-center justify-between group cursor-pointer"
                   @click="isVATRegistered = !isVATRegistered">
                <div class="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    v-model="isVATRegistered"
                    class="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                  />
                  <span class="text-sm text-gray-700">VAT Registered</span>
                </div>
                <span class="text-xs px-2 py-1 bg-purple-100 text-purple-600 font-medium rounded-full">+16%</span>
                
                <!-- VAT tooltip -->
                <div class="hidden group-hover:block absolute z-20 w-64 p-3 bg-white rounded-lg shadow-lg border border-purple-100 right-0 mt-2 transform translate-y-8 -translate-x-1/3">
                  <p class="text-xs text-gray-600">VAT registered businesses charge an additional 16% on invoices. Required if your annual turnover exceeds 5M KES.</p>
                </div>
              </div>
            </div>
            
            <!-- Quick Example Card -->
            <div class="mt-6 p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
              <h4 class="text-sm font-medium text-gray-700 mb-3 flex items-center">
                <svg class="w-4 h-4 mr-1 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Sample Rate Preview
              </h4>
              
              <div v-if="marketRates" class="bg-white/80 backdrop-blur p-3 rounded-lg">
                <div class="flex justify-between text-sm mb-2">
                  <span>Standard Rate:</span>
                  <span class="font-medium">{{ formatCurrency(marketRates.recommended) }}/hr</span>
                </div>
                <div class="flex justify-between text-sm mb-2" v-if="isVATRegistered">
                  <span>With VAT (16%):</span>
                  <span class="font-medium text-purple-600">{{ formatCurrency(marketRates.recommendedWithVAT) }}/hr</span>
                </div>
                <div class="flex justify-between text-sm font-medium text-green-600 pt-2 border-t border-green-100">
                  <span>Monthly Potential:</span>
                  <span>{{ formatCurrency(marketRates.monthly) }}</span>
                </div>
                <p class="text-xs text-gray-500 mt-2 italic">Based on 160hrs/month</p>
              </div>
            </div>
            
            <!-- Create Invoice Button -->
            <button
              @click="createInvoice"
              class="w-full mt-4 py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 flex items-center justify-center"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              Generate Professional Invoice
            </button>
          </form>
        </div>
      </div>

      <!-- Right Column - Interactive Guide -->
      <div class="w-full lg:w-2/3">
        <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <!-- Market Rates Section -->
          <div v-if="marketRates" class="space-y-6">
            <div class="flex items-center justify-between mb-6">
              <div>
                <h3 class="text-2xl font-bold text-gray-900 gradient-heading">Professional Rates Guide</h3>
                <p class="text-gray-600 mt-1">Current market rates for your profession</p>
              </div>
              <span class="inline-block px-3 py-1 text-sm font-medium rounded-full bg-purple-100 text-purple-800">
                Market Research Based
              </span>
            </div>

            <!-- Simple Rate Guide -->
            <div class="mb-8 p-4 bg-gradient-to-br from-gray-50 to-purple-50 rounded-xl border border-gray-200">
              <h4 class="text-lg font-medium text-gray-900 mb-4">Rates By Experience Level</h4>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div class="p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300">
                  <h5 class="text-sm font-medium text-gray-900">Beginner Rate</h5>
                  <p class="text-xl font-bold text-green-600 mt-1">{{ formatCurrency(marketRates.beginner) }}/hr</p>
                  <p class="text-xs text-gray-500 mt-1">0-2 years experience</p>
                </div>
                <div class="p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300">
                  <h5 class="text-sm font-medium text-gray-900">Intermediate Rate</h5>
                  <p class="text-xl font-bold text-blue-600 mt-1">{{ formatCurrency(marketRates.intermediate) }}/hr</p>
                  <p class="text-xs text-gray-500 mt-1">2-5 years experience</p>
                </div>
                <div class="p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300">
                  <h5 class="text-sm font-medium text-gray-900">Expert Rate</h5>
                  <p class="text-xl font-bold text-purple-600 mt-1">{{ formatCurrency(marketRates.expert) }}/hr</p>
                  <p class="text-xs text-gray-500 mt-1">5+ years experience</p>
                </div>
              </div>
            </div>

            <!-- Rate Cards Grid -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div class="bg-gradient-to-br from-green-50 to-emerald-100 p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                <h4 class="text-sm font-medium text-gray-700 mb-2">Standard Rate</h4>
                <p class="text-2xl font-bold text-green-600">
                  {{ formatCurrency(isVATRegistered ? marketRates.recommendedWithVAT : marketRates.recommended) }}/hr
                </p>
                <span class="text-xs text-gray-500">Base rate for your experience</span>
              </div>

              <div class="bg-gradient-to-br from-blue-50 to-indigo-100 p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                <h4 class="text-sm font-medium text-gray-700 mb-2">Premium Rate</h4>
                <p class="text-2xl font-bold text-blue-600">
                  {{ formatCurrency(isVATRegistered ? (marketRates.premium * 1.16) : marketRates.premium) }}/hr
                </p>
                <span class="text-xs text-gray-500">For complex projects</span>
              </div>

              <div class="bg-gradient-to-br from-purple-50 to-pink-100 p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                <h4 class="text-sm font-medium text-gray-700 mb-2">Monthly Potential</h4>
                <p class="text-2xl font-bold text-purple-600">
                  {{ formatCurrency(marketRates.monthly) }}
                </p>
                <span class="text-xs text-gray-500">Based on 160 hours/month</span>
              </div>
            </div>

            <!-- Tax Insights Section -->
            <div class="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200">
              <h4 class="text-lg font-semibold text-gray-900 mb-4">Tax Insights</h4>
              
              <!-- VAT Registration Alert -->
              <div v-if="marketRates.vatRegistration?.shouldRegister && !isVATRegistered" 
                   class="mb-4 bg-blue-50 p-4 rounded-lg border border-blue-100">
                <p class="text-blue-800 font-medium flex items-center">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  VAT Registration Recommended
                </p>
                <p class="text-sm text-blue-600 mt-1">
                  Your projected annual income of {{ formatCurrency(marketRates.vatRegistration.projectedAnnual) }}
                  exceeds the VAT threshold. Consider registering for VAT.
                </p>
              </div>

              <!-- Tax Tips Grid -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div v-for="(tip, index) in professionTaxTips" :key="index"
                     class="p-4 bg-white rounded-lg border border-gray-200 hover:border-green-200 transition-all duration-200">
                  <div class="flex items-start space-x-3">
                    <div class="p-2 bg-green-50 rounded-lg">
                      <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p class="text-sm text-gray-600">{{ tip }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Market Insights Section with Interactive Charts -->
          <div class="my-8 bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div class="flex items-center justify-between mb-6">
              <div>
                <h3 class="text-2xl font-bold text-gray-900 gradient-heading">Market Insights</h3>
                <p class="text-gray-600 mt-1">Understanding your market position</p>
              </div>
            </div>

            <!-- Market Position Overview -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div class="bg-gradient-to-br from-green-50 to-emerald-100 p-4 rounded-xl">
                <h4 class="text-sm font-medium text-gray-700 mb-2">Your Rate</h4>
                <p class="text-2xl font-bold text-green-600">
                  {{ formatCurrency(marketRates.recommended) }}/hr
                </p>
                <p class="text-sm text-gray-600">Based on your experience</p>
              </div>

              <div class="bg-gradient-to-br from-blue-50 to-indigo-100 p-4 rounded-xl">
                <h4 class="text-sm font-medium text-gray-700 mb-2">Market Average</h4>
                <p class="text-2xl font-bold text-blue-600">
                  {{ formatCurrency(marketRates.marketAverage) }}/hr
                </p>
                <p class="text-sm text-gray-600">Industry standard rate</p>
              </div>

              <div class="bg-gradient-to-br from-purple-50 to-pink-100 p-4 rounded-xl">
                <h4 class="text-sm font-medium text-gray-700 mb-2">Top Earners</h4>
                <p class="text-2xl font-bold text-purple-600">
                  {{ formatCurrency(marketRates.topRate) }}/hr
                </p>
                <p class="text-sm text-gray-600">90th percentile rate</p>
              </div>
            </div>

            <!-- Interactive Rate Comparison Chart -->
            <div class="mb-8">
              <h4 class="text-lg font-medium text-gray-900 mb-4">Rate Comparison by Experience</h4>
              <div class="h-64 w-full bg-white rounded-lg border border-gray-100">
                <div v-if="!chartReady" class="h-full w-full flex items-center justify-center">
                  <div class="animate-pulse flex flex-col items-center">
                    <svg class="w-10 h-10 text-green-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <span class="text-sm text-gray-500">Loading chart...</span>
                  </div>
                </div>
                <div v-else class="h-full w-full p-4">
                  <RateComparisonChart :profession-rates="chartRates" />
                </div>
              </div>
            </div>

            <!-- Profession-Specific Market Trends -->
            <div class="space-y-6">
              <h4 class="text-lg font-medium text-gray-900 mb-4">{{ getProfessionLabel(profession) }} Market Trends</h4>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Demand Indicator -->
                <div class="bg-white p-4 rounded-lg border border-gray-200 hover:border-green-200 transition-all duration-200">
                  <div class="flex items-start space-x-3">
                    <div class="p-2 bg-green-50 rounded-lg">
                      <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                      </svg>
                    </div>
                    <div>
                      <h5 class="font-medium text-gray-900">Market Demand</h5>
                      <p class="text-2xl font-bold text-green-600 mt-1">{{ marketInsights.demand }}%</p>
                      <p class="text-sm text-gray-600 mt-1">Increase in job postings this year</p>
                    </div>
                  </div>
                </div>

                <!-- Skills in Demand -->
                <div class="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-200 transition-all duration-200">
                  <div class="flex items-start space-x-3">
                    <div class="p-2 bg-blue-50 rounded-lg">
                      <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                      </svg>
                    </div>
                    <div>
                      <h5 class="font-medium text-gray-900">Top Skills in Demand</h5>
                      <div class="flex flex-wrap gap-2 mt-2">
                        <span v-for="skill in marketInsights.skills" 
                              :key="skill"
                              class="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded-full">
                          {{ skill }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Growth Areas -->
                <div class="bg-white p-4 rounded-lg border border-gray-200 hover:border-purple-200 transition-all duration-200">
                  <div class="flex items-start space-x-3">
                    <div class="p-2 bg-purple-50 rounded-lg">
                      <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                      </svg>
                    </div>
                    <div>
                      <h5 class="font-medium text-gray-900">Growth Areas</h5>
                      <ul class="mt-2 space-y-1">
                        <li v-for="area in marketInsights.growthAreas" 
                            :key="area"
                            class="text-sm text-gray-600 flex items-center">
                          <svg class="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                          </svg>
                          {{ area }}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <!-- Client Types -->
                <div class="bg-white p-4 rounded-lg border border-gray-200 hover:border-teal-200 transition-all duration-200">
                  <div class="flex items-start space-x-3">
                    <div class="p-2 bg-teal-50 rounded-lg">
                      <svg class="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                      </svg>
                    </div>
                    <div>
                      <h5 class="font-medium text-gray-900">Client Distribution</h5>
                      <div class="mt-2 grid grid-cols-2 gap-x-4 gap-y-2">
                        <div v-for="(percentage, type) in marketInsights.clientTypes" 
                             :key="type"
                             class="mb-1">
                          <div class="flex justify-between text-xs text-gray-600 mb-1">
                            <span>{{ type }}</span>
                            <span>{{ percentage }}%</span>
                          </div>
                          <div class="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div class="h-full bg-teal-500 rounded-full" :style="{ width: `${percentage}%` }"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

          
            </div>
          </div>

          <!-- Enhanced Market Insights Section -->
          <div class="mt-8">
            <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <svg class="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
              </svg>
              Market Insights
            </h3>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Global Ranking Card -->
              <div class="bg-gradient-to-br from-green-50 to-emerald-100 p-4 rounded-xl border border-green-100 hover:border-green-200 transition-all duration-300">
                <div class="flex items-start space-x-3">
                  <div class="p-2 bg-white rounded-lg shadow-sm">
                    <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-medium text-gray-900">Global Ranking</h4>
                    <p class="text-2xl font-bold text-green-600 mt-1">9th</p>
                    <p class="text-sm text-gray-600 mt-1">Kenya's position globally for affordable creative talent</p>
                  </div>
                </div>
              </div>

              <!-- Growth Stats Card -->
              <div class="bg-gradient-to-br from-blue-50 to-indigo-100 p-4 rounded-xl border border-blue-100 hover:border-blue-200 transition-all duration-300">
                <div class="flex items-start space-x-3">
                  <div class="p-2 bg-white rounded-lg shadow-sm">
                    <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-medium text-gray-900">Industry Growth</h4>
                    <p class="text-2xl font-bold text-blue-600 mt-1">17.5%</p>
                    <p class="text-sm text-gray-600 mt-1">Annual growth rate in creative sector</p>
                  </div>
                </div>
              </div>

              <!-- Strategic Tips -->
              <div class="md:col-span-2 bg-white p-4 rounded-xl border border-gray-200 hover:border-purple-200 transition-all duration-300">
                <h4 class="font-medium text-gray-900 mb-3">Strategic Growth Tips</h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="flex items-start space-x-3">
                    <div class="p-2 bg-purple-50 rounded-lg">
                      <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                      </svg>
                    </div>
                    <div>
                      <p class="text-sm font-medium text-gray-900">Package Deals</p>
                      <p class="text-xs text-gray-600 mt-1">Create tiered service packages to increase client retention and revenue predictability</p>
                    </div>
                  </div>

                  <div class="flex items-start space-x-3">
                    <div class="p-2 bg-purple-50 rounded-lg">
                      <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                      </svg>
                    </div>
                    <div>
                      <p class="text-sm font-medium text-gray-900">Portfolio Management</p>
                      <p class="text-xs text-gray-600 mt-1">Regularly update your portfolio with recent work and case studies to justify higher rates</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import RateComparisonChart from '../components/RateComparisonChart.vue';
import { formatCurrency, TAX_CONSTANTS, BILLING_CONSTANTS } from '../utils/taxUtils';

export default {
  name: 'BillingGenerator',
  
  components: {
    RateComparisonChart
  },
  
  setup() {
    const router = useRouter();
    const profession = ref('general');
    const experienceYears = ref(1);
    const hasPortfolio = ref(false);
    const isVATRegistered = ref(false);
    const specialization = ref('');
    const timeRange = ref('monthly');
    const chartReady = ref(false);

    const marketRates = computed(() => {
      // Get base rate for the profession
      const baseRate = profession.value ? 
        (BILLING_CONSTANTS.MINIMUM_HOURLY_RATES[profession.value] || BILLING_CONSTANTS.MINIMUM_HOURLY_RATES.general) : 
        BILLING_CONSTANTS.MINIMUM_HOURLY_RATES.general;

      // Calculate rates based on experience (10% increase per year, max 100%)
      const experienceMultiplier = Math.min(2, 1 + (experienceYears.value * 0.1));
      
      // Portfolio and VAT adjustments
      const portfolioBonus = hasPortfolio.value ? 0.15 : 0;
      const vatAdjustment = isVATRegistered.value ? 1.16 : 1;
      
      const recommended = Number((baseRate * experienceMultiplier * (1 + portfolioBonus)).toFixed(2));
      const recommendedWithVAT = Number((recommended * vatAdjustment).toFixed(2));
      
      // Premium rate is 25% higher than recommended
      const premium = Number((recommended * 1.25).toFixed(2));

      // Calculate different experience level rates
      const beginner = Number(baseRate.toFixed(2));
      const intermediate = Number((baseRate * 1.5).toFixed(2));
      const expert = Number((baseRate * 2).toFixed(2));
      const topRate = Number((baseRate * 2.5).toFixed(2));
      const marketAverage = Number((baseRate * 1.75).toFixed(2));

      return {
        beginner,
        intermediate,
        expert,
        topRate,
        recommended,
        recommendedWithVAT,
        premium,
        marketAverage,
        monthly: Number((recommended * 160).toFixed(2)), // Assuming 160 working hours per month
        vatRegistration: {
          shouldRegister: (recommended * 160 * 12) >= TAX_CONSTANTS.VAT_REGISTRATION_THRESHOLD,
          projectedAnnual: Number((recommended * 160 * 12).toFixed(2))
        }
      };
    });

    // Determine if profession typically provides digital services
    const isDigitalProfession = computed(() => {
      return ['designer', 'writer'].includes(profession.value);
    });

    const professionTaxTips = computed(() => {
      const commonTips = [
        'Keep separate business and personal accounts',
        'Document all your expenses with receipts'
      ];

      const professionSpecificTips = {
        designer: [
          'Track software subscriptions as business expenses',
          'Include font and asset licensing costs in quotes',
          'Consider charging for multiple usage rights'
        ],
        writer: [
          'Charge different rates for different content types',
          'Include research time in your quotes',
          'Consider royalty arrangements for books/publications'
        ],
        musician: [
          'Include studio time in your project costs',
          'Consider licensing fees for equipment use',
          'Add distribution platform fees to client quotes'
        ],
        photographer: [
          'Include equipment depreciation in your rates',
          'Charge separately for photo editing time',
          'Consider location and travel expenses'
        ],
        videographer: [
          'Factor in post-production time',
          'Include equipment rental in quotes',
          'Consider charging for raw footage'
        ],
        'digital-artist': [
          'Include revision cycles in your quotes',
          'Consider licensing terms for digital assets',
          'Factor in rendering time for complex projects'
        ],
        animator: [
          'Break down costs per second of animation',
          'Include storyboarding time in quotes',
          'Factor in rendering and revision time'
        ],
        'voice-artist': [
          'Charge per finished minute of audio',
          'Include studio time in your rates',
          'Consider usage rights in different media'
        ],
        'social-media': [
          'Package content creation with management',
          'Include analytics reporting time',
          'Factor in platform-specific content adaptation'
        ],
        general: [
          'Document your creative process',
          'Include consultation time in quotes',
          'Consider value-based pricing'
        ]
      };

      return [
        ...(professionSpecificTips[profession.value] || professionSpecificTips.general),
        ...commonTips
      ];
    });

    const marketTrends = {
      designer: {
        demand: 25,
        skills: ['UI/UX', 'Figma', 'Brand Design', 'Motion Graphics'],
        growthAreas: ['App Design', 'Design Systems', 'NFT Design'],
        clientTypes: {
          'Startups': 40,
          'Corporate': 30,
          'SMEs': 20,
          'Agencies': 10
        }
      },
      writer: {
        demand: 32,
        skills: ['SEO Writing', 'Technical Writing', 'UX Writing', 'Storytelling'],
        growthAreas: ['AI Content Strategy', 'Video Scripts', 'Technical Documentation'],
        clientTypes: {
          'Digital Marketing': 35,
          'Tech Companies': 30,
          'Media': 20,
          'Education': 15
        }
      },
      musician: {
        demand: 28,
        skills: ['Music Production', 'Sound Design', 'Mixing', 'Composition'],
        growthAreas: ['Game Audio', 'Podcast Production', 'Virtual Events'],
        clientTypes: {
          'Entertainment': 45,
          'Advertising': 25,
          'Games': 20,
          'Events': 10
        }
      },
      photographer: {
        demand: 22,
        skills: ['Product Photography', 'Event Coverage', 'Retouching', 'Aerial'],
        growthAreas: ['E-commerce', 'Virtual Tours', 'Corporate Events'],
        clientTypes: {
          'E-commerce': 40,
          'Corporate': 25,
          'Events': 20,
          'Real Estate': 15
        }
      },
      'digital-artist': {
        demand: 35,
        skills: ['Digital Illustration', '3D Modeling', 'Character Design'],
        growthAreas: ['NFT Art', 'Metaverse Assets', 'Game Art'],
        clientTypes: {
          'Gaming': 45,
          'Entertainment': 25,
          'Publishing': 20,
          'Advertising': 10
        }
      },
      general: {
        demand: 20,
        skills: ['Project Management', 'Client Communication', 'Digital Tools'],
        growthAreas: ['Remote Collaboration', 'Digital Transformation', 'Creative Tech'],
        clientTypes: {
          'Small Business': 40,
          'Corporate': 30,
          'Individuals': 20,
          'Agencies': 10
        }
      }
    };

    const getProfessionLabel = (value) => {
      const labels = {
        designer: 'Graphic/UI Designer',
        writer: 'Content Writer',
        musician: 'Musician/Producer',
        photographer: 'Photographer',
        'digital-artist': 'Digital Artist',
        general: 'Creative Professional'
      };
      return labels[value] || value;
    };

    const createInvoice = () => {
      // Store the calculated rates and navigate to invoice creation
      router.push({
        name: 'InvoiceCreate',
        query: {
          profession: profession.value,
          rate: marketRates.value.recommended,
          isVATRegistered: isVATRegistered.value,
          experienceYears: experienceYears.value,
          hasPortfolio: hasPortfolio.value,
          monthlyPotential: marketRates.value.monthly,
          marketAverage: marketRates.value.marketAverage,
          // Pass profession-specific data
          professionLabel: getProfessionLabel(profession.value),
          skills: marketInsights.value.skills?.join(', '),
          clientDistribution: JSON.stringify(marketInsights.value.clientTypes)
        }
      });
    };

    // Chart data computed property
    const chartRates = computed(() => {
      return [
        marketRates.value.beginner,
        marketRates.value.intermediate,
        marketRates.value.expert,
        marketRates.value.topRate
      ];
    });
    
    // Initialize chart with a small delay to ensure component is mounted
    onMounted(() => {
      setTimeout(() => {
        chartReady.value = true;
      }, 300);
    });

    // Simplify the market insights section by moving it to a computed property
    const marketInsights = computed(() => {
      if (!profession.value || !marketTrends[profession.value]) {
        return marketTrends.general;
      }
      return marketTrends[profession.value];
    });

    // Watch for changes that should update chart data
    watch([profession, experienceYears, hasPortfolio, isVATRegistered], () => {
      // No action needed - chart will update automatically since we use computed properties
    });

    return {
      profession,
      experienceYears,
      hasPortfolio,
      isVATRegistered,
      specialization,
      marketRates,
      isDigitalProfession,
      createInvoice,
      formatCurrency,
      VAT_REGISTRATION_THRESHOLD: TAX_CONSTANTS.VAT_REGISTRATION_THRESHOLD,
      professionTaxTips,
      timeRange,
      chartRates,
      chartReady,
      marketTrends,
      getProfessionLabel,
      marketInsights
    };
  }
};
</script>

<style scoped>
.gradient-heading {
  background: linear-gradient(to right, #10B981, #3B82F6);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.card-hover {
  transition: all 0.3s ease-in-out;
}

.card-hover:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.text-primary {
  color: #16A34A;
}

.bg-primary {
  background-color: #16A34A;
}

.bg-primary-dark {
  background-color: #15803D;
}

/* Add specific chart styles */
canvas {
  max-width: 100%;
  max-height: 100%;
}
</style>