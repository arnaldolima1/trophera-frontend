import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { PlatformBadge } from "@/components/catalog/platform-badge"
import { achievementMark } from "@/components/catalog/trophy-counts"
import { account, games, guides, libraryProgress, type Game } from "@/data/catalog"
import { shellClass } from "@/components/layout/shell"
import { cn } from "@/lib/utils"

export function ProfilePage() {
  const closing = account.closing.flatMap((item) => {
    const game = games.find((entry) => entry.id === item.gameId)
    return game ? [{ ...item, game }] : []
  })

  const suggested = account.closing.flatMap((item) => {
    const game = games.find((entry) => entry.id === item.gameId)
    const guide = guides.find((entry) => entry.game === game?.name)
    return guide ? [{ guide, left: item.left }] : []
  })

  const library = Object.keys(libraryProgress).flatMap((id) => {
    const game = games.find((entry) => entry.id === id)
    return game ? [{ game, progress: libraryProgress[id] }] : []
  })

  return (
    <main className={cn(shellClass, "flex flex-col gap-8 py-8")}>
      <section className="dark relative overflow-hidden rounded-3xl bg-background text-foreground ring-1 ring-foreground/10">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-28 left-1/4 h-72 w-[36rem] -translate-x-1/2 bg-[radial-gradient(ellipse,oklch(0.72_0.13_230/0.45),transparent_68%)]" />
        </div>
        <div className="relative grid min-w-0 gap-8 p-6 sm:p-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="flex min-w-0 flex-col gap-6">
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium tracking-[0.16em] text-sky-300 uppercase">
                Sua conta · {account.handle}
              </p>
              <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                Esta semana, nas três redes.
              </h1>
              <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                PlayStation, Steam e RetroAchievements ligadas a esta conta. O que andou e o que
                está perto de fechar.
              </p>
            </div>
            <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {account.week.map((stat) => (
                <div key={stat.label}>
                  <dt className="text-xs text-muted-foreground">{stat.label}</dt>
                  <dd className="text-2xl font-semibold tabular-nums">{stat.value}</dd>
                </div>
              ))}
            </dl>
            <ul className="flex min-w-0 flex-col gap-2">
              {account.connections.map((connection) => (
                <li
                  key={connection.service}
                  className="flex min-w-0 items-center justify-between gap-3 rounded-xl bg-card/70 px-3 py-2 ring-1 ring-foreground/10"
                >
                  <span className="flex min-w-0 items-center gap-2">
                    <PlatformBadge service={connection.service} />
                    <span className="truncate text-sm font-medium">{connection.handle}</span>
                  </span>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    sincronizado {connection.synced}
                  </span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-muted-foreground">{account.streak} dias seguidos jogando</p>
          </div>

          <div className="flex min-w-0 flex-col gap-3">
            <div>
              <h2 className="text-sm font-medium">Perto de fechar</h2>
              <p className="text-xs text-muted-foreground">O que falta na sua biblioteca.</p>
            </div>
            <ul className="flex flex-col gap-3">
              {closing.map((item) => (
                <li key={item.gameId} className="rounded-2xl bg-card/80 p-3 ring-1 ring-foreground/10">
                  <div className="mb-2 flex min-w-0 items-center gap-3">
                    <GameMark game={item.game} />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium">{item.game.name}</span>
                      <span className="block text-xs text-muted-foreground">faltam {item.left}</span>
                    </span>
                    <span className="text-sm font-medium tabular-nums">{item.progress}%</span>
                  </div>
                  <Progress value={item.progress} className="[&_[data-slot=progress-track]]:h-1.5" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="grid min-w-0 gap-4 lg:grid-cols-5">
        <Card className="min-w-0 lg:col-span-3">
          <CardHeader>
            <CardTitle>Seus desbloqueios</CardTitle>
            <CardDescription>O que caiu nesta conta.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="-mx-4">
              {account.unlocks.map((item) => {
                const mark = achievementMark(item)
                return (
                  <li
                    key={item.id}
                    className="flex min-w-0 items-center gap-3 border-t px-4 py-3 first:border-t-0"
                  >
                    <span className={cn("size-2 shrink-0 rounded-full", mark.dot)} />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium">{item.title}</span>
                      <span className="block truncate text-xs text-muted-foreground">
                        {item.game} · {item.ago}
                      </span>
                    </span>
                    <PlatformBadge service={item.service} />
                    <Badge variant="outline">{mark.label}</Badge>
                  </li>
                )
              })}
            </ul>
          </CardContent>
        </Card>

        <Card className="min-w-0 lg:col-span-2">
          <CardHeader>
            <CardTitle>Sua posição</CardTitle>
            <CardDescription>Ranking geral da conta nesta semana.</CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="flex flex-col gap-2">
              {account.around.map((row) => (
                <li
                  key={row.place}
                  className={cn("flex items-center gap-3 rounded-xl px-3 py-2", row.you && "bg-muted")}
                >
                  <span className="w-6 text-sm tabular-nums text-muted-foreground">{row.place}</span>
                  <span className="min-w-0 flex-1 truncate text-sm font-medium">
                    {row.player}
                    {row.you ? <span className="font-normal text-muted-foreground"> · você</span> : null}
                  </span>
                  <span className="text-sm font-medium tabular-nums text-emerald-600 dark:text-emerald-400">
                    +{row.gained}
                  </span>
                </li>
              ))}
            </ol>
            <p className="mt-3 text-xs text-muted-foreground">
              {account.handle} subiu com +{account.gained} nesta semana.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="grid min-w-0 gap-4 lg:grid-cols-2">
        <Card className="min-w-0">
          <CardHeader>
            <CardTitle>Biblioteca</CardTitle>
            <CardDescription>Conclusão sua nos jogos ligados a esta conta.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-col gap-3">
              {library.map(({ game, progress }) => (
                <li key={game.id} className="flex min-w-0 items-center gap-3">
                  <GameMark game={game} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium">{game.name}</span>
                    <span className="block text-xs text-muted-foreground">{progress}% concluído</span>
                  </span>
                  <PlatformBadge service={game.service} />
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="min-w-0">
          <CardHeader>
            <CardTitle>Guias para o que está perto</CardTitle>
            <CardDescription>Uma rota para cada jogo que esta conta está fechando.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-col gap-3">
              {suggested.map((item) => (
                <li key={item.guide.id} className="flex min-w-0 items-start justify-between gap-3">
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium">{item.guide.title}</span>
                    <span className="block truncate text-xs text-muted-foreground">
                      {item.guide.game} · faltam {item.left} · {item.guide.hours}
                    </span>
                  </span>
                  <Badge variant={item.guide.difficulty === "Difícil" ? "destructive" : "secondary"}>
                    {item.guide.difficulty}
                  </Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}

function GameMark({ game }: { game: Game }) {
  return (
    <span
      className={cn(
        "grid size-10 shrink-0 place-items-center rounded-lg bg-gradient-to-br text-xs font-semibold text-white",
        game.gradient,
      )}
    >
      {game.mark}
    </span>
  )
}
