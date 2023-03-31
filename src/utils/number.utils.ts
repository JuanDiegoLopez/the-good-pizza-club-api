import { CardCompanies } from '../constants/global.constants';

export const transformCardNumber = (value: string) => {
  const numbers = value.split('');
  const hiddenNumbers = numbers.slice(0, numbers.length - 4).map((_, index) => {
    const result = index > 0 && index % 4 === 0 ? '-X' : 'X';
    return result as string;
  });
  const visibleNumbers = ['-', ...numbers.slice(-4)];

  return hiddenNumbers.concat(visibleNumbers).join('');
};

export const transformSecurtyCode = (value: number) => {
  return String(value)
    .split('')
    .map(() => 'X')
    .join('');
};

export function getCardCompany(number: string) {
  let regex: RegExp;

  // visa
  regex = new RegExp('^4');
  if (number.match(regex) != null) return CardCompanies.Visa;

  // Mastercard
  // Updated for Mastercard 2017 BINs expansion
  if (
    /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(
      number,
    )
  )
    return CardCompanies.Mastercard;

  // AMEX
  regex = new RegExp('^3[47]');
  if (number.match(regex) != null) return CardCompanies.Amex;

  // Discover
  regex = new RegExp(
    '^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)',
  );
  if (number.match(regex) != null) return CardCompanies.Discover;

  // Diners
  regex = new RegExp('^36');
  if (number.match(regex) != null) return CardCompanies.Diners;

  return '';
}
