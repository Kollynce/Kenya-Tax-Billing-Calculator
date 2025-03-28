<template>
  <section class="bg-gradient-to-b from-white to-gray-50 py-12 my-16 rounded-xl border border-gray-100 shadow-lg transform hover:shadow-xl transition-all duration-500">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Left column with text content -->
      <div class="flex flex-col justify-center space-y-6 px-6 md:px-8 relative z-10">
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
      
      <!-- Right column with calculator -->
      <RateCalculator />
    </div>
  </section>
</template>

<script>
import RateCalculator from './RateCalculator.vue';

export default {
  name: 'HeroSection',
  components: {
    RateCalculator
  }
}
</script>

<style scoped>
.gradient-heading {
  background: linear-gradient(to right, #10B981, #3B82F6);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>