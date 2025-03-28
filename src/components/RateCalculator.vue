<template>
  <div class="bg-white rounded-2xl p-4 md:p-8 shadow-2xl border border-gray-100 transform hover:scale-[1.02] transition-all duration-300 relative overflow-hidden mx-2 md:mx-8 z-10">
    <div class="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-100 to-green-50 rounded-bl-full opacity-50" style="z-index: -1;"></div>
    
    <h2 class="text-xl md:text-2xl font-bold text-gray-900 mb-4 flex items-center relative z-10">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 md:h-8 md:w-8 mr-2 md:mr-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      Value-Based Rate Calculator
    </h2>

    <!-- Collapsible section for pricing factors -->
    <div class="mb-4">
      <button 
        @click="showPricingFactors = !showPricingFactors" 
        class="flex items-center justify-between w-full py-2 px-3 bg-purple-50 rounded-lg border border-purple-200 hover:border-purple-300 hover:bg-purple-100 transition-all duration-300"
      >
        <span class="font-medium text-gray-900">Understanding Your Rate Factors</span>
        <svg 
          class="w-5 h-5 text-purple-500 transition-transform duration-300"
          :class="{'rotate-180': showPricingFactors}"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      <div v-if="showPricingFactors" class="mt-2 p-4 bg-purple-50 rounded-lg border border-purple-200 hover:border-purple-300 transition-all duration-300">
        <div class="grid grid-cols-1 gap-4 text-sm">
          <div v-for="(factor, key) in PRICING_FACTORS" :key="key" class="flex items-start space-x-2">
            <div class="mt-1">
              <svg class="w-4 h-4" :class="factor.impact === 'High' ? 'text-purple-600' : 'text-blue-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
    </div>

    <div class="space-y-4 relative z-10">
      <!-- Essential calculator inputs -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Your Creative Field
        </label>
        <div class="relative">
          <select
            v-model="selectedProfession"
            class="w-full px-3 py-2 md:px-4 md:py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-300 transition-all duration-200"
          >
            <option v-for="option in professionOptions" 
                    :key="option.value" 
                    :value="option.value">
              {{ option.label }}
            </option>
          </select>
          <div class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <svg class="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Simplified experience and checkbox options in one row -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Experience (Years)
          </label>
          <input
            type="number"
            v-model="experienceYears"
            min="0"
            max="20"
            class="w-full px-3 py-2 md:px-4 md:py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-300 transition-all duration-200"
          />
        </div>

        <div class="space-y-2">
          <div class="flex items-center space-x-3 p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200 cursor-pointer border border-transparent hover:border-purple-200"
               @click="hasPortfolio = !hasPortfolio">
            <input
              type="checkbox"
              v-model="hasPortfolio"
              class="w-4 h-4 md:w-5 md:h-5 text-purple-600 rounded focus:ring-purple-500"
            />
            <label class="text-sm text-gray-700 font-medium cursor-pointer">Portfolio Available</label>
          </div>
          <div class="flex items-center space-x-3 p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200 cursor-pointer border border-transparent hover:border-purple-200"
               @click="isVATRegistered = !isVATRegistered">
            <input
              type="checkbox"
              v-model="isVATRegistered"
              class="w-4 h-4 md:w-5 md:h-5 text-purple-600 rounded focus:ring-purple-500"
            />
            <label class="text-sm text-gray-700 font-medium cursor-pointer">VAT Registered</label>
          </div>
        </div>
      </div>

      <!-- Rate results in a compact format -->
      <div class="bg-gradient-to-br from-purple-50 to-white rounded-xl p-4 md:p-5 shadow-lg border border-purple-100 hover:border-purple-200 transition-all duration-300">
        <div class="flex justify-between items-center mb-3">
          <h3 class="font-semibold text-gray-900 flex items-center">
            <svg class="w-4 h-4 md:w-5 md:h-5 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span class="text-sm md:text-base">Your Professional Value</span>
          </h3>
          <button 
            @click="showDetailedRates = !showDetailedRates"
            class="text-xs md:text-sm text-purple-600 hover:text-purple-700 flex items-center"
          >
            {{ showDetailedRates ? 'Less' : 'More' }} details
            <svg 
              class="w-3 h-3 md:w-4 md:h-4 ml-1 transition-transform duration-300" 
              :class="{'rotate-180': showDetailedRates}"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        <!-- Primary rate display - always visible -->
        <div class="flex flex-col sm:flex-row mb-3 gap-2">
          <div class="flex-1 p-3 bg-white rounded-lg shadow-sm border border-gray-100 hover:border-purple-200 transition-all duration-200">
            <div class="text-sm text-gray-600">Hourly Rate</div>
            <div class="text-xl md:text-2xl font-bold text-purple-600">{{ formatCurrency(professionRates.recommended) }}</div>
          </div>
          <div class="flex-1 p-3 bg-white rounded-lg shadow-sm border border-gray-100 hover:border-purple-200 transition-all duration-200">
            <div class="text-sm text-gray-600">Daily Rate</div>
            <div class="text-xl md:text-2xl font-bold text-purple-600">{{ formatCurrency(professionRates.daily) }}</div>
          </div>
        </div>

        <!-- Detailed rates - only visible when expanded -->
        <div v-if="showDetailedRates" class="space-y-3 pt-2 animate-fade-in">
          <div class="flex flex-col sm:flex-row gap-2">
            <div class="flex-1 p-3 bg-white rounded-lg shadow-sm border border-gray-100 hover:border-purple-200 transition-all duration-200">
              <div class="text-sm text-gray-600">Monthly Potential</div>
              <div class="text-base md:text-lg font-bold text-purple-600">{{ formatCurrency(professionRates.monthly) }}</div>
            </div>
            <div v-if="isVATRegistered" class="flex-1 p-3 bg-white rounded-lg shadow-sm border border-gray-100 hover:border-purple-200 transition-all duration-200">
              <div class="text-sm text-gray-600">With VAT (16%)</div>
              <div class="text-base md:text-lg font-bold text-purple-600">{{ formatCurrency(professionRates.recommendedWithVAT) }}</div>
            </div>
          </div>

          <div v-if="hasPortfolio" class="p-2 bg-purple-50 rounded-lg border border-purple-100 hover:border-purple-200 transition-all duration-200">
            <div class="flex items-start">
              <svg class="w-4 h-4 text-purple-600 mt-0.5 mr-1.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <p class="text-xs text-purple-800">
                Portfolio adds 15% premium to your rates
              </p>
            </div>
          </div>

          <div class="p-2 bg-purple-50 rounded-lg border border-purple-100 hover:border-purple-200 transition-all duration-200">
            <div class="flex items-start">
              <svg class="w-4 h-4 text-purple-600 mt-0.5 mr-1.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <p class="text-xs text-purple-800">
                {{ experienceYears }} years experience adds {{ Math.round((professionRates.multipliers.experience - 1) * 100) }}% premium
              </p>
            </div>
          </div>
        </div>

        <!-- Always visible note at the bottom -->
        <p class="text-xs text-gray-500 mt-3">
          Based on Kenya market standards. Use as starting point for pricing.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { BILLING_CONSTANTS } from '../services/billingService';
import { calculateMarketBasedPricing, PRICING_FACTORS } from '../services/billingService';
import { formatCurrency } from '../utils/taxUtils';

export default {
  name: 'RateCalculator',
  setup() {
    const selectedProfession = ref('designer');
    const experienceYears = ref(1);
    const hasPortfolio = ref(false);
    const isVATRegistered = ref(false);
    const showPricingFactors = ref(false);
    const showDetailedRates = ref(true); // Changed to true to show details by default

    const professionOptions = ref([
      { value: 'designer', label: 'Graphic Designer' },
      { value: 'writer', label: 'Content Writer' },
      { value: 'musician', label: 'Musician/Producer' },
      { value: 'photographer', label: 'Photographer' },
      { value: 'general', label: 'Other Creative' }
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
      formatCurrency,
      showPricingFactors,
      showDetailedRates
    };
  }
};
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Add transition for rotate */
.rotate-180 {
  transform: rotate(180deg);
}

/* Scale effect for hover */
.hover\:scale-102:hover {
  transform: scale(1.02);
}
</style>