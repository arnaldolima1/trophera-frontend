import { useState } from "react"
import { PageHero } from "@/components/layout/page-hero"
import { DataTable, usePaged } from "@/components/layout/list-pager"
import { shellClass } from "@/components/layout/shell"
import { PlatformBadge } from "@/components/catalog/platform-badge"
import { trophyDotClass } from "@/components/catalog/trophy-counts"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatCompact, formatRarity, initials, leaderboard, rares, services, type ServiceId } from "@/data/catalog"
import { cn } from "@/lib/utils"

type Filter = "all" | ServiceId

const asideClass =
  "flex min-w-0 flex-col gap-3 rounded-2xl border bg-card p-4 xl:sticky xl:top-20 xl:max-h-[calc(100dvh-6rem)] xl:overflow-y-auto"

export function RankingPage() {
  const [filter, setFilter] = useState<Filter>("all")
  const players = filter === "all" ? leaderboard : leaderboard.filter((player) => player.service === filter)
  const drops = filter === "all" ? rares : rares.filter((drop) => drop.service === filter)
  const board = usePaged(players, 8, filter)
  const leaders = players.slice(0, 3)

  return (
    <main className={cn(shellClass, "flex flex-col gap-8 py-8")}>
      <PageHero
        tone="emerald"
        kicker="Placar"
        title="Quem puxou a semana."
        description="A tabela fica no centro. As laterais seguram o topo e os raros deste recorte."
      >
        <p className="text-sm text-muted-foreground">
          <span className="text-3xl font-semibold text-emerald-700 tabular-nums dark:text-emerald-300">
            +{players[0]?.gained ?? 0}
          </span>
          <span className="mt-1 block">maior salto neste recorte</span>
        </p>
      </PageHero>

      <div className="grid items-start gap-6 md:grid-cols-2 xl:grid-cols-[minmax(15rem,16.5rem)_minmax(0,1fr)_minmax(15rem,16.5rem)]">
        <div className="flex min-w-0 flex-col gap-6 md:col-span-2 xl:col-span-1 xl:col-start-2">
          <Tabs
            value={filter}
            onValueChange={(value) => {
              if (value === "all" || value === "psn" || value === "steam" || value === "retro") setFilter(value)
            }}
          >
            <TabsList>
              <TabsTrigger value="all">Geral</TabsTrigger>
              {services.map((service) => (
                <TabsTrigger key={service.id} value={service.id}>
                  {service.short}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <DataTable page={board.page} pages={board.pages} from={board.from} to={board.to} total={board.total} onPage={board.setPage}>
            <Table className="min-w-[720px] table-fixed">
              <colgroup>
                <col className="w-12" />
                <col className="w-36" />
                <col className="w-24" />
                <col className="w-16" />
                <col className="w-28" />
                <col />
              </colgroup>
              <TableHeader>
                <TableRow>
                  <TableHead>Pos.</TableHead>
                  <TableHead>Jogador</TableHead>
                  <TableHead>Rede</TableHead>
                  <TableHead className="text-right">Nível</TableHead>
                  <TableHead className="text-right">Ganho</TableHead>
                  <TableHead>Biblioteca</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {board.items.map((player, index) => {
                  const place = board.from + index
                  return (
                    <TableRow key={`${player.service}-${player.player}`}>
                      <TableCell className={cn("font-semibold tabular-nums", place <= 3 ? "text-emerald-700 dark:text-emerald-300" : "text-muted-foreground")}>
                        {place}
                      </TableCell>
                      <TableCell>
                        <div className="flex min-w-0 items-center gap-2">
                          <Avatar size="sm">
                            <AvatarFallback>{initials(player.player)}</AvatarFallback>
                          </Avatar>
                          <span className="truncate font-medium">{player.player}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <PlatformBadge service={player.service} />
                      </TableCell>
                      <TableCell className="text-right tabular-nums">{player.level}</TableCell>
                      <TableCell className="text-right font-medium text-emerald-700 tabular-nums dark:text-emerald-300">
                        +{player.gained}
                      </TableCell>
                      <TableCell>
                        <div className="flex min-w-0 items-center gap-3">
                          <Progress
                            value={player.completion}
                            className="min-w-0 flex-1 [&_[data-slot=progress-indicator]]:bg-emerald-600 [&_[data-slot=progress-track]]:h-1.5 [&_[data-slot=progress-track]]:bg-muted"
                          />
                          <span className="w-10 shrink-0 text-right text-xs tabular-nums text-muted-foreground">
                            {player.completion}%
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </DataTable>
        </div>

        <aside className={cn(asideClass, "xl:col-start-1 xl:row-start-1")}>
          <div>
            <h2 className="text-sm font-semibold tracking-tight">No topo</h2>
            <p className="text-xs text-muted-foreground">Os três maiores saltos, mesmo fora desta página.</p>
          </div>
          {leaders.length > 0 ? (
            <ol className="flex flex-col">
              {leaders.map((player, index) => (
                <li key={`${player.service}-${player.player}`} className={cn(index > 0 && "border-t")}>
                  <div className="flex min-w-0 items-center gap-3 py-3">
                    <span className="w-4 text-sm font-semibold text-emerald-700 tabular-nums dark:text-emerald-300">
                      {index + 1}
                    </span>
                    <Avatar size="sm">
                      <AvatarFallback>{initials(player.player)}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{player.player}</p>
                      <p className="text-xs text-muted-foreground">Nível {player.level}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-emerald-700 tabular-nums dark:text-emerald-300">
                        +{player.gained}
                      </p>
                      <PlatformBadge service={player.service} />
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          ) : (
            <p className="text-sm text-muted-foreground">Ninguém neste recorte.</p>
          )}
        </aside>

        <aside className={cn(asideClass, "xl:col-start-3 xl:row-start-1")}>
          <div>
            <h2 className="text-sm font-semibold tracking-tight">Raros da semana</h2>
            <p className="text-xs text-muted-foreground">Menos de 2% da base ainda tem.</p>
          </div>
          {drops.length > 0 ? (
            <ul>
              {drops.map((drop, index) => (
                <li key={drop.id}>
                  {index > 0 ? <Separator /> : null}
                  <div className="flex min-w-0 flex-col gap-1.5 py-3">
                    <div className="flex min-w-0 items-start justify-between gap-2">
                      <p className="truncate text-sm font-medium">{drop.name}</p>
                      {drop.kind ? (
                        <span className={cn("mt-1.5 size-1.5 shrink-0 rounded-full", trophyDotClass(drop.kind))} />
                      ) : null}
                    </div>
                    <div className="flex min-w-0 items-center gap-2">
                      <p className="truncate text-xs text-muted-foreground">{drop.game}</p>
                      <PlatformBadge service={drop.service} />
                    </div>
                    <p className="text-sm tabular-nums">
                      <span className="font-semibold">{formatRarity(drop.rarity)}</span>
                      <span className="text-xs text-muted-foreground"> · {formatCompact(drop.owners)} donos</span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">Nada raro nessa rede.</p>
          )}
        </aside>
      </div>
    </main>
  )
}
