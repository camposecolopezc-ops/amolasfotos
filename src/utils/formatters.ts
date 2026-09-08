export function formatCurrency(amount: number, currency: string = 'EUR'): string {
  switch (currency) {
    case 'USD':
      return `$${amount.toFixed(2)}`;
    case 'MXN':
      return `$${(amount * 19.5).toFixed(2)} MXN`;
    case 'EUR':
    default:
      return `${amount.toFixed(2)} €`;
  }
}
