import { useState, useMemo } from 'react'

export default function FilterPanel({ charts, filters, onFilterChange, onSelectAll, onClearAll }) {
  const [expanded, setExpanded] = useState(true)

  // Group unique values by x_column (avoid duplicates across charts)
  const filterGroups = useMemo(() => {
    const groups = {}
    for (const chart of charts) {
      const col = chart.x_column
      if (groups[col]) continue
      const values = [...new Set(chart.data.map(row => String(row[col])))]
      groups[col] = values
    }
    return groups
  }, [charts])

  const groupEntries = Object.entries(filterGroups)
  if (groupEntries.length === 0) return null

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-5 py-3 hover:bg-slate-50 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          <span className="text-sm font-semibold text-slate-700">Filtros</span>
          <span className="text-xs text-slate-400">
            ({groupEntries.length} {groupEntries.length === 1 ? 'categoria' : 'categorias'})
          </span>
        </div>
        <svg
          className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {expanded && (
        <div className="px-5 pb-4 space-y-4 border-t border-gray-50">
          {groupEntries.map(([columnName, values]) => {
            const activeSet = filters[columnName] || new Set()
            const allSelected = values.every(v => activeSet.has(v))

            return (
              <div key={columnName} className="pt-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    {columnName}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => onSelectAll(columnName)}
                      className={`text-xs font-medium transition-colors cursor-pointer ${
                        allSelected ? 'text-slate-300' : 'text-blue-600 hover:text-blue-700'
                      }`}
                      disabled={allSelected}
                    >
                      Todos
                    </button>
                    <span className="text-slate-200">|</span>
                    <button
                      onClick={() => onClearAll(columnName)}
                      className="text-xs font-medium text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                    >
                      Limpar
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {values.map((value) => {
                    const isActive = activeSet.has(value)
                    return (
                      <button
                        key={value}
                        onClick={() => onFilterChange(columnName, value)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all duration-150 cursor-pointer ${
                          isActive
                            ? 'bg-blue-50 text-blue-700 border-blue-200 shadow-sm'
                            : 'bg-slate-50 text-slate-400 border-slate-100 hover:bg-slate-100 hover:text-slate-500'
                        }`}
                      >
                        {value}
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
