import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { achievementMark } from "@/components/catalog/trophy-counts"
import { PlatformBadge } from "@/components/catalog/platform-badge"
import { formatRarity, initials, type ActivityItem, type RankedPlayer } from "@/data/catalog"
import { cn } from "@/lib/utils"

export function ActivityFeed({ items, bare = false }: { items: ActivityItem[]; bare?: boolean }) {
  const list = (
    <ul className={bare ? "-mx-4" : undefined}>
      {items.map((item, index) => {
        const mark = achievementMark(item)
        return (
          <li key={item.id}>
            {index > 0 ? <Separator /> : null}
            <div className="flex min-w-0 items-center gap-3 px-4 py-3">
              <Avatar>
                <AvatarFallback>{initials(item.player)}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm">
                  <span className="font-medium">{item.player}</span>
                  <span className="text-muted-foreground"> conquistou </span>
                  <span className="font-medium">{item.title}</span>
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {item.game} · {formatRarity(item.rarity)} · {item.ago}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-1.5">
                <PlatformBadge service={item.service} />
                <Badge variant="outline" className="gap-1.5">
                  <span className={cn("size-1.5 rounded-full", mark.dot)} />
                  {mark.label}
                </Badge>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )

  if (bare) return list
  return <Card className="min-w-0 py-1">{list}</Card>
}

export function RankList({ players, bare = false }: { players: RankedPlayer[]; bare?: boolean }) {
  const list = (
    <ol className={bare ? "-mx-4" : undefined}>
      {players.map((player, index) => (
        <li key={`${player.service}-${player.player}`}>
          {index > 0 ? <Separator /> : null}
          <div className="flex min-w-0 items-center gap-3 px-4 py-2.5">
            <span className="w-4 text-xs tabular-nums text-muted-foreground">{index + 1}</span>
            <Avatar size="sm">
              <AvatarFallback>{initials(player.player)}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{player.player}</p>
              <p className="text-xs text-muted-foreground">Nível {player.level}</p>
            </div>
              <PlatformBadge service={player.service} />
            <div className="text-right">
              <p className="text-sm font-medium tabular-nums text-emerald-600 dark:text-emerald-400">
                +{player.gained}
              </p>
              <p className="text-xs tabular-nums text-muted-foreground">{player.completion}%</p>
            </div>
          </div>
        </li>
      ))}
    </ol>
  )

  if (bare) return list
  return <Card className="min-w-0 py-1">{list}</Card>
}
