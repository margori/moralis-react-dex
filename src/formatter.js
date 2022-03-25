const intl = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  currencySign: 'accounting',
});

export const fm = (n) => intl.format(n);
