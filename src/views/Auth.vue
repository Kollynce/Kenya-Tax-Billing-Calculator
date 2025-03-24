<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <div class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg shadow-lg p-6">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">{{ isRegistering ? 'Create Account' : 'Sign In' }}</h1>
        <p class="mt-2 text-gray-600">
          {{ isRegistering ? 'Create your account to save calculations and manage billing' : 'Sign in to access your tax calculations and billing history' }}
        </p>
      </div>

      <div class="bg-white shadow rounded-lg p-6 max-w-md mx-auto">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Email -->
          <div>
            <InputField
              id="email"
              v-model="form.email"
              label="Email"
              type="email"
              :error="errors.email"
              required
            />
          </div>

          <!-- Password -->
          <div>
            <InputField
              id="password"
              v-model="form.password"
              label="Password"
              type="password"
              :error="errors.password"
              required
            />
          </div>

          <!-- Confirm Password (Registration only) -->
          <div v-if="isRegistering">
            <InputField
              id="confirmPassword"
              v-model="form.confirmPassword"
              label="Confirm Password"
              type="password"
              :error="errors.confirmPassword"
              required
            />
          </div>

          <!-- Name (Registration only) -->
          <div v-if="isRegistering">
            <InputField
              id="name"
              v-model="form.name"
              label="Full Name"
              type="text"
              :error="errors.name"
              required
            />
          </div>

          <!-- Phone (Registration only) -->
          <div v-if="isRegistering">
            <InputField
              id="phone"
              v-model="form.phone"
              label="Phone Number"
              type="tel"
              :error="errors.phone"
              placeholder="+254"
              required
            />
          </div>

          <!-- Submit Button -->
          <div>
            <Button
              type="submit"
              variant="kenya"
              class="w-full"
              :loading="loading"
              :disabled="loading"
            >
              {{ isRegistering ? 'Create Account' : 'Sign In' }}
            </Button>
          </div>

          <!-- Error Message -->
          <div v-if="authError" class="text-center text-red-600 text-sm">
            {{ authError }}
          </div>
        </form>

        <!-- Divider -->
        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <!-- Social Login -->
          <div class="mt-6">
            <button
              @click="signInWithGoogle"
              class="w-full inline-flex justify-center items-center gap-3 px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </button>
          </div>
        </div>

        <!-- Toggle Register/Login -->
        <div class="mt-6 text-center text-sm">
          <p class="text-gray-600">
            {{ isRegistering ? 'Already have an account?' : 'Need an account?' }}
            <button
              type="button"
              class="ml-1 text-green-600 hover:text-green-500 font-medium"
              @click="toggleRegister"
            >
              {{ isRegistering ? 'Sign in' : 'Create one' }}
            </button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/authStore';
import Button from '../components/Button.vue';
import InputField from '../components/InputField.vue';

export default {
  name: 'AuthView',
  components: {
    Button,
    InputField
  },
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();
    const loading = ref(false);
    const isRegistering = ref(false);
    const authError = ref('');

    const form = ref({
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      phone: ''
    });

    const errors = ref({});

    const validateForm = () => {
      errors.value = {};
      let isValid = true;

      if (!form.value.email) {
        errors.value.email = 'Email is required';
        isValid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
        errors.value.email = 'Please enter a valid email';
        isValid = false;
      }

      if (!form.value.password) {
        errors.value.password = 'Password is required';
        isValid = false;
      } else if (form.value.password.length < 6) {
        errors.value.password = 'Password must be at least 6 characters';
        isValid = false;
      }

      if (isRegistering.value) {
        if (!form.value.confirmPassword) {
          errors.value.confirmPassword = 'Please confirm your password';
          isValid = false;
        } else if (form.value.password !== form.value.confirmPassword) {
          errors.value.confirmPassword = 'Passwords do not match';
          isValid = false;
        }

        if (!form.value.name) {
          errors.value.name = 'Name is required';
          isValid = false;
        }

        if (form.value.phone && !/^\+?[\d\s-]{10,}$/.test(form.value.phone)) {
          errors.value.phone = 'Please enter a valid phone number';
          isValid = false;
        }
      }

      return isValid;
    };

    const handleSubmit = async () => {
      if (!validateForm()) return;

      loading.value = true;
      authError.value = '';

      try {
        if (isRegistering.value) {
          await authStore.register(form.value);
        } else {
          await authStore.login(form.value);
        }
        router.push('/');
      } catch (error) {
        authError.value = error.message;
      } finally {
        loading.value = false;
      }
    };

    const signInWithGoogle = async () => {
      loading.value = true;
      authError.value = '';

      try {
        await authStore.signInWithGoogle();
        router.push('/');
      } catch (error) {
        authError.value = error.message;
      } finally {
        loading.value = false;
      }
    };

    const toggleAuthMode = () => {
      isRegistering.value = !isRegistering.value;
      errors.value = {};
      authError.value = '';
    };

    return {
      form,
      errors,
      loading,
      isRegistering,
      authError,
      handleSubmit,
      signInWithGoogle,
      toggleAuthMode
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