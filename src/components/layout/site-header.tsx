import { useState } from "react"
import { Link } from "@tanstack/react-router"
import { MenuIcon, TrophyIcon } from "lucide-react"
import { shellClass } from "@/components/layout/shell"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

const links = [
  { to: "/games", label: "Jogos" },
  { to: "/ranking", label: "Ranking" },
  { to: "/guides", label: "Guias" },
  { to: "/community", label: "Comunidade" },
] as const

const linkClass =
  "rounded-lg px-2.5 py-1.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground data-[status=active]:bg-muted data-[status=active]:text-foreground"

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-md">
      <div className={cn(shellClass, "flex h-14 items-center gap-3")}>
        <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="grid size-7 place-items-center rounded-lg bg-foreground text-background">
            <TrophyIcon className="size-3.5" />
          </span>
          Trophera
        </Link>

        <nav className="ml-4 hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link key={link.to} to={link.to} className={linkClass}>
              {link.label}
            </Link>
          ))}
        </nav>

        <Button size="sm" className="ml-auto">
          Entrar
        </Button>

        <Sheet open={open} onOpenChange={setOpen}>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Abrir menu"
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </Button>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Trophera</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-4">
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="rounded-lg px-2 py-2 text-sm hover:bg-muted data-[status=active]:bg-muted"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
