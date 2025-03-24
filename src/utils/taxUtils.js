/**
 * Constants for tax calculations
 */
export const TAX_CONSTANTS = {
  PERSONAL_RELIEF: 28800, // Annual personal relief
  NSSF_TIER_I_MAX: 6000, // Monthly NSSF Tier I maximum
  NSSF_TIER_II_MAX: 18000, // Monthly NSSF Tier II maximum
  NSSF_RATE: 0.06, // 6% NSSF contribution rate
  SHIF_MIN_CONTRIBUTION: 300, // Minimum monthly SHIF contribution
  SHIF_MAX_CONTRIBUTION: 1700, // Maximum monthly SHIF contribution
  SHIF_RATE: 0.0275, // 2.75% of gross pay for SHIF
  VAT_RATE: 0.16, // 16% VAT rate
  DIGITAL_SERVICE_TAX_RATE: 0.015, // 1.5% Digital Service Tax
  VAT_REGISTRATION_THRESHOLD: 5000000 // Annual turnover threshold for VAT registration (5M KES)
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
 * @returns {number} Monthly NSSF contribution
 */
export function calculateNSSFContribution(monthlyIncome) {
  const tierIContribution = Math.min(monthlyIncome * TAX_CONSTANTS.NSSF_RATE, TAX_CONSTANTS.NSSF_TIER_I_MAX);
  const tierIIContribution = Math.min(
    Math.max(0, monthlyIncome - TAX_CONSTANTS.NSSF_TIER_I_MAX) * TAX_CONSTANTS.NSSF_RATE,
    TAX_CONSTANTS.NSSF_TIER_II_MAX
  );
  
  return tierIContribution + tierIIContribution;
}

/**
 * Calculate SHIF contribution
 * @param {number} monthlyIncome Monthly gross income
 * @returns {number} Monthly SHIF contribution
 */
export function calculateSHIFContribution(monthlyIncome) {
  const contribution = monthlyIncome * TAX_CONSTANTS.SHIF_RATE;
  return Math.max(
    TAX_CONSTANTS.SHIF_MIN_CONTRIBUTION,
    Math.min(contribution, TAX_CONSTANTS.SHIF_MAX_CONTRIBUTION)
  );
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
 * Calculate net income and all tax components
 * @param {Object} params Calculation parameters
 * @returns {Object} Calculation results
 */
export function calculateNetIncome({
  annualIncome,
  includeNSSF = true,
  includeSHIF = true,
  taxRates,
  personalRelief = TAX_CONSTANTS.PERSONAL_RELIEF
}) {
  const monthlyIncome = annualIncome / 12;
  
  // Calculate deductions
  const monthlyNSSF = includeNSSF ? calculateNSSFContribution(monthlyIncome) : 0;
  const monthlySHIF = includeSHIF ? calculateSHIFContribution(monthlyIncome) : 0;
  
  // Calculate annual taxable income
  const annualNSSF = monthlyNSSF * 12;
  const annualSHIF = monthlySHIF * 12;
  const taxableIncome = annualIncome - (includeNSSF ? annualNSSF : 0);
  
  // Calculate PAYE
  const incomeTax = calculatePAYE(taxableIncome, taxRates.brackets);
  const taxAfterRelief = Math.max(0, incomeTax - personalRelief);
  
  // Calculate net income
  const totalDeductions = taxAfterRelief + annualNSSF + annualSHIF;
  const netIncome = annualIncome - totalDeductions;
  
  return {
    grossIncome: annualIncome,
    taxableIncome,
    incomeTax,
    personalRelief,
    nssfContribution: annualNSSF,
    shifContribution: annualSHIF,
    taxAfterRelief,
    totalDeductions,
    netIncome,
    monthlyGross: monthlyIncome,
    monthlyNet: netIncome / 12,
    monthlyDeductions: totalDeductions / 12,
    effectiveTaxRate: totalDeductions / annualIncome
  };
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
  
  return months.map(month => ({
    month,
    grossIncome: calculation.monthlyGross,
    nssf: calculation.nssfContribution / 12,
    shif: calculation.shifContribution / 12,
    tax: calculation.taxAfterRelief / 12,
    netIncome: calculation.monthlyNet
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