export const formatCurrency = (amount: number, currency: string = 'usd') => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency.toUpperCase(),
        minimumFractionDigits: amount > 1 ? 2 : 4,
        maximumFractionDigits: amount > 1 ? 2 : 6,
    }).format(amount);
};

export const formatPercentage = (percentage: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(percentage) + '%';
};
