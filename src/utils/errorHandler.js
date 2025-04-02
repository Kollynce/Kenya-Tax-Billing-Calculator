/**
 * Custom error class for application errors
 */
export class AppError extends Error {
  constructor(message, code = "UNKNOWN_ERROR") {
    super(message);
    this.code = code;
    this.name = "AppError";
  }
}

/**
 * Error codes and their user-friendly messages
 */
export const ERROR_MESSAGES = {
  // Authentication errors
  AUTH_INVALID_EMAIL: "Please enter a valid email address",
  AUTH_WEAK_PASSWORD: "Password should be at least 6 characters long",
  AUTH_EMAIL_IN_USE: "This email is already registered",
  AUTH_USER_NOT_FOUND: "User not found. Please check your credentials",
  AUTH_WRONG_PASSWORD: "Incorrect password",
  AUTH_REQUIRES_RECENT_LOGIN: "Please sign in again to continue",

  // Tax calculation errors
  TAX_RATES_NOT_FOUND: "Tax rates not found for the specified year",
  INVALID_INCOME: "Please enter a valid income amount",
  CALCULATION_ERROR: "Error calculating taxes. Please try again",

  // Invoice errors
  INVOICE_NOT_FOUND: "Invoice not found",
  INVALID_INVOICE_DATA: "Please check the invoice details",
  INVOICE_CREATE_ERROR: "Error creating invoice",
  INVALID_STATUS: "Invalid invoice status",

  // General errors
  NETWORK_ERROR:
    "Network connection error. Please check your internet connection",
  UNKNOWN_ERROR: "An unexpected error occurred. Please try again",
  PERMISSION_DENIED: "You do not have permission to perform this action",
  INVALID_INPUT: "Please check your input and try again",
};

/**
 * Create an error with a code and message
 * @param {string} message Error message
 * @param {string} code Error code
 * @returns {Error} Error object with code and user-friendly message
 */
export function createError(message, code = "UNKNOWN_ERROR") {
  const error = new Error(message);
  error.code = code;
  error.userMessage = ERROR_MESSAGES[code] || message;
  return error;
}

/**
 * Format error messages for display
 * @param {Error} error The error to format
 * @returns {Object} Formatted error object
 */
export function formatError(error) {
  if (error instanceof AppError) {
    return {
      message: error.message,
      code: error.code,
    };
  }

  // Handle Firebase errors
  if (error.code && error.code.startsWith("auth/")) {
    return {
      message: formatFirebaseError(error.code),
      code: error.code,
    };
  }

  // Handle Firestore errors
  if (error.code && error.code.startsWith("firestore/")) {
    return {
      message: formatFirestoreError(error.code),
      code: error.code,
    };
  }

  // Handle tax calculation errors
  if (error.code && error.code.startsWith("tax/")) {
    return {
      message: formatTaxError(error.code),
      code: error.code,
    };
  }

  // Handle unexpected errors
  console.error("Unexpected error:", error);
  return {
    message: "An unexpected error occurred. Please try again.",
    code: "UNEXPECTED_ERROR",
  };
}

/**
 * Format Firebase error codes into user-friendly messages
 * @param {string} code Firebase error code
 * @returns {string} User-friendly error message
 */
function formatFirebaseError(code) {
  const errorMessages = {
    "auth/email-already-in-use": "This email is already registered.",
    "auth/invalid-email": "Please enter a valid email address.",
    "auth/operation-not-allowed": "Operation not allowed.",
    "auth/weak-password": "Please choose a stronger password.",
    "auth/user-disabled": "This account has been disabled.",
    "auth/user-not-found": "Invalid email or password.",
    "auth/wrong-password": "Invalid email or password.",
    "auth/too-many-requests": "Too many attempts. Please try again later.",
  };

  return errorMessages[code] || "An authentication error occurred.";
}

/**
 * Format Firestore error codes into user-friendly messages
 * @param {string} code Firestore error code
 * @returns {string} User-friendly error message
 */
function formatFirestoreError(code) {
  const errorMessages = {
    "firestore/cancelled": "The operation was cancelled.",
    "firestore/unknown": "An unknown error occurred.",
    "firestore/invalid-argument": "Invalid argument provided.",
    "firestore/deadline-exceeded": "Operation timed out. Please try again.",
    "firestore/not-found": "The requested document was not found.",
    "firestore/already-exists": "The document already exists.",
    "firestore/permission-denied":
      "You don't have permission to perform this operation.",
    "firestore/resource-exhausted":
      "System resource limits reached. Please try again later.",
    "firestore/failed-precondition":
      "Operation couldn't be executed in the current system state.",
    "firestore/aborted": "The operation was aborted.",
    "firestore/out-of-range": "Operation was attempted past the valid range.",
    "firestore/unimplemented": "Operation is not implemented or supported.",
    "firestore/internal": "Internal error. Please try again later.",
    "firestore/unavailable":
      "The service is currently unavailable. Please try again later.",
    "firestore/data-loss": "Unrecoverable data loss or corruption.",
    "firestore/unauthenticated":
      "User is not authenticated. Please sign in and try again.",
  };

  return errorMessages[code] || "A database error occurred. Please try again.";
}

/**
 * Format tax calculation error codes into user-friendly messages
 * @param {string} code Tax error code
 * @returns {string} User-friendly error message
 */
