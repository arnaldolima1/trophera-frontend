import { useEffect, useState, type ReactNode } from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function usePaged<T>(items: T[], pageSize: number, resetKey: string) {
  const [page, setPage] = useState(1)
  const pages = Math.max(1, Math.ceil(items.length / pageSize))

  useEffect(() => {
    setPage(1)
  }, [resetKey])

  const safe = Math.min(page, pages)
  const start = (safe - 1) * pageSize

  return {
    page: safe,
    pages,
    total: items.length,
    items: items.slice(start, start + pageSize),
    setPage,
    from: items.length === 0 ? 0 : start + 1,
    to: Math.min(start + pageSize, items.length),
  }
}

export function ListPager({
  page,
  pages,
  from,
  to,
  total,
  onPage,
  embedded = false,
  compact = false,
  className,
}: {
  page: number
  pages: number
  from: number
  to: number
  total: number
  onPage: (page: number) => void
  embedded?: boolean
  compact?: boolean
  className?: string
}) {
  const numbers = visiblePages(page, pages)

  if (compact) {
    return (
      <nav aria-label="Paginação" className={cn("flex items-center justify-between gap-2", className)}>
        <p className="text-xs text-muted-foreground">
          {total === 0 ? "Nada neste recorte" : `${from}–${to} de ${total}`}
        </p>
        <div className="flex items-center gap-1">
          <Button variant="outline" size="icon-sm" aria-label="Anterior" disabled={page <= 1} onClick={() => onPage(page - 1)}>
            <ChevronLeftIcon />
          </Button>
          <Button variant="outline" size="icon-sm" aria-label="Próxima" disabled={page >= pages} onClick={() => onPage(page + 1)}>
            <ChevronRightIcon />
          </Button>
        </div>
      </nav>
    )
  }

  return (
    <nav
      aria-label="Paginação"
      className={cn(
        "flex flex-wrap items-center justify-between gap-3 px-4 py-3",
        embedded ? "border-t bg-muted/40" : "rounded-xl border bg-card",
        className,
      )}
    >
      <p className="text-sm text-muted-foreground">
        {total === 0 ? "Nada neste recorte" : `${from}–${to} de ${total}`}
      </p>
      <div className="flex items-center gap-1">
        <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => onPage(page - 1)}>
          <ChevronLeftIcon />
          Anterior
        </Button>
        {numbers.map((number) => (
          <Button
            key={number}
            variant={number === page ? "default" : "outline"}
            size="icon-sm"
            aria-current={number === page ? "page" : undefined}
            onClick={() => onPage(number)}
          >
            {number}
          </Button>
        ))}
        <Button variant="outline" size="sm" disabled={page >= pages} onClick={() => onPage(page + 1)}>
          Próxima
          <ChevronRightIcon />
        </Button>
      </div>
    </nav>
  )
}

export function DataTable({
  children,
  ...pager
}: {
  children: ReactNode
  page: number
  pages: number
  from: number
  to: number
  total: number
  onPage: (page: number) => void
}) {
  return (
    <div className="min-w-0 overflow-hidden rounded-xl border bg-card">
      {children}
      <ListPager embedded {...pager} />
    </div>
  )
}

function visiblePages(page: number, pages: number) {
  if (pages <= 5) return Array.from({ length: pages }, (_, index) => index + 1)
  const start = Math.max(1, Math.min(page - 2, pages - 4))
  return Array.from({ length: 5 }, (_, index) => start + index)
}
