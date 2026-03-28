import { useState } from 'react'
import client from '../api/client'

export default function useAnalysis() {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  async function uploadFile(file) {
    setIsLoading(true)
    setError(null)
    setData(null)

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await client.post('/upload', formData)
      setData(response.data)
    } catch (err) {
      const message =
        err.response?.data?.detail || 'Erro ao processar o arquivo'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }

  function updateChartType(chartId, newType) {
    if (!data) return
    setData((prev) => ({
      ...prev,
      suggested_charts: prev.suggested_charts.map((chart) =>
        chart.id === chartId ? { ...chart, chart_type: newType } : chart
      ),
    }))
  }

  function reset() {
    setData(null)
    setError(null)
  }

  return { data, isLoading, error, uploadFile, updateChartType, reset }
}
