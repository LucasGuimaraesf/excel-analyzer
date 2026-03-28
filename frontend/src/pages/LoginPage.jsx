import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', senha: '' })
  const [erro, setErro] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setErro('Funcionalidade de login sera implementada em breve.')
  }

  return (
    <main className="max-w-md mx-auto px-6 py-20">
      <div className="text-center mb-8 animate-fade-in-up">
        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Entrar na sua conta</h2>
        <p className="text-slate-400 mt-1 text-sm">Acesse o painel completo de analise</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
        {erro && (
          <div className="mb-5 p-3 bg-amber-50 border border-amber-100 rounded-lg">
            <p className="text-sm text-amber-700">{erro}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-colors"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-sm font-medium text-slate-700">Senha</label>
              <button type="button" className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                Esqueceu a senha?
              </button>
            </div>
            <input
              type="password"
              required
              value={form.senha}
              onChange={(e) => setForm({ ...form, senha: e.target.value })}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-colors"
              placeholder="Sua senha"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm cursor-pointer"
          >
            Entrar
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-slate-400">
            Nao tem uma conta?{' '}
            <button type="button" className="text-blue-600 hover:text-blue-700 font-medium">
              Criar conta
            </button>
          </p>
        </div>
      </div>

      <p className="text-center text-xs text-slate-300 mt-6 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
        <Link to="/" className="hover:text-slate-400 transition-colors">
          Voltar para o Dashboard
        </Link>
      </p>
    </main>
  )
}
