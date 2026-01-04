"use client";

import * as React from "react";
import {
  LayoutDashboard,
  Users,
  BarChart3,
  FolderOpen,
  LogOut,
  ChevronDown,
  Cog,
  ImagePlus,
  FileText
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGetFirstLogo } from "@/api/hooks/logo.hook";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Image from "next/image";
import { imageurlgenerator } from "@/utils/imgareurlgenerator";
import { Skeleton } from "../ui/skeleton";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
// Type definition for navigation items
type NavItemType = {
  title: string;
  icon: LucideIcon;
  href: string;
  badge: string | null;
  subItems?: { title: string; href: string }[];
};

// Navigation items configuration
const mainNavItems: NavItemType[] = [
  // {
  //   title: "Dashboard",
  //   icon: LayoutDashboard,
  //   href: "/",
  //   badge: null,
  // },
  {
    title: "Activities",
    icon: BarChart3,
    href: "/activities",
    badge: null,
  },
  {
    title: "Setup",
    icon: Cog,
    href: "/setup",
    badge: null,
    subItems: [
      { title: "About Us", href: "/setup/about-us" },
      { title: "Logo", href: "/setup/logo" },
    ],
  },
  {
    title: "Team Management",
    icon: Users,
    href: "/team-management",
    badge: null,
    subItems: [
      { title: "Team Category", href: "/team-management/team-category" },
      { title: "Positions", href: "/team-management/positions" },
      { title: "Roles", href: "/team-management/roles" },
      { title: "Team Members", href: "/team-management/team-members" },
    ],
  },
  {
    title: "Gallery",
    icon: ImagePlus,
    href: "/gallery",
    badge: null,
    subItems: [
      { title: "Gallery Category", href: "/gallery/gallery-category" },
      { title: "Gallery Images", href: "/gallery/gallery-images" },
    ]
  },
  {
    title: "Notices",
    icon: FileText,
    href: "/notices",
    badge: null,
  },
  {
    title: "Projects",
    icon: FolderOpen,
    href: "/projects",
    badge: null,

  },
];

// const secondaryNavItems: NavItemType[] = [
//     {
//         title: "Notifications",
//         icon: Bell,
//         href: "/notifications",
//         badge: "5",
//     },
//     {
//         title: "Settings",
//         icon: Settings,
//         href: "/settings",
//         badge: null,
//     },
//     {
//         title: "Help & Support",
//         icon: HelpCircle,
//         href: "/support",
//         badge: null,
//     },
// ];

// Logo Component
function Logo() {
  const { state } = useSidebar();
  const { data, isLoading } = useGetFirstLogo();

  return (
    <Link
      href="/"
      className="flex items-center gap-3 px-2 py-1 transition-all duration-200"
    >
      <div>
        {isLoading ? (
          <Skeleton className="h-24 w-24 rounded-full bg-gray-200" />
        ) : (
          <Image
            src={imageurlgenerator(data?.url as string)}
            alt="logo"
            width={75}
            height={75}
            className="rounded-full"
          />
        )}
      </div>
      <div
        className={cn(
          "flex flex-col gap-3 transition-all duration-200",
          state === "collapsed" && "opacity-0 w-0 overflow-hidden"
        )}
      >
        {isLoading ? (
          <Skeleton className="h-3 w-24 bg-blue-200" />
        ) : (
          <span className="text-sm font-bold text-foreground tracking-tight">
            {data?.name}
          </span>
        )}
        {isLoading ? (
          <Skeleton className="h-3 w-24 bg-blue-100" />
        ) : (
          <span className="text-[10px] text-muted-foreground font-medium -mt-0.5">
            {data?.slogan}
          </span>
        )}
      </div>
    </Link>
  );
}

