<template>
  <div class="min-h-screen bg-green-50">
    <!-- Navigation -->
    <header v-if="showHeader">
      <nav class="fixed w-full bg-white/80 backdrop-blur-sm z-50 border-b border-gray-100">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <div class="flex">
              <div class="flex-shrink-0 flex items-center logo">
                <router-link to="/" class="flex items-center">
                  <span class="logo-text">SanaaPesa</span>
                </router-link>
              </div>
              <div class="hidden sm:ml-8 sm:flex sm:space-x-8">
                <!-- Desktop navigation links -->
                <router-link
                  to="/billing-planner"
                  class="nav-link"
                  active-class="active-nav-link"
                >
                  Project Pitch
                </router-link>
                <router-link
                  to="/billing"
                  class="nav-link"
                  active-class="active-nav-link"
                >
                  Send Bill
                </router-link>
                <router-link
                  to="/tax-calculator"
                  class="nav-link"
                  active-class="active-nav-link"
                >
                  Tax Helper
                </router-link>
              </div>
            </div>
            <div class="flex items-center space-x-4">
              <!-- Auth buttons - hidden on mobile -->
              <div class="hidden sm:flex items-center space-x-4">
                <template v-if="isAuthenticated">
                  <router-link to="/profile" class="flex items-center group">
                    <div class="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium mr-2">
                      {{ userInitials }}
                    </div>
                    <span class="text-sm text-gray-600 group-hover:text-green-600 transition-colors">{{ userEmail }}</span>
                  </router-link>
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
              
              <!-- Mobile menu button -->
              <div class="flex items-center sm:hidden">
                <button 
                  @click="mobileMenuOpen = !mobileMenuOpen" 
                  class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
                  aria-expanded="false"
                >
                  <span class="sr-only">Open main menu</span>
                  <!-- Icon when menu is closed -->
                  <svg 
                    v-if="!mobileMenuOpen" 
                    class="block h-6 w-6" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    aria-hidden="true"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  <!-- Icon when menu is open -->
                  <svg 
                    v-else 
                    class="block h-6 w-6" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    aria-hidden="true"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Mobile menu -->
        <div 
          v-show="mobileMenuOpen" 
          class="sm:hidden bg-white border-b border-gray-100 transition-all duration-300 ease-in-out"
        >
          <div class="pt-2 pb-4 space-y-1">
            <router-link
              to="/billing-planner"
              class="mobile-nav-link"
              active-class="mobile-nav-link-active"
              @click="mobileMenuOpen = false"
            >
              Project Pitch
            </router-link>
            <router-link
              to="/billing"
              class="mobile-nav-link"
              active-class="mobile-nav-link-active"
              @click="mobileMenuOpen = false"
            >
              Send Bill
            </router-link>
            <router-link
              to="/tax-calculator"
              class="mobile-nav-link"
              active-class="mobile-nav-link-active"
              @click="mobileMenuOpen = false"
            >
              Tax Helper
            </router-link>
          </div>
          
          <!-- Mobile auth buttons -->
          <div class="pt-2 pb-3 border-t border-gray-200">
            <div class="flex items-center justify-center px-4 py-2">
              <template v-if="isAuthenticated">
                <div class="flex flex-col items-center w-full">
                  <router-link to="/profile" class="flex flex-col items-center w-full mb-3">
                    <div class="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium mb-2">
                      {{ userInitials }}
                    </div>
                    <span class="text-sm text-gray-600">{{ userEmail }}</span>
                  </router-link>
                  <button
                    @click="logout"
                    class="w-full text-center px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-full hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-all duration-200"
                  >
                    Logout
                  </button>
                </div>
              </template>
              <router-link
                v-else
                to="/auth"
                class="w-full text-center px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-full hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-all duration-200 shadow-stripe-sm hover:shadow-stripe-md"
                @click="mobileMenuOpen = false"
              >
                Sign in
              </router-link>
            </div>
          </div>
        </div>
      </nav>
    </header>

    <!-- Main Content -->
    <main class="py-16 bg-green-50">
      <LoadingScreen v-if="loading" />
      <router-view v-slot="{ Component }">
        <PageTransition>
          <component :is="Component" />
        </PageTransition>
      </router-view>
    </main>

    <!-- Footer -->
    <footer class="footer-gradient border-t border-gray-800 mt-16">
      <!-- Footer Content -->
      <div class="bg-transparent">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            <!-- Logo and About -->
            <div class="md:col-span-1">
              <div class="flex items-center mb-4">
                <router-link to="/" class="text-xl font-semibold">
                  <span class="footer-logo-text">SanaaPesa</span>
                </router-link>
              </div>
              <p class="text-gray-300 text-sm mb-6">
                Empowering Kenya's creatives with essential financial tools for growth and success.
              </p>
              <div class="flex space-x-4">
                <a href="#" class="text-gray-400 dark-hover">
                  <span class="sr-only">Facebook</span>
                  <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" />
                  </svg>
                </a>
                <a href="#" class="text-gray-400 dark-hover">
                  <span class="sr-only">Instagram</span>
                  <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd" />
                  </svg>
                </a>
                <a href="#" class="text-gray-400 dark-hover">
                  <span class="sr-only">Twitter</span>
                  <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" class="text-gray-400 dark-hover">
                  <span class="sr-only">LinkedIn</span>
                  <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill-rule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clip-rule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>

            <!-- Quick Links -->
            <div>
              <h3 class="text-sm font-semibold text-white tracking-wider uppercase mb-4">Tools</h3>
              <ul class="space-y-3">
                <li>
                  <router-link to="/billing-planner" class="text-gray-300 dark-hover">
                    Project Pitch
                  </router-link>
                </li>
                <li>
                  <router-link to="/billing" class="text-gray-300 dark-hover">
                    Send Bill
                  </router-link>
                </li>
                <li>
                  <router-link to="/tax-calculator" class="text-gray-300 dark-hover">
                    Tax Helper
                  </router-link>
                </li>
                <li>
                  <router-link to="/examples" class="text-gray-300 dark-hover">
                    Success Stories
                  </router-link>
                </li>
              </ul>
            </div>

            <!-- Resources -->
            <div>
              <h3 class="text-sm font-semibold text-white tracking-wider uppercase mb-4">Resources</h3>
              <ul class="space-y-3">
                <li>
                  <router-link to="/tax-guide" class="text-gray-300 dark-hover">
                    Tax Guide
                  </router-link>
                </li>
                <li>
                  <router-link to="/blog" class="text-gray-300 dark-hover">
                    Creative Finance Blog
                  </router-link>
                </li>
                <a href="#" class="text-gray-300 dark-hover">
                  FAQs
                </a>
                <li>
                  <a href="#" class="text-gray-300 dark-hover">
                    Community
                  </a>
                </li>
              </ul>
            </div>

            <!-- Contact -->
            <div>
              <h3 class="text-sm font-semibold text-white tracking-wider uppercase mb-4">Contact Us</h3>
              <div class="space-y-3">
                <p class="text-gray-300 flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>support@ketax.co.ke</span>
                </p>
                <p class="text-gray-300 flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+254 700 123 456</span>
                </p>
                <p class="text-gray-300 flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Nairobi, Kenya</span>
                </p>
                
                <!-- Newsletter Signup -->
                <div class="mt-6">
                  <h4 class="text-sm font-medium text-white mb-2">Stay Updated</h4>
                  <form class="mt-2 flex flex-col sm:flex-row">
                    <input 
                      type="email" 
                      class="px-3 py-2 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg sm:rounded-r-none mb-2 sm:mb-0 focus:ring-green-500 focus:border-green-500 w-full text-sm"
                      placeholder="Your email"
                    />
                    <button 
                      type="submit" 
                      class="w-full sm:w-auto px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg sm:rounded-l-none hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                    >
                      Subscribe
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Bottom Footer -->
          <div class="mt-12 pt-8 border-t border-gray-700">
            <div class="flex flex-col md:flex-row justify-between items-center">
              <div class="mb-4 md:mb-0">
                <p class="text-sm text-gray-400">
                  &copy; {{ new Date().getFullYear() }} KE Tax & Billing | All rights reserved.
                </p>
              </div>
              <div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6">
                <a href="#" class="text-sm text-center text-gray-400 dark-hover">Privacy Policy</a>
                <a href="#" class="text-sm text-center text-gray-400 dark-hover">Terms of Service</a>
                <a href="#" class="text-sm text-center text-gray-400 dark-hover">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
    <Toast />
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { auth } from './firebase';
import { useRouter } from 'vue-router';
import LoadingScreen from './components/LoadingScreen.vue';
import PageTransition from './components/PageTransition.vue';
import Toast from '@/components/Toast.vue'

