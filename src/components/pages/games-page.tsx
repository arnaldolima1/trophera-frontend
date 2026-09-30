import { useState } from "react"
import { PageHero } from "@/components/layout/page-hero"
import { ListPager, usePaged } from "@/components/layout/list-pager"
import { shellClass } from "@/components/layout/shell"
import { GameCard } from "@/components/catalog/game-card"
import { PlatformBadge } from "@/components/catalog/platform-badge"
import { achievementMark } from "@/components/catalog/trophy-counts"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { activity, catalog, formatCompact, formatRarity, games, initials, services, type ServiceId } from "@/data/catalog"
import { cn } from "@/lib/utils"

type Filter = "all" | ServiceId

export function GamesPage() {
  const [filter, setFilter] = useState<Filter>("all")
  const visible = filter === "all" ? games : games.filter((game) => game.service === filter)
  const arrivals = filter === "all" ? catalog : catalog.filter((entry) => entry.service === filter)
  const drops = filter === "all" ? activity : activity.filter((item) => item.service === filter)
  const [lead, ...rest] = visible
  const shelf = usePaged(rest, 6, filter)
  const feed = usePaged(drops, 6, filter)

  return (
    <main className={cn(shellClass, "flex flex-col gap-8 py-8")}>
      <PageHero
        tone="amber"
        kicker="Catálogo"
        title="O que está sendo caçado."
        description="A lista fica no centro. As laterais acompanham o que acabou de cair e o que chegou ao catálogo."
      >
        <p className="text-sm text-muted-foreground">
          <span className="text-3xl font-semibold text-foreground tabular-nums">{visible.length}</span>
          <span className="mt-1 block">jogos neste recorte</span>
        </p>
      </PageHero>

      <div className="grid items-start gap-6 md:grid-cols-2 xl:grid-cols-[minmax(16rem,18rem)_minmax(0,1fr)_minmax(16rem,18rem)]">
        <div className="flex min-w-0 flex-col gap-6 md:col-span-2 xl:col-span-1 xl:col-start-2">
          <ServiceTabs value={filter} allLabel="Todos" onChange={setFilter} />

          {lead ? (
            <article className={cn("grid min-w-0 overflow-hidden rounded-3xl text-white", "bg-gradient-to-br", lead.gradient)}>
              <div className="flex min-h-52 flex-col justify-between p-6 sm:p-8">
                <PlatformBadge service={lead.service} onDark />
                <div>
                  <p className="text-5xl font-semibold tracking-tight">{lead.mark}</p>
                  <h2 className="mt-3 text-3xl font-semibold tracking-tight">{lead.name}</h2>
                  <p className="mt-2 text-sm text-white/80">
                    {formatCompact(lead.hunters)} caçando · {lead.completion}% de conclusão média
                  </p>
                  <p className="mt-3 text-sm text-white/75">
                    {lead.counts
                      ? `${lead.counts.platinum} platina · ${lead.counts.gold} ouro · ${lead.counts.silver} prata · ${lead.counts.bronze} bronze`
                      : `${lead.achievements} achievements na lista`}
                  </p>
                </div>
              </div>
            </article>
          ) : (
            <Empty className="border">
              <EmptyHeader>
                <EmptyTitle>Nenhum jogo nessa rede</EmptyTitle>
                <EmptyDescription>Troque o filtro para ver o restante do catálogo.</EmptyDescription>
              </EmptyHeader>
            </Empty>
          )}

          {shelf.total > 0 ? (
            <div className="@container flex flex-col gap-4">
              <div className="grid min-w-0 gap-4 @min-[32rem]:grid-cols-2 @min-[52rem]:grid-cols-3">
                {shelf.items.map((game) => (
                  <GameCard key={game.id} game={game} />
                ))}
              </div>
              <ListPager page={shelf.page} pages={shelf.pages} from={shelf.from} to={shelf.to} total={shelf.total} onPage={shelf.setPage} />
            </div>
          ) : null}
        </div>

        <aside
          id="caiu"
          className="flex min-w-0 scroll-mt-20 flex-col gap-3 rounded-2xl border bg-card p-4 xl:sticky xl:top-20 xl:col-start-1 xl:row-start-1 xl:max-h-[calc(100dvh-6rem)] xl:overflow-y-auto"
        >
          <div>
            <h2 className="text-sm font-semibold tracking-tight">Caiu agora</h2>
            <p className="text-xs text-muted-foreground">Últimas quedas deste recorte.</p>
          </div>
          {feed.total > 0 ? (
            <>
              <ul className="flex flex-col">
                {feed.items.map((item, index) => {
                  const mark = achievementMark(item)
                  return (
                    <li key={item.id} className={cn(index > 0 && "border-t")}>
                      <div className="flex min-w-0 items-start gap-2.5 py-3">
                        <Avatar size="sm">
                          <AvatarFallback>{initials(item.player)}</AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm">
                            <span className="font-medium">{item.player}</span>
                            <span className="text-muted-foreground"> · {item.title}</span>
                          </p>
                          <p className="truncate text-xs text-muted-foreground">
                            {item.game} · {formatRarity(item.rarity)} · {item.ago}
                          </p>
                        </div>
                        <span className={cn("mt-1.5 size-1.5 shrink-0 rounded-full", mark.dot)} title={mark.label} />
                      </div>
                    </li>
                  )
                })}
              </ul>
              <ListPager compact page={feed.page} pages={feed.pages} from={feed.from} to={feed.to} total={feed.total} onPage={feed.setPage} />
            </>
          ) : (
            <p className="text-sm text-muted-foreground">Nenhuma queda nessa rede.</p>
          )}
        </aside>

        <aside className="flex min-w-0 flex-col gap-3 rounded-2xl border bg-card p-4 xl:sticky xl:top-20 xl:col-start-3 xl:row-start-1 xl:max-h-[calc(100dvh-6rem)] xl:overflow-y-auto">
          <div>
            <h2 className="text-sm font-semibold tracking-tight">Chegaram ao catálogo</h2>
            <p className="text-xs text-muted-foreground">Listas novas, algumas ainda incompletas.</p>
          </div>
          {arrivals.length > 0 ? (
            <ul>
              {arrivals.map((entry, index) => (
                <li key={entry.id}>
                  {index > 0 ? <Separator /> : null}
                  <div className="flex min-w-0 flex-col gap-1.5 py-3">
                    <div className="flex min-w-0 items-center justify-between gap-2">
                      <p className="truncate text-sm font-medium">{entry.name}</p>
                      <PlatformBadge service={entry.service} />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {entry.count} {entry.unit} · {entry.added}
                    </p>
                    <Badge variant="outline" className="w-fit">{entry.status}</Badge>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">Nada novo nessa rede.</p>
          )}
        </aside>
      </div>
    </main>
  )
}

function ServiceTabs({
  value,
  allLabel,
  onChange,
}: {
  value: Filter
  allLabel: string
  onChange: (value: Filter) => void
}) {
  return (
    <Tabs
      value={value}
      onValueChange={(next) => {
        if (next === "all" || next === "psn" || next === "steam" || next === "retro") onChange(next)
      }}
    >
      <TabsList>
        <TabsTrigger value="all">{allLabel}</TabsTrigger>
        {services.map((service) => (
          <TabsTrigger key={service.id} value={service.id}>
            {service.short}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}