// User Profile Component
function UserProfile() {
  const { state } = useSidebar();

  return (
    <div className="flex items-center gap-3 p-2 rounded-lg bg-sidebar-accent/50 hover:bg-sidebar-accent transition-colors cursor-pointer">
      <div className="relative">
        <div className="h-9 w-9 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-white font-semibold text-sm shadow-md">
          RA
        </div>
        <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-500 border-2 border-sidebar" />
      </div>
      <div
        className={cn(
          "flex-1 min-w-0 transition-all duration-200",
          state === "collapsed" && "opacity-0 w-0 overflow-hidden"
        )}
      >
        <p className="text-sm font-medium text-foreground truncate">
          Roshan Dalami
        </p>
        <p className="text-xs text-muted-foreground truncate">Administrator</p>
      </div>
      <ChevronDown
        className={cn(
          "h-4 w-4 text-muted-foreground transition-all duration-200",
          state === "collapsed" && "opacity-0 w-0"
        )}
      />
    </div>
  );
}

// Navigation Item Component
function NavItem({ item, isActive }: { item: NavItemType; isActive: boolean }) {
  const { state } = useSidebar();
  const [isOpen, setIsOpen] = React.useState(false);
  const hasSubItems = item.subItems && item.subItems.length > 0;

  if (hasSubItems) {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton
          onClick={() => setIsOpen(!isOpen)}
          isActive={isActive}
          tooltip={item.title}
          className={cn(
            "group transition-all duration-200",
            isActive && "bg-sidebar-accent text-sidebar-accent-foreground"
          )}
        >
          <item.icon
            className={cn(
              "h-4 w-4 transition-colors",
              isActive
                ? "text-blue-600"
                : "text-muted-foreground group-hover:text-foreground"
            )}
          />
          <span className="flex-1">{item.title}</span>
          {item.badge && (
            <span className="ml-auto rounded-full bg-blue-100 dark:bg-blue-900/30 px-2 py-0.5 text-[10px] font-semibold text-blue-600 dark:text-blue-400">
              {item.badge}
            </span>
          )}
          <ChevronDown
            className={cn(
              "h-4 w-4 text-muted-foreground transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          />
        </SidebarMenuButton>
        {isOpen && state !== "collapsed" && (
          <SidebarMenuSub>
            {item.subItems?.map((subItem) => (
              <SidebarMenuSubItem key={subItem.href}>
                <SidebarMenuSubButton asChild>
                  <Link href={subItem.href}>
                    <span>{subItem.title}</span>
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        )}
      </SidebarMenuItem>
    );
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={isActive}
        tooltip={item.title}
        className={cn(
          "group transition-all duration-200",
          isActive && "bg-sidebar-accent text-sidebar-accent-foreground"
        )}
      >
        <Link href={item.href}>
          <item.icon
            className={cn(
              "h-4 w-4 transition-colors",
              isActive
                ? "text-blue-600"
                : "text-muted-foreground group-hover:text-foreground"
            )}
          />
          <span className="flex-1">{item.title}</span>
          {item.badge && (
            <span className="ml-auto rounded-full bg-blue-100 dark:bg-blue-900/30 px-2 py-0.5 text-[10px] font-semibold text-blue-600 dark:text-blue-400">
              {item.badge}
            </span>
          )}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("token");
    router.push("/auth/login");
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      {/* Header */}
      <SidebarHeader className="border-b border-sidebar-border">
        <Logo />
      </SidebarHeader>

      {/* Main Content */}
      <SidebarContent>
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-[11px] uppercase tracking-wider text-muted-foreground/70 font-semibold">
            Main Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <NavItem
                  key={item.href}
                  item={item}
                  isActive={
                    pathname === item.href ||
                    pathname.startsWith(item.href + "/")
                  }
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Secondary Navigation */}
        {/* <SidebarGroup>
                    <SidebarGroupLabel className="text-[11px] uppercase tracking-wider text-muted-foreground/70 font-semibold">
                        System
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {secondaryNavItems.map((item) => (
                                <NavItem
                                    key={item.href}
                                    item={item}
                                    isActive={pathname === item.href}
                                />
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup> */}
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="border-t border-sidebar-border">
        {/* <UserProfile /> */}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Logout"
              className="cursor-pointer text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
