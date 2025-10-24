
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import PokedexPage from './pages/PokedexPage.jsx'
import PokemonDetailPage from './pages/PokemonDetailPage.jsx'
import TeamBuilderPage from './pages/TeamBuilderPage.jsx'

export default function App(){
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container-px py-6">
        <Routes>
          <Route path="/" element={<PokedexPage />} />
          <Route path="/pokemon/:id" element={<PokemonDetailPage />} />
          <Route path="/team-builder" element={<TeamBuilderPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
