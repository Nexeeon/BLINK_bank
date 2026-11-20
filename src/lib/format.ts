export const formatRupiah = (value: number): string => {
  const sign = value < 0 ? '-' : '';
  return `${sign}Rp ${Math.abs(Math.round(value))
    .toLocaleString('id-ID')
    .replace(/,/g, '.')}`;
};

export const parseRupiah = (value: string): number => {
  const digits = value.replace(/[^\d]/g, '');
  return digits ? parseInt(digits, 10) : 0;
};

export const formatNumberId = (value: number): string =>
  value.toLocaleString('id-ID').replace(/,/g, '.');

export const generateAccountNumber = (): string => {
  let num = '8';
  for (let i = 0; i < 9; i++) {
    num += Math.floor(Math.random() * 10).toString();
  }
  return num;
};
