"use client";

import * as React from "react";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
// import { Bell, Search, Moon, Sun } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

interface AdminLayoutProps {
  children: React.ReactNode;
  breadcrumbs?: {
    label: string;
    href?: string;
  }[];
}

// Header Component
function Header({
  breadcrumbs,
}: {
  breadcrumbs?: AdminLayoutProps["breadcrumbs"];
}) {
  // const [isDark, setIsDark] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 flex h-16 w-full shrink-0 items-center justify-between gap-4 border-b border-border/40 bg-background/80 backdrop-blur-xl px-4 lg:px-6">
      {/* Left Side - Trigger & Breadcrumbs */}
      <div className="flex items-center gap-3">
        <SidebarTrigger className="-ml-1 text-muted-foreground hover:text-foreground transition-colors" />
        <Separator orientation="vertical" className="h-5 bg-border/60" />

        {breadcrumbs && breadcrumbs.length > 0 && (
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={index}>
                  <BreadcrumbItem>
                    {crumb.href ? (
                      <BreadcrumbLink
                        href={crumb.href}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {crumb.label}
                      </BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage className="font-medium text-foreground">
                        {crumb.label}
                      </BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                  {index < breadcrumbs.length - 1 && (
                    <BreadcrumbSeparator className="text-muted-foreground/50" />
                  )}
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        )}
      </div>

      {/* Right Side - Search & Actions */}
      <div className="flex items-center gap-3">
        {/* <div className="relative hidden md:flex items-center">
                    <Search className="absolute left-3 h-4 w-4 text-muted-foreground pointer-events-none" />
                    <Input
                        type="search"
                        placeholder="Search..."
                        className="w-64 pl-9 h-9 bg-muted/50 border-transparent focus:border-border focus:bg-background transition-all duration-200"
                    />
                    <kbd className="absolute right-3 pointer-events-none hidden lg:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                        <span className="text-xs">⌘</span>K
                    </kbd>
                </div>


                <Button
                    variant="ghost"
                    size="icon"
                    className="relative h-9 w-9 text-muted-foreground hover:text-foreground"
                >
                    <Bell className="h-4 w-4" />
                    <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-background" />
                </Button>


                <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 text-muted-foreground hover:text-foreground"
                    onClick={() => setIsDark(!isDark)}
                >
                    {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button> */}

        <div className="h-8 w-8 rounded-full bg-linear-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-semibold text-xs shadow-md hover:shadow-lg transition-shadow cursor-pointer">
          A
        </div>
      </div>
    </header>
  );
}

export function AdminLayout({ children, breadcrumbs }: AdminLayoutProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset>
        <Header breadcrumbs={breadcrumbs} />
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-6 lg:p-8">{children}</div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
