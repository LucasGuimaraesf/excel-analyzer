const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

const numberFormatter = new Intl.NumberFormat('pt-BR', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
})

export function formatCurrency(value) {
  if (typeof value !== 'number') return value
  return currencyFormatter.format(value)
}

export function formatNumber(value) {
  if (typeof value !== 'number') return value
  return numberFormatter.format(value)
}

const CURRENCY_KEYWORDS = [
  'valor', 'preco', 'custo', 'total', 'receita', 'despesa',
  'salario', 'pagamento', 'faturamento', 'renda', 'gasto',
  'price', 'cost', 'amount', 'revenue',
]

export function isCurrencyColumn(columnName) {
  const lower = columnName.toLowerCase()
  return CURRENCY_KEYWORDS.some((kw) => lower.includes(kw))
}

export function formatValue(value, columnName) {
  if (typeof value !== 'number') return value
  if (isCurrencyColumn(columnName)) return formatCurrency(value)
  return formatNumber(value)
}

export function groupPieSlices(data, xCol, yCol, maxSlices = 6) {
  if (data.length <= maxSlices) return data

  const sorted = [...data].sort((a, b) => (b[yCol] || 0) - (a[yCol] || 0))
  const top = sorted.slice(0, maxSlices - 1)
  const rest = sorted.slice(maxSlices - 1)
  const outrosTotal = rest.reduce((sum, d) => sum + (d[yCol] || 0), 0)

  if (outrosTotal > 0) {
    top.push({ [xCol]: 'Outros', [yCol]: Math.round(outrosTotal * 100) / 100 })
  }

  return top
}
