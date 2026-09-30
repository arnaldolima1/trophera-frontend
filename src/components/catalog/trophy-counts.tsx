import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import type { ActivityItem, TrophyKind, TrophySet } from "@/data/catalog"

const kinds: { key: TrophyKind; label: string; dot: string }[] = [
  { key: "platinum", label: "Platina", dot: "bg-sky-500 dark:bg-sky-300" },
  { key: "gold", label: "Ouro", dot: "bg-amber-500 dark:bg-amber-300" },
  { key: "silver", label: "Prata", dot: "bg-zinc-400" },
  { key: "bronze", label: "Bronze", dot: "bg-orange-700 dark:bg-orange-400" },
]

export function trophyDotClass(kind: TrophyKind) {
  return kinds.find((item) => item.key === kind)?.dot ?? "bg-muted"
}

export function trophyLabel(kind: TrophyKind) {
  return kinds.find((item) => item.key === kind)?.label ?? kind
}

export function achievementMark(item: Pick<ActivityItem, "kind" | "service" | "points">) {
  if (item.kind) {
    return { label: trophyLabel(item.kind), dot: trophyDotClass(item.kind) }
  }
  if (item.service === "retro") {
    return {
      label: item.points ? `${item.points} pts` : "Achievement",
      dot: "bg-amber-500",
    }
  }
  return { label: "Achievement", dot: "bg-indigo-500" }
}

export function TrophyCounts({
  counts,
  className,
}: {
  counts: TrophySet
  className?: string
}) {
  return (
    <div className={cn("flex flex-wrap items-center gap-x-3 gap-y-1", className)}>
      {kinds.map((kind) => (
        <Tooltip key={kind.key}>
          <TooltipTrigger
            render={
              <span className="inline-flex items-center gap-1.5 text-xs tabular-nums text-muted-foreground" />
            }
          >
            <span className={cn("size-2 rounded-full", kind.dot)} />
            {counts[kind.key]}
          </TooltipTrigger>
          <TooltipContent>{kind.label}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  )
}
