import MalnutritionDashboard from './components/malnutrition-dashboard'

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Dashboard de Determinantes Sociales de la Salud
        </h1>
        <p className="text-gray-600">
          Monitoreo de indicadores de salud para gobiernos locales
        </p>
      </header>

      <MalnutritionDashboard />
    </main>
  )
}
