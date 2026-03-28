const CHART_TYPES = [
  { value: 'bar', label: 'Barras' },
  { value: 'line', label: 'Linhas' },
  { value: 'pie', label: 'Pizza' },
]

export default function ChartTypeSelector({ currentType, onChange }) {
  return (
    <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
      {CHART_TYPES.map((type) => (
        <button
          key={type.value}
          onClick={() => onChange(type.value)}
          className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer
            ${currentType === type.value
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'}`}
        >
          {type.label}
        </button>
      ))}
    </div>
  )
}
