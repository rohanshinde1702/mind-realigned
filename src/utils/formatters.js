import { CURRENCIES } from '@/data';

export const formatCurrencyPrice = (usdAmount, currencyCode = 'USD') => {
  const cur = CURRENCIES.find((c) => c.code === currencyCode) || CURRENCIES[0];
  let val = usdAmount * cur.rate;
  val = currencyCode === 'INR' ? Math.round(val / 50) * 50 : Math.round(val);
  const formatted =
    currencyCode === 'INR'
      ? String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      : String(val);
  return `${cur.symbol}${formatted}`;
};

export const formatNumber = (num) => {
  return num.toLocaleString();
};
