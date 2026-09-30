import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

const washes = {
  amber: "from-amber-500/20 via-orange-400/5 to-transparent",
  emerald: "from-emerald-500/20 via-teal-400/5 to-transparent",
  violet: "from-violet-500/20 via-fuchsia-400/5 to-transparent",
  sky: "from-sky-500/25 via-blue-400/5 to-transparent",
} as const

export type PageTone = keyof typeof washes

export function PageHero({
  kicker,
  title,
  description,
  tone,
  children,
}: {
  kicker: string
  title: string
  description: string
  tone: PageTone
  children?: ReactNode
}) {
  return (
    <header
      className={cn(
        "relative overflow-hidden rounded-3xl border bg-gradient-to-br p-6 sm:p-8",
        washes[tone],
      )}
    >
      <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">{kicker}</p>
      <div className="mt-3 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">{title}</h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
        </div>
        {children}
      </div>
    </header>
  )
}
