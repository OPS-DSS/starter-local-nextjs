'use client'

import { useState, useCallback } from 'react'
import { useParquetData } from '@repo/explorers/data-loader'
import { IndicatorExplorer } from '@repo/explorers/indicator-explorer'
import { DSLineChart } from '@repo/charts/line-chart'

interface MalnutritionData {
  Departamento: string
  Año: number
  Tasa: number
}

export default function MalnutritionDashboard() {
  const { data, loading, error } = useParquetData(
    '/data/chronic_malnutrition_under5.parquet'
  )
  const [filteredData, setFilteredData] = useState<MalnutritionData[]>([])

  const handleFilterChange = useCallback((filtered: MalnutritionData[]) => {
    setFilteredData(filtered)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-lg">Cargando datos...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <h3 className="text-red-800 font-semibold">Error al cargar datos</h3>
        <p className="text-red-600">{error.message}</p>
      </div>
    )
  }

  // Transform data for the chart
  const chartData =
    filteredData.length > 0
      ? transformDataForChart(filteredData)
      : transformDataForChart(data)

  return (
    <div className="space-y-6">
      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">
          Desnutrición Crónica en Menores de 5 Años
        </h2>

        <IndicatorExplorer
          data={data}
          onFilteredDataChange={handleFilterChange}
        />
      </section>

      <section className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold mb-4">Tendencia Temporal</h3>

        <DSLineChart
          data={chartData}
          xAxisKey="año"
          lines={getUniqueLines(filteredData.length > 0 ? filteredData : data)}
          height={500}
        />
      </section>

      <section className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold mb-4">Resumen de Datos</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">
              {new Set(data.map((d) => d.Departamento)).size}
            </div>
            <div className="text-sm text-gray-600">Departamentos</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">
              {new Set(data.map((d) => d.Año)).size}
            </div>
            <div className="text-sm text-gray-600">Años</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">
              {data.length}
            </div>
            <div className="text-sm text-gray-600">Registros</div>
          </div>
        </div>
      </section>
    </div>
  )
}

function transformDataForChart(data: MalnutritionData[]) {
  const grouped = data.reduce(
    (acc, item) => {
      if (!acc[item.Año]) {
        acc[item.Año] = { año: item.Año }
      }
      acc[item.Año][item.Departamento] = item.Tasa
      return acc
    },
    {} as Record<number, any>
  )

  return Object.values(grouped).sort((a, b) => a.año - b.año)
}

function getUniqueLines(data: MalnutritionData[]) {
  const departments = Array.from(new Set(data.map((d) => d.Departamento)))
  const colors = [
    '#3b82f6',
    '#ef4444',
    '#10b981',
    '#f59e0b',
    '#8b5cf6',
    '#ec4899',
  ]

  return departments.slice(0, 6).map((dept, idx) => ({
    dataKey: dept,
    name: dept,
    color: colors[idx % colors.length],
  }))
}
