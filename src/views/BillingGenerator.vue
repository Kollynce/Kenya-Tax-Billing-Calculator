<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <div class="bg-white rounded-lg shadow-lg p-6">
      <!-- Profession Selection -->
      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-4">Freelance Billing Calculator</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Select Your Profession
            </label>
            <select v-model="profession" class="w-full rounded-md border-gray-300">
              <option value="designer">Graphic Designer</option>
              <option value="writer">Content Writer</option>
              <option value="musician">Musician/Producer</option>
              <option value="general">Other Freelancer</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Years of Experience
            </label>
            <input
              type="number"
              v-model.number="experienceYears"
              min="0"
              max="30"
              class="w-full rounded-md border-gray-300"
            />
          </div>
        </div>
      </div>

      <!-- Market Position -->
      <div class="mb-8">
        <h3 class="text-lg font-semibold mb-4">Your Market Position</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="flex items-center">
            <input
              type="checkbox"
              v-model="hasPortfolio"
              class="rounded border-gray-300"
            />
            <label class="ml-2 text-sm text-gray-700">
              I have a professional portfolio
            </label>
          </div>
          <div class="flex items-center">
            <input
              type="checkbox"
              v-model="isVATRegistered"
              class="rounded border-gray-300"
            />
            <label class="ml-2 text-sm text-gray-700">
              I am VAT registered
            </label>
          </div>
        </div>
      </div>

      <!-- Recommended Rates -->
      <div v-if="marketRates" class="mb-8">
        <h3 class="text-lg font-semibold mb-4">Recommended Rates (KES)</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-gray-50 p-4 rounded-lg">
            <h4 class="font-medium text-gray-900">Standard Rate</h4>
            <p class="text-2xl font-bold text-primary">
              {{ formatCurrency(isVATRegistered ? marketRates.recommendedWithVAT : marketRates.recommended) }}/hr
            </p>
            <p class="text-sm text-gray-600">
              {{ isVATRegistered ? 'Including VAT ' : '' }}Recommended for your experience level
            </p>
          </div>
          <div class="bg-gray-50 p-4 rounded-lg">
            <h4 class="font-medium text-gray-900">Premium Rate</h4>
            <p class="text-2xl font-bold text-primary">
              {{ formatCurrency(isVATRegistered ? marketRates.premiumWithVAT : marketRates.premium) }}/hr
            </p>
            <p class="text-sm text-gray-600">
              {{ isVATRegistered ? 'Including VAT ' : '' }}For complex or urgent projects
            </p>
          </div>
          <div class="bg-gray-50 p-4 rounded-lg">
            <h4 class="font-medium text-gray-900">Monthly Potential</h4>
            <p class="text-2xl font-bold text-primary">
              {{ formatCurrency(marketRates.monthly) }}
            </p>
            <p class="text-sm text-gray-600">
              Based on 160 hours/month {{ isVATRegistered ? '(excl. VAT)' : '' }}
            </p>
          </div>
        </div>
      </div>

      <!-- Tax Insights -->
      <div v-if="marketRates?.vatRegistration" class="mb-8">
        <h3 class="text-lg font-semibold mb-4">Tax Insights for Kenyan Freelancers</h3>
        <div class="bg-blue-50 p-4 rounded-lg">
          <div v-if="marketRates.vatRegistration.shouldRegister && !isVATRegistered" class="mb-4">
            <p class="text-blue-800 font-medium">
              VAT Registration Recommended
            </p>
            <p class="text-sm text-blue-600">
              Your projected annual income of {{ formatCurrency(marketRates.vatRegistration.projectedAnnual) }}
              exceeds the VAT registration threshold of {{ formatCurrency(VAT_REGISTRATION_THRESHOLD) }}.
              As per KRA requirements, you should register for VAT.
            </p>
          </div>

          <div v-if="isVATRegistered" class="mb-4">
            <p class="text-green-800 font-medium">
              VAT Registration Active
            </p>
            <p class="text-sm text-green-600">
              Remember to add 16% VAT to all your invoices and file VAT returns by the 20th of each month.
            </p>
          </div>

          <div class="space-y-3">
            <h4 class="text-gray-700 font-medium">Tax Obligations:</h4>
            <p class="text-sm text-gray-600">
              • Income Tax: Up to 35% depending on income bracket, with personal relief of KES 28,800 annually
            </p>
            <p class="text-sm text-gray-600">
              • SHIF: 2.75% of gross income (min KES 300, max KES 1,700 monthly)
            </p>
            <p class="text-sm text-gray-600">
              • NSSF: 6% contribution (total max KES 24,000 monthly across Tier I and II)
            </p>
            <p class="text-sm text-gray-600" v-if="isDigitalProfession">
              • Digital Service Tax: 1.5% of gross transaction value for online services
            </p>
          </div>

          <div class="mt-4 pt-3 border-t border-blue-100">
            <h4 class="text-gray-700 font-medium">{{ profession }} Tax Tips:</h4>
            <ul class="list-disc list-inside space-y-1 text-sm text-gray-600 mt-2">
              <li v-if="profession === 'designer'">Track software subscriptions and equipment costs as tax-deductible expenses</li>
              <li v-if="profession === 'writer'">Research costs and reference materials are deductible business expenses</li>
              <li v-if="profession === 'musician'">Studio time, equipment, and music production costs are tax-deductible</li>
              <li>Home office expenses can be deducted proportionally to space used</li>
              <li>Keep separate business and personal accounts for easier tax filing</li>
              <li>File iTax returns by June 30th each year to avoid penalties</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Create Invoice -->
      <div class="mb-8">
        <h3 class="text-lg font-semibold mb-4">Generate Invoice</h3>
        <button
          @click="createInvoice"
          class="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark"
        >
          Create Professional Invoice
        </button>
      </div>

      <!-- Market Tips -->
      <div class="bg-gray-50 p-4 rounded-lg">
        <h3 class="text-lg font-semibold mb-2">Market Insights</h3>
        <ul class="list-disc list-inside space-y-2 text-sm text-gray-600">
          <li>Kenya ranks 9th globally for affordable freelance talent</li>
          <li>Consider offering package deals for regular clients</li>
          <li>Build a strong portfolio to command higher rates</li>
          <li>Stay compliant with tax obligations to build trust</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { calculateMarketBasedPricing } from '../services/billingService';
