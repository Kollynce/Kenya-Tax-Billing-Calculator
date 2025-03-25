import { defineStore } from 'pinia';
import { getTaxRates, getTaxSettings, saveTaxCalculation, getUserCalculations, updateTaxRates } from '../services/taxService';
import { calculateNetIncome, generateTaxSummary } from '../utils/taxUtils';

export const useTaxStore = defineStore('tax', {
  state: () => ({
    taxRates: null,
    settings: null,
    currentCalculation: null,
    calculationHistory: [],
    loading: false,
    error: null
  }),

  actions: {
    async initialize() {
      await Promise.all([
        this.loadTaxRates(),
        this.loadSettings()
      ]);
    },

    async loadTaxRates() {
      try {
        this.loading = true;
        const currentYear = new Date().getFullYear();
        const rates = await getTaxRates(currentYear);
        
        if (rates) {
          this.taxRates = {
            ...rates,
            shifRate: Number(rates.shifRate || 0.0275),
            nssfTierIRate: Number(rates.nssfTierIRate || 0.06),
            nssfTierIIRate: Number(rates.nssfTierIIRate || 0.06),
            vatRate: Number(rates.vatRate || 0.16),
            housingLevyRate: Number(rates.housingLevyRate || 0.015),
            personalRelief: Number(rates.personalRelief || 28800),
            brackets: (rates.brackets || []).map(bracket => ({
              min: Number(bracket.min || 0),
              max: bracket.max === null ? null : Number(bracket.max || 0),
              rate: Number(bracket.rate || 0)
            }))
          };
        }
      } catch (error) {
        this.error = 'Failed to load tax rates';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async loadSettings() {
      try {
        this.loading = true;
        const settings = await getTaxSettings();
        this.settings = settings;
      } catch (error) {
        this.error = 'Failed to load tax settings';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async calculateTax({ annualIncome, includeNSSF = true, includeSHIF = true }) {
      try {
        if (!this.taxRates) {
          throw new Error('Tax rates not loaded');
        }

        const calculation = calculateNetIncome({
          annualIncome,
          includeNSSF,
          includeSHIF,
          taxRates: this.taxRates,
          personalRelief: this.settings?.personalReliefEnabled ? this.taxRates.personalRelief : 0
        });

        const summary = generateTaxSummary(calculation);
        this.currentCalculation = summary;
        return summary;
      } catch (error) {
        this.error = 'Failed to calculate tax';
        throw error;
      }
    },

    async saveCalculation(calculation, userId) {
      if (!userId) {
        throw new Error('User must be logged in to save calculations');
      }
      await saveTaxCalculation(userId, calculation);
    },

    async loadCalculationHistory(userId) {
      if (!userId) {
        this.calculationHistory = [];
        return;
      }

      try {
        this.loading = true;
        const history = await getUserCalculations(userId);
        this.calculationHistory = history;
      } catch (error) {
        this.error = 'Failed to load calculation history';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async updateRates(rates) {
      try {
        this.loading = true;
        const sanitizedRates = {
          ...rates,
          shifRate: Number(rates.shifRate || 0),
          nssfTierIRate: Number(rates.nssfTierIRate || 0),
          nssfTierIIRate: Number(rates.nssfTierIIRate || 0),
          vatRate: Number(rates.vatRate || 0),
          housingLevyRate: Number(rates.housingLevyRate || 0),
          personalRelief: Number(rates.personalRelief || 0),
          brackets: (rates.brackets || []).map(bracket => ({
            min: Number(bracket.min || 0),
            max: bracket.max === null ? null : Number(bracket.max || 0),
            rate: Number(bracket.rate || 0)
          }))
        };
        await updateTaxRates(sanitizedRates);
        this.taxRates = sanitizedRates;
      } catch (error) {
        this.error = 'Failed to update tax rates';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    clearCurrentCalculation() {
      this.currentCalculation = null;
    },

    clearError() {
      this.error = null;
    }
  },

  getters: {
    isInitialized: (state) => !!state.taxRates && !!state.settings,
    currentTaxYear: (state) => state.taxRates?.year,
    personalRelief: (state) => state.taxRates?.personalRelief || 0,
    taxBrackets: (state) => state.taxRates?.brackets || [],
    isNSSFEnabled: (state) => state.settings?.nssfEnabled,
    isSHIFEnabled: (state) => state.settings?.shifEnabled,
    isPersonalReliefEnabled: (state) => state.settings?.personalReliefEnabled
  }
});