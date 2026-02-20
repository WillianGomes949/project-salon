// Formata valor monetário
export function formatCurrency(
  value: number,
  currency = 'BRL',
  locale = 'pt-BR'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(value)
}

// Formata valor sem símbolo de moeda
export function formatNumber(value: number, decimals = 2): string {
  return value.toFixed(decimals).replace('.', ',')
}

// Parse de string monetária para número
export function parseCurrency(value: string): number {
  const cleaned = value
    .replace(/[^\d,-]/g, '')
    .replace(',', '.')
  
  return parseFloat(cleaned) || 0
}

// Calcula desconto
export function calculateDiscount(
  originalPrice: number,
  discountPercentage: number
): { discountedPrice: number; discountAmount: number } {
  const discountAmount = originalPrice * (discountPercentage / 100)
  const discountedPrice = originalPrice - discountAmount
  
  return {
    discountedPrice: Math.round(discountedPrice * 100) / 100,
    discountAmount: Math.round(discountAmount * 100) / 100,
  }
}

// Calcula total com múltiplos itens
export function calculateTotal(items: { price: number; quantity?: number }[]): number {
  return items.reduce((total, item) => {
    const quantity = item.quantity || 1
    return total + item.price * quantity
  }, 0)
}

// Arredonda para cima
export function roundUp(value: number, decimals = 2): number {
  const multiplier = Math.pow(10, decimals)
  return Math.ceil(value * multiplier) / multiplier
}

// Arredonda para baixo
export function roundDown(value: number, decimals = 2): number {
  const multiplier = Math.pow(10, decimals)
  return Math.floor(value * multiplier) / multiplier
}
