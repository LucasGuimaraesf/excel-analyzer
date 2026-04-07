import { useState, useEffect } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'

const navLinks = [
  { to: '/', label: 'Inicio' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/planos', label: 'Planos' },
  { to: '/quem-somos', label: 'Quem Somos' },
  { to: '/contato', label: 'Contato' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  // Fecha o menu ao trocar de rota
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-20 shadow-sm">
      <div className="px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-sm">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h1 className="text-lg font-bold text-slate-800 tracking-tight">Excel Analyzer</h1>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <Link
            to="/login"
            className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Login
          </Link>
          <Link
            to="/cadastro"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            Cadastro
          </Link>
        </div>

        {/* Botao hamburguer (mobile) */}
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer"
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Painel mobile */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white animate-fade-in-up">
          <nav className="flex flex-col px-4 py-3 gap-1">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
          <div className="flex flex-col gap-2 px-4 pb-4 pt-2 border-t border-gray-100">
            <Link
              to="/login"
              className="px-4 py-2.5 text-center text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/cadastro"
              className="px-4 py-2.5 text-center text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              Cadastro
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
