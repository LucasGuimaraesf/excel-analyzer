import { useRef } from 'react'
import {
  BarChart, Bar,
  LineChart, Line,
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer,
} from 'recharts'
import ChartTypeSelector from './ChartTypeSelector'
import ChartDownload from './ChartDownload'
import { formatValue, groupPieSlices, isCurrencyColumn } from '../../utils/formatters'

const COLORS = [
  '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899',
  '#06b6d4', '#84cc16', '#f97316', '#6366f1', '#14b8a6', '#e11d48',
]

function CustomTooltip({ active, payload, label, yColumn }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-100 px-3 py-2">
      <p className="text-xs text-slate-500 mb-1">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="text-sm font-semibold" style={{ color: entry.color }}>
          {formatValue(entry.value, yColumn)}
        </p>
      ))}
    </div>
  )
}

function RenderChart({ chart }) {
  const { chart_type, data, x_column, y_column } = chart
  const useCurrency = isCurrencyColumn(y_column)

  const tickFormatter = (value) => {
    if (typeof value !== 'number') return value
    if (useCurrency) {
      if (value >= 1000) return `R$ ${(value / 1000).toFixed(0)}k`
      return `R$ ${value}`
    }
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`
    if (value >= 1000) return `${(value / 1000).toFixed(0)}k`
    return value
  }

  if (chart_type === 'pie') {
    const pieData = groupPieSlices(data, x_column, y_column)
    return (
      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={pieData}
            dataKey={y_column}
            nameKey={x_column}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={110}
            paddingAngle={2}
            label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
            labelLine={{ strokeWidth: 1 }}
          >
            {pieData.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip yColumn={y_column} />} />
          <Legend
            layout="vertical"
            align="right"
            verticalAlign="middle"
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: '12px' }}
          />
        </PieChart>
      </ResponsiveContainer>
    )
  }

  if (chart_type === 'line') {
    return (
      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis
            dataKey={x_column}
            tick={{ fontSize: 11, fill: '#94a3b8' }}
            axisLine={{ stroke: '#e2e8f0' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: '#94a3b8' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={tickFormatter}
          />
          <Tooltip content={<CustomTooltip yColumn={y_column} />} />
          <Line
            type="monotone"
            dataKey={y_column}
            stroke="#3b82f6"
            strokeWidth={2.5}
            dot={{ r: 3, fill: '#3b82f6', strokeWidth: 0 }}
            activeDot={{ r: 5, fill: '#3b82f6' }}
          />
        </LineChart>
      </ResponsiveContainer>
    )
  }

  // Default: bar chart
  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
        <XAxis
          dataKey={x_column}
          tick={{ fontSize: 11, fill: '#94a3b8' }}
          axisLine={{ stroke: '#e2e8f0' }}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 11, fill: '#94a3b8' }}
          axisLine={false}
          tickLine={false}
          tickFormatter={tickFormatter}
        />
        <Tooltip content={<CustomTooltip yColumn={y_column} />} />
        <Bar dataKey={y_column} fill="#3b82f6" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

function EyeIcon({ open }) {
  if (open) {
    return (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    )
  }
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
    </svg>
  )
}

export default function ChartCard({ chart, onChangeType, isHidden, onToggleVisibility }) {
  const chartRef = useRef(null)

  return (
    <div className={`bg-white rounded-xl border border-gray-100 shadow-sm transition-all duration-200 p-6 ${isHidden ? 'opacity-70' : 'hover:shadow-md'}`}>
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-semibold text-slate-800">{chart.title}</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onToggleVisibility(chart.id)}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              isHidden
                ? 'text-slate-300 hover:text-slate-500 hover:bg-slate-50'
                : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
            }`}
            title={isHidden ? 'Mostrar grafico' : 'Ocultar grafico'}
          >
            <EyeIcon open={!isHidden} />
          </button>
          {!isHidden && (
            <>
              <ChartDownload chartRef={chartRef} title={chart.title} />
              <ChartTypeSelector
                currentType={chart.chart_type}
                onChange={(type) => onChangeType(chart.id, type)}
              />
            </>
          )}
        </div>
      </div>
      {isHidden ? (
        <div className="flex items-center justify-center py-10 text-slate-300">
          <p className="text-sm">Grafico oculto</p>
        </div>
      ) : (
        <div ref={chartRef}>
          <RenderChart chart={chart} />
        </div>
      )}
    </div>
  )
}
