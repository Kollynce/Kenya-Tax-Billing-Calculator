<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <div class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg shadow-lg p-6">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Tax Settings</h1>
        <p class="mt-2 text-gray-600">Configure tax rates and thresholds for calculations</p>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <form @submit.prevent="handleSubmit" class="space-y-8">
          <!-- Income Tax Brackets -->
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-4">Income Tax Brackets</h3>
            <div class="space-y-4">
              <div v-for="(bracket, index) in form.brackets" :key="index" class="p-4 bg-gray-50 rounded-lg">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <InputField
                    :id="'bracketMin' + index"
                    v-model.number="bracket.min"
                    :label="index === 0 ? 'From (KES)' : 'From (KES)'"
                    type="number"
                    :error="bracketErrors[index]?.min"
                    :disabled="index === 0"
                  />
                  <InputField
                    :id="'bracketMax' + index"
                    v-model.number="bracket.max"
                    label="To (KES)"
                    type="number"
                    :error="bracketErrors[index]?.max"
                    :placeholder="index === form.brackets.length - 1 ? 'No limit' : ''"
                    :disabled="index === form.brackets.length - 1"
                  />
                  <InputField
                    :id="'bracketRate' + index"
                    v-model.number="bracket.rate"
                    label="Rate (%)"
                    type="number"
                    step="0.01"
                    :error="bracketErrors[index]?.rate"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- NSSF Settings -->
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-4">NSSF Settings</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50 rounded-lg">
              <InputField
                id="nssfTierIRate"
                v-model.number="form.nssfTierIRate"
                label="Tier I Rate (%)"
                type="number"
                step="0.01"
                :error="errors.nssfTierIRate"
              />
              <InputField
                id="nssfTierIIRate"
                v-model.number="form.nssfTierIIRate"
                label="Tier II Rate (%)"
                type="number"
                step="0.01"
                :error="errors.nssfTierIIRate"
              />
              <InputField
                id="nssfTierILimit"
                v-model.number="form.nssfTierILimit"
                label="Tier I Monthly Limit (KES)"
                type="number"
                :error="errors.nssfTierILimit"
              />
              <InputField
                id="nssfTierIILimit"
                v-model.number="form.nssfTierIILimit"
                label="Tier II Monthly Limit (KES)"
                type="number"
                :error="errors.nssfTierIILimit"
              />
            </div>
          </div>

          <!-- SHIF Settings -->
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-4">SHIF Settings</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50 rounded-lg">
              <InputField
                id="shifRate"
                v-model.number="form.shifRate"
                label="SHIF Rate (%)"
                type="number"
                step="0.01"
                :error="errors.shifRate"
              />
              <InputField
                id="shifMinContribution"
                v-model.number="form.shifMinContribution"
                label="Minimum Monthly Contribution (KES)"
                type="number"
                :error="errors.shifMinContribution"
              />
              <InputField
                id="shifMaxContribution"
                v-model.number="form.shifMaxContribution"
                label="Maximum Monthly Contribution (KES)"
                type="number"
                :error="errors.shifMaxContribution"
              />
            </div>
          </div>

          <!-- Housing Levy Settings -->
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-4">Housing Levy Settings</h3>
            <div class="p-4 bg-gray-50 rounded-lg">
              <InputField
                id="housingLevyRate"
                v-model.number="form.housingLevyRate"
                label="Housing Levy Rate (%)"
                type="number"
                step="0.01"
                :error="errors.housingLevyRate"
              />
            </div>
          </div>

          <!-- Submit Button -->
          <div class="flex justify-end">
            <Button
              type="submit"
              variant="kenya"
              :loading="taxStore.loading"
              :disabled="taxStore.loading"
            >
              Save Changes
            </Button>
          </div>

          <div v-if="taxStore.error" class="mt-4 text-red-600">
            {{ taxStore.error }}
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useTaxStore } from '../store/taxStore';
import InputField from '../components/InputField.vue';
import Button from '../components/Button.vue';

