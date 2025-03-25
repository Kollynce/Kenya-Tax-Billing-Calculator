import { defineStore } from 'pinia';
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
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
    userEmail: (state) => state.user?.email,
    userName: (state) => state.user?.displayName
  },

  actions: {
    async init() {
      return new Promise((resolve) => {
        onAuthStateChanged(auth, (user) => {
          this.setUser(user);
          resolve(user);
        });
      });
    },

    async login({ email, password }) {
      this.loading = true;
      this.error = null;
      try {
        const { user } = await signInWithEmailAndPassword(auth, email, password);
        this.setUser(user);
        return user;
      } catch (error) {
        const errorMessage = this.getAuthErrorMessage(error.code);
        this.error = errorMessage;
        throw createError(errorMessage, error.code);
      } finally {
        this.loading = false;
      }
    },

    async register({ email, password, name, phone }) {
      this.loading = true;
      this.error = null;
      try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        
        // Update user profile with name
        if (name) {
          await updateProfile(user, {
            displayName: name
          });
        }

        // Store additional user data in Firestore
        const userRef = doc(db, 'users', user.uid);
        await setDoc(userRef, {
          name,
          phone,
          email,
          createdAt: new Date().toISOString()
        });

        this.setUser(user);
        return user;
      } catch (error) {
        const errorMessage = this.getAuthErrorMessage(error.code);
        this.error = errorMessage;
        throw createError(errorMessage, error.code);
      } finally {
        this.loading = false;
      }
    },

    async signInWithGoogle() {
      this.loading = true;
      this.error = null;
      try {
        const provider = new GoogleAuthProvider();
        const { user } = await signInWithPopup(auth, provider);
        this.setUser(user);
        return user;
      } catch (error) {
        const errorMessage = this.getAuthErrorMessage(error.code);
        this.error = errorMessage;
        throw createError(errorMessage, error.code);
      } finally {
        this.loading = false;
      }
    },

    async logout() {
      this.loading = true;
      this.error = null;
      try {
        await signOut(auth);
        this.setUser(null);
      } catch (error) {
        const errorMessage = this.getAuthErrorMessage(error.code);
        this.error = errorMessage;
        throw createError(errorMessage, error.code);
      } finally {
        this.loading = false;
      }
    },

    setUser(user) {
      this.user = user;
    },

    clearError() {
      this.error = null;
    },

    getAuthErrorMessage(code) {
      const errorMessages = {
        'auth/email-already-in-use': 'This email is already registered',
        'auth/invalid-email': 'Invalid email address',
        'auth/operation-not-allowed': 'Operation not allowed',
        'auth/weak-password': 'Password is too weak',
        'auth/user-disabled': 'This account has been disabled',
        'auth/user-not-found': 'Invalid email or password',
        'auth/wrong-password': 'Invalid email or password',
        'auth/network-request-failed': 'Network error. Please check your connection',
        'auth/popup-closed-by-user': 'Google sign-in was cancelled',
        'auth/unauthorized-domain': 'This domain is not authorized for Google sign-in'
      };
      
      return errorMessages[code] || 'An error occurred during authentication';
    }
  }
});