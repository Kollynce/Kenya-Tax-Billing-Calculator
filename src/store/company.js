import { defineStore } from 'pinia';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuthStore } from './authStore';

export const useCompanyStore = defineStore('company', {
  state: () => ({
    companyDetails: {
      // Basic Information
      name: '',
      email: '',
      phone: '',
      website: '',
      
      // Address Information
      address: '',
      city: '',
      postalCode: '',
      country: 'Kenya',
      
      // Registration & Tax Information
      regNumber: '',
      taxId: '',
      vatNumber: '',
      vatRate: 16, // Default VAT rate for Kenya
      
      // Banking Information
      bankName: '',
      accountName: '',
      accountNumber: '',
      branchCode: '',
      swiftCode: '',
      
      // Metadata
      createdAt: null,
      updatedAt: null
    },
    loading: false,
    error: null
  }),

  getters: {
    hasCompanyDetails: (state) => !!state.companyDetails.name,
    getCompanyName: (state) => state.companyDetails.name,
    getVatRate: (state) => state.companyDetails.vatRate
  },

  actions: {
    async createCompany(companyData) {
      this.loading = true;
      this.error = null;
      try {
        const authStore = useAuthStore();
        const userId = authStore.userId;
        
        if (!userId) throw new Error('User not authenticated');

        const companyDoc = {
          ...companyData,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          userId
        };

        await setDoc(doc(db, 'companies', userId), companyDoc);
        this.companyDetails = companyData;
        return true;
      } catch (error) {
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async updateCompany(companyData) {
      this.loading = true;
      this.error = null;
      try {
        const authStore = useAuthStore();
        const userId = authStore.userId;
        
        if (!userId) throw new Error('User not authenticated');

        const updateData = {
          ...companyData,
          updatedAt: serverTimestamp()
        };

        await setDoc(doc(db, 'companies', userId), updateData, { merge: true });
        this.companyDetails = { ...this.companyDetails, ...companyData };
        return true;
      } catch (error) {
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async fetchCompanyDetails() {
      this.loading = true;
      this.error = null;
      try {
        const authStore = useAuthStore();
        const userId = authStore.userId;
        
        if (!userId) throw new Error('User not authenticated');

        const companyDoc = await getDoc(doc(db, 'companies', userId));
        if (companyDoc.exists()) {
          this.companyDetails = companyDoc.data();
          return this.companyDetails;
        }
        return null;
      } catch (error) {
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    clearError() {
      this.error = null;
    }
  }
});
