<template>
  <section class="text-center mb-12 bg-gradient-to-br from-gray-800 to-gray-900 text-white p-12 rounded-xl shadow-lg relative overflow-hidden">
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
</template>

<script>
export default {
  name: 'CTASection'
}
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>