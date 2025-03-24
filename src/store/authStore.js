import { defineStore } from 'pinia';
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from '../firebase';
import { createError } from '../utils/errorHandler';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    loading: false,
    error: null
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
    userId: (state) => state.user?.uid,
    userEmail: (state) => state.user?.email
  },

  actions: {
    async init() {
      return new Promise((resolve) => {
        onAuthStateChanged(auth, (user) => {
          this.user = user;
          resolve(user);
        });
      });
    },

    async login(email, password) {
      this.loading = true;
      this.error = null;
      try {
        const { user } = await signInWithEmailAndPassword(auth, email, password);
        this.user = user;
        return user;
      } catch (error) {
        this.error = error.message;
        throw createError(error.message, error.code);
      } finally {
        this.loading = false;
      }
    },

    async register(email, password) {
      this.loading = true;
      this.error = null;
      try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        this.user = user;
        return user;
      } catch (error) {
        this.error = error.message;
        throw createError(error.message, error.code);
      } finally {
        this.loading = false;
      }
    },

    async logout() {
      this.loading = true;
      this.error = null;
      try {
        await signOut(auth);
        this.user = null;
      } catch (error) {
        this.error = error.message;
        throw createError(error.message, error.code);
      } finally {
        this.loading = false;
      }
    },

    setUser(user) {
      this.user = user;
    },

    clearError() {
      this.error = null;
    }
  }
});