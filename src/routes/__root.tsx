import { createRootRoute, Outlet } from "@tanstack/react-router";
import Providers from "@/providers";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { TooltipProvider } from "@/components/ui/tooltip";

export const Route = createRootRoute({
  component: function RootLayout() {
    return (
      <Providers>
        <TooltipProvider delay={200}>
          <div className="flex min-h-dvh flex-col bg-background text-foreground">
            <SiteHeader />
            <div className="flex-1">
              <Outlet />
            </div>
            <SiteFooter />
          </div>
        </TooltipProvider>
      </Providers>
    );
  },
});
