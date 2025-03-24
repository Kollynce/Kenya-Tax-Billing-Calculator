<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center my-12">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">
        Kenya Tax & Billing Calculator
      </h1>
      <p class="text-lg text-gray-600 max-w-3xl mx-auto">
        Simplified tax calculations and professional billing for Kenyan freelancers and creatives.
        Kenya's #1 tool for freelance financial management.
      </p>
    </div>

    <!-- Example Showcase -->
    <div class="mb-16 bg-blue-50 rounded-lg p-8">
      <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">See What You Can Create</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Tax Calculator Example -->
        <div class="bg-white rounded-lg shadow-lg overflow-hidden">
          <div class="p-6">
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Tax Calculator Example</h3>
            <div class="rounded-lg mb-4 w-full h-48 bg-gray-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <p class="text-gray-600 mb-4">
              Calculate PAYE, NSSF, and SHIF contributions with updated 2025 rates. Get monthly and annual breakdowns of your tax obligations.
            </p>
          </div>
        </div>
        
        <!-- Billing Planner Example -->
        <div class="bg-white rounded-lg shadow-lg overflow-hidden">
          <div class="p-6">
            <h3 class="text-xl font-semibold text-gray-900 mb-4">Billing Planner Example</h3>
            <div class="rounded-lg mb-4 w-full h-48 bg-gray-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p class="text-gray-600 mb-4">
              Create professional proposals and invoices with our step-by-step planner. Includes templates for different creative professions.
            </p>
          </div>
        </div>
      </div>
      
      <div class="mt-8 text-center">
        <router-link
          to="/examples"
          class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          View More Examples
        </router-link>
      </div>
    </div>

    <!-- Feature Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
      <!-- Tax Calculator Card -->
      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <div class="p-6">
          <div class="text-blue-600 mb-4">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Tax Calculator</h3>
          <p class="text-gray-600 mb-4">
            Calculate PAYE, NSSF, SHIF, and Digital Service Tax with our updated 2025 rates.
          </p>
          <router-link
            to="/tax-calculator"
            class="text-blue-600 hover:text-blue-700 font-medium"
          >
            Calculate Taxes →
          </router-link>
        </div>
      </div>

      <!-- Billing Generator Card -->
      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <div class="p-6">
          <div class="text-blue-600 mb-4">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Billing Generator</h3>
          <p class="text-gray-600 mb-4">
            Professional invoices with market-based rates for Kenyan creatives. Includes M-PESA integration.
          </p>
          <router-link
            to="/billing"
            class="text-blue-600 hover:text-blue-700 font-medium"
          >
            Create Invoice →
          </router-link>
        </div>
      </div>

      <!-- Billing Planner Card -->
      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <div class="p-6">
          <div class="text-blue-600 mb-4">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Billing Planner</h3>
          <p class="text-gray-600 mb-4">
            Create detailed project proposals with profession-specific templates and expense tracking.
          </p>
          <router-link
            to="/billing-planner"
            class="text-blue-600 hover:text-blue-700 font-medium"
          >
            Plan Project →
          </router-link>
        </div>
      </div>
    </div>

    <!-- Market Position -->
    <div class="bg-blue-50 rounded-lg p-8 mb-12">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">
        Kenya's Growing Freelance Market
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="text-center">
          <div class="text-3xl font-bold text-blue-600 mb-2">9th</div>
          <p class="text-gray-600">Global Ranking for Affordable Talent</p>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold text-blue-600 mb-2">25k+</div>
          <p class="text-gray-600">Registered Kenyan Freelancers</p>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold text-blue-600 mb-2">17.7%</div>
          <p class="text-gray-600">Annual Market Growth Rate</p>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold text-blue-600 mb-2">5M</div>
          <p class="text-gray-600">VAT Registration Threshold (KES)</p>
        </div>
      </div>
    </div>

    <!-- Call to Action -->
    <div class="text-center mb-12">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">
        Ready to Streamline Your Freelance Business?
      </h2>
      <div class="space-x-4">
        <router-link
          to="/auth"
          class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          Get Started
        </router-link>
        <router-link
          to="/tax-calculator"
          class="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Try Calculator
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage'
};
</script>