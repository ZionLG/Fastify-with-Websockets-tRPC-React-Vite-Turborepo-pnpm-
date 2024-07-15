import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { httpBatchLink } from "@trpc/client";
import superjson from "superjson";

import { ThemeProvider } from "../components/theme-provider";
import { trpc } from "../utils/trpc";

const TanStackRouterDevtools =
  process.env.NODE_ENV === "production"
    ? () => null // Render nothing in production
    : React.lazy(() =>
        // Lazy load in development
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
          // For Embedded Mode
          // default: res.TanStackRouterDevtoolsPanel
        })),
      );

// Set up a Router instance
export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          transformer: superjson,
          url: "http://localhost:4000/trpc",
        }),
      ],
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <div className="App">
            <Outlet />
          </div>
        </ThemeProvider>

        <TanStackRouterDevtools />
      </QueryClientProvider>
    </trpc.Provider>
  );
}
