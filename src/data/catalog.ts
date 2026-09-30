export type ServiceId = "psn" | "steam" | "retro"
export type TrophyKind = "platinum" | "gold" | "silver" | "bronze"

export type TrophySet = {
  platinum: number
  gold: number
  silver: number
  bronze: number
}

export type Service = {
  id: ServiceId
  label: string
  short: string
  placeholder: string
  profiles: string
  detail: string
}

export const services: Service[] = [
  {
    id: "psn",
    label: "PlayStation",
    short: "PSN",
    placeholder: "ID da PSN",
    profiles: "2,4 mi",
    detail: "Troféus, do bronze à platina",
  },
  {
    id: "steam",
    label: "Steam",
    short: "Steam",
    placeholder: "perfil da Steam",
    profiles: "1,1 mi",
    detail: "Achievements e conclusão",
  },
  {
    id: "retro",
    label: "RetroAchievements",
    short: "Retro",
    placeholder: "usuário do RetroAchievements",
    profiles: "180 mil",
    detail: "Pontos e mastery",
  },
]

export type Game = {
  id: string
  name: string
  service: ServiceId
  completion: number
  hunters: number
  gradient: string
  mark: string
  counts?: TrophySet
  achievements?: number
}

export type ActivityItem = {
  id: string
  player: string
  title: string
  game: string
  service: ServiceId
  rarity: number
  ago: string
  kind?: TrophyKind
  points?: number
}

export type RankedPlayer = {
  player: string
  service: ServiceId
  level: number
  gained: number
  completion: number
}

export type RareDrop = {
  id: string
  name: string
  game: string
  service: ServiceId
  rarity: number
  owners: number
  kind?: TrophyKind
}

export type Guide = {
  id: string
  title: string
  game: string
  service: ServiceId
  hours: string
  difficulty: "Leve" | "Média" | "Difícil"
  author: string
}

export type ThreadTopic = "Ajuda" | "Sessão" | "Raro" | "Debate"

export type Thread = {
  id: string
  title: string
  game: string
  service: ServiceId
  author: string
  replies: number
  ago: string
  topic: ThreadTopic
}

export type CatalogEntry = {
  id: string
  name: string
  service: ServiceId
  added: string
  count: number
  unit: string
  status: string
}

export const account = {
  handle: "nova",
  streak: 12,
  place: 42,
  gained: 186,
  connections: [
    { service: "psn" as const, handle: "orbit_nova", synced: "há 12 min" },
    { service: "steam" as const, handle: "nova", synced: "há 4 min" },
    { service: "retro" as const, handle: "nova_ra", synced: "há 1 h" },
  ],
  week: [
    { label: "Platinas", value: "+2" },
    { label: "Achievements", value: "+18" },
    { label: "Pontos retro", value: "+340" },
    { label: "Jogos tocados", value: "4" },
  ],
  closing: [
    { gameId: "astro", progress: 92, left: "4 troféus" },
    { gameId: "balatro", progress: 81, left: "6 achievements" },
    { gameId: "metroid", progress: 74, left: "16 achievements" },
  ],
  unlocks: [
    { id: "u1", title: "Bot of the Year", game: "Astro Bot", service: "psn" as const, kind: "platinum" as const, ago: "ontem", rarity: 4.8 },
    { id: "u2", title: "Flush Five", game: "Balatro", service: "steam" as const, ago: "ontem", rarity: 1.4 },
    { id: "u3", title: "100%", game: "Super Metroid", service: "retro" as const, points: 50, ago: "há 2 dias", rarity: 3.2 },
    { id: "u4", title: "The Perfect Sample", game: "Helldivers 2", service: "psn" as const, kind: "gold" as const, ago: "há 3 dias", rarity: 0.4 },
  ],
  around: [
    { place: 41, player: "sol", gained: 191 },
    { place: 42, player: "nova", gained: 186, you: true },
    { place: 43, player: "vex", gained: 172 },
  ],
}

export const libraryProgress: Record<string, number> = {
  astro: 92,
  helldivers: 63,
  balatro: 81,
  hades: 34,
  metroid: 74,
  chrono: 27,
}

export function serviceById(id: ServiceId) {
  const service = services.find((item) => item.id === id)
  if (!service) throw new Error(`Rede desconhecida: ${id}`)
  return service
}

