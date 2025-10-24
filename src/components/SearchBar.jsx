
import { useState } from 'react'

export default function SearchBar({ onSearch, placeholder='Search by name...' }){
  const [value, setValue] = useState('')
  return (
    <form onSubmit={e=>{e.preventDefault(); onSearch(value)}} className="flex gap-2">
      <input
        className="flex-1 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 outline-none"
        placeholder={placeholder}
        value={value}
        onChange={e=>setValue(e.target.value)}
      />
      <button className="btn" type="submit">Search</button>
    </form>
  )
}
