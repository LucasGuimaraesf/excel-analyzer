import { Routes, Route } from 'react-router-dom'
import Header from './components/Layout/Header'
import DashboardPage from './pages/DashboardPage'
import ContatoPage from './pages/ContatoPage'
import QuemSomosPage from './pages/QuemSomosPage'
import LoginPage from './pages/LoginPage'

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/contato" element={<ContatoPage />} />
        <Route path="/quem-somos" element={<QuemSomosPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  )
}