export const games: Game[] = [
  {
    id: "astro",
    name: "Astro Bot",
    service: "psn",
    completion: 78,
    hunters: 18420,
    gradient: "from-sky-400 via-blue-700 to-indigo-950",
    mark: "AB",
    counts: { platinum: 1, gold: 28, silver: 16, bronze: 12 },
  },
  {
    id: "helldivers",
    name: "Helldivers 2",
    service: "psn",
    completion: 63,
    hunters: 31204,
    gradient: "from-yellow-300 via-lime-700 to-emerald-950",
    mark: "H2",
    counts: { platinum: 1, gold: 12, silver: 14, bronze: 11 },
  },
  {
    id: "spiderman",
    name: "Marvel's Spider-Man 2",
    service: "psn",
    completion: 71,
    hunters: 22110,
    gradient: "from-red-400 via-rose-800 to-zinc-950",
    mark: "SP",
    counts: { platinum: 1, gold: 18, silver: 16, bronze: 9 },
  },
  {
    id: "stellar",
    name: "Stellar Blade",
    service: "psn",
    completion: 55,
    hunters: 9804,
    gradient: "from-fuchsia-300 via-rose-700 to-slate-950",
    mark: "SB",
    counts: { platinum: 1, gold: 22, silver: 14, bronze: 8 },
  },
  {
    id: "balatro",
    name: "Balatro",
    service: "steam",
    completion: 91,
    hunters: 40210,
    gradient: "from-red-300 via-rose-700 to-zinc-950",
    mark: "BL",
    achievements: 32,
  },
  {
    id: "hades",
    name: "Hades II",
    service: "steam",
    completion: 34,
    hunters: 15660,
    gradient: "from-orange-300 via-red-800 to-stone-950",
    mark: "HD",
    achievements: 50,
  },
  {
    id: "wukong",
    name: "Black Myth: Wukong",
    service: "steam",
    completion: 41,
    hunters: 24610,
    gradient: "from-amber-300 via-orange-700 to-stone-950",
    mark: "WK",
    achievements: 81,
  },
  {
    id: "elden",
    name: "Elden Ring",
    service: "steam",
    completion: 22,
    hunters: 15330,
    gradient: "from-stone-300 via-zinc-600 to-neutral-950",
    mark: "ER",
    achievements: 42,
  },
  {
    id: "metroid",
    name: "Super Metroid",
    service: "retro",
    completion: 18,
    hunters: 4210,
    gradient: "from-lime-300 via-green-800 to-slate-950",
    mark: "MT",
    achievements: 62,
  },
  {
    id: "chrono",
    name: "Chrono Trigger",
    service: "retro",
    completion: 27,
    hunters: 3880,
    gradient: "from-violet-300 via-indigo-800 to-slate-950",
    mark: "CT",
    achievements: 48,
  },
  {
    id: "sotn",
    name: "Castlevania: Symphony of the Night",
    service: "retro",
    completion: 15,
    hunters: 2740,
    gradient: "from-zinc-300 via-slate-700 to-zinc-950",
    mark: "CV",
    achievements: 71,
  },
  {
    id: "megaman",
    name: "Mega Man X",
    service: "retro",
    completion: 44,
    hunters: 1960,
    gradient: "from-cyan-300 via-blue-800 to-slate-950",
    mark: "MX",
    achievements: 36,
  },
]

export const activity: ActivityItem[] = [
  {
    id: "a1",
    player: "mira",
    title: "Bot of the Year",
    game: "Astro Bot",
    service: "psn",
    kind: "platinum",
    rarity: 4.8,
    ago: "2 min",
  },
  {
    id: "a2",
    player: "kairo",
    title: "Flush Five",
    game: "Balatro",
    service: "steam",
    rarity: 1.4,
    ago: "6 min",
  },
  {
    id: "a3",
    player: "nara",
    title: "100%",
    game: "Super Metroid",
    service: "retro",
    points: 50,
    rarity: 3.2,
    ago: "11 min",
  },
  {
    id: "a4",
    player: "sol",
    title: "The Perfect Sample",
    game: "Helldivers 2",
    service: "psn",
    kind: "gold",
    rarity: 0.4,
    ago: "18 min",
  },
  {
    id: "a5",
    player: "vex",
    title: "Night's Champion",
    game: "Hades II",
    service: "steam",
    rarity: 0.9,
    ago: "24 min",
  },
  {
    id: "a6",
    player: "lumen",
    title: "Master of the Clock",
    game: "Chrono Trigger",
    service: "retro",
    points: 25,
    rarity: 6.1,
    ago: "31 min",
  },
  {
    id: "a7",
    player: "orio",
    title: "Friendly Neighborhood",
    game: "Marvel's Spider-Man 2",
    service: "psn",
    kind: "platinum",
    rarity: 6.2,
    ago: "44 min",
  },
  {
    id: "a8",
    player: "pike",
    title: "Destined Death",
    game: "Elden Ring",
    service: "steam",
    rarity: 8.7,
    ago: "1 h",
  },
]

