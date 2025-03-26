/**
 * Constants for tax calculations
 */
export const TAX_CONSTANTS = {
  PERSONAL_RELIEF: 28800, // Annual personal relief (2400 monthly)
  NSSF_TIER_I_MAX: 4320, // Monthly NSSF Tier I maximum (2.4% of 180,000)
  NSSF_TIER_II_MAX: 18000, // Monthly NSSF Tier II maximum
  NSSF_RATE: 0.024, // 2.4% NSSF contribution rate (3rd Schedule Feb 2025)
  SHIF_RATE: 0.0275, // 2.75% SHIF rate (replaces NHIF)
  SHIF_MIN_CONTRIBUTION: 300, // Minimum monthly SHIF contribution
  SHIF_MAX_CONTRIBUTION: 5000, // Maximum monthly SHIF contribution
  HOUSING_LEVY_RATE: 0.015, // 1.5% Housing Levy
  VAT_RATE: 0.16,
  DIGITAL_SERVICE_TAX_RATE: 0.015,
  TAX_BRACKETS: [
    { min: 0, max: 24000, rate: 10 },
    { min: 24000, max: 32333, rate: 25 },
    { min: 32333, max: 500000, rate: 30 },
    { min: 500000, max: 800000, rate: 32.5 },
    { min: 800000, max: null, rate: 35 }
  ],
  NSSF_TIER_I_RATE: 0.024, // 2.4% for Tier I
  NSSF_TIER_II_RATE: 0.024, // 2.4% for Tier II
  INSURANCE_RELIEF_RATE: 0.15, // 15% of insurance premiums
  INSURANCE_RELIEF_MAX_MONTHLY: 5000, // Max 5,000 KES monthly relief
  HOUSING_RELIEF_RATE: 0.15, // 15% of housing contributions
  HOUSING_RELIEF_MAX_ANNUAL: 108000 // Max 108,000 KES annual relief
};

// Add billing constants for easier import across app
export const BILLING_CONSTANTS = {
  MINIMUM_HOURLY_RATES: {
    designer: 2500,
    writer: 2000,
    musician: 2500,
    photographer: 3000,
    videographer: 3500,
    'digital-artist': 2800,
    animator: 3000,
    'voice-artist': 2000,
    'social-media': 2000,
    general: 2000
  }
};

/**
 * Calculate tax for a given annual income using the provided tax brackets
 * @param {number} annualIncome Total annual income
 * @param {Array} brackets Tax brackets array with min, max, and rate properties
 * @returns {number} Total tax amount
 */
export function calculateIncomeTax(annualIncome, brackets) {
  let totalTax = 0;
  let remainingIncome = annualIncome;

  // Sort brackets by minimum amount to ensure correct calculation order
  const sortedBrackets = [...brackets].sort((a, b) => a.min - b.min);

  for (const bracket of sortedBrackets) {
    if (remainingIncome <= 0) break;

    const bracketAmount = bracket.max === null
      ? remainingIncome
      : Math.min(remainingIncome, bracket.max - bracket.min);

    if (bracketAmount > 0) {
      totalTax += bracketAmount * (bracket.rate / 100);
      remainingIncome -= bracketAmount;
    }
  }

  return totalTax;
}

/**
 * Format currency in KES
 * @param {number} amount Amount to format
 * @returns {string} Formatted currency string
 */
export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

/**
 * Format percentage
 * @param {number} value Decimal value to format as percentage
 * @returns {string} Formatted percentage string
 */
export function formatPercentage(value) {
  return new Intl.NumberFormat('en-KE', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }).format(value);
}

/**
 * Calculate NSSF contribution
 * @param {number} monthlyIncome Monthly gross income
 * @param {Object} nssfTiers NSSF tier options
 * @returns {number} Monthly NSSF contribution
 */
export function calculateNSSFContribution(monthlyIncome, nssfTiers = { includeTierI: true, includeTierII: true }) {
  const nssfCalc = calculateNSSFByTier(monthlyIncome, nssfTiers);
  return nssfCalc.total;
}

/**
 * Calculate NSSF contribution by tier
 * @param {number} monthlyIncome Monthly gross income
 * @param {Object} options NSSF calculation options
 * @returns {Object} NSSF contributions by tier
 */
export function calculateNSSFByTier(monthlyIncome, { includeTierI = true, includeTierII = true } = {}) {
  const tierI = includeTierI 
    ? Math.min(monthlyIncome * TAX_CONSTANTS.NSSF_TIER_I_RATE, TAX_CONSTANTS.NSSF_TIER_I_MAX)
    : 0;
    
  const tierII = includeTierII 
    ? Math.min(
        Math.max(0, monthlyIncome - TAX_CONSTANTS.NSSF_TIER_I_MAX) * TAX_CONSTANTS.NSSF_TIER_II_RATE,
        TAX_CONSTANTS.NSSF_TIER_II_MAX
      )
    : 0;

  return {
    tierI,
    tierII,
    total: tierI + tierII
  };
}

