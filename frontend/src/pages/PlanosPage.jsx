import { Link } from 'react-router-dom'

const planos = [
  {
    id: 'gratuito',
    nome: 'Gratuito',
    descricao: 'Para quem quer experimentar a ferramenta.',
    preco: 'R$ 0',
    periodo: '/mes',
    destaque: false,
    cta: 'Comecar gratis',
    beneficios: [
      '1 analise por dia',
      'Graficos automaticos',
      'Exportacao em PNG',
      'Suporte por e-mail',
    ],
  },
  {
    id: 'pro',
    nome: 'Pro',
    descricao: 'Para profissionais e analistas frequentes.',
    preco: 'R$ 49',
    periodo: '/mes',
    destaque: true,
    cta: 'Assinar plano Pro',
    beneficios: [
      'Ate 15 analises por dia',
      'Filtros avancados',
      'Troca de tipo de grafico',
      'Historico de analises',
      'Suporte prioritario',
    ],
  },
  {
    id: 'empresarial',
    nome: 'Empresarial',
    descricao: 'Para times e empresas que precisam de escala.',
    preco: 'R$ 199',
    periodo: '/mes',
    destaque: false,
    cta: 'Falar com vendas',
    beneficios: [
      'Analises ilimitadas',
      'Multiplos usuarios',
      'Integracao via API',
      'SLA dedicado',
      'Onboarding personalizado',
    ],
  },
]

function CheckIcon() {
  return (
    <svg className="w-5 h-5 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  )
}

export default function PlanosPage() {
  return (
    <main className="bg-gradient-to-b from-white to-slate-50">
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-12 text-center animate-fade-in-up">
        <span className="inline-block px-3 py-1 mb-5 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-100 rounded-full">
          Planos e precos
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 tracking-tight max-w-3xl mx-auto">
          Escolha o plano ideal para voce
        </h1>
        <p className="mt-5 text-base md:text-lg text-slate-500 max-w-2xl mx-auto">
          Comece gratuitamente e evolua conforme o seu volume de analises cresce.
          Cancele quando quiser, sem letras miudas.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {planos.map((plano, i) => (
            <div
              key={plano.id}
              className={`relative flex flex-col rounded-2xl border shadow-sm p-8 animate-fade-in-up transition-all duration-200 ${
                plano.destaque
                  ? 'bg-white border-blue-200 shadow-lg ring-1 ring-blue-100 md:-translate-y-2'
                  : 'bg-white border-gray-100 hover:shadow-md'
              }`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {plano.destaque && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-semibold text-white bg-blue-600 rounded-full shadow-sm">
                  Mais popular
                </span>
              )}

              <div>
                <h3 className="text-lg font-bold text-slate-800">{plano.nome}</h3>
                <p className="text-sm text-slate-500 mt-1">{plano.descricao}</p>
              </div>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-slate-800 tracking-tight">{plano.preco}</span>
                <span className="text-sm text-slate-400">{plano.periodo}</span>
              </div>

              <ul className="mt-6 space-y-3 flex-1">
                {plano.beneficios.map((beneficio) => (
                  <li key={beneficio} className="flex items-start gap-2.5">
                    <CheckIcon />
                    <span className="text-sm text-slate-600 leading-relaxed">{beneficio}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/dashboard"
                className={`mt-8 block text-center px-5 py-2.5 text-sm font-medium rounded-lg transition-colors shadow-sm ${
                  plano.destaque
                    ? 'text-white bg-blue-600 hover:bg-blue-700'
                    : 'text-slate-700 bg-white border border-gray-200 hover:bg-slate-50'
                }`}
              >
                {plano.cta}
              </Link>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-slate-400">
          Todos os planos incluem atualizacoes gratuitas e armazenamento seguro dos resultados.
        </p>
      </section>
    </main>
  )
}
