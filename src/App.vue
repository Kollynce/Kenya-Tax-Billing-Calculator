<template>
  <div class="min-h-screen bg-white">
    <!-- Navigation -->
    <nav class="fixed w-full bg-white/80 backdrop-blur-sm z-50 border-b border-gray-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <router-link to="/" class="text-xl font-semibold">
                <span class="gradient-text">KE Tax & Billing</span>
              </router-link>
            </div>
            <div class="hidden sm:ml-8 sm:flex sm:space-x-8">
              <router-link
                to="/tax-calculator"
                class="nav-link"
                active-class="active-nav-link"
              >
                Tax Calculator
              </router-link>
              <router-link
                to="/billing"
                class="nav-link"
                active-class="active-nav-link"
              >
                Billing Generator
              </router-link>
              <router-link
                to="/billing-planner"
                class="nav-link"
                active-class="active-nav-link"
              >
                Billing Planner
              </router-link>
              <router-link
                v-if="isAdmin"
                to="/settings"
                class="nav-link"
                active-class="active-nav-link"
              >
                Settings
              </router-link>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <template v-if="isAuthenticated">
              <span class="text-sm text-gray-600">{{ userEmail }}</span>
              <button
                @click="logout"
                class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none transition-colors duration-200"
              >
                Logout
              </button>
            </template>
            <router-link
              v-else
              to="/auth"
              class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-full hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-all duration-200 shadow-stripe-sm hover:shadow-stripe-md"
            >
              Sign in
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="pt-16">
      <LoadingScreen v-if="loading" />
      <PageTransition>
        <router-view v-slot="{ Component }">
          <component :is="Component" />
        </router-view>
      </PageTransition>
    </main>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { auth } from './firebase';
import { useRouter } from 'vue-router';
import LoadingScreen from './components/LoadingScreen.vue';
import PageTransition from './components/PageTransition.vue';

export default {
  name: 'App',
  components: {
    LoadingScreen,
    PageTransition
  },
  setup() {
    const isAuthenticated = ref(false);
    const userEmail = ref('');
    const router = useRouter();
    const loading = ref(false);

    const isAdmin = computed(() => {
      return isAuthenticated.value && userEmail.value.toLowerCase() === process.env.VUE_APP_ADMIN_EMAIL?.toLowerCase();
    });

    onMounted(() => {
      loading.value = true;
      auth.onAuthStateChanged((user) => {
        isAuthenticated.value = !!user;
        userEmail.value = user ? user.email : '';
        loading.value = false;
      });
    });

    const logout = async () => {
      try {
        loading.value = true;
        await auth.signOut();
        router.push('/auth');
      } catch (error) {
        console.error('Error during logout:', error);
      } finally {
        loading.value = false;
      }
    };

    return {
      isAuthenticated,
      userEmail,
      isAdmin,
      logout,
      loading
    };
  }
};
</script>

<style>
.nav-link {
  @apply inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-green-600 transition-colors duration-200;
  border-bottom: 2px solid transparent;
}

.active-nav-link {
  @apply inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 transition-colors duration-200;
  border-bottom: 2px solid #16A34A;
}

.gradient-text {
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  background-image: linear-gradient(to right, #16A34A, #15803D);
}
</style>
