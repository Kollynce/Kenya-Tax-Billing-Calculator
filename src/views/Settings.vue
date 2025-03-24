<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <div class="bg-white shadow-lg rounded-lg overflow-hidden">
      <!-- Header -->
      <div class="bg-kenya-gradient p-6 text-white">
        <h1 class="text-3xl font-bold">Settings</h1>
        <p class="mt-2">Manage tax rates and system settings</p>
      </div>

      <div class="p-6">
        <div v-if="!authStore.isAuthenticated" class="text-center py-8">
          <p class="text-lg text-gray-600">Please sign in to access settings.</p>
          <router-link to="/auth" class="mt-4 inline-block">
            <Button variant="kenya">Sign In</Button>
          </router-link>
        </div>

        <form v-else @submit.prevent="saveTaxRates" class="space-y-8">
          <!-- Tax Brackets -->
          <div>
            <h2 class="text-xl font-semibold mb-4">Tax Brackets</h2>
            <div class="space-y-4">
              <div v-for="(bracket, index) in form.brackets" :key="index" class="p-4 border rounded-lg">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <InputField
                      :id="'bracket-min-' + index"
                      v-model.number="bracket.min"
                      label="Minimum (KES)"
                      type="number"
                      :error="getBracketError(index, 'min')"
                    />
                  </div>
                  <div>
                    <InputField
                      :id="'bracket-max-' + index"
                      v-model.number="bracket.max"
                      label="Maximum (KES)"
                      type="number"
                      :error="getBracketError(index, 'max')"
                      placeholder="Leave empty for no maximum"
                    />
                  </div>
                  <div>
                    <InputField
                      :id="'bracket-rate-' + index"
                      v-model.number="bracket.rate"
                      label="Rate (%)"
                      type="number"
                      step="0.01"
                      :error="getBracketError(index, 'rate')"
                    />
                  </div>
                </div>
                <div class="mt-2 flex justify-end">
                  <Button
                    type="button"
                    variant="secondary"
                    @click="removeBracket(index)"
                    class="text-sm"
                  >
                    Remove Bracket
                  </Button>
                </div>
              </div>

              <Button
                type="button"
                variant="secondary"
                @click="addBracket"
                class="w-full"
              >
                Add Tax Bracket
              </Button>
            </div>
          </div>

          <!-- SHIF Settings -->
          <div>
            <h2 class="text-xl font-semibold mb-4">SHIF Settings</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                id="shifRate"
                v-model.number="form.shifRate"
                label="SHIF Rate (%)"
                type="number"
                step="0.01"
                :error="errors.shifRate"
              />
              <InputField
                id="shifMin"
                v-model.number="form.shifMin"
                label="Minimum Annual SHIF (KES)"
                type="number"
                :error="errors.shifMin"
              />
            </div>
          </div>

          <!-- NSSF Settings -->
          <div>
            <h2 class="text-xl font-semibold mb-4">NSSF Settings</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                id="nssfRate"
                v-model.number="form.nssfRate"
                label="NSSF Rate (%)"
                type="number"
                step="0.01"
                :error="errors.nssfRate"
              />
              <InputField
                id="nssfMax"
                v-model.number="form.nssfMax"
                label="Maximum Monthly NSSF (KES)"
                type="number"
                :error="errors.nssfMax"
              />
            </div>
          </div>

          <!-- Other Settings -->
          <div>
            <h2 class="text-xl font-semibold mb-4">Other Settings</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                id="personalRelief"
                v-model.number="form.personalRelief"
                label="Annual Personal Relief (KES)"
                type="number"
                :error="errors.personalRelief"
              />
              <InputField
                id="vatRate"
                v-model.number="form.vatRate"
                label="VAT Rate (%)"
                type="number"
                step="0.01"
                :error="errors.vatRate"
              />
            </div>
          </div>

          <div class="flex justify-end space-x-4">
            <Button type="button" variant="secondary" @click="resetForm">
              Reset
            </Button>
            <Button 
              type="submit" 
              variant="kenya" 
              :disabled="taxStore.loading"
            >
              Save Changes
            </Button>
          </div>

          <div v-if="taxStore.error" class="mt-4 text-red-600">
            {{ taxStore.error }}
          </div>
          <div v-if="saveSuccess" class="mt-4 text-green-600">
            Settings saved successfully!
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/authStore';
import { useTaxStore } from '../store/taxStore';
import InputField from '../components/InputField.vue';
import Button from '../components/Button.vue';

