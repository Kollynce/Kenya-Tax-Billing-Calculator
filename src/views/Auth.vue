<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-50 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white rounded-xl shadow-2xl p-6 sm:p-8">
      <!-- Header -->
      <div>
        <h2 class="text-center text-3xl font-extrabold text-gray-900">
          {{ isRegistering ? 'Create Account' : 'Welcome Back' }}
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          {{ isRegistering ? 'Create your account to get started' : 'Sign in to manage your billing and tax calculations' }}
        </p>
      </div>

      <!-- Auth Form -->
      <form @submit.prevent="handleSubmit" class="mt-8 space-y-6">
        <div class="rounded-md space-y-4">
          <!-- Email -->
          <InputField
            id="email"
            v-model="form.email"
            type="email"
            label="Email address"
            placeholder="you@example.com"
            :error="errors.email"
            required
            autocomplete="email"
          />

          <!-- Password -->
          <InputField
            id="password"
            v-model="form.password"
            type="password"
            label="Password"
            :placeholder="isRegistering ? 'Create a strong password' : 'Enter your password'"
            :error="errors.password"
            required
            autocomplete="current-password"
          />

          <!-- Registration Fields -->
          <template v-if="isRegistering">
            <InputField
              id="confirmPassword"
              v-model="form.confirmPassword"
              type="password"
              label="Confirm Password"
              placeholder="Re-enter your password"
              :error="errors.confirmPassword"
              required
            />

            <InputField
              id="name"
              v-model="form.name"
              type="text"
              label="Full Name"
              placeholder="John Doe"
              :error="errors.name"
              required
            />

            <InputField
              id="phone"
              v-model="form.phone"
              type="tel"
              label="Phone Number"
              placeholder="+254"
              :error="errors.phone"
            />
          </template>
        </div>

        <!-- Error Message -->
        <div v-if="authError" class="rounded-md bg-red-50 p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm text-red-700">{{ authError }}</p>
            </div>
          </div>
        </div>

        <!-- Submit Button -->
        <Button
          type="submit"
          variant="kenya"
          size="large"
          class="w-full"
          :loading="loading"
          :disabled="loading"
        >
          {{ isRegistering ? 'Create Account' : 'Sign In' }}
        </Button>

        <!-- Divider -->
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-200"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <!-- Social Login -->
        <Button
          type="button"
          variant="secondary"
          size="large"
          class="w-full"
          :loading="loading"
          :disabled="loading"
          @click="signInWithGoogle"
        >
          <template v-slot:right-icon>
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
          </template>
          Continue with Google
        </Button>

        <!-- Toggle Auth Mode -->
        <div class="text-center">
          <p class="text-sm text-gray-600">
            {{ isRegistering ? 'Already have an account?' : 'Need an account?' }}
            <button
              type="button"
              class="ml-1 font-medium text-green-600 hover:text-green-500 focus:outline-none focus:underline transition ease-in-out duration-150"
              @click="toggleAuthMode"
            >
              {{ isRegistering ? 'Sign in' : 'Create one' }}
            </button>
          </p>
        </div>
      </form>
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

      // Email validation
      if (!form.value.email) {
        errors.value.email = 'Email is required';
        isValid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
        errors.value.email = 'Please enter a valid email';
        isValid = false;
      }

      // Password validation
      if (!form.value.password) {
        errors.value.password = 'Password is required';
        isValid = false;
      } else if (form.value.password.length < 6) {
        errors.value.password = 'Password must be at least 6 characters';
        isValid = false;
      }

      if (isRegistering.value) {
        // Confirm password validation
        if (!form.value.confirmPassword) {
          errors.value.confirmPassword = 'Please confirm your password';
          isValid = false;
        } else if (form.value.password !== form.value.confirmPassword) {
          errors.value.confirmPassword = 'Passwords do not match';
          isValid = false;
        }

        // Name validation
        if (!form.value.name) {
          errors.value.name = 'Name is required';
          isValid = false;
        }

        // Phone validation (optional)
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
      form.value = {
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        phone: ''
      };
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
.min-h-screen {
  min-height: 100vh;
}

@media (max-width: 640px) {
  .max-w-md {
    max-width: 100%;
    margin: 1rem;
  }
}

@media (min-width: 641px) and (max-width: 1024px) {
  .max-w-md {
    max-width: 28rem;
  }
}
</style>