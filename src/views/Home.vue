<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Hero Section -->
    <HeroSection />

    <!-- Divider -->
    <div class="relative my-16">
      <div class="absolute inset-0 flex items-center">
        <div class="w-full border-t border-gray-200"></div>
      </div>
      <div class="relative flex justify-center">
        <span class="pill-gradient px-6 py-1 text-sm rounded-full">Creative Economy</span>
      </div>
    </div>

    <!-- Market Position Section -->
    <MarketPositionSection />

    <!-- Divider -->
    <div class="relative my-16">
      <div class="absolute inset-0 flex items-center">
        <div class="w-full border-t border-gray-200"></div>
      </div>
      <div class="relative flex justify-center">
        <span class="pill-gradient px-6 py-1 text-sm rounded-full">Essential Tools</span>
      </div>
    </div>

    <!-- Service Cards Section -->
    <ServiceCardsSection />

    <!-- Divider -->
    <div class="relative my-16">
      <div class="absolute inset-0 flex items-center">
        <div class="w-full border-t border-gray-200"></div>
      </div>
      <div class="relative flex justify-center">
        <span class="pill-gradient px-6 py-1 text-sm rounded-full">Tax Information</span>
      </div>
    </div>

    <!-- Tax Rate Summary Section -->
    <TaxRateSummarySection />

    <!-- Divider -->
    <div class="relative my-16">
      <div class="absolute inset-0 flex items-center">
        <div class="w-full border-t border-gray-200"></div>
      </div>
      <div class="relative flex justify-center">
        <span class="pill-gradient px-6 py-1 text-sm rounded-full">Get Started</span>
      </div>
    </div>

    <!-- Call to Action Section -->
    <CTASection />
  </div>
</template>

<script>
import HeroSection from '../components/HeroSection.vue';
import MarketPositionSection from '../components/MarketPositionSection.vue';
import ServiceCardsSection from '../components/ServiceCardsSection.vue';
import TaxRateSummarySection from '../components/TaxRateSummarySection.vue';
import CTASection from '../components/CTASection.vue';

export default {
  name: 'HomePage',
  components: {
    HeroSection,
    MarketPositionSection,
    ServiceCardsSection,
    TaxRateSummarySection,
    CTASection
  }
}
</script>

<style scoped>
.divider {
  height: 1px;
  background: linear-gradient(to right, transparent, rgba(156, 163, 175, 0.5), transparent);
}

.pill-gradient {
  background: linear-gradient(
    135deg,
    #16A34A 0%,    /* green */
    #2563EB 20%,   /* blue */
    #8B5CF6 40%,   /* purple */
    #EC4899 60%,   /* pink */
    #EAB308 80%,   /* yellow */
    #14B8A6 100%   /* teal */
  );
  color: white;
  font-weight: 500;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  animation: gradientMove 5s ease-in-out infinite;
  background-size: 300% 300%;
}

@keyframes gradientMove {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>