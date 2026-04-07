import { Routes, Route } from 'react-router-dom'
import Header from './components/Layout/Header'
import HomePage from './pages/HomePage'
import DashboardPage from './pages/DashboardPage'
import PlanosPage from './pages/PlanosPage'
import ContatoPage from './pages/ContatoPage'
import QuemSomosPage from './pages/QuemSomosPage'
import LoginPage from './pages/LoginPage'
import CadastroPage from './pages/CadastroPage'

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/planos" element={<PlanosPage />} />
        <Route path="/contato" element={<ContatoPage />} />
        <Route path="/quem-somos" element={<QuemSomosPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro" element={<CadastroPage />} />
      </Routes>
    </div>
  )
}