export default {
  name: 'SettingsPage',
  components: {
    InputField,
    Button
  },
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();
    const taxStore = useTaxStore();
    const errors = reactive({});
    const bracketErrors = ref([]);
    const saveSuccess = ref(false);

    const form = reactive({
      brackets: [],
      shifRate: 0,
      shifMin: 0,
      nssfRate: 0,
      nssfMax: 0,
      personalRelief: 0,
      vatRate: 0
    });

    const loadSettings = async () => {
      try {
        await taxStore.loadTaxRates();
        if (taxStore.taxRates) {
          Object.assign(form, {
            ...taxStore.taxRates,
            shifRate: taxStore.taxRates.shifRate * 100,
            nssfRate: taxStore.taxRates.nssfRate * 100,
            vatRate: taxStore.taxRates.vatRate * 100
          });
        }
      } catch (error) {
        console.error('Error loading tax rates:', error);
      }
    };

    const validateForm = () => {
      errors.shifRate = '';
      errors.shifMin = '';
      errors.nssfRate = '';
      errors.nssfMax = '';
      errors.personalRelief = '';
      errors.vatRate = '';
      bracketErrors.value = [];
      let isValid = true;

      // Validate tax brackets
      form.brackets.forEach((bracket, index) => {
        const bracketError = {};
        if (bracket.min < 0) {
          bracketError.min = 'Minimum cannot be negative';
          isValid = false;
        }
        if (bracket.max && bracket.max <= bracket.min) {
          bracketError.max = 'Maximum must be greater than minimum';
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
      if (form.shifRate < 0 || form.shifRate > 100) {
        errors.shifRate = 'SHIF rate must be between 0 and 100';
        isValid = false;
      }
      if (form.shifMin < 0) {
        errors.shifMin = 'Minimum SHIF cannot be negative';
        isValid = false;
      }
      if (form.nssfRate < 0 || form.nssfRate > 100) {
        errors.nssfRate = 'NSSF rate must be between 0 and 100';
        isValid = false;
      }
      if (form.nssfMax < 0) {
        errors.nssfMax = 'Maximum NSSF cannot be negative';
        isValid = false;
      }
      if (form.personalRelief < 0) {
        errors.personalRelief = 'Personal relief cannot be negative';
        isValid = false;
      }
      if (form.vatRate < 0 || form.vatRate > 100) {
        errors.vatRate = 'VAT rate must be between 0 and 100';
        isValid = false;
      }

      return isValid;
    };

    const saveTaxRates = async () => {
      if (!validateForm()) return;

      try {
        const rates = {
          ...form,
          shifRate: form.shifRate / 100,
          nssfRate: form.nssfRate / 100,
          vatRate: form.vatRate / 100
        };
        await taxStore.updateRates(rates);
        saveSuccess.value = true;
        setTimeout(() => {
          saveSuccess.value = false;
        }, 3000);
      } catch (error) {
        console.error('Error saving tax rates:', error);
      }
    };

    const addBracket = () => {
      form.brackets.push({
        min: 0,
        max: null,
        rate: 0
      });
    };

    const removeBracket = (index) => {
      form.brackets.splice(index, 1);
      bracketErrors.value.splice(index, 1);
    };

    const getBracketError = (index, field) => {
      return bracketErrors.value[index]?.[field] || '';
    };

    const resetForm = () => {
      loadSettings();
      errors.value = {};
      bracketErrors.value = [];
      saveSuccess.value = false;
    };

    onMounted(() => {
      if (!authStore.isAuthenticated) {
        router.push('/auth');
        return;
      }
      loadSettings();
    });

    return {
      form,
      errors,
      authStore,
      taxStore,
      saveSuccess,
      saveTaxRates,
      addBracket,
      removeBracket,
      getBracketError,
      resetForm
    };
  }
};
</script>