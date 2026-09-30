import { createFileRoute } from "@tanstack/react-router"
import { GuidesPage } from "@/components/pages/guides-page"

export const Route = createFileRoute("/guides/")({
  component: GuidesPage,
})
