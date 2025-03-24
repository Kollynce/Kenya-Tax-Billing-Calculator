// Explicitly define production hydration mismatch behavior
window.__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = true;

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import { handleApiError } from './utils/errorHandler';
import { db } from './firebase';
import './assets/tailwind.css';

// Create Vue app instance
const app = createApp(App);

// Initialize Pinia for state management
const pinia = createPinia();
app.use(pinia);

// Use Vue Router
app.use(router);

// Global error handler with improved Firestore error handling
app.config.errorHandler = (error, vm, info) => {
  console.error('Global error:', error);
  console.error('Component:', vm);
  console.error('Error Info:', info);
  
  // Handle Firestore specific errors
  if (error.code && error.code.startsWith('firestore/')) {
    console.warn('Firestore error:', error.code);
  }
  
  return handleApiError(error);
};

// Global properties
app.config.globalProperties.$formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES'
  }).format(amount);
};

// Make Firebase services available to all components
app.config.globalProperties.$db = db;

// Mount the app
app.mount('#app');
