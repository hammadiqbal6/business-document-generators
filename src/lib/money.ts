export function formatMoney(amount: number, currency = 'USD'): string {
  const n = Number.isFinite(amount) ? amount : 0;
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
    }).format(n);
  } catch {
    return `$${n.toFixed(2)}`;
  }
}

export function lineItemTotal(quantity: number, rate: number): number {
  const q = Number(quantity) || 0;
  const r = Number(rate) || 0;
  return Math.round(q * r * 100) / 100;
}

export function sumLineItems(
  items: { quantity: number; rate: number }[],
): number {
  return items.reduce((sum, item) => sum + lineItemTotal(item.quantity, item.rate), 0);
}