export default {
  name: 'App',
  components: {
    LoadingScreen,
    PageTransition,
    Toast
  },
  setup() {
    const isAuthenticated = ref(false);
    const userEmail = ref('');
    const router = useRouter();
    const loading = ref(false);
    const mobileMenuOpen = ref(false);
    const showHeader = ref(true);
    const showFooter = ref(true);

    const userInitials = computed(() => {
      if (userEmail.value) {
        const parts = userEmail.value.split('@')[0].split('.');
        return parts.map(part => part.charAt(0).toUpperCase()).join('');
      }
      return '';
    });

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
        mobileMenuOpen.value = false;
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
      userInitials,
      isAdmin,
      logout,
      loading,
      mobileMenuOpen,
      showHeader,
      showFooter
    };
  }
};
</script>

<style lang="postcss">
.nav-link {
  display: inline-flex;
  align-items: center;
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  padding-top: 0.25rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  color: rgb(107 114 128);
  transition-property: color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
  border-bottom: 2px solid transparent;
}

.nav-link:hover {
  color: rgb(22 163 74);
}

.active-nav-link {
  display: inline-flex;
  align-items: center;
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  padding-top: 0.25rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  color: rgb(17 24 39);
  transition-property: color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
  border-bottom: 2px solid #16A34A;
}