function formatTaxError(code) {
  const errorMessages = {
    "tax/invalid-income": "Please enter a valid income amount.",
    "tax/invalid-year": "Please select a valid tax year.",
    "tax/rates-not-found": "Tax rates for the selected year are not available.",
    "tax/calculation-error":
      "Error calculating taxes. Please check your input values.",
    "tax/nhif-calculation-error": "Error calculating NHIF contributions.",
    "tax/nssf-calculation-error": "Error calculating NSSF contributions.",
    "tax/income-negative": "Income amount cannot be negative.",
    "tax/income-too-high": "Income amount is unreasonably high.",
    "tax/deduction-negative": "Deduction amount cannot be negative.",
    "tax/deduction-exceeds-income": "Deductions cannot exceed income.",
    "tax/invalid-relief-amount": "Invalid personal relief amount.",
    "tax/invalid-pension-contribution": "Invalid pension contribution amount.",
    "tax/invalid-insurance-premium": "Invalid insurance premium amount.",
    "tax/invalid-housing-benefit": "Invalid housing benefit amount.",
  };

  return (
    errorMessages[code] ||
    "An error occurred during tax calculation. Please verify your inputs."
  );
}

/**
 * Handle API errors and return appropriate response
 * @param {Error} error The error to handle
 * @returns {Object} Error response object
 */
export function handleApiError(error) {
  const formattedError = formatError(error);

  // Log critical errors
  if (formattedError.code === "UNEXPECTED_ERROR") {
    // In production, you might want to log to a service like Sentry
    console.error("Critical error:", error);
  }

  return formattedError;
}

/**
 * Handle Firebase authentication errors
 * @param {Error} error Firebase auth error
 * @returns {Error} Error with user-friendly message
 */
export function handleAuthError(error) {
  let code = "UNKNOWN_ERROR";

  switch (error.code) {
    case "auth/invalid-email":
      code = "AUTH_INVALID_EMAIL";
      break;
    case "auth/weak-password":
      code = "AUTH_WEAK_PASSWORD";
      break;
    case "auth/email-already-in-use":
      code = "AUTH_EMAIL_IN_USE";
      break;
    case "auth/user-not-found":
      code = "AUTH_USER_NOT_FOUND";
      break;
    case "auth/wrong-password":
      code = "AUTH_WRONG_PASSWORD";
      break;
    case "auth/requires-recent-login":
      code = "AUTH_REQUIRES_RECENT_LOGIN";
      break;
  }

  return createError(error.message, code);
}

/**
 * Log error to console and optionally to error reporting service
 * @param {Error} error Error object
 * @param {Object} context Additional context
 */
export function logError(error, context = {}) {
  console.error("Error:", {
    message: error.message,
    code: error.code,
    userMessage: error.userMessage,
    stack: error.stack,
    context,
  });

  // TODO: Add error reporting service integration (e.g., Sentry)
}

/**
 * Validate numeric input
 * @param {number} value Value to validate
 * @param {Object} options Validation options
 * @returns {string|null} Error message if invalid, null if valid
 */
export function validateNumericInput(value, options = {}) {
  const {
    min = Number.MIN_SAFE_INTEGER,
    max = Number.MAX_SAFE_INTEGER,
    required = true,
    label = "Value",
  } = options;

  if (required && (value === null || value === undefined || value === "")) {
    return `${label} is required`;
  }

  if (value !== null && value !== undefined && value !== "") {
    if (isNaN(value) || typeof value !== "number") {
      return `${label} must be a number`;
    }

    if (value < min) {
      return `${label} must be at least ${min}`;
    }

    if (value > max) {
      return `${label} must be no more than ${max}`;
    }
  }

  return null;
}

/**
 * Validate required fields in an object
 * @param {Object} data Object to validate
 * @param {Array} requiredFields Array of required field names
 * @returns {Array} Array of error messages
 */
export function validateRequired(data, requiredFields) {
  const errors = [];

  requiredFields.forEach((field) => {
    const value = data[field];
    if (value === null || value === undefined || value === "") {
      errors.push(`${field} is required`);
    }
  });

  return errors;
}

/**
 * Validate insurance premium input
 * @param {number} value Insurance premium amount
 * @returns {string|null} Error message or null if valid
 */
export const validateInsurancePremium = (value) => {
  // Handle formatted numbers or empty strings
  if (value === "" || value === null || value === undefined) return null;

  const numValue =
    typeof value === "string" ? Number(value.replace(/,/g, "")) : Number(value);

  if (isNaN(numValue)) {
    return "Insurance Premium must be a number";
  }

  if (numValue < 0) {
    return "Insurance Premium cannot be negative";
  }

  if (numValue > 400000) {
    return "Insurance Premium cannot exceed 400,000 KES per month";
  }

  return null;
};

/**
 * Validate housing contribution input
 * @param {number} value Housing contribution amount
 * @returns {string|null} Error message or null if valid
 */
export const validateHousingContribution = (value) => {
  // Handle formatted numbers or empty strings
  if (value === "" || value === null || value === undefined) return null;

  const numValue =
    typeof value === "string" ? Number(value.replace(/,/g, "")) : Number(value);

  if (isNaN(numValue)) {
    return "Housing Contribution must be a number";
  }

  if (numValue < 0) {
    return "Housing Contribution cannot be negative";
  }

  if (numValue > 20000) {
    return "Housing Contribution cannot exceed 20,000 KES per month";
  }

  return null;
};
