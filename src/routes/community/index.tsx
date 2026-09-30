import { createFileRoute } from "@tanstack/react-router"
import { CommunityPage } from "@/components/pages/community-page"

export const Route = createFileRoute("/community/")({
  component: CommunityPage,
})
