import { Link } from 'react-router-dom'
import ExampleChartCard from '../components/Home/ExampleChartCard'
import { exampleCharts } from '../data/exampleCharts'

export default function HomePage() {
  return (
    <main className="bg-gradient-to-b from-white to-slate-50">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 text-center animate-fade-in-up">
        <span className="inline-block px-3 py-1 mb-5 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-100 rounded-full">
          Excel Analyzer
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 tracking-tight max-w-3xl mx-auto">
          Transforme planilhas em insights em segundos
        </h1>
        <p className="mt-5 text-base md:text-lg text-slate-500 max-w-2xl mx-auto">
          Envie um arquivo Excel e receba automaticamente uma analise visual com graficos
          inteligentes — sem configuracao, sem complicacao.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3 flex-wrap">
          <Link
            to="/dashboard"
            className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            Analisar meu Excel
          </Link>
          <a
            href="#exemplos"
            className="px-5 py-2.5 text-sm font-medium text-slate-700 bg-white border border-gray-200 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Ver exemplos
          </a>
        </div>
      </section>

      {/* Exemplos */}
      <section id="exemplos" className="max-w-6xl mx-auto px-6 pb-24">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">
            Exemplos de analises
          </h2>
          <p className="mt-2 text-sm text-slate-500 max-w-xl mx-auto">
            Veja alguns dos graficos que o Excel Analyzer gera automaticamente a partir
            dos seus dados.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exampleCharts.map((chart, i) => (
            <div
              key={chart.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <ExampleChartCard
                title={chart.title}
                description={chart.description}
                type={chart.type}
                data={chart.data}
                xKey={chart.xKey}
                yKey={chart.yKey}
              />
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/dashboard"
            className="inline-block px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            Comecar agora
          </Link>
        </div>
      </section>
    </main>
  )
}
