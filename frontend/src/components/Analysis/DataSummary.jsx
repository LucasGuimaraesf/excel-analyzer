import { formatNumber } from '../../utils/formatters'
import ColumnBadge from './ColumnBadge'

function StatCard({ icon, label, value }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
      <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500 shrink-0">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs text-slate-400 uppercase tracking-wide">{label}</p>
        <p className="font-semibold text-slate-800 truncate">{value}</p>
      </div>
    </div>
  )
}

function TypeSummary({ columns }) {
  const counts = { numeric: 0, categorical: 0, datetime: 0 }
  columns.forEach((c) => { counts[c.dtype] = (counts[c.dtype] || 0) + 1 })
  const parts = []
  if (counts.numeric) parts.push(`${counts.numeric} Num`)
  if (counts.categorical) parts.push(`${counts.categorical} Cat`)
  if (counts.datetime) parts.push(`${counts.datetime} Data`)
  return parts.join(' / ')
}

export default function DataSummary({ data }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard
          label="Arquivo"
          value={data.filename}
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          }
        />
        <StatCard
          label="Linhas"
          value={formatNumber(data.row_count)}
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          }
        />
        <StatCard
          label="Colunas"
          value={data.columns.length}
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7" />
            </svg>
          }
        />
        <StatCard
          label="Tipos"
          value={<TypeSummary columns={data.columns} />}
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
          }
        />
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
        <p className="text-xs text-slate-400 uppercase tracking-wide mb-3">Detalhes das Colunas</p>
        <div className="space-y-2">
          {data.columns.map((col) => (
            <ColumnBadge key={col.name} column={col} />
          ))}
        </div>
      </div>
    </div>
  )
}
