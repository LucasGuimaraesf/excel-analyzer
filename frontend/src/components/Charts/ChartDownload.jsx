import { toPng } from 'html-to-image'

export default function ChartDownload({ chartRef, title }) {
  async function handleDownload() {
    if (!chartRef.current) return
    try {
      const dataUrl = await toPng(chartRef.current, { backgroundColor: '#ffffff' })
      const link = document.createElement('a')
      link.download = `${title.replace(/\s+/g, '_')}.png`
      link.href = dataUrl
      link.click()
    } catch (err) {
      console.error('Erro ao exportar grafico:', err)
    }
  }

  return (
    <button
      onClick={handleDownload}
      className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
      title="Baixar como PNG"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    </button>
  )
}
