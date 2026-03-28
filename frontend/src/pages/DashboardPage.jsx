import { useState, useMemo, useEffect } from 'react'
import useAnalysis from '../hooks/useAnalysis'
import FileDropzone from '../components/Upload/FileDropzone'
import DataSummary from '../components/Analysis/DataSummary'
import FilterPanel from '../components/Filters/FilterPanel'
import ChartGrid from '../components/Charts/ChartGrid'

function SkeletonDashboard() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 h-20 animate-pulse-soft">
            <div className="h-3 bg-slate-100 rounded w-16 mb-2" />
            <div className="h-5 bg-slate-100 rounded w-24" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-100 p-6 h-96 animate-pulse-soft"
            style={{ animationDelay: `${i * 200}ms` }}
          >
            <div className="h-4 bg-slate-100 rounded w-48 mb-6" />
            <div className="h-64 bg-slate-50 rounded-lg" />
          </div>
        ))}
      </div>
    </main>
  )
}

export default function DashboardPage() {
  const { data, isLoading, error, uploadFile, updateChartType, reset } = useAnalysis()
  const [filters, setFilters] = useState({})

  // Initialize filters when data loads (all values selected)
  useEffect(() => {
    if (!data?.suggested_charts) {
      setFilters({})
      return
    }
    const initial = {}
    for (const chart of data.suggested_charts) {
      const col = chart.x_column
      if (initial[col]) continue
      const values = new Set(chart.data.map(row => String(row[col])))
      initial[col] = values
    }
    setFilters(initial)
  }, [data])

  // Compute filtered charts
  const filteredCharts = useMemo(() => {
    if (!data?.suggested_charts) return []
    if (Object.keys(filters).length === 0) return data.suggested_charts

    return data.suggested_charts.map(chart => {
      const active = filters[chart.x_column]
      if (!active || active.size === 0) return chart
      return {
        ...chart,
        data: chart.data.filter(row => active.has(String(row[chart.x_column]))),
      }
    })
  }, [data, filters])

  const handleFilterChange = (columnName, value) => {
    setFilters(prev => {
      const current = prev[columnName]
      if (!current) return prev
      const next = new Set(current)
      if (next.has(value)) {
        if (next.size > 1) next.delete(value) // prevent empty
      } else {
        next.add(value)
      }
      return { ...prev, [columnName]: next }
    })
  }

  const handleSelectAll = (columnName) => {
    if (!data?.suggested_charts) return
    const allValues = new Set()
    for (const chart of data.suggested_charts) {
      if (chart.x_column === columnName) {
        chart.data.forEach(row => allValues.add(String(row[columnName])))
      }
    }
    setFilters(prev => ({ ...prev, [columnName]: allValues }))
  }

  const handleClearAll = (columnName) => {
    if (!data?.suggested_charts) return
    // Keep at least the first value
    for (const chart of data.suggested_charts) {
      if (chart.x_column === columnName && chart.data.length > 0) {
        setFilters(prev => ({
          ...prev,
          [columnName]: new Set([String(chart.data[0][columnName])]),
        }))
        return
      }
    }
  }

  // Loading state
  if (isLoading && !data) {
    return <SkeletonDashboard />
  }

  // Upload state
  if (!data) {
    return (
      <main className="max-w-2xl mx-auto px-6 py-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-800 mb-3 tracking-tight">
            Analise seus dados em segundos
          </h2>
          <p className="text-slate-400 text-lg">
            Faca upload de um arquivo Excel e o sistema gerara graficos automaticamente
          </p>
        </div>
        <FileDropzone onUpload={uploadFile} isLoading={isLoading} />
        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-xl">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}
      </main>
    )
  }

  // Results state
  return (
    <main className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-6 animate-fade-in-up">
        <h2 className="text-xl font-bold text-slate-800">Resultados da Analise</h2>
        <button
          onClick={reset}
          className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-colors cursor-pointer shadow-sm"
        >
          Novo Upload
        </button>
      </div>

      <div className="mb-6 animate-fade-in-up">
        <DataSummary data={data} />
      </div>

      {filteredCharts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-100 shadow-sm animate-fade-in-up">
          <p className="text-slate-500">
            Nao foi possivel gerar graficos automaticamente para estes dados.
          </p>
          <p className="text-sm text-slate-400 mt-1">
            Verifique se sua planilha possui colunas numericas e categoricas.
          </p>
        </div>
      ) : (
        <>
          <div className="mb-6 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <FilterPanel
              charts={data.suggested_charts}
              filters={filters}
              onFilterChange={handleFilterChange}
              onSelectAll={handleSelectAll}
              onClearAll={handleClearAll}
            />
          </div>
          <ChartGrid charts={filteredCharts} onChangeType={updateChartType} />
        </>
      )}
    </main>
  )
}