export const leaderboard: RankedPlayer[] = [
  { player: "kairo", service: "psn", level: 912, gained: 186, completion: 96 },
  { player: "mira", service: "steam", level: 874, gained: 164, completion: 93 },
  { player: "nara", service: "retro", level: 640, gained: 151, completion: 88 },
  { player: "sol", service: "psn", level: 766, gained: 139, completion: 84 },
  { player: "vex", service: "steam", level: 740, gained: 128, completion: 81 },
  { player: "lumen", service: "retro", level: 510, gained: 117, completion: 79 },
  { player: "orio", service: "psn", level: 688, gained: 104, completion: 76 },
  { player: "pike", service: "steam", level: 651, gained: 98, completion: 74 },
  { player: "rune", service: "psn", level: 640, gained: 94, completion: 72 },
  { player: "ash", service: "steam", level: 628, gained: 90, completion: 70 },
  { player: "ivy", service: "retro", level: 488, gained: 86, completion: 68 },
  { player: "coco", service: "psn", level: 612, gained: 82, completion: 66 },
  { player: "dex", service: "steam", level: 590, gained: 78, completion: 64 },
  { player: "fern", service: "retro", level: 470, gained: 74, completion: 62 },
  { player: "juno", service: "psn", level: 574, gained: 70, completion: 60 },
  { player: "quill", service: "steam", level: 552, gained: 66, completion: 58 },
  { player: "sable", service: "retro", level: 452, gained: 62, completion: 56 },
  { player: "wren", service: "psn", level: 540, gained: 58, completion: 54 },
  { player: "yuki", service: "steam", level: 528, gained: 54, completion: 52 },
  { player: "oz", service: "retro", level: 430, gained: 50, completion: 50 },
  { player: "bloom", service: "psn", level: 510, gained: 46, completion: 48 },
  { player: "cedar", service: "steam", level: 498, gained: 42, completion: 46 },
  { player: "dusk", service: "retro", level: 410, gained: 38, completion: 44 },
  { player: "ember", service: "psn", level: 486, gained: 34, completion: 42 },
]

export const rares: RareDrop[] = [
  {
    id: "r1",
    name: "The Perfect Sample",
    game: "Helldivers 2",
    service: "psn",
    kind: "gold",
    rarity: 0.4,
    owners: 1284,
  },
  {
    id: "r2",
    name: "Completionist+",
    game: "Balatro",
    service: "steam",
    rarity: 0.7,
    owners: 2104,
  },
  {
    id: "r3",
    name: "Low Percent",
    game: "Super Metroid",
    service: "retro",
    rarity: 1.1,
    owners: 640,
  },
  {
    id: "r4",
    name: "Extreme Measures",
    game: "Hades II",
    service: "steam",
    rarity: 1.5,
    owners: 980,
  },
]

