<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <div class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg shadow-lg p-6">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Billing Generator</h1>
        <p class="mt-2 text-gray-600">Create professional invoices for your creative work</p>
      </div>

      <!-- Generator Form -->
      <div class="bg-white rounded-lg shadow p-6">
        <!-- Profession Selection -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Profession</label>
            <select
              v-model="profession"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600"
            >
              <option value="designer">Designer</option>
              <option value="writer">Writer</option>
              <option value="musician">Musician</option>
              <option value="general">Other Profession</option>
            </select>

            <div class="mt-4 space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Years Experience</label>
                <input
                  type="number"
                  v-model.number="experienceYears"
                  min="0"
                  max="20"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600"
                />
              </div>

              <div class="flex items-center">
                <input
                  type="checkbox"
                  v-model="hasPortfolio"
                  class="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <label class="ml-2 block text-sm text-gray-700">Portfolio Available</label>
              </div>

              <div class="flex items-center">
                <input
                  type="checkbox"
                  v-model="isVATRegistered"
                  class="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <label class="ml-2 block text-sm text-gray-700">VAT Registered</label>
              </div>
            </div>
          </div>

          <!-- Recommended Rates -->
          <div v-if="marketRates" class="space-y-6">
            <h3 class="text-lg font-semibold text-gray-900">Recommended Rates (KES)</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="bg-white p-4 rounded-lg shadow">
                <h4 class="font-medium text-gray-900">Standard Rate</h4>
                <p class="text-2xl font-bold text-green-600">
                  {{ formatCurrency(isVATRegistered ? marketRates.recommendedWithVAT : marketRates.recommended) }}/hr
                </p>
                <p class="text-sm text-gray-600">
                  {{ isVATRegistered ? 'Including VAT ' : '' }}Recommended for your experience level
                </p>
              </div>
              <div class="bg-white p-4 rounded-lg shadow">
                <h4 class="font-medium text-gray-900">Premium Rate</h4>
                <p class="text-2xl font-bold text-green-600">
                  {{ formatCurrency(isVATRegistered ? marketRates.premiumWithVAT : marketRates.premium) }}/hr
                </p>
                <p class="text-sm text-gray-600">
                  {{ isVATRegistered ? 'Including VAT ' : '' }}For complex or urgent projects
                </p>
              </div>
              <div class="bg-white p-4 rounded-lg shadow">
                <h4 class="font-medium text-gray-900">Monthly Potential</h4>
                <p class="text-2xl font-bold text-green-600">
                  {{ formatCurrency(marketRates.monthly) }}
                </p>
                <p class="text-sm text-gray-600">
                  Based on 160 hours/month {{ isVATRegistered ? '(excl. VAT)' : '' }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Tax Insights -->
        <div v-if="marketRates?.vatRegistration" class="mb-8">
          <div class="bg-white rounded-lg shadow p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Tax Insights for Kenyan Freelancers</h3>
            
            <div v-if="marketRates.vatRegistration.shouldRegister && !isVATRegistered" class="mb-4 bg-blue-50 p-4 rounded-lg">
              <p class="text-blue-800 font-medium">
                VAT Registration Recommended
              </p>
              <p class="text-sm text-blue-600">
                Your projected annual income of {{ formatCurrency(marketRates.vatRegistration.projectedAnnual) }}
                exceeds the VAT registration threshold of {{ formatCurrency(VAT_REGISTRATION_THRESHOLD) }}.
                As per KRA requirements, you should register for VAT.
              </p>
            </div>

            <div v-if="isVATRegistered" class="mb-4 bg-green-50 p-4 rounded-lg">
              <p class="text-green-800 font-medium">
                VAT Registration Active
              </p>
              <p class="text-sm text-green-600">
                Remember to add 16% VAT to all your invoices and file VAT returns by the 20th of each month.
              </p>
            </div>

            <div class="space-y-4">
              <div>
                <h4 class="text-gray-700 font-medium">Tax Obligations:</h4>
                <ul class="mt-2 space-y-1 text-sm text-gray-600 list-disc list-inside">
                  <li>Income Tax: Up to 35% depending on income bracket, with personal relief of KES 28,800 annually</li>
                  <li>SHIF: 2.75% of gross income (min KES 300, max KES 1,700 monthly)</li>
                  <li>NSSF: 6% contribution (total max KES 24,000 monthly across Tier I and II)</li>
                  <li v-if="isDigitalProfession">Digital Service Tax: 1.5% of gross transaction value for online services</li>
                </ul>
              </div>

              <div class="pt-3 border-t border-gray-200">
                <h4 class="text-gray-700 font-medium">{{ profession }} Tax Tips:</h4>
                <ul class="mt-2 space-y-1 text-sm text-gray-600 list-disc list-inside">
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
        </div>

        <!-- Create Invoice -->
        <div class="mb-8">
          <h3 class="text-lg font-semibold mb-4">Generate Invoice</h3>
          <button
            @click="createInvoice"
            class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-500"
          >
            Create Professional Invoice
          </button>
        </div>

        <!-- Market Tips -->
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Market Insights</h3>
          <ul class="list-disc list-inside space-y-2 text-sm text-gray-600">
            <li>Kenya ranks 9th globally for affordable freelance talent</li>
            <li>Consider offering package deals for regular clients</li>
            <li>Build a strong portfolio to command higher rates</li>
            <li>Stay compliant with tax obligations to build trust</li>
          </ul>
        </div>
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
  color: #16A34A;
}

.bg-primary {
  background-color: #16A34A;
}

.bg-primary-dark {
  background-color: #15803D;
}
</style>