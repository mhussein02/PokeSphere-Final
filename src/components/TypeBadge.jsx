
const TYPE_COLORS = {
  normal: 'bg-gray-300 text-gray-900',
  fire: 'bg-orange-400 text-white',
  water: 'bg-blue-500 text-white',
  electric: 'bg-yellow-400 text-slate-900',
  grass: 'bg-green-500 text-white',
  ice: 'bg-cyan-300 text-slate-900',
  fighting: 'bg-red-600 text-white',
  poison: 'bg-purple-500 text-white',
  ground: 'bg-amber-600 text-white',
  flying: 'bg-indigo-400 text-white',
  psychic: 'bg-pink-500 text-white',
  bug: 'bg-lime-500 text-slate-900',
  rock: 'bg-stone-500 text-white',
  ghost: 'bg-violet-700 text-white',
  dragon: 'bg-indigo-700 text-white',
  dark: 'bg-zinc-700 text-white',
  steel: 'bg-slate-500 text-white',
  fairy: 'bg-fuchsia-400 text-white',
}
export default function TypeBadge({ type }){
  const key = (type||'').toLowerCase()
  const cls = TYPE_COLORS[key] || 'bg-slate-300 text-slate-900'
  return <span className={`badge ${cls}`}>{type}</span>
}
