
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getPokemon } from '../lib/api.js'
import TypeBadge from '../components/TypeBadge.jsx'

export default function PokemonDetailPage(){
  const { id } = useParams()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [tab, setTab] = useState('stats')

  useEffect(()=>{
    (async ()=>{
      try{
        setLoading(true)
        const d = await getPokemon(id)
        setData(d)
      }catch(e){
        setError('Failed to load Pokémon.')
      }finally{
        setLoading(false)
      }
    })()
  }, [id])

  if(loading) return <div className="card">Loading...</div>
  if(error) return <div className="card text-red-600">{error}</div>
  if(!data) return null

  return (
    <div className="space-y-4">
      <Link to="/" className="text-sm underline">← Back to Pokédex</Link>
      <div className="grid md:grid-cols-2 gap-6 items-start">
        <div className="card flex items-center justify-center">
          <img src={data.imageUrl} alt={data.name} className="w-64 h-64 object-contain"/>
        </div>
        <div className="space-y-3">
          <h1 className="text-3xl font-bold capitalize">#{String(data.id).padStart(3,'0')} {data.name}</h1>
          <div className="flex gap-2">{data.types.map(t=><TypeBadge key={t} type={t} />)}</div>
          <p className="opacity-80">{data.description}</p>
          <div className="flex gap-2">
            {['stats','evolution','moves'].map(t=>(
              <button key={t} className={`btn ${tab===t?'opacity-100':'opacity-70'}`} onClick={()=>setTab(t)}>{t.title()}</button>
            ))}
          </div>
        </div>
      </div>

      {tab==='stats' && (
        <div className="card">
          <h3 className="font-semibold mb-2">Base Stats</h3>
          <div className="space-y-2">
            {data.stats.map(s=>(
              <div key={s.name}>
                <div className="flex justify-between text-sm capitalize"><span>{s.name}</span><span>{s.base}</span></div>
                <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded">
                  <div className="h-2 bg-slate-900 dark:bg-slate-100 rounded" style={{width:Math.min(100, s.base/2)+'%'}}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab==='moves' && (
        <div className="card">
          <h3 className="font-semibold mb-2">Moves (sample)</h3>
          <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-2 list-disc list-inside">
            {data.moves.map(m=> <li key={m} className="capitalize">{m}</li>)}
          </ul>
        </div>
      )}

      {tab==='evolution' && (
        <div className="card">
          <h3 className="font-semibold mb-2">Evolution Chain</h3>
          <pre className="whitespace-pre-wrap text-sm opacity-80">{JSON.stringify(data.evolution.chain, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}

String.prototype.title = function(){ return this.charAt(0).toUpperCase()+this.slice(1)}
