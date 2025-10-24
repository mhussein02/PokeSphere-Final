
import { computeTeamAnalysis } from '../lib/typeChart.js'
import TypeBadge from './TypeBadge.jsx'

export default function TeamAnalysis({ team }){
  const { weaknesses, strengths } = computeTeamAnalysis(team)
  const renderList = (obj) => Object.entries(obj).sort((a,b)=>b[1]-a[1]).map(([type,score]) => (
    <div key={type} className="flex items-center justify-between py-1">
      <TypeBadge type={type} />
      <span className="text-sm opacity-80">×{score.toFixed(1)}</span>
    </div>
  ))
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="card">
        <h3 className="font-semibold mb-2">Team Weaknesses (Def)</h3>
        {renderList(weaknesses)}
      </div>
      <div className="card">
        <h3 className="font-semibold mb-2">Team Strengths (Atk)</h3>
        {renderList(strengths)}
      </div>
    </div>
  )
}
