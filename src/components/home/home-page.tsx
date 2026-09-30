import type { ReactNode } from "react"
import { Link } from "@tanstack/react-router"
import { ChevronRightIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { GameCard } from "@/components/catalog/game-card"
import { PlatformBadge } from "@/components/catalog/platform-badge"
import { ActivityFeed, RankList } from "@/components/catalog/feed"
import {
  activity,
  catalog,
  formatCompact,
  formatRarity,
  games,
  guides,
  leaderboard,
  rares,
  services,
  type Game,
} from "@/data/catalog"
import { shellClass } from "@/components/layout/shell"
import { cn } from "@/lib/utils"

const pulse = [
  { label: "Platinas", value: "38 mil" },
  { label: "Achievements", value: "1,2 mi" },
  { label: "Pontos retro", value: "4,8 mi" },
  { label: "Jogos ativos", value: "2,1 mil" },
]

const laneTone: Record<string, string> = {
  psn: "from-sky-500/15",
  steam: "from-indigo-500/15",
  retro: "from-amber-500/20",
}

export function HomePage() {
  const featured = games.find((game) => game.id === "astro")
  const shelf = ["helldivers", "balatro", "metroid", "hades"].flatMap((id) => {
    const game = games.find((item) => item.id === id)
    return game ? [game] : []
  })

  return (
    <main className={cn(shellClass, "flex flex-col gap-8 py-8")}>
      <section className="dark relative overflow-hidden rounded-3xl bg-background text-foreground ring-1 ring-foreground/10">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-28 left-1/4 h-72 w-[36rem] -translate-x-1/2 bg-[radial-gradient(ellipse,oklch(0.72_0.13_230/0.45),transparent_68%)]" />
        </div>
        <div className="relative grid min-w-0 gap-8 p-6 sm:p-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
          <div className="flex min-w-0 flex-col justify-between gap-8">
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium tracking-[0.16em] text-sky-300 uppercase">
                PlayStation · Steam · RetroAchievements
              </p>
              <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                A semana nas três redes.
              </h1>
              <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                Platinas, achievements e pontos que a comunidade fechou. O recorte de cada aba
                continua em jogos, ranking, guias e comunidade.
              </p>
            </div>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-4">
              {pulse.map((stat) => (
                <div key={stat.label}>
                  <dt className="text-xs text-muted-foreground">{stat.label}</dt>
                  <dd className="text-2xl font-semibold tabular-nums">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          {featured ? <FeaturedGame game={featured} /> : null}
        </div>
      </section>

      <section className="grid min-w-0 gap-3 md:grid-cols-3">
        {services.map((service) => {
          const top = games.find((game) => game.service === service.id)
          return (
            <article
              key={service.id}
              className={cn(
                "flex min-w-0 flex-col gap-3 rounded-2xl border bg-gradient-to-br to-transparent p-4",
                laneTone[service.id],
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-sm font-medium">{service.label}</h2>
                <PlatformBadge service={service.id} />
              </div>
              <p className="text-2xl font-semibold tabular-nums">{service.profiles}</p>
              <p className="text-xs text-muted-foreground">{service.detail}</p>
              {top ? (
                <p className="mt-auto truncate text-sm">
                  <span className="text-muted-foreground">Mais caçado · </span>
                  {top.name}
                </p>
              ) : null}
            </article>
          )
        })}
      </section>

      <section className="flex flex-col gap-4">
        <SectionLink title="Em caça" description="Capas, conclusão média e quem está atrás." to="/games" action="Abrir jogos" />
        <div className="grid min-w-0 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {shelf.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>

      <section className="grid min-w-0 items-start gap-4 lg:grid-cols-5">
        <Overview className="lg:col-span-3" title="Ao vivo" description="As últimas quedas, com a rede em cada linha." to="/games" action="Ver no catálogo">
          <ActivityFeed items={activity.slice(0, 10)} bare />
        </Overview>
        <Overview className="lg:col-span-2" title="Quem subiu" description="Os dez primeiros da semana, misturando as redes." to="/ranking" action="Abrir ranking">
          <RankList players={leaderboard.slice(0, 10)} bare />
        </Overview>
      </section>

      <section className="flex flex-col gap-4">
        <SectionLink title="Raros da semana" description="Abaixo de 2% da base. Cada um na regra da própria rede." to="/ranking" action="Ver ranking" />
        <div className="grid min-w-0 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {rares.map((drop) => (
            <Card key={drop.id} size="sm">
              <CardHeader>
                <CardTitle className="line-clamp-2">{drop.name}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <span className="truncate">{drop.game}</span>
                  <PlatformBadge service={drop.service} />
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-end justify-between">
                <p className="text-2xl font-semibold tabular-nums">{formatRarity(drop.rarity)}</p>
                <p className="text-xs text-muted-foreground">{formatCompact(drop.owners)} donos</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid min-w-0 gap-4 lg:grid-cols-2">
        <Overview title="Guias em destaque" description="Tempo, dificuldade e autor, sem misturar as regras." to="/guides" action="Abrir guias">
          <ul className="flex flex-col gap-3">
            {guides.slice(0, 4).map((guide) => (
              <li key={guide.id} className="flex min-w-0 items-start justify-between gap-3">
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium">{guide.title}</span>
                  <span className="block truncate text-xs text-muted-foreground">
                    {guide.game} · {guide.hours} · {guide.author}
                  </span>
                </span>
                <Badge variant={guide.difficulty === "Difícil" ? "destructive" : "secondary"}>
                  {guide.difficulty}
                </Badge>
              </li>
            ))}
          </ul>
        </Overview>
        <Overview title="Chegaram ao catálogo" description="Listas novas. Algumas ainda estão incompletas." to="/games" action="Abrir jogos">
          <ul className="flex flex-col gap-3">
            {catalog.map((entry) => (
              <li key={entry.id} className="flex min-w-0 items-center justify-between gap-3">
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium">{entry.name}</span>
                  <span className="block text-xs text-muted-foreground">
                    {entry.count} {entry.unit} · {entry.added}
                  </span>
                </span>
                <PlatformBadge service={entry.service} />
              </li>
            ))}
          </ul>
        </Overview>
      </section>
    </main>
  )
}

function FeaturedGame({ game }: { game: Game }) {
  return (
    <div className={cn("flex min-h-56 flex-col justify-between rounded-2xl bg-gradient-to-br p-5 text-white", game.gradient)}>
      <div className="flex items-start justify-between gap-3">
        <span className="text-4xl font-semibold tracking-tight">{game.mark}</span>
        <PlatformBadge service={game.service} onDark />
      </div>
      <div>
        <p className="text-xs tracking-wide text-white/75 uppercase">Mais caçado</p>
        <p className="mt-1 text-2xl font-semibold tracking-tight">{game.name}</p>
        <p className="mt-1 text-sm text-white/80">
          {formatCompact(game.hunters)} caçando · {game.completion}% de conclusão média
        </p>
      </div>
    </div>
  )
}

function SectionLink({
  title,
  description,
  to,
  action,
}: {
  title: string
  description: string
  to: "/games" | "/ranking" | "/guides" | "/community"
  action: string
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div>
        <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Link to={to} className="inline-flex items-center gap-1 text-sm font-medium">
        {action}
        <ChevronRightIcon className="size-4" />
      </Link>
    </div>
  )
}

function Overview({
  title,
  description,
  to,
  action,
  className,
  children,
}: {
  title: string
  description: string
  to: "/games" | "/ranking" | "/guides" | "/community"
  action: string
  className?: string
  children: ReactNode
}) {
  return (
    <Card className={cn("min-w-0", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <CardAction>
          <Link to={to} className="inline-flex items-center gap-1 text-sm font-medium">
            {action}
            <ChevronRightIcon className="size-4" />
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}
