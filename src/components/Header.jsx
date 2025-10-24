
import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/logo.svg'

export default function Header(){
  return (
    <header className="border-b border-slate-200 dark:border-slate-700">
      <div className="container-px py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="PokéSphere" className="w-8 h-8"/>
          <span className="font-bold text-lg">PokéSphere</span>
        </Link>
        <nav className="flex items-center gap-4">
          <NavLink to="/" className={({isActive})=>isActive?'font-semibold underline':'hover:underline'}>Pokédex</NavLink>
          <NavLink to="/team-builder" className={({isActive})=>isActive?'font-semibold underline':'hover:underline'}>Team Builder</NavLink>
          <a href="https://pokeapi.co/" target="_blank" className="text-sm opacity-70 hover:opacity-100">Data: PokéAPI</a>
        </nav>
      </div>
    </header>
  )
}
