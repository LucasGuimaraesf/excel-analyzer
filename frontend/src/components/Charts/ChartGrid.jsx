import ChartCard from './ChartCard'

export default function ChartGrid({ charts, onChangeType, hiddenCharts, onToggleVisibility }) {
  if (!charts || charts.length === 0) return null

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {charts.map((chart, index) => (
        <div
          key={chart.id}
          className="animate-fade-in-up"
          style={{ animationDelay: `${index * 80}ms` }}
        >
          <ChartCard
            chart={chart}
            onChangeType={onChangeType}
            isHidden={hiddenCharts?.has(chart.id)}
            onToggleVisibility={onToggleVisibility}
          />
        </div>
      ))}
    </div>
  )
}
