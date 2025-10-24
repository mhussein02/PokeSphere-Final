
import { Link } from 'react-router-dom'
import TypeBadge from './TypeBadge.jsx'

export default function PokemonCard({ pokemon }){
  const { id, name, imageUrl, types } = pokemon
  return (
    <Link to={`/pokemon/${id}`} className="card hover:shadow-lg transition block">
      <div className="flex flex-col items-center gap-2">
        <img src={imageUrl} alt={name} className="w-28 h-28 object-contain" loading="lazy"/>
        <div className="text-xs opacity-70">#{String(id).padStart(3,'0')}</div>
        <div className="font-semibold capitalize">{name}</div>
        <div className="flex gap-2">
          {types.map(t => <TypeBadge key={t} type={t} />)}
        </div>
      </div>
    </Link>
  )
}