/**
 * Calculate SHIF contribution
 * @param {number} monthlyIncome Monthly gross income
 * @returns {number} Monthly SHIF contribution
 */
export function calculateSHIFContribution(monthlyIncome) {
  const contribution = monthlyIncome * TAX_CONSTANTS.SHIF_RATE;
  return Math.min(Math.max(TAX_CONSTANTS.SHIF_MIN_CONTRIBUTION, contribution), TAX_CONSTANTS.SHIF_MAX_CONTRIBUTION);
}

/**
 * Calculate housing levy
 * @param {number} monthlyIncome Monthly gross income
 * @returns {number} Monthly housing levy amount
 */
export function calculateHousingLevy(monthlyIncome) {
  return monthlyIncome * TAX_CONSTANTS.HOUSING_LEVY_RATE;
}

/**
 * Calculate tax for a specific tax bracket
 * @param {number} income Taxable income
 * @param {Object} bracket Tax bracket information
 * @returns {number} Tax amount for the bracket
 */
function calculateBracketTax(income, bracket) {
  const taxableInBracket = Math.min(
    Math.max(0, income - bracket.min),
    bracket.max ? bracket.max - bracket.min : Infinity
  );
  return taxableInBracket * bracket.rate;
}

/**
 * Calculate monthly PAYE tax
 * @param {number} annualTaxableIncome Annual taxable income
 * @param {Array} taxBrackets Tax brackets from the tax service
 * @returns {number} Annual PAYE tax
 */
export function calculatePAYE(annualTaxableIncome, taxBrackets) {
  return taxBrackets.reduce((totalTax, bracket) => {
    return totalTax + calculateBracketTax(annualTaxableIncome, bracket);
  }, 0);
}

/**
 * Calculate insurance relief from insurance premiums
 * @param {number} monthlyPremium Monthly insurance premium
 * @returns {number} Monthly insurance relief amount
 */
export function calculateInsuranceRelief(monthlyPremium) {
  const reliefAmount = monthlyPremium * TAX_CONSTANTS.INSURANCE_RELIEF_RATE;
  return Math.min(reliefAmount, TAX_CONSTANTS.INSURANCE_RELIEF_MAX_MONTHLY);
}

/**
 * Calculate affordable housing relief from housing contributions
 * @param {number} monthlyContribution Monthly housing contribution
 * @returns {number} Monthly affordable housing relief
 */
export function calculateHousingRelief(monthlyContribution) {
  const annualContribution = monthlyContribution * 12;
  const annualRelief = Math.min(
    annualContribution * TAX_CONSTANTS.HOUSING_RELIEF_RATE, 
    TAX_CONSTANTS.HOUSING_RELIEF_MAX_ANNUAL
  );
  return annualRelief / 12; // Return monthly value
}

/**
 * Calculate net income and all tax components
 * @param {Object} params Calculation parameters
 * @returns {Object} Calculation results
 */
export function calculateNetIncome({
  annualIncome,
  includeNSSF = true,
  includeSHIF = true,
  includeHousingLevy = true,
  taxRates,
  nssfTiers = { includeTierI: true, includeTierII: true },
  personalRelief = TAX_CONSTANTS.PERSONAL_RELIEF,
  includePersonalRelief = true,
  insurancePremium = 0,
  includeInsuranceRelief = false,
  housingContribution = 0,
  includeHousingRelief = false
}) {
  const monthlyIncome = annualIncome / 12;
  
  // Calculate statutory deductions with NSSF tiers
  const nssfDetails = calculateNSSFByTier(monthlyIncome, nssfTiers);
  const monthlyNSSF = includeNSSF ? nssfDetails.total : 0;
  const monthlySHIF = includeSHIF ? calculateSHIFContribution(monthlyIncome) : 0;
  const monthlyHousingLevy = includeHousingLevy ? calculateHousingLevy(monthlyIncome) : 0;
  
  // Calculate reliefs
  const monthlyPersonalRelief = includePersonalRelief ? personalRelief / 12 : 0;
  const monthlyInsuranceRelief = includeInsuranceRelief ? calculateInsuranceRelief(Number(insurancePremium)) : 0;
  const monthlyHousingRelief = includeHousingRelief ? calculateHousingRelief(Number(housingContribution)) : 0;
  const totalMonthlyRelief = monthlyPersonalRelief + monthlyInsuranceRelief + monthlyHousingRelief;
  
  // Calculate annual values
  const annualNSSF = monthlyNSSF * 12;
  const annualSHIF = monthlySHIF * 12;
  const annualHousingLevy = monthlyHousingLevy * 12;
  const annualTotalRelief = totalMonthlyRelief * 12;
  
  // Calculate taxable income (deducting pension contributions as reliefs)
  const taxableIncome = annualIncome - (includeNSSF ? annualNSSF : 0);
  
  // Calculate PAYE
  const incomeTax = calculatePAYE(taxableIncome, taxRates.brackets);
  const taxAfterRelief = Math.max(0, incomeTax - annualTotalRelief);
  
  // Calculate total deductions and net income
  const totalDeductions = taxAfterRelief + annualNSSF + annualSHIF + annualHousingLevy;
  const netIncome = annualIncome - totalDeductions;
  
  return {
    grossIncome: annualIncome,
    taxableIncome,
    incomeTax,
    personalRelief: includePersonalRelief ? personalRelief : 0,
    insuranceRelief: includeInsuranceRelief ? monthlyInsuranceRelief * 12 : 0,
    housingRelief: includeHousingRelief ? monthlyHousingRelief * 12 : 0,
    totalRelief: annualTotalRelief,
    nssfContribution: annualNSSF,
    nssfTierI: nssfDetails.tierI * 12,
    nssfTierII: nssfDetails.tierII * 12,
    shifContribution: annualSHIF,
    housingLevy: annualHousingLevy,
    taxAfterRelief,
    totalDeductions,
    netIncome,
    monthlyGross: monthlyIncome,
    monthlyNet: netIncome / 12,
    monthlyDeductions: totalDeductions / 12,
    effectiveTaxRate: totalDeductions / annualIncome,
    payeTax: taxAfterRelief, // Adding for cleaner reference in UI
    monthlyBreakdown: {
      grossPay: monthlyIncome,
      nssf: monthlyNSSF,
      nssfTierI: nssfDetails.tierI,
      nssfTierII: nssfDetails.tierII,
      shif: monthlySHIF,
      housingLevy: monthlyHousingLevy,
      taxableIncome: taxableIncome / 12,
      paye: taxAfterRelief / 12,
      personalRelief: monthlyPersonalRelief,
      insuranceRelief: monthlyInsuranceRelief,
      housingRelief: monthlyHousingRelief,
      totalRelief: totalMonthlyRelief,
      netPay: netIncome / 12
    }
  };
}

