<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        {{ isLogin ? 'Sign in to your account' : 'Create a new account' }}
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        {{ isLogin ? "Don't have an account?" : 'Already have an account?' }}
        <button 
          @click="toggleMode" 
          class="font-medium text-kenya-green hover:text-green-700"
        >
          {{ isLogin ? 'Sign up' : 'Sign in' }}
        </button>
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" @submit.prevent="handleSubmit">
          <div>
            <InputField
              id="email"
              v-model="form.email"
              label="Email address"
              type="email"
              :error="errors.email"
              required
              autocomplete="email"
            />
          </div>

          <div>
            <InputField
              id="password"
              v-model="form.password"
              label="Password"
              type="password"
              :error="errors.password"
              required
              autocomplete="current-password"
            />
          </div>

          <div v-if="!isLogin">
            <InputField
              id="confirmPassword"
              v-model="form.confirmPassword"
              label="Confirm Password"
              type="password"
              :error="errors.confirmPassword"
              required
            />
          </div>

          <div v-if="authStore.error" class="text-red-600 text-sm">
            {{ authStore.error }}
          </div>

          <div>
            <Button
              type="submit"
              variant="kenya"
              class="w-full"
              :disabled="authStore.loading"
            >
              {{ isLogin ? 'Sign in' : 'Sign up' }}
            </Button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/authStore';
import InputField from '../components/InputField.vue';
import Button from '../components/Button.vue';

export default {
  name: 'AuthPage',
  components: {
    InputField,
    Button
  },
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();
    const isLogin = ref(true);
    const errors = reactive({});

    const form = reactive({
      email: '',
      password: '',
      confirmPassword: ''
    });

    const validateForm = () => {
      errors.email = '';
      errors.password = '';
      errors.confirmPassword = '';
      let isValid = true;

      if (!form.email) {
        errors.email = 'Email is required';
        isValid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        errors.email = 'Invalid email format';
        isValid = false;
      }

      if (!form.password) {
        errors.password = 'Password is required';
        isValid = false;
      } else if (form.password.length < 6) {
        errors.password = 'Password must be at least 6 characters';
        isValid = false;
      }

      if (!isLogin.value && form.password !== form.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
        isValid = false;
      }

      return isValid;
    };

    const handleSubmit = async () => {
      if (!validateForm()) return;

      try {
        if (isLogin.value) {
          await authStore.login(form.email, form.password);
        } else {
          await authStore.register(form.email, form.password);
        }
        router.push('/');
      } catch (error) {
        // Error is handled by the store and displayed in the template
        console.error('Authentication error:', error);
      }
    };

    const toggleMode = () => {
      isLogin.value = !isLogin.value;
      errors.email = '';
      errors.password = '';
      errors.confirmPassword = '';
      authStore.clearError();
    };

    return {
      form,
      errors,
      isLogin,
      authStore,
      handleSubmit,
      toggleMode
    };
  }
};
</script>