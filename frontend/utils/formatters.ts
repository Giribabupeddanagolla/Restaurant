export function formatCurrency(amount: number | string | undefined | null, currency: string = '₹'): string {
  const num = typeof amount === 'number' ? amount : Number(amount);
  const val = !isNaN(num) && num !== null && num !== undefined ? num : 0;
  return `${currency}${val.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function formatDate(dateString: string | undefined | null): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '';
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}
