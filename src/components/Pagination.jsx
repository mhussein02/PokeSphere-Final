
export default function Pagination({ page, totalPages, onChange }){
  return (
    <div className="flex items-center justify-center gap-2 mt-4">
      <button className="btn" onClick={()=>onChange(Math.max(1,page-1))} disabled={page<=1}>‹ Prev</button>
      <div className="opacity-70 text-sm">Page {page} / {totalPages}</div>
      <button className="btn" onClick={()=>onChange(Math.min(totalPages,page+1))} disabled={page>=totalPages}>Next ›</button>
    </div>
  )
}