export const guides: Guide[] = [
  {
    id: "g1",
    title: "Platina sem perder o ritmo do jogo",
    game: "Astro Bot",
    service: "psn",
    hours: "12–16 h",
    difficulty: "Leve",
    author: "mira",
  },
  {
    id: "g2",
    title: "Stakes altas sem quebrar a build",
    game: "Balatro",
    service: "steam",
    hours: "8–14 h",
    difficulty: "Média",
    author: "kairo",
  },
  {
    id: "g3",
    title: "Mastery sem sequence break",
    game: "Super Metroid",
    service: "retro",
    hours: "6–9 h",
    difficulty: "Difícil",
    author: "nara",
  },
  {
    id: "g4",
    title: "Amostras raras no modo certo",
    game: "Helldivers 2",
    service: "psn",
    hours: "20–30 h",
    difficulty: "Média",
    author: "sol",
  },
  {
    id: "g5",
    title: "Finais e profecias opcionais",
    game: "Hades II",
    service: "steam",
    hours: "25–40 h",
    difficulty: "Difícil",
    author: "vex",
  },
  {
    id: "g6",
    title: "Os finais sem perder sidequest",
    game: "Chrono Trigger",
    service: "retro",
    hours: "15–20 h",
    difficulty: "Leve",
    author: "lumen",
  },
  {
    id: "g7",
    title: "Acampamentos na ordem certa",
    game: "Stellar Blade",
    service: "psn",
    hours: "18–24 h",
    difficulty: "Média",
    author: "orio",
  },
  {
    id: "g8",
    title: "Distritos sem voltar de helicóptero",
    game: "Marvel's Spider-Man 2",
    service: "psn",
    hours: "22–28 h",
    difficulty: "Média",
    author: "sol",
  },
  {
    id: "g9",
    title: "Chefões sem repetir o capítulo",
    game: "Black Myth: Wukong",
    service: "steam",
    hours: "30–40 h",
    difficulty: "Difícil",
    author: "ash",
  },
  {
    id: "g10",
    title: "Fragmentos sem abrir o mapa",
    game: "Elden Ring",
    service: "steam",
    hours: "40–55 h",
    difficulty: "Difícil",
    author: "pike",
  },
  {
    id: "g11",
    title: "Melhor ending sem quebrar a sequência",
    game: "Castlevania: Symphony of the Night",
    service: "retro",
    hours: "8–12 h",
    difficulty: "Média",
    author: "lumen",
  },
  {
    id: "g12",
    title: "Armaduras sem voltar de estágio",
    game: "Mega Man X",
    service: "retro",
    hours: "4–6 h",
    difficulty: "Leve",
    author: "nara",
  },
  {
    id: "g13",
    title: "Jokers na ordem do stake",
    game: "Balatro",
    service: "steam",
    hours: "10–16 h",
    difficulty: "Difícil",
    author: "kairo",
  },
  {
    id: "g14",
    title: "Medo alto sem perder o néctar",
    game: "Hades II",
    service: "steam",
    hours: "18–24 h",
    difficulty: "Média",
    author: "vex",
  },
  {
    id: "g15",
    title: "Mapa de 100% sem glitch",
    game: "Super Metroid",
    service: "retro",
    hours: "10–14 h",
    difficulty: "Média",
    author: "fern",
  },
  {
    id: "g16",
    title: "Naytiba sem perder o arquivo",
    game: "Stellar Blade",
    service: "psn",
    hours: "14–20 h",
    difficulty: "Difícil",
    author: "mira",
  },
  {
    id: "g17",
    title: "Relíquias do capítulo 3",
    game: "Black Myth: Wukong",
    service: "steam",
    hours: "16–22 h",
    difficulty: "Média",
    author: "yuki",
  },
  {
    id: "g18",
    title: "Alucard sem perder a sala secreta",
    game: "Castlevania: Symphony of the Night",
    service: "retro",
    hours: "11–15 h",
    difficulty: "Leve",
    author: "ivy",
  },
]

