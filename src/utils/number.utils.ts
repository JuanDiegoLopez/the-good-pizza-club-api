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