.mobile-nav-link {
  display: block;
  padding: 0.75rem 1rem 0.75rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 500;
  color: rgb(75 85 99);
  transition-property: color, background-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}

.mobile-nav-link:hover {
  background-color: rgb(249 250 251);
  color: rgb(22 163 74);
}

.mobile-nav-link-active {
  display: block;
  padding: 0.75rem 1rem 0.75rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 500;
  color: rgb(22 163 74);
  background-color: rgb(240 253 244);
  border-left: 4px solid rgb(34 197 94);
}

.gradient-text {
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  background-image: linear-gradient(to right, #16A34A, #15803D);
}

.footer-gradient {
  background-image: linear-gradient(to bottom, #1F2937, #111827);
  position: relative;
  bottom: 0;
  width: 100%;
  margin-top: auto;
}

@media (max-width: 640px) {
  .footer-section {
    margin-bottom: 2rem;
  }
}

.dark-hover:hover {
  color: rgb(74 222 128);
  transition-property: color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}

.logo-text,
.footer-logo-text {
  font-size: 2.25rem;
  line-height: 2.5rem;
  font-weight: 800;
  background-image: linear-gradient(
    135deg,
    #16A34A 0%,
    #2563EB 20%,
    #8B5CF6 40%,
    #EC4899 60%,
    #EAB308 80%,
    #14B8A6 100%
  );
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  letter-spacing: -0.5px;
  font-family: 'Segoe UI', system-ui, sans-serif;
  text-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2);
  animation: gradient 5s ease-in-out infinite;
  background-size: 300% 300%;
}

.footer-logo-text {
  font-size: 3rem;
  line-height: 1;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
    transform: scale(1);
  }
  50% {
    background-position: 100% 50%;
    transform: scale(1.02);
  }
  100% {
    background-position: 0% 50%;
    transform: scale(1);
  }
}
</style>