export const threads: Thread[] = [
  {
    id: "t1",
    title: "Alguém fechou Astro Bot sem perder missável?",
    game: "Astro Bot",
    service: "psn",
    author: "mira",
    replies: 28,
    ago: "há 12 min",
    topic: "Ajuda",
  },
  {
    id: "t2",
    title: "Grupo para as amostras raras",
    game: "Helldivers 2",
    service: "psn",
    author: "sol",
    replies: 14,
    ago: "há 25 min",
    topic: "Sessão",
  },
  {
    id: "t3",
    title: "Completionist+ ainda vale nessa seed?",
    game: "Balatro",
    service: "steam",
    author: "kairo",
    replies: 41,
    ago: "há 40 min",
    topic: "Raro",
  },
  {
    id: "t4",
    title: "Low Percent: a rota atualizada",
    game: "Super Metroid",
    service: "retro",
    author: "nara",
    replies: 19,
    ago: "há 1 h",
    topic: "Debate",
  },
  {
    id: "t5",
    title: "Procuro duo para o último chefe",
    game: "Hades II",
    service: "steam",
    author: "vex",
    replies: 7,
    ago: "há 2 h",
    topic: "Sessão",
  },
  {
    id: "t6",
    title: "Finais sem perder sidequest",
    game: "Chrono Trigger",
    service: "retro",
    author: "lumen",
    replies: 11,
    ago: "há 3 h",
    topic: "Ajuda",
  },
  {
    id: "t7",
    title: "Ordem dos distritos para não voltar",
    game: "Marvel's Spider-Man 2",
    service: "psn",
    author: "orio",
    replies: 22,
    ago: "há 5 h",
    topic: "Ajuda",
  },
  {
    id: "t8",
    title: "100% sem abrir mapa de guia",
    game: "Elden Ring",
    service: "steam",
    author: "pike",
    replies: 33,
    ago: "ontem",
    topic: "Debate",
  },
  {
    id: "t9",
    title: "Vale repetir o capítulo pelo fragmento?",
    game: "Black Myth: Wukong",
    service: "steam",
    author: "ash",
    replies: 16,
    ago: "há 6 h",
    topic: "Debate",
  },
  {
    id: "t10",
    title: "Alguém na sala do campanha hoje?",
    game: "Helldivers 2",
    service: "psn",
    author: "rune",
    replies: 9,
    ago: "há 7 h",
    topic: "Sessão",
  },
  {
    id: "t11",
    title: "Naytiba que some do mapa",
    game: "Stellar Blade",
    service: "psn",
    author: "coco",
    replies: 13,
    ago: "há 8 h",
    topic: "Ajuda",
  },
  {
    id: "t12",
    title: "Armadura de hadouken ainda conta?",
    game: "Mega Man X",
    service: "retro",
    author: "fern",
    replies: 6,
    ago: "há 9 h",
    topic: "Raro",
  },
  {
    id: "t13",
    title: "Ordem das relíquias sem spoiler de chefe",
    game: "Black Myth: Wukong",
    service: "steam",
    author: "yuki",
    replies: 21,
    ago: "ontem",
    topic: "Ajuda",
  },
  {
    id: "t14",
    title: "Dupla para o castelo invertido",
    game: "Castlevania: Symphony of the Night",
    service: "retro",
    author: "sable",
    replies: 4,
    ago: "ontem",
    topic: "Sessão",
  },
  {
    id: "t15",
    title: "Stake roxo sem reroll infinito",
    game: "Balatro",
    service: "steam",
    author: "dex",
    replies: 27,
    ago: "ontem",
    topic: "Raro",
  },
  {
    id: "t16",
    title: "Distrito que trava o contador",
    game: "Marvel's Spider-Man 2",
    service: "psn",
    author: "juno",
    replies: 18,
    ago: "há 2 dias",
    topic: "Ajuda",
  },
  {
    id: "t17",
    title: "Mastery de 100% com ou sem glitch",
    game: "Super Metroid",
    service: "retro",
    author: "oz",
    replies: 15,
    ago: "há 2 dias",
    topic: "Debate",
  },
  {
    id: "t18",
    title: "Quem fecha o último medo hoje?",
    game: "Hades II",
    service: "steam",
    author: "quill",
    replies: 8,
    ago: "há 2 dias",
    topic: "Sessão",
  },
]

export const catalog: CatalogEntry[] = [
  { id: "c1", name: "Silent Hill 2", service: "psn", added: "há 3 h", count: 46, unit: "troféus", status: "Lista parcial" },
  { id: "c2", name: "Dragon Age: The Veilguard", service: "steam", added: "há 9 h", count: 52, unit: "achievements", status: "Lista parcial" },
  { id: "c3", name: "Super Mario World", service: "retro", added: "ontem", count: 44, unit: "achievements", status: "Confirmada" },
  { id: "c4", name: "Lost Soul Aside", service: "psn", added: "ontem", count: 48, unit: "troféus", status: "Lista parcial" },
]

const compact = new Intl.NumberFormat("pt-BR", {
  notation: "compact",
  maximumFractionDigits: 1,
})

const percent = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
})

export function formatCompact(value: number) {
  return compact.format(value)
}

export function formatRarity(value: number) {
  return `${percent.format(value)}%`
}

export function initials(name: string) {
  return name.slice(0, 2).toUpperCase()
}

export function profilePreview(id: string, service: ServiceId) {
  let seed = 0
  for (const char of id) seed = (seed * 33 + char.charCodeAt(0)) >>> 0
  const pick = (span: number, min: number) => min + (seed % span)
  const pool = games.filter((game) => game.service === service)
  const game = pool[seed % pool.length]
  return {
    id,
    service,
    level: pick(640, 40),
    completion: pick(72, 18),
    recent: game.name,
    recentProgress: pick(80, 12),
    counts:
      service === "psn"
        ? {
            platinum: pick(80, 1),
            gold: pick(700, 40),
            silver: pick(900, 80),
            bronze: pick(1200, 100),
          }
        : undefined,
    achievements: service === "psn" ? undefined : pick(1800, 80),
  }
}
