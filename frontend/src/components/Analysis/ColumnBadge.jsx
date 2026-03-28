import { formatNumber } from '../../utils/formatters'

const TYPE_CONFIG = {
  numeric: {
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    badge: 'bg-emerald-100 text-emerald-700',
    label: 'Numerico',
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
      </svg>
    ),
  },
  categorical: {
    bg: 'bg-violet-50',
    text: 'text-violet-700',
    badge: 'bg-violet-100 text-violet-700',
    label: 'Categorico',
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" />
      </svg>
    ),
  },
  datetime: {
    bg: 'bg-sky-50',
    text: 'text-sky-700',
    badge: 'bg-sky-100 text-sky-700',
    label: 'Data',
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
}

export default function ColumnBadge({ column }) {
  const config = TYPE_CONFIG[column.dtype] || TYPE_CONFIG.categorical

  return (
    <div className={`${config.bg} rounded-lg p-3 flex items-center justify-between`}>
      <div className="flex items-center gap-2">
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium ${config.badge}`}>
          {config.icon}
          {config.label}
        </span>
        <span className="font-medium text-sm text-slate-800">{column.name}</span>
      </div>
      <div className="text-xs text-slate-500 flex items-center gap-3">
        {column.stats && (
          <>
            <span>Min: {formatNumber(column.stats.min)}</span>
            <span>Max: {formatNumber(column.stats.max)}</span>
            <span>Media: {formatNumber(column.stats.mean)}</span>
          </>
        )}
        {column.dtype === 'categorical' && (
          <span>{column.unique_count} valores unicos</span>
        )}
        {column.dtype === 'datetime' && column.sample_values.length > 0 && (
          <span>{column.sample_values[0]}</span>
        )}
      </div>
    </div>
  )
}
