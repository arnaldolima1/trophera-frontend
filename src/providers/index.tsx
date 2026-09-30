import React from "react";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
      <TanStackRouterDevtools />
    </div>
  );
}
