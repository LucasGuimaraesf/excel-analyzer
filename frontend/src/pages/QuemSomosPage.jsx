export default function QuemSomosPage() {
  const valores = [
    {
      titulo: 'Simplicidade',
      descricao: 'Transformamos dados complexos em visualizacoes claras e intuitivas.',
      icon: (
        <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      titulo: 'Acessibilidade',
      descricao: 'Qualquer pessoa pode analisar dados sem conhecimento tecnico avancado.',
      icon: (
        <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
    {
      titulo: 'Inteligencia',
      descricao: 'Deteccao automatica de padroes e sugestoes inteligentes de graficos.',
      icon: (
        <svg className="w-6 h-6 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
  ]

  const equipe = [
    { nome: 'Lucas', cargo: 'Desenvolvedor Full Stack', cor: 'from-blue-400 to-blue-600' },
    { nome: 'Equipe Dev', cargo: 'Desenvolvimento & Design', cor: 'from-emerald-400 to-emerald-600' },
    { nome: 'Colaboradores', cargo: 'Comunidade Open Source', cor: 'from-violet-400 to-violet-600' },
  ]

  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <div className="text-center mb-14 animate-fade-in-up">
        <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Quem Somos</h2>
        <p className="text-slate-400 mt-3 text-lg max-w-2xl mx-auto">
          Somos uma equipe apaixonada por transformar dados em insights valiosos,
          tornando a analise de dados acessivel para todos.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-10 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
        <h3 className="text-lg font-bold text-slate-800 mb-3">Nossa Missao</h3>
        <p className="text-slate-500 leading-relaxed">
          O Excel Analyzer nasceu da necessidade de simplificar a analise de dados.
          Muitas pessoas trabalham com planilhas Excel diariamente, mas nem todas
          tem tempo ou conhecimento para criar visualizacoes profissionais.
          Nossa ferramenta faz isso automaticamente — basta enviar seu arquivo
          e os graficos sao gerados em segundos.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        {valores.map((valor, i) => (
          <div
            key={valor.titulo}
            className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 animate-fade-in-up"
            style={{ animationDelay: `${(i + 2) * 100}ms` }}
          >
            <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mb-4">
              {valor.icon}
            </div>
            <h4 className="font-semibold text-slate-800 mb-2">{valor.titulo}</h4>
            <p className="text-sm text-slate-500 leading-relaxed">{valor.descricao}</p>
          </div>
        ))}
      </div>

      <div className="animate-fade-in-up" style={{ animationDelay: '500ms' }}>
        <h3 className="text-lg font-bold text-slate-800 mb-5 text-center">Nossa Equipe</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {equipe.map((membro) => (
            <div key={membro.nome} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 text-center">
              <div className={`w-16 h-16 bg-gradient-to-br ${membro.cor} rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm`}>
                <span className="text-white text-xl font-bold">{membro.nome[0]}</span>
              </div>
              <p className="font-semibold text-slate-800">{membro.nome}</p>
              <p className="text-sm text-slate-400 mt-1">{membro.cargo}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
