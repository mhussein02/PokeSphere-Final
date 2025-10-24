
// Very simplified type effectiveness chart (Gen 1-like). Values are multipliers for attack effectiveness.
const chart = {
  normal:     { rock:0.5, ghost:0, steel:0.5 },
  fire:       { fire:0.5, water:0.5, grass:2, ice:2, bug:2, rock:0.5, dragon:0.5, steel:2 },
  water:      { fire:2, water:0.5, grass:0.5, ground:2, rock:2, dragon:0.5 },
  electric:   { water:2, electric:0.5, grass:0.5, ground:0, flying:2, dragon:0.5 },
  grass:      { fire:0.5, water:2, grass:0.5, poison:0.5, ground:2, flying:0.5, bug:0.5, rock:2, dragon:0.5, steel:0.5 },
  ice:        { water:0.5, grass:2, ground:2, flying:2, dragon:2, fire:0.5, ice:0.5, steel:0.5 },
  fighting:   { normal:2, ice:2, rock:2, dark:2, steel:2, poison:0.5, flying:0.5, psychic:0.5, bug:0.5, fairy:0.5, ghost:0 },
  poison:     { grass:2, poison:0.5, ground:0.5, rock:0.5, ghost:0.5, steel:0, fairy:2 },
  ground:     { fire:2, electric:2, grass:0.5, poison:2, flying:0, bug:0.5, rock:2, steel:2 },
  flying:     { electric:0.5, grass:2, fighting:2, bug:2, rock:0.5, steel:0.5 },
  psychic:    { fighting:2, poison:2, steel:0.5, psychic:0.5, dark:0 },
  bug:        { grass:2, psychic:2, dark:2, fire:0.5, fighting:0.5, poison:0.5, flying:0.5, ghost:0.5, steel:0.5, fairy:0.5 },
  rock:       { fire:2, ice:2, flying:2, bug:2, fighting:0.5, ground:0.5, steel:0.5 },
  ghost:      { normal:0, psychic:2, dark:0.5 },
  dragon:     { dragon:2, steel:0.5, fairy:0 },
  dark:       { fighting:0.5, dark:0.5, fairy:0.5, psychic:2, ghost:2 },
  steel:      { fire:0.5, water:0.5, electric:0.5, ice:2, rock:2, fairy:2, steel:0.5 },
  fairy:      { fire:0.5, poison:0.5, steel:0.5, fighting:2, dragon:2, dark:2 },
}

const TYPES = Object.keys(chart)

export function computeTeamAnalysis(team){
  // team: array of pokemon { types: ['electric', ...] }
  const weaknesses = Object.fromEntries(TYPES.map(t=>[t,1]))
  const strengths = Object.fromEntries(TYPES.map(t=>[t,1]))
  // For strengths, consider if team has strong attacking coverage against a type (sum of multipliers)
  // For weaknesses, consider defensive weaknesses: if a type is super effective against many team types.
  team.forEach(p => {
    const pTypes = (p.types||[]).map(t=>t.toLowerCase())
    // Offensive coverage: for each attack type consider average effectiveness vs opponent type (simple approximation)
    TYPES.forEach(atk => {
      // if this pokemon's type equals attack type, add a small boost
      if (pTypes.includes(atk)) strengths[atk] += 0.5
    })
    // Defensive weaknesses: if incoming attack type is super effective vs any of p's types, increase weakness
    TYPES.forEach(incoming => {
      const mult = pTypes.reduce((acc, t)=> acc * (chart[incoming]?.[t] ?? 1), 1)
      if (mult > 1) weaknesses[incoming] += mult - 1
    })
  })
  return { weaknesses, strengths }
}