/**
 * Calculate gross income from net pay
 * @param {number} targetNetPay Desired net monthly pay
 * @param {Object} options Calculation options
 * @returns {number} Required gross income
 */
export function calculateGrossFromNet(targetNetPay, {
  includeNSSF = true,
  includeSHIF = true,
  includeHousingLevy = true,
  taxRates,
  nssfTiers = { includeTierI: true, includeTierII: true },
  personalRelief = TAX_CONSTANTS.PERSONAL_RELIEF,
  includePersonalRelief = true,
  includeInsuranceRelief = false,
  insurancePremium = 0,
  includeHousingRelief = false,
  housingContribution = 0
} = {}) {
  let low = targetNetPay;
  let high = targetNetPay * 3; // Initial upper bound
  let iterations = 0;
  const maxIterations = 20;
  const tolerance = 0.01;

  while (iterations < maxIterations) {
    const testGross = (low + high) / 2;
    const result = calculateNetIncome({
      annualIncome: testGross * 12,
      includeNSSF,
      includeSHIF,
      includeHousingLevy,
      taxRates,
      nssfTiers,
      personalRelief,
      includePersonalRelief,
      includeInsuranceRelief,
      insurancePremium,
      includeHousingRelief,
      housingContribution
    });

    const testNet = result.monthlyNet;
    const diff = testNet - targetNetPay;

    if (Math.abs(diff) < tolerance) {
      return testGross * 12;
    }

    if (diff > 0) {
      high = testGross;
    } else {
      low = testGross;
    }

    iterations++;
  }

  // Return best approximation after max iterations
  return (low + high) / 2 * 12;
}

/**
 * Generate monthly breakdown of income and deductions
 * @param {Object} calculation Tax calculation results
 * @returns {Array} Monthly breakdown
 */
export function generateMonthlyBreakdown(calculation) {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  return months.map(name => ({
    name,
    gross: calculation.monthlyGross,
    deductions: calculation.monthlyDeductions,
    net: calculation.monthlyNet
  }));
}

/**
 * Generate tax calculation summary for reports
 * @param {Object} calculation Tax calculation results
 * @returns {Object} Summary object
 */
export function generateTaxSummary(calculation) {
  return {
    summary: {
      annualGrossIncome: calculation.grossIncome,
      annualNetIncome: calculation.netIncome,
      totalTax: calculation.taxAfterRelief,
      totalDeductions: calculation.totalDeductions,
      effectiveTaxRate: calculation.effectiveTaxRate
    },
    monthly: {
      grossIncome: calculation.monthlyGross,
      netIncome: calculation.monthlyNet,
      deductions: calculation.monthlyDeductions
    },
    deductions: {
      incomeTax: calculation.taxAfterRelief,
      nssf: calculation.nssfContribution,
      shif: calculation.shifContribution,
      personalRelief: calculation.personalRelief
    },
    breakdown: generateMonthlyBreakdown(calculation)
  };
}

/**
 * Calculate Digital Service Tax
 * @param {number} grossIncome Gross income
 * @returns {number} Digital Service Tax amount
 */
export function calculateDigitalServiceTax(grossIncome) {
  return grossIncome * TAX_CONSTANTS.DIGITAL_SERVICE_TAX_RATE;
}