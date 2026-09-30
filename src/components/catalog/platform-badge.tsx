import { Badge } from "@/components/ui/badge"
import { serviceById, type ServiceId } from "@/data/catalog"
import { cn } from "@/lib/utils"

const tones: Record<ServiceId, string> = {
  psn: "bg-sky-500/15 text-sky-800 dark:text-sky-200",
  steam: "bg-indigo-500/15 text-indigo-800 dark:text-indigo-200",
  retro: "bg-amber-500/15 text-amber-900 dark:text-amber-200",
}

export function PlatformBadge({
  service,
  onDark = false,
  className,
}: {
  service: ServiceId
  onDark?: boolean
  className?: string
}) {
  const meta = serviceById(service)
  return (
    <Badge
      variant="secondary"
      className={cn(onDark ? "bg-black/45 text-white" : tones[service], className)}
    >
      {onDark ? meta.label : meta.short}
    </Badge>
  )
}
