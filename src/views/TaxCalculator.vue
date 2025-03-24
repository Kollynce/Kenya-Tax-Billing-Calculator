<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <!-- Example Section -->
    <TaxCalculatorExample v-if="!hasStartedCalculation" class="mb-8" />

    <div class="bg-white rounded-lg shadow-lg p-6">
      <div class="px-4 py-6 sm:px-0">
        <!-- Page Header -->
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-900">Kenya Tax Calculator</h1>
          <p class="mt-2 text-gray-600">Calculate your income tax, NSSF, and SHIF contributions</p>
        </div>

        <!-- Calculator Form -->
        <div class="bg-white shadow rounded-lg p-6 mb-8">
          <form @submit.prevent="calculateTax" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Income Input -->
              <InputField
                id="income"
                v-model="income"
                label="Annual Income (KES)"
                type="number"
                :error="errors.income"
                required
              />

              <!-- Tax Year -->
              <InputField
                id="taxYear"
                v-model="taxYear"
                label="Tax Year"
                type="number"
                :min="2020"
                :max="2030"
                :error="errors.taxYear"
                required
              />
            </div>

            <!-- Options -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-4">
                <label class="flex items-center">
                  <input
                    type="checkbox"
                    v-model="includeNSSF"
                    class="form-checkbox h-4 w-4 text-kenya-green"
                  />
                  <span class="ml-2 text-gray-700">Include NSSF Contribution</span>
                </label>
                <label class="flex items-center">
                  <input
                    type="checkbox"
                    v-model="includeSHIF"
                    class="form-checkbox h-4 w-4 text-kenya-green"
                  />
                  <span class="ml-2 text-gray-700">Include SHIF Contribution</span>
                </label>
              </div>
            </div>

            <!-- Calculate Button -->
            <div class="flex justify-end">
              <Button
                type="submit"
                variant="kenya"
                :loading="loading"
                :disabled="loading"
              >
                Calculate Tax
              </Button>
            </div>
          </form>
        </div>

        <!-- Results Section -->
        <div v-if="calculation" class="space-y-8">
          <!-- Summary Cards -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-white shadow rounded-lg p-6">
              <h3 class="text-lg font-medium text-gray-900">Net Monthly Income</h3>
              <p class="mt-2 text-3xl font-bold text-kenya-green">
                {{ formatCurrency(calculation.monthlyNet) }}
              </p>
            </div>

            <div class="bg-white shadow rounded-lg p-6">
              <h3 class="text-lg font-medium text-gray-900">Monthly Deductions</h3>
              <p class="mt-2 text-3xl font-bold text-kenya-red">
                {{ formatCurrency(calculation.monthlyDeductions) }}
              </p>
            </div>

            <div class="bg-white shadow rounded-lg p-6">
              <h3 class="text-lg font-medium text-gray-900">Effective Tax Rate</h3>
              <p class="mt-2 text-3xl font-bold text-gray-900">
                {{ formatPercentage(calculation.effectiveTaxRate) }}
              </p>
            </div>
          </div>

          <!-- Detailed Breakdown -->
          <div class="bg-white shadow rounded-lg overflow-hidden">
            <div class="px-6 py-5 border-b border-gray-200">
              <h3 class="text-lg font-medium text-gray-900">Tax Breakdown</h3>
            </div>
            <div class="px-6 py-5">
              <dl class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <div>
                  <dt class="text-sm font-medium text-gray-500">Gross Annual Income</dt>
                  <dd class="mt-1 text-lg font-semibold text-gray-900">
                    {{ formatCurrency(calculation.grossIncome) }}
                  </dd>
                </div>
                <div>
                  <dt class="text-sm font-medium text-gray-500">Taxable Income</dt>
                  <dd class="mt-1 text-lg font-semibold text-gray-900">
                    {{ formatCurrency(calculation.taxableIncome) }}
                  </dd>
                </div>
                <div>
                  <dt class="text-sm font-medium text-gray-500">Income Tax</dt>
                  <dd class="mt-1 text-lg font-semibold text-gray-900">
                    {{ formatCurrency(calculation.incomeTax) }}
                  </dd>
                </div>
                <div>
                  <dt class="text-sm font-medium text-gray-500">Personal Relief</dt>
                  <dd class="mt-1 text-lg font-semibold text-gray-900">
                    {{ formatCurrency(calculation.personalRelief) }}
                  </dd>
                </div>
                <div v-if="includeNSSF">
                  <dt class="text-sm font-medium text-gray-500">NSSF Contribution</dt>
                  <dd class="mt-1 text-lg font-semibold text-gray-900">
                    {{ formatCurrency(calculation.nssfContribution) }}
                  </dd>
                </div>
                <div v-if="includeSHIF">
                  <dt class="text-sm font-medium text-gray-500">SHIF Contribution</dt>
                  <dd class="mt-1 text-lg font-semibold text-gray-900">
                    {{ formatCurrency(calculation.shifContribution) }}
                  </dd>
                </div>
                <div>
                  <dt class="text-sm font-medium text-gray-500">Total Annual Tax</dt>
                  <dd class="mt-1 text-lg font-semibold text-kenya-red">
                    {{ formatCurrency(calculation.taxAfterRelief) }}
                  </dd>
                </div>
                <div>
                  <dt class="text-sm font-medium text-gray-500">Net Annual Income</dt>
                  <dd class="mt-1 text-lg font-semibold text-kenya-green">
                    {{ formatCurrency(calculation.netIncome) }}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <!-- Monthly Breakdown -->
          <div class="bg-white shadow rounded-lg overflow-hidden">
            <div class="px-6 py-5 border-b border-gray-200">
              <h3 class="text-lg font-medium text-gray-900">Monthly Breakdown</h3>
            </div>
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Gross</th>
                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">NSSF</th>
                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">SHIF</th>
                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Tax</th>
                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Net</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="item in monthlyBreakdown" :key="item.month">
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.month }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">{{ formatCurrency(item.grossIncome) }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">{{ formatCurrency(item.nssf) }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">{{ formatCurrency(item.shif) }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">{{ formatCurrency(item.tax) }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-kenya-green">{{ formatCurrency(item.netIncome) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex justify-end space-x-4">
            <Button variant="secondary" @click="downloadReport">
              Download Report
            </Button>
            <Button
              v-if="authStore.isAuthenticated"
              variant="kenya"
              @click="saveCalculation"
              :loading="saving"
              :disabled="saving"
            >
              Save Calculation
            </Button>
            <router-link v-else to="/auth" custom v-slot="{ navigate }">
              <Button variant="secondary" @click="navigate">
                Sign in to save calculations
              </Button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useAuthStore } from '../store/authStore';
import {
  calculateNetIncome,
  formatCurrency,
  formatPercentage,
  generateMonthlyBreakdown,
  generateTaxSummary
} from '../utils/taxUtils';
import { getTaxRates, saveTaxCalculation } from '../services/taxService';
import { validateNumericInput } from '../utils/errorHandler';
import Button from '../components/Button.vue';
import InputField from '../components/InputField.vue';
import TaxCalculatorExample from '../components/TaxCalculatorExample.vue';

export default {
  name: 'TaxCalculator',
  components: {
    Button,
    InputField,
    TaxCalculatorExample
  },
  setup() {
    const authStore = useAuthStore();
    const income = ref('');
    const taxYear = ref(new Date().getFullYear());
    const includeNSSF = ref(true);
    const includeSHIF = ref(true);
    const loading = ref(false);
    const saving = ref(false);
    const errors = ref({});
    const calculation = ref(null);

    const monthlyBreakdown = computed(() => {
      if (!calculation.value) return [];
      return generateMonthlyBreakdown(calculation.value);
    });

    const validateForm = () => {
      const newErrors = {};
      
      const incomeError = validateNumericInput(Number(income.value), {
        min: 0,
        label: 'Annual Income'
      });
      if (incomeError) newErrors.income = incomeError;

      const yearError = validateNumericInput(Number(taxYear.value), {
        min: 2020,
        max: 2030,
        label: 'Tax Year'
      });
      if (yearError) newErrors.taxYear = yearError;

      errors.value = newErrors;
      return Object.keys(newErrors).length === 0;
    };

    const calculateTax = async () => {
      if (!validateForm()) return;

      loading.value = true;
      try {
        const taxRates = await getTaxRates(taxYear.value);
        calculation.value = calculateNetIncome({
          annualIncome: Number(income.value),
          includeNSSF: includeNSSF.value,
          includeSHIF: includeSHIF.value,
          taxRates,
          personalRelief: taxRates.personalRelief
        });
      } catch (error) {
        console.error('Calculation error:', error);
        // Handle error display
      } finally {
        loading.value = false;
      }
    };

    const saveCalculation = async () => {
      if (!authStore.isAuthenticated || !calculation.value) return;

      saving.value = true;
      try {
        await saveTaxCalculation(authStore.userId, {
          ...calculation.value,
          taxYear: taxYear.value,
          includeNSSF: includeNSSF.value,
          includeSHIF: includeSHIF.value
        });
        // Show success message
      } catch (error) {
        console.error('Save error:', error);
        // Handle error display
      } finally {
        saving.value = false;
      }
    };

    const downloadReport = () => {
      if (!calculation.value) return;

      const summary = generateTaxSummary(calculation.value);
      // Implement report download logic
      console.log('Downloading report:', summary);
    };

    const hasStartedCalculation = computed(() => income.value > 0);

    return {
      income,
      taxYear,
      includeNSSF,
      includeSHIF,
      loading,
      saving,
      errors,
      calculation,
      monthlyBreakdown,
      calculateTax,
      saveCalculation,
      downloadReport,
      formatCurrency,
      formatPercentage,
      authStore,
      hasStartedCalculation
    };
  }
};
</script>

<style scoped>
@media print {
  .no-print {
    display: none;
  }
}
</style>