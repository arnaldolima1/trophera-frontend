import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { PlatformBadge } from "@/components/catalog/platform-badge"
import { TrophyCounts } from "@/components/catalog/trophy-counts"
import { formatCompact, type Game } from "@/data/catalog"
import { cn } from "@/lib/utils"

export function GameCard({ game }: { game: Game }) {
  return (
    <Card className="min-w-0 pt-0">
      <div
        className={cn(
          "relative flex aspect-[16/10] items-end bg-gradient-to-br p-4 text-white",
          game.gradient,
        )}
      >
        <span className="text-3xl font-semibold tracking-tight">{game.mark}</span>
        <PlatformBadge service={game.service} onDark className="absolute top-3 right-3" />
      </div>
      <CardHeader>
        <CardTitle className="line-clamp-1">{game.name}</CardTitle>
        <CardDescription>{formatCompact(game.hunters)} caçando</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {game.counts ? (
          <TrophyCounts counts={game.counts} />
        ) : (
          <p className="text-xs text-muted-foreground">{game.achievements} achievements</p>
        )}
        <div className="flex items-center gap-3">
          <Progress
            value={game.completion}
            className="min-w-0 flex-1 [&_[data-slot=progress-track]]:h-1.5"
          />
          <span className="text-xs tabular-nums text-muted-foreground">{game.completion}%</span>
        </div>
      </CardContent>
    </Card>
  )
}
