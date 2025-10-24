
import { useEffect, useState } from 'react'
import SearchBar from '../components/SearchBar.jsx'
import TeamAnalysis from '../components/TeamAnalysis.jsx'
import { getPokemonList, getPokemon } from '../lib/api.js'

export default function TeamBuilderPage(){
  const [searchList, setSearchList] = useState([])
  const [team, setTeam] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // preload some pokemon for quick adding
  useEffect(()=>{
    (async ()=>{
      try{
        const data = await getPokemonList(0, 50)
        setSearchList(data.results)
      }catch(e){}
    })()
  }, [])

  const addToTeam = async (nameOrId) => {
    if(team.length>=6) return
    setLoading(true)
    setError(null)
    try{
      const d = await getPokemon(nameOrId)
      if(team.some(p=>p.id===d.id)) return
      setTeam(prev=>[...prev, { id:d.id, name:d.name, imageUrl:d.imageUrl, types:d.types }])
    }catch(e){
      setError('Could not add that Pokémon.')
    }finally{
      setLoading(false)
    }
  }
  const removeFromTeam = (id) => setTeam(prev=>prev.filter(p=>p.id!==id))

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Team Builder</h1>
      <SearchBar onSearch={(q)=>{
        const found = searchList.find(p=>p.name.toLowerCase()===q.toLowerCase())
        if(found) addToTeam(found.id)
      }} placeholder="Add Pokémon by exact name (e.g., pikachu)" />
      {error && <div className="card text-red-600">{error}</div>}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {team.map(p=> (
          <div key={p.id} className="card flex items-center gap-3">
            <img src={p.imageUrl} alt={p.name} className="w-16 h-16"/>
            <div className="flex-1 capitalize font-semibold">{p.name}</div>
            <button className="btn" onClick={()=>removeFromTeam(p.id)}>Remove ×</button>
          </div>
        ))}
        {Array.from({length:Math.max(0,6-team.length)}).map((_,i)=>(
          <div key={i} className="card opacity-60 text-center py-10">Empty Slot</div>
        ))}
      </div>
      <TeamAnalysis team={team} />
      {loading && <div className="opacity-70 text-sm">Loading…</div>}
    </div>
  )
}
