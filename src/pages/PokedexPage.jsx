
import { useEffect, useMemo, useState } from 'react'
import SearchBar from '../components/SearchBar.jsx'
import PokemonCard from '../components/PokemonCard.jsx'
import Pagination from '../components/Pagination.jsx'
import { getPokemonList } from '../lib/api.js'

const PAGE_SIZE = 24

export default function PokedexPage(){
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [count, setCount] = useState(0)
  const [list, setList] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')

  useEffect(()=>{
    (async ()=>{
      try{
        setLoading(true)
        setError(null)
        const offset = (page-1)*PAGE_SIZE
        const data = await getPokemonList(offset, PAGE_SIZE)
        setCount(data.count)
        setList(data.results)
      }catch(e){
        setError('Failed to load Pokémon.')
      }finally{
        setLoading(false)
      }
    })()
  }, [page])

  const filtered = useMemo(()=>{
    return list.filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterType==='all' || p.types.includes(filterType))
    )
  }, [list, searchTerm, filterType])

  const totalPages = Math.ceil(count / PAGE_SIZE)

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Pokédex</h1>
      <div className="flex flex-col md:flex-row gap-3 md:items-center">
        <SearchBar onSearch={setSearchTerm} />
        <select value={filterType} onChange={e=>setFilterType(e.target.value)} className="rounded-xl border px-3 py-2 bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700">
          <option value="all">Filter by Type</option>
          {['normal','fire','water','electric','grass','ice','fighting','poison','ground','flying','psychic','bug','rock','ghost','dragon','dark','steel','fairy'].map(t=>(
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      {loading && <div className="card">Loading...</div>}
      {error && <div className="card text-red-600">{error}</div>}

      {!loading && !error && (
        <>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map(p => <PokemonCard key={p.id} pokemon={p} />)}
          </div>
          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </>
      )}
    </div>
  )
}