import { formatCurrency } from '../utils/taxUtils';
import { TAX_CONSTANTS } from '../utils/taxUtils';
import { useRouter } from 'vue-router';

export default {
  name: 'BillingGenerator',
  
  setup() {
    const router = useRouter();
    const profession = ref('general');
    const experienceYears = ref(1);
    const hasPortfolio = ref(false);
    const isVATRegistered = ref(false);
    const specialization = ref('');

    const marketRates = computed(() => calculateMarketBasedPricing({
      profession: profession.value,
      experienceYears: experienceYears.value,
      isVATRegistered: isVATRegistered.value,
      hasPortfolio: hasPortfolio.value,
      specialization: specialization.value
    }));

    // Determine if profession typically provides digital services
    const isDigitalProfession = computed(() => {
      return ['designer', 'writer'].includes(profession.value);
    });

    const createInvoice = () => {
      // Store the calculated rates and navigate to invoice creation
      router.push({
        name: 'InvoiceCreate',
        query: {
          profession: profession.value,
          rate: marketRates.value.recommended
        }
      });
    };

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
      VAT_REGISTRATION_THRESHOLD: TAX_CONSTANTS.VAT_REGISTRATION_THRESHOLD
    };
  }
};
</script>

<style scoped>
.text-primary {
  @apply text-blue-600;
}

.bg-primary {
  @apply bg-blue-600;
}

.bg-primary-dark {
  @apply bg-blue-700;
}
</style>