export default {
  name: 'SettingsView',
  components: {
    InputField,
    Button
  },
  setup() {
    const taxStore = useTaxStore();
    const errors = ref({});
    const bracketErrors = ref([]);

    const form = ref({
      brackets: [
        { min: 0, max: 24000, rate: 10 },
        { min: 24001, max: 32333, rate: 25 },
        { min: 32334, max: 500000, rate: 30 },
        { min: 500001, max: 800000, rate: 32.5 },
        { min: 800001, max: null, rate: 35 }
      ],
      shifRate: 2.75,
      shifMinContribution: 300,
      shifMaxContribution: 1000,
      nssfTierIRate: 6,
      nssfTierIIRate: 6,
      nssfTierILimit: 6000,
      nssfTierIILimit: 12000,
      housingLevyRate: 1.5,
      personalRelief: 28800,
      vatRate: 16
    });

    const loadSettings = async () => {
      try {
        await taxStore.loadTaxRates();
        if (taxStore.taxRates) {
          const rates = taxStore.taxRates;
          form.value = {
            brackets: rates.brackets || form.value.brackets,
            shifRate: typeof rates.shifRate === 'number' ? rates.shifRate * 100 : form.value.shifRate,
            shifMinContribution: rates.shifMinContribution || form.value.shifMinContribution,
            shifMaxContribution: rates.shifMaxContribution || form.value.shifMaxContribution,
            nssfTierIRate: typeof rates.nssfTierIRate === 'number' ? rates.nssfTierIRate * 100 : form.value.nssfTierIRate,
            nssfTierIIRate: typeof rates.nssfTierIIRate === 'number' ? rates.nssfTierIIRate * 100 : form.value.nssfTierIIRate,
            nssfTierILimit: rates.nssfTierILimit || form.value.nssfTierILimit,
            nssfTierIILimit: rates.nssfTierIILimit || form.value.nssfTierIILimit,
            housingLevyRate: rates.housingLevyRate || form.value.housingLevyRate,
            personalRelief: rates.personalRelief || form.value.personalRelief,
            vatRate: typeof rates.vatRate === 'number' ? rates.vatRate * 100 : form.value.vatRate
          };
        }
      } catch (error) {
        console.error('Error loading tax rates:', error);
      }
    };

    const validateForm = () => {
      errors.value = {};
      bracketErrors.value = [];
      let isValid = true;

      // Validate tax brackets
      form.value.brackets.forEach((bracket, index) => {
        const bracketError = {};
        if (bracket.min < 0) {
          bracketError.min = 'Minimum value cannot be negative';
          isValid = false;
        }
        if (bracket.max && bracket.max <= bracket.min) {
          bracketError.max = 'Maximum value must be greater than minimum';
          isValid = false;
        }
        if (bracket.rate < 0 || bracket.rate > 100) {
          bracketError.rate = 'Rate must be between 0 and 100';
          isValid = false;
        }
        if (Object.keys(bracketError).length > 0) {
          bracketErrors.value[index] = bracketError;
        }
      });

      // Validate other fields
      if (form.value.shifRate < 0 || form.value.shifRate > 100) {
        errors.value.shifRate = 'SHIF rate must be between 0 and 100';
        isValid = false;
      }
      if (form.value.shifMinContribution < 0) {
        errors.value.shifMinContribution = 'Minimum SHIF contribution cannot be negative';
        isValid = false;
      }
      if (form.value.shifMaxContribution < 0) {
        errors.value.shifMaxContribution = 'Maximum SHIF contribution cannot be negative';
        isValid = false;
      }
      if (form.value.nssfTierIRate < 0 || form.value.nssfTierIRate > 100) {
        errors.value.nssfTierIRate = 'NSSF Tier I rate must be between 0 and 100';
        isValid = false;
      }
      if (form.value.nssfTierIIRate < 0 || form.value.nssfTierIIRate > 100) {
        errors.value.nssfTierIIRate = 'NSSF Tier II rate must be between 0 and 100';
        isValid = false;
      }
      if (form.value.nssfTierILimit < 0) {
        errors.value.nssfTierILimit = 'NSSF Tier I limit cannot be negative';
        isValid = false;
      }
      if (form.value.nssfTierIILimit < 0) {
        errors.value.nssfTierIILimit = 'NSSF Tier II limit cannot be negative';
        isValid = false;
      }
      if (form.value.housingLevyRate < 0 || form.value.housingLevyRate > 100) {
        errors.value.housingLevyRate = 'Housing levy rate must be between 0 and 100';
        isValid = false;
      }
      if (form.value.personalRelief < 0) {
        errors.value.personalRelief = 'Personal relief cannot be negative';
        isValid = false;
      }
      if (form.value.vatRate < 0 || form.value.vatRate > 100) {
        errors.value.vatRate = 'VAT rate must be between 0 and 100';
        isValid = false;
      }

      return isValid;
    };

    const handleSubmit = async () => {
      if (!validateForm()) return;

      try {
        await taxStore.updateRates({
          ...form.value,
          shifRate: form.value.shifRate / 100,
          nssfTierIRate: form.value.nssfTierIRate / 100,
          nssfTierIIRate: form.value.nssfTierIIRate / 100,
          vatRate: form.value.vatRate / 100
        });
        // Show success message
      } catch (error) {
        console.error('Error saving settings:', error);
      }
    };

    const resetForm = () => {
      loadSettings();
    };

    onMounted(loadSettings);

    return {
      form,
      errors,
      bracketErrors,
      taxStore,
      handleSubmit,
      resetForm
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
</style>