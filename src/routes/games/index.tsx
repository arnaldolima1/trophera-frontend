import { createFileRoute } from "@tanstack/react-router"
import { GamesPage } from "@/components/pages/games-page"

export const Route = createFileRoute("/games/")({
  component: GamesPage,
})
