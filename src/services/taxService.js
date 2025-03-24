import { db } from '../firebase';
import {
  doc,
  collection,
  getDocs,
  getDoc,
  setDoc,
  query,
  where,
  orderBy,
  deleteDoc
} from 'firebase/firestore';

const COLLECTIONS = {
  TAX_RATES: 'taxRates',
  CALCULATIONS: 'calculations',
  SETTINGS: 'settings'
};

// Default tax rates to use when offline or unauthenticated
export const DEFAULT_TAX_RATES = {
  year: 2024,
  personalRelief: 28800, // Annual personal relief
  brackets: [
    { min: 0, max: 288000, rate: 0.10 },
    { min: 288000, max: 388000, rate: 0.25 },
    { min: 388000, max: 6000000, rate: 0.30 },
    { min: 6000000, max: 9600000, rate: 0.32 },
    { min: 9600000, max: null, rate: 0.35 }
  ]
};

// Default settings for offline or unauthenticated users
export const DEFAULT_SETTINGS = {
  currency: 'KES',
  countryCode: 'KE',
  taxYearStart: 1, // January
  personalReliefEnabled: true,
  nssfEnabled: true,
  shifEnabled: true
};

/**
 * Get tax rates for a specific year
 * @param {number} year Tax year
 * @param {boolean} isAuthenticated Whether the user is authenticated
 * @returns {Promise<Object>} Tax rates and brackets
 */
export async function getTaxRates(year, isAuthenticated = false) {
  // Return default rates if user is not authenticated
  if (!isAuthenticated) {
    return DEFAULT_TAX_RATES;
  }

  try {
    const ratesDoc = doc(db, COLLECTIONS.TAX_RATES, year.toString());
    const ratesSnapshot = await getDoc(ratesDoc);
    
    if (!ratesSnapshot.exists()) {
      return DEFAULT_TAX_RATES;
    }

    return ratesSnapshot.data();
  } catch (error) {
    console.warn('Error fetching tax rates:', error);
    return DEFAULT_TAX_RATES;
  }
}

/**
 * Save a tax calculation
 * @param {string} userId User ID
 * @param {Object} calculation Tax calculation details
 * @returns {Promise<void>}
 */
export async function saveTaxCalculation(userId, calculation) {
  const calculationRef = doc(collection(db, COLLECTIONS.CALCULATIONS));
  await setDoc(calculationRef, {
    userId,
    timestamp: new Date(),
    ...calculation
  });
}

/**
 * Get user's tax calculations history
 * @param {string} userId User ID
 * @param {number} limit Maximum number of calculations to retrieve
 * @returns {Promise<Array>} Array of calculations
 */
export async function getUserCalculations(userId, limit = 10) {
  const calculationsQuery = query(
    collection(db, COLLECTIONS.CALCULATIONS),
    where('userId', '==', userId),
    orderBy('timestamp', 'desc'),
    limit(limit)
  );
  
  const querySnapshot = await getDocs(calculationsQuery);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}

/**
 * Get tax settings
 * @param {boolean} isAuthenticated Whether the user is authenticated
 * @returns {Promise<Object>} Tax settings
 */
export async function getTaxSettings(isAuthenticated = false) {
  // Return default settings if user is not authenticated
  if (!isAuthenticated) {
    return DEFAULT_SETTINGS;
  }

  try {
    const settingsDoc = doc(db, COLLECTIONS.SETTINGS, 'default');
    const settingsSnapshot = await getDoc(settingsDoc);
    
    if (!settingsSnapshot.exists()) {
      return DEFAULT_SETTINGS;
    }

    return settingsSnapshot.data();
  } catch (error) {
    console.warn('Error fetching tax settings:', error);
    return DEFAULT_SETTINGS;
  }
}

/**
 * Update tax settings (admin only)
 * @param {Object} settings New tax settings
 * @returns {Promise<void>}
 */
export async function updateTaxSettings(settings) {
  const settingsDoc = doc(db, COLLECTIONS.SETTINGS, 'default');
  await setDoc(settingsDoc, settings, { merge: true });
}

/**
 * Update tax rates (admin only)
 * @param {Object} rates Tax rates and brackets
 * @returns {Promise<void>}
 */
export async function updateTaxRates(rates) {
  const year = new Date().getFullYear();
  const ratesDoc = doc(db, COLLECTIONS.TAX_RATES, year.toString());
  await setDoc(ratesDoc, {
    ...rates,
    year,
    updatedAt: new Date()
  });
}

/**
 * Delete a saved calculation
 * @param {string} calculationId Calculation ID
 * @returns {Promise<void>}
 */
export async function deleteCalculation(calculationId) {
  const calculationDoc = doc(db, COLLECTIONS.CALCULATIONS, calculationId);
  await deleteDoc(calculationDoc);
}