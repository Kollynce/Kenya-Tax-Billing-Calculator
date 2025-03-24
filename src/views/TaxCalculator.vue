<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <div class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg shadow-lg p-6">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Tax Calculator</h1>
        <p class="mt-2 text-gray-600">Calculate your income tax, NSSF, SHIF, and housing levy contributions</p>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <!-- Calculator Form -->
        <form @submit.prevent="calculateTax" class="space-y-6">
          <!-- Income Type and Period -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700">Income Type</label>
                  <div class="flex space-x-4">
                    <label class="inline-flex items-center">
                      <input
                        type="radio"
                        v-model="incomeType"
                        value="basic"
                        class="form-radio text-green-600"
                      />
                      <span class="ml-2">Basic Pay</span>
                    </label>
                    <label class="inline-flex items-center">
                      <input
                        type="radio"
                        v-model="incomeType"
                        value="net"
                        class="form-radio text-green-600"
                      />
                      <span class="ml-2">Net Pay</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700">Payment Period</label>
                  <div class="flex space-x-4">
                    <label class="inline-flex items-center">
                      <input
                        type="radio"
                        v-model="paymentPeriod"
                        value="monthly"
                        class="form-radio text-green-600"
                      />
                      <span class="ml-2">Monthly</span>
                    </label>
                    <label class="inline-flex items-center">
                      <input
                        type="radio"
                        v-model="paymentPeriod"
                        value="annual"
                        class="form-radio text-green-600"
                      />
                      <span class="ml-2">Annual</span>
                    </label>
                  </div>
                </div>
              </div>

              <div class="mt-6">
                <InputField
                  id="income"
                  v-model="income"
                  :label="incomeType === 'basic' ? 'Basic Income (KES)' : 'Net Income (KES)'"
                  type="text"
                  :error="errors.income"
                  :placeholder="paymentPeriod === 'monthly' ? '50,000' : '600,000'"
                  @input="validateIncome"
                />
              </div>
            </div>

            <div>
              <div class="space-y-4">
                <div class="flex items-center">
                  <input
                    type="checkbox"
                    id="includeNSSF"
                    v-model="includeNSSF"
                    class="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <label for="includeNSSF" class="ml-2 block text-sm text-gray-700">
                    Include NSSF
                  </label>
                </div>

                <div class="flex items-center">
                  <input
                    type="checkbox"
                    id="includeSHIF"
                    v-model="includeSHIF"
                    class="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <label for="includeSHIF" class="ml-2 block text-sm text-gray-700">
                    Include SHIF
                  </label>
                </div>

                <div class="flex items-center">
                  <input
                    type="checkbox"
                    id="includeHousing"
                    v-model="includeHousingLevy"
                    class="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <label for="includeHousing" class="ml-2 block text-sm text-gray-700">
                    Include Housing Levy
                  </label>
                </div>
              </div>
            </div>
          </div>

          <!-- Calculate Button -->
          <div class="flex justify-end">
            <Button
              type="submit"
              variant="kenya"
              :loading="calculating"
              :disabled="calculating || !income"
            >
              Calculate Tax
            </Button>
          </div>
        </form>

        <!-- Results -->
        <div v-if="taxSummary" class="mt-8 space-y-6">
          <div class="border-t border-gray-200 pt-6">
            <h2 class="text-lg font-medium text-gray-900 mb-4">Tax Summary</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="bg-gray-50 p-4 rounded-lg">
                <h3 class="text-sm font-medium text-gray-500">Gross Income</h3>
                <p class="mt-1 text-2xl font-semibold text-gray-900">
                  {{ formatCurrency(taxSummary.grossIncome) }}
                </p>
                <p class="text-sm text-gray-500">{{ paymentPeriod === 'monthly' ? 'per month' : 'per year' }}</p>
              </div>
              
              <div class="bg-gray-50 p-4 rounded-lg">
                <h3 class="text-sm font-medium text-gray-500">Net Income</h3>
                <p class="mt-1 text-2xl font-semibold text-green-600">
                  {{ formatCurrency(taxSummary.netIncome) }}
                </p>
                <p class="text-sm text-gray-500">{{ paymentPeriod === 'monthly' ? 'per month' : 'per year' }}</p>
              </div>
              
              <div class="bg-gray-50 p-4 rounded-lg">
                <h3 class="text-sm font-medium text-gray-500">Total Deductions</h3>
                <p class="mt-1 text-2xl font-semibold text-red-600">
                  {{ formatCurrency(taxSummary.totalDeductions) }}
                </p>
                <p class="text-sm text-gray-500">{{ formatPercentage(taxSummary.totalDeductions / taxSummary.grossIncome) }} of gross</p>
              </div>
            </div>

            <!-- Detailed Breakdown -->
            <div class="mt-6">
              <h3 class="text-lg font-medium text-gray-900 mb-4">Deductions Breakdown</h3>
              
              <div class="bg-white shadow overflow-hidden sm:rounded-lg">
                <div class="border-t border-gray-200">
                  <dl>
                    <div class="px-4 py-3 grid grid-cols-3 gap-4 bg-gray-50">
                      <dt class="text-sm font-medium text-gray-500">PAYE Tax</dt>
                      <dd class="text-sm text-gray-900 col-span-2">
                        {{ formatCurrency(taxSummary.payeTax) }}
                        <span class="text-gray-500">
                          ({{ formatPercentage(taxSummary.payeTax / taxSummary.grossIncome) }})
                        </span>
                      </dd>
                    </div>
                    
                    <div v-if="includeNSSF" class="px-4 py-3 grid grid-cols-3 gap-4">
                      <dt class="text-sm font-medium text-gray-500">NSSF Contribution</dt>
                      <dd class="text-sm text-gray-900 col-span-2">
                        {{ formatCurrency(taxSummary.nssfContribution) }}
                        <span class="text-gray-500">
                          ({{ formatPercentage(taxSummary.nssfContribution / taxSummary.grossIncome) }})
                        </span>
                      </dd>
                    </div>
                    
                    <div v-if="includeSHIF" class="px-4 py-3 grid grid-cols-3 gap-4 bg-gray-50">
                      <dt class="text-sm font-medium text-gray-500">SHIF Contribution</dt>
                      <dd class="text-sm text-gray-900 col-span-2">
                        {{ formatCurrency(taxSummary.shifContribution) }}
                        <span class="text-gray-500">
                          ({{ formatPercentage(taxSummary.shifContribution / taxSummary.grossIncome) }})
                        </span>
                      </dd>
                    </div>
                    
                    <div v-if="includeHousingLevy" class="px-4 py-3 grid grid-cols-3 gap-4">
                      <dt class="text-sm font-medium text-gray-500">Housing Levy</dt>
                      <dd class="text-sm text-gray-900 col-span-2">
                        {{ formatCurrency(taxSummary.housingLevy) }}
                        <span class="text-gray-500">
                          ({{ formatPercentage(taxSummary.housingLevy / taxSummary.grossIncome) }})
                        </span>
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>

            <!-- Monthly Breakdown -->
            <div v-if="monthlyBreakdown" class="mt-8">
              <h3 class="text-lg font-medium text-gray-900 mb-4">Monthly Breakdown</h3>
              
              <div class="bg-white shadow overflow-hidden rounded-lg">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
                      <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Gross</th>
                      <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Deductions</th>
                      <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Net</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200">
                    <tr v-for="(month, index) in monthlyBreakdown" :key="index">
                      <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{{ month.name }}</td>
                      <td class="px-4 py-2 whitespace-nowrap text-sm text-right text-gray-900">
                        {{ formatCurrency(month.gross) }}
                      </td>
                      <td class="px-4 py-2 whitespace-nowrap text-sm text-right text-red-600">
                        {{ formatCurrency(month.deductions) }}
                      </td>
                      <td class="px-4 py-2 whitespace-nowrap text-sm text-right text-green-600 font-medium">
                        {{ formatCurrency(month.net) }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Save Button -->
          <div class="mt-6 flex justify-end">
            <Button
              @click="saveCalculation"
              variant="secondary"
              :loading="saving"
              :disabled="saving"
              v-if="authStore.isAuthenticated"
            >
              Save Calculation
            </Button>
          
            <!-- Login Prompt -->
            <div v-else class="mt-6 bg-gray-50 p-4 rounded-lg">
              <p class="text-sm text-gray-600">Want to save your calculations?</p>
              <router-link
                to="/auth"
                class="mt-2 inline-flex items-center text-sm font-medium text-green-600 hover:text-green-500"
              >
                Sign in or create an account
                <svg class="ml-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a 1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
              </router-link>
            </div>
          </div>
        </div>

        <!-- Example Section -->
        <div v-if="!taxSummary">
          <TaxCalculatorExample />
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
  calculateGrossFromNet,
  formatCurrency,
  formatPercentage,
  generateMonthlyBreakdown
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
    const includeHousingLevy = ref(false);
    const loading = ref(false);
    const calculating = ref(false);
    const saving = ref(false);
    const errors = ref({});
    const calculation = ref(null);
    const incomeType = ref('basic');
    const paymentPeriod = ref('annual');
    const nssfTiers = ref({
      includeTierI: true,
      includeTierII: true
    });

    const taxSummary = computed(() => calculation.value);

    const validateIncome = (value) => {
      return value > 0;
    };

    const monthlyBreakdown = computed(() => {
      if (!taxSummary.value) return [];
      return generateMonthlyBreakdown(taxSummary.value);
    });

    const validateForm = () => {
      const newErrors = {};
      
      const incomeError = validateNumericInput(Number(income.value), {
        min: 0,
        label: `${incomeType.value === 'basic' ? 'Basic' : 'Net'} ${paymentPeriod.value === 'monthly' ? 'Monthly' : 'Annual'} Income`
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

      calculating.value = true;
      try {
        const taxRates = await getTaxRates(taxYear.value);
        
        let annualValue = Number(income.value);
        if (paymentPeriod.value === 'monthly') {
          annualValue *= 12;
        }

        if (incomeType.value === 'net') {
          annualValue = calculateGrossFromNet(annualValue / 12, {
            includeNSSF: includeNSSF.value,
            includeSHIF: includeSHIF.value,
            includeHousingLevy: includeHousingLevy.value,
            taxRates,
            nssfTiers: nssfTiers.value,
            personalRelief: taxRates.personalRelief
          });
        }

        calculation.value = calculateNetIncome({
          annualIncome: annualValue,
          includeNSSF: includeNSSF.value,
          includeSHIF: includeSHIF.value,
          includeHousingLevy: includeHousingLevy.value,
          taxRates,
          personalRelief: taxRates.personalRelief,
          nssfTiers: nssfTiers.value
        });
      } catch (error) {
        console.error('Calculation error:', error);
      } finally {
        calculating.value = false;
      }
    };

    const saveCalculation = async () => {
      saving.value = true;
      try {
        if (taxSummary.value) {
          await saveTaxCalculation(authStore.userId || 'anonymous', {
            ...taxSummary.value,
            taxYear: taxYear.value,
            includeNSSF: includeNSSF.value,
            includeSHIF: includeSHIF.value,
            includeHousingLevy: includeHousingLevy.value
          });
        }
      } catch (error) {
        console.error('Save error:', error);
      } finally {
        saving.value = false;
      }
    };

    const downloadReport = () => {
      if (!taxSummary.value) return;
      console.log('Downloading report:', taxSummary.value);
    };

    const hasStartedCalculation = computed(() => income.value > 0);

    return {
      income,
      taxYear,
      includeNSSF,
      includeSHIF,
      includeHousingLevy,
      loading,
      calculating,
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
      hasStartedCalculation,
      incomeType,
      paymentPeriod,
      nssfTiers,
      validateIncome,
      taxSummary
    };
  }
};
</script>

<style scoped>
.text-primary {
  color: #16A34A;  /* text-green-600 equivalent */
}

.bg-primary {
  background-color: #16A34A;  /* bg-green-600 equivalent */
}

.bg-primary-dark {
  background-color: #15803D;  /* bg-green-700 equivalent */
}

@media print {
  .no-print {
    display: none;
  }
}
</style>