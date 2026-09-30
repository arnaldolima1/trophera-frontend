import { Link } from "@tanstack/react-router"
import { shellClass } from "@/components/layout/shell"
import { cn } from "@/lib/utils"

const map = [
  { to: "/games", label: "Jogos" },
  { to: "/ranking", label: "Ranking" },
  { to: "/guides", label: "Guias" },
  { to: "/community", label: "Comunidade" },
] as const

const networks = ["PlayStation", "Steam", "RetroAchievements"]

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t bg-muted/40">
      <div className={cn(shellClass, "flex flex-col gap-5 py-6 sm:flex-row sm:items-end sm:justify-between")}>
        <div className="max-w-sm">
          <p className="text-sm font-medium tracking-tight">Trophera</p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            Platina, achievement e ponto, cada um na regra da própria rede.
          </p>
          <nav className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs">
            {map.map((item) => (
              <Link key={item.to} to={item.to} className="text-muted-foreground hover:text-foreground">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <ul className="flex flex-col gap-1 text-xs text-muted-foreground sm:items-end">
          {networks.map((network) => (
            <li key={network}>{network}</li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
