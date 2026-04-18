/**
 * FLOWSTATE — Smart Currency Utility
 * Handles global Indian Rupee (INR) localization and formatting.
 */

// Mapping of common locales to their primary currency codes
const LOCALE_CURRENCY_MAP = {
  'en-IN': 'INR',
  'hi-IN': 'INR',
  'en-US': 'USD',
  'en-GB': 'GBP',
  'de-DE': 'EUR',
  'fr-FR': 'EUR',
  'ja-JP': 'JPY',
};

// Fixed conversion rates (Base: 1 USD)
// In a real app, these would be fetched from an API
const CONVERSION_RATES = {
  USD: 1,
  INR: 83.25,
  GBP: 0.79,
  EUR: 0.92,
  JPY: 151.40,
};

/**
 * Detects the user's primary currency based on their browser locale.
 * UPDATED: Hardcoded to 'INR' for global platform consistency as requested.
 */
export const getDetectedCurrency = () => {
  return 'INR';
};

/**
 * Formats a raw USD value into the user's localized currency.
 * @param {number} amountInUSD - The base value in USD.
 * @param {object} options - Intl.NumberFormat options.
 * @param {boolean} convert - Whether to apply the conversion rate.
 */
export const formatCurrency = (amountInUSD, options = {}, convert = true) => {
  const currencyCode = getDetectedCurrency();
  const rate = convert ? (CONVERSION_RATES[currencyCode] || 1) : 1;
  const convertedAmount = amountInUSD * rate;

  // Use 'en-IN' to ensure Indian numbering format (e.g., 1,00,000)
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    currencyDisplay: 'narrowSymbol', // Use symbols like ₹ and $
    ...options
  }).format(convertedAmount);
};

/**
 * Direct access to the current currency symbol for manual string building.
 */
export const getCurrencySymbol = () => {
  const currencyCode = getDetectedCurrency();
  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currencyCode,
    currencyDisplay: 'symbol'
  });
  
  // Extract the symbol from the formatted parts
  const parts = formatter.formatToParts(0);
  const symbolPart = parts.find(p => p.type === 'currency');
  return symbolPart ? symbolPart.value : '₹';
};
