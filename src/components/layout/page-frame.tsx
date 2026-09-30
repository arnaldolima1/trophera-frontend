import type { ReactNode } from "react"
import { shellClass } from "@/components/layout/shell"
import { cn } from "@/lib/utils"

export function PageFrame({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: ReactNode
}) {
  return (
    <main className={cn(shellClass, "flex flex-col gap-6 py-8")}>
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        <p className="max-w-2xl text-sm text-muted-foreground">{description}</p>
      </header>
      {children}
    </main>
  )
}
