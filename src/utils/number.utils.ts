import { CardCompanies } from '../constants/global.constants';

/**
 * Transforms a credit card number by masking all digits except the last 4.
 * Creates a secure display format that hides sensitive card information while
 * showing enough digits for user identification.
 * 
 * @param {string} value - The complete credit card number as a string
 * @returns {string} The masked card number with format "XXXX-XXXX-XXXX-1234"
 * 
 * @example
 * transformCardNumber("1234567890123456") // Returns "XXXX-XXXX-XXXX-3456"
 */
export const transformCardNumber = (value: string) => {
  /** Split the card number into individual digits */
  const numbers = value.split('');
  
  /** 
   * Create masked digits for all but the last 4 digits.
   * Adds hyphens every 4 digits for better readability.
   */
  const hiddenNumbers = numbers.slice(0, numbers.length - 4).map((_, index) => {
    const result = index > 0 && index % 4 === 0 ? '-X' : 'X';
    return result as string;
  });
  
  /** Keep the last 4 digits visible with a leading hyphen */
  const visibleNumbers = ['-', ...numbers.slice(-4)];

  return hiddenNumbers.concat(visibleNumbers).join('');
};

/**
 * Transforms a credit card security code (CVV/CVC) by masking all digits.
 * Completely hides the security code for enhanced security.
 * 
 * @param {number} value - The security code as a number
 * @returns {string} The masked security code with all digits replaced by 'X'
 * 
 * @example
 * transformSecurtyCode(123) // Returns "XXX"
 * transformSecurtyCode(4567) // Returns "XXXX"
 */
export const transformSecurtyCode = (value: number) => {
  return String(value)
    .split('')
    .map(() => 'X')
    .join('');
};

/**
 * Determines the credit card company/brand based on the card number.
 * Uses industry-standard BIN (Bank Identification Number) patterns to identify
 * the card company from the first few digits.
 * 
 * @param {string} number - The complete credit card number
 * @returns {string} The card company name or empty string if not recognized
 * 
 * @example
 * getCardCompany("4111111111111111") // Returns "Visa"
 * getCardCompany("5555555555554444") // Returns "Mastercard"
 * getCardCompany("378282246310005") // Returns "AMEX"
 */
export function getCardCompany(number: string) {
  /** Regular expression for pattern matching */
  let regex: RegExp;

  /** Visa cards start with 4 */
  regex = new RegExp('^4');
  if (number.match(regex) != null) return CardCompanies.Visa;

  /** 
   * Mastercard detection with updated BIN ranges.
   * Includes both traditional 5xxx ranges and new 2xxx ranges (2017 expansion)
   */
  if (
    /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(
      number,
    )
  )
    return CardCompanies.Mastercard;

  /** American Express cards start with 34 or 37 */
  regex = new RegExp('^3[47]');
  if (number.match(regex) != null) return CardCompanies.Amex;

  /** 
   * Discover cards have various BIN ranges:
   * - 6011
   * - 622126-622925
   * - 644-649
   * - 65
   */
  regex = new RegExp(
    '^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)',
  );
  if (number.match(regex) != null) return CardCompanies.Discover;

  /** Diners Club cards start with 36 */
  regex = new RegExp('^36');
  if (number.match(regex) != null) return CardCompanies.Diners;

  /** Return empty string if card company is not recognized */
  return '';
}
