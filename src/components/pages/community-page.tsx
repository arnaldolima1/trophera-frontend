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
import { services, threads, type ServiceId, type ThreadTopic } from "@/data/catalog"
import { cn } from "@/lib/utils"

type Filter = "all" | ServiceId

const topicTone: Record<ThreadTopic, string> = {
  Ajuda: "bg-sky-500/15 text-sky-800 dark:text-sky-200",
  Sessão: "bg-emerald-500/15 text-emerald-800 dark:text-emerald-200",
  Raro: "bg-amber-500/15 text-amber-800 dark:text-amber-200",
  Debate: "bg-violet-500/15 text-violet-800 dark:text-violet-200",
}

export function CommunityPage() {
  const [filter, setFilter] = useState<Filter>("all")
  const visible = filter === "all" ? threads : threads.filter((thread) => thread.service === filter)
  const lead = [...visible].sort((a, b) => b.replies - a.replies)[0]
  const replies = visible.reduce((sum, thread) => sum + thread.replies, 0)
  const list = usePaged(visible, 8, filter)

  return (
    <main className={cn(shellClass, "flex flex-col gap-8 py-8")}>
      <PageHero
        tone="sky"
        kicker="Fórum"
        title="Onde a caça vira conversa."
        description="Ajuda, sessão e debate por jogo. A linha do tempo das quedas ficou dentro do catálogo."
      >
        <p className="text-sm text-muted-foreground">
          <span className="text-3xl font-semibold text-foreground tabular-nums">{replies}</span>
          <span className="mt-1 block">respostas neste recorte</span>
        </p>
      </PageHero>

      <Tabs
        value={filter}
        onValueChange={(value) => {
          if (value === "all" || value === "psn" || value === "steam" || value === "retro") setFilter(value)
        }}
      >
        <TabsList>
          <TabsTrigger value="all">Tudo</TabsTrigger>
          {services.map((service) => (
            <TabsTrigger key={service.id} value={service.id}>
              {service.short}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {lead ? (
        <article className="flex min-w-0 flex-col gap-4 rounded-3xl border bg-gradient-to-br from-sky-500/20 to-transparent p-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className={topicTone[lead.topic]}>{lead.topic}</Badge>
            <PlatformBadge service={lead.service} />
            <span className="text-sm text-muted-foreground">{lead.game}</span>
          </div>
          <div>
            <p className="text-xs tracking-wide text-muted-foreground uppercase">Mais respondido</p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight">{lead.title}</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            {lead.author} · {lead.replies} respostas · {lead.ago}
          </p>
        </article>
      ) : (
        <p className="text-sm text-muted-foreground">Nenhuma conversa nessa rede.</p>
      )}

      {list.total > 0 ? (
        <DataTable page={list.page} pages={list.pages} from={list.from} to={list.to} total={list.total} onPage={list.setPage}>
          <Table className="min-w-[860px] table-fixed">
            <colgroup>
              <col className="w-[28%]" />
              <col className="w-[18%]" />
              <col className="w-28" />
              <col className="w-28" />
              <col className="w-28" />
              <col className="w-28" />
              <col className="w-32" />
            </colgroup>
            <TableHeader>
              <TableRow>
                <TableHead>Conversa</TableHead>
                <TableHead>Jogo</TableHead>
                <TableHead>Rede</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead className="text-right">Respostas</TableHead>
                <TableHead>Autor</TableHead>
                <TableHead>Atualizado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {list.items.map((thread) => (
                <TableRow key={thread.id}>
                  <TableCell className="whitespace-normal font-medium">
                    <span className="flex flex-wrap items-center gap-2">
                      {thread.title}
                      {thread.id === lead?.id ? <Badge variant="secondary">Mais respondido</Badge> : null}
                    </span>
                  </TableCell>
                  <TableCell className="whitespace-normal">{thread.game}</TableCell>
                  <TableCell>
                    <PlatformBadge service={thread.service} />
                  </TableCell>
                  <TableCell>
                    <Badge className={topicTone[thread.topic]}>{thread.topic}</Badge>
                  </TableCell>
                  <TableCell className="text-right tabular-nums">{thread.replies}</TableCell>
                  <TableCell>{thread.author}</TableCell>
                  <TableCell className="text-muted-foreground">{thread.ago}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DataTable>
      ) : null}
    </main>
  )
}
