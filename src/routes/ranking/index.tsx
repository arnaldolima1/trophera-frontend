import { createFileRoute } from "@tanstack/react-router"
import { RankingPage } from "@/components/pages/ranking-page"

export const Route = createFileRoute("/ranking/")({
  component: RankingPage,
})
