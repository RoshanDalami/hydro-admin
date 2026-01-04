"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { AdminLayout } from "@/components/layout";
import { useMemo } from "react";
import { Toaster } from "@/components/ui/sonner";
function ClientProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useMemo(() => new QueryClient(), []);
  const pathname = usePathname();

  // Check if the current route is an auth route
  const isAuthRoute = pathname?.startsWith("/auth");

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-right" richColors />
      {isAuthRoute ? children : <AdminLayout>{children}</AdminLayout>}
    </QueryClientProvider>
  );
}

export default ClientProvider;
