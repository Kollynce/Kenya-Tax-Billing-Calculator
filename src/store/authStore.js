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
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { createError } from '../utils/errorHandler';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    loading: false,
    error: null,
    userProfile: null
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

    async register({ email, password, name, phone, firstName, lastName, displayName, address, city, postalCode, country, taxId, vatNumber }) {
      this.loading = true;
      this.error = null;
      try {
        // Create the user account
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        
        // Update user profile with display name
        await updateProfile(user, {
          displayName: displayName || name // Use displayName if provided, fallback to name
        });

        // Prepare user profile data with all personal information
        const userProfile = {
          firstName: firstName || '',
          lastName: lastName || '',
          displayName: displayName || name,
          email,
          phone: phone || '',
          address: address || '',
          city: city || '',
          postalCode: postalCode || '',
          country: country || 'Kenya',
          taxId: taxId || '',
          vatNumber: vatNumber || '',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          settings: {
            notifications: true,
            theme: 'light'
          }
        };

        // Store complete user profile in Firestore
        const userRef = doc(db, 'users', user.uid);
        await setDoc(userRef, userProfile);

        // Update local state
        this.userProfile = userProfile;
        this.setUser(user);
        
        return user;
      } catch (error) {
        let errorMessage = this.getAuthErrorMessage(error.code);
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

    async updateUserProfile(profileData) {
      this.loading = true;
      this.error = null;
      try {
        const user = auth.currentUser;
        if (!user) throw new Error('User not authenticated');

        // Update display name in Firebase Auth if provided
        if (profileData.displayName) {
          await updateProfile(user, {
            displayName: profileData.displayName
          });
        }

        // Update Firestore user profile
        const userRef = doc(db, 'users', user.uid);
        await setDoc(userRef, {
          ...profileData,
          updatedAt: serverTimestamp()
        }, { merge: true });

        // Update local state
        this.userProfile = {
          ...this.userProfile,
          ...profileData
        };

        return true;
      } catch (error) {
        const errorMessage = this.getAuthErrorMessage(error.code) || error.message;
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
      switch (code) {
        case 'auth/email-already-in-use':
          return 'This email is already registered. Please try logging in or use a different email.';
        case 'auth/invalid-email':
          return 'Please enter a valid email address.';
        case 'auth/operation-not-allowed':
          return 'Email/password accounts are not enabled. Please contact support.';
        case 'auth/weak-password':
          return 'Please choose a stronger password. It should be at least 6 characters long.';
        case 'auth/user-disabled':
          return 'This account has been disabled. Please contact support.';
        case 'auth/user-not-found':
          return 'No account found with this email. Please register first.';
        case 'auth/wrong-password':
          return 'Incorrect password. Please try again.';
        default:
          return 'An error occurred during authentication. Please try again.';
      }
    }
  }
});