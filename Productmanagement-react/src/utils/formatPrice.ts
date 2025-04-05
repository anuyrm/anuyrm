// src/utils/formatPrice.ts
export const getCurrencyByLocale = (locale: string): string => {
    if (locale.startsWith('en-GB')) return 'GBP';
    if (locale.startsWith('en-US')) return 'USD';
    if (locale.startsWith('en-IN')) return 'INR';
    if (locale.startsWith('fr-FR')) return 'EUR';
    return 'USD'; // default fallback
  };
  
  export const formatPrice = (amount: number, locale = navigator.language): string => {
    const currency = getCurrencyByLocale(locale);
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency
    }).format(amount);
  };
  