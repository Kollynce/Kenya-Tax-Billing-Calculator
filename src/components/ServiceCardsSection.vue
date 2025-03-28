<template>
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
      
      <!-- Card Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        <ServiceCard 
          v-for="service in services" 
          :key="service.id" 
          v-bind="service"
        />
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
</template>

<script>
import ServiceCard from './ServiceCard.vue';

export default {
  name: 'ServiceCardsSection',
  components: {
    ServiceCard
  },
  data() {
    return {
      services: [
        {
          id: 'tax-calculator',
          title: 'Smart Tax Calculator',
          subtitle: 'Plan Your 2025 Taxes with Ease',
          icon: 'calculator',
          color: 'green',
          features: [
            'Supports PAYE, NSSF, SHIF, and DST',
            'Real-time 2025 tax calculations',
            'Accurate statutory deductions'
          ],
          link: '/tax-calculator',
          linkText: 'Calculate Taxes'
        },
        {
          id: 'professional-billing',
          title: 'Professional Billing',
          subtitle: 'Create Invoices That Impress',
          icon: 'billing',
          color: 'blue',
          features: [
            'Market-informed rates by profession',
            'Automatic VAT calculation (16%)',
            'M-PESA integration'
          ],
          link: '/billing',
          linkText: 'Create Invoice'
        },
        {
          id: 'project-planner',
          title: 'Project Planner',
          subtitle: 'Build Winning Proposals Fast',
          icon: 'planner',
          color: 'purple',
          features: [
            'Profession-specific templates',
            'Detailed cost breakdowns',
            'Timeline planning'
          ],
          link: '/billing-planner',
          linkText: 'Plan Project'
        },
        {
          id: 'billing-planner',
          title: 'Creative Billing Planner',
          subtitle: 'Craft Professional Proposals',
          icon: 'document',
          color: 'teal',
          preview: true,
          features: [],
          link: '/billing-planner',
          linkText: 'Try Billing Planner'
        }
      ]
    }
  }
}
</script>