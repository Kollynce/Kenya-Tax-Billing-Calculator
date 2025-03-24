<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <router-link to="/" class="text-xl font-bold text-blue-600">
                KE Tax & Billing
              </router-link>
            </div>
            <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
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
          <div class="flex items-center">
            <template v-if="isAuthenticated">
              <span class="text-gray-600 mr-4">{{ userEmail }}</span>
              <button
                @click="logout"
                class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Logout
              </button>
            </template>
            <router-link
              v-else
              to="/auth"
              class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Login
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="py-6">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { auth } from './firebase';
import { useRouter } from 'vue-router';

export default {
  name: 'App',
  
  setup() {
    const isAuthenticated = ref(false);
    const userEmail = ref('');
    const router = useRouter();

    const isAdmin = computed(() => {
      return isAuthenticated.value && userEmail.value.toLowerCase() === process.env.VUE_APP_ADMIN_EMAIL?.toLowerCase();
    });

    onMounted(() => {
      auth.onAuthStateChanged((user) => {
        isAuthenticated.value = !!user;
        userEmail.value = user ? user.email : '';
      });
    });

    const logout = async () => {
      try {
        await auth.signOut();
        router.push('/auth');
      } catch (error) {
        console.error('Error during logout:', error);
      }
    };

    return {
      isAuthenticated,
      userEmail,
      isAdmin,
      logout
    };
  }
};
</script>

<style>
.nav-link {
  border-color: transparent;
  color: #6b7280;  /* text-gray-500 */
  display: inline-flex;
  align-items: center;
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  padding-top: 0.25rem;
  border-bottom-width: 2px;
  font-size: 0.875rem;
  font-weight: 500;
}

.nav-link:hover {
  border-color: #d1d5db;  /* hover:border-gray-300 */
  color: #374151;  /* hover:text-gray-700 */
}

.active-nav-link {
  border-color: #3b82f6;  /* border-blue-500 */
  color: #111827;  /* text-gray-900 */
  display: inline-flex;
  align-items: center;
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  padding-top: 0.25rem;
  border-bottom-width: 2px;
  font-size: 0.875rem;
  font-weight: 500;
}
</style>
