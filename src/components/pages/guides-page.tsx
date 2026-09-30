import { useState } from "react"
import { PageHero } from "@/components/layout/page-hero"
import { DataTable, usePaged } from "@/components/layout/list-pager"
import { shellClass } from "@/components/layout/shell"
import { PlatformBadge } from "@/components/catalog/platform-badge"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { guides, services, type ServiceId } from "@/data/catalog"
import { cn } from "@/lib/utils"

type Filter = "all" | ServiceId

const difficultyBar = {
  Leve: "bg-emerald-500",
  Média: "bg-amber-500",
  Difícil: "bg-rose-500",
} as const

export function GuidesPage() {
  const [filter, setFilter] = useState<Filter>("all")
  const visible = filter === "all" ? guides : guides.filter((guide) => guide.service === filter)
  const lead = [...visible].sort((a, b) => hoursStart(a.hours) - hoursStart(b.hours))[0]
  const list = usePaged(visible, 8, filter)

  return (
    <main className={cn(shellClass, "flex flex-col gap-8 py-8")}>
      <PageHero
        tone="violet"
        kicker="Rotas"
        title="Como fechar, sem misturar a regra."
        description="Duração, dificuldade e autor lado a lado. O cartão marca a rota mais curta deste filtro."
      />

      <Tabs
        value={filter}
        onValueChange={(value) => {
          if (value === "all" || value === "psn" || value === "steam" || value === "retro") setFilter(value)
        }}
      >
        <TabsList>
          <TabsTrigger value="all">Todos</TabsTrigger>
          {services.map((service) => (
            <TabsTrigger key={service.id} value={service.id}>
              {service.short}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {lead ? (
        <article className="grid min-w-0 overflow-hidden rounded-3xl border md:grid-cols-[12rem_1fr]">
          <div className="flex flex-col justify-between bg-violet-600 p-6 text-white">
            <Badge className="w-fit bg-white/15 text-white">{lead.difficulty}</Badge>
            <p className="text-3xl font-semibold tracking-tight">{lead.hours}</p>
          </div>
          <div className="flex flex-col justify-center gap-3 p-6">
            <div className="flex flex-wrap items-center gap-2">
              <PlatformBadge service={lead.service} />
              <span className="text-sm text-muted-foreground">{lead.game}</span>
            </div>
            <h2 className="text-2xl font-semibold tracking-tight">{lead.title}</h2>
            <p className="text-sm text-muted-foreground">Rota mais curta · escrito por {lead.author}</p>
          </div>
        </article>
      ) : (
        <p className="text-sm text-muted-foreground">Nenhum guia nessa rede.</p>
      )}

      {list.total > 0 ? (
        <DataTable page={list.page} pages={list.pages} from={list.from} to={list.to} total={list.total} onPage={list.setPage}>
          <Table className="min-w-[760px] table-fixed">
            <colgroup>
              <col className="w-[32%]" />
              <col className="w-[20%]" />
              <col className="w-28" />
              <col className="w-28" />
              <col className="w-36" />
              <col className="w-28" />
            </colgroup>
            <TableHeader>
              <TableRow>
                <TableHead>Rota</TableHead>
                <TableHead>Jogo</TableHead>
                <TableHead>Rede</TableHead>
                <TableHead>Duração</TableHead>
                <TableHead>Dificuldade</TableHead>
                <TableHead>Autor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {list.items.map((guide) => (
                <TableRow key={guide.id}>
                  <TableCell className="whitespace-normal font-medium">
                    <span className="flex flex-wrap items-center gap-2">
                      {guide.title}
                      {guide.id === lead?.id ? <Badge variant="secondary">Mais curta</Badge> : null}
                    </span>
                  </TableCell>
                  <TableCell className="whitespace-normal">{guide.game}</TableCell>
                  <TableCell>
                    <PlatformBadge service={guide.service} />
                  </TableCell>
                  <TableCell className="tabular-nums">{guide.hours}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center gap-2">
                      <span className={cn("size-1.5 rounded-full", difficultyBar[guide.difficulty])} />
                      {guide.difficulty}
                    </span>
                  </TableCell>
                  <TableCell>{guide.author}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DataTable>
      ) : null}
    </main>
  )
}

function hoursStart(hours: string) {
  const match = hours.match(/\d+/)
  return match ? Number(match[0]) : 0
}
