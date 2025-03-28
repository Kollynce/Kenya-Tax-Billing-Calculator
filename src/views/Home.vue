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
        <span class="px-4 text-sm text-gray-500">Creative Economy</span>
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
        <span class="px-4 text-sm text-gray-500">Essential Tools</span>
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
        <span class="px-4 text-sm text-gray-500">Tax Information</span>
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
        <span class="px-4 text-sm text-gray-500">Get Started</span>
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
</style>