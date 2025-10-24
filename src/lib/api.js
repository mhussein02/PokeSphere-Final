
import axios from 'axios'
const API = 'https://pokeapi.co/api/v2'

export async function getPokemonList(offset=0, limit=24){
  const { data } = await axios.get(`${API}/pokemon?offset=${offset}&limit=${limit}`)
  // Fetch details for images/types
  const detailed = await Promise.all(
    data.results.map(async (p) => {
      const id = p.url.split('/').filter(Boolean).pop()
      const d = await axios.get(`${API}/pokemon/${id}`)
      const types = d.data.types.map(t=>t.type.name)
      const imageUrl = d.data.sprites.other['official-artwork'].front_default || d.data.sprites.front_default
      return { id:Number(id), name:d.data.name, types, imageUrl }
    })
  )
  return { count: data.count, results: detailed }
}

export async function getPokemon(idOrName){
  const { data } = await axios.get(`${API}/pokemon/${idOrName}`)
  const species = await axios.get(data.species.url)
  // flavor text
  const entry = species.data.flavor_text_entries.find(e=>e.language.name==='en')
  // evolution chain
  const evo = await axios.get(species.data.evolution_chain.url)
  return {
    id: data.id,
    name: data.name,
    imageUrl: data.sprites.other['official-artwork'].front_default || data.sprites.front_default,
    types: data.types.map(t=>t.type.name),
    stats: data.stats.map(s=>({ name: s.stat.name, base: s.base_stat })),
    moves: data.moves.slice(0, 20).map(m=>m.move.name),
    description: entry ? entry.flavor_text.replace(/\f|\n|\r/g,' ') : '',
    evolution: evo.data
  }
}
