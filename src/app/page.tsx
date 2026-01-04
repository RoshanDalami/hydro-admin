"use client";

import {
  BarChart3,
  Users,
  FileText,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Calendar,
  Activity,
  Zap,
  DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/reusable/PageHeader";
// Stat Card Component
function StatCard({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  iconBg,
}: {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative";
  icon: React.ElementType;
  iconBg: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card p-6 shadow-sm hover:shadow-md transition-all duration-300 group">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-transparent via-transparent to-muted/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold tracking-tight text-foreground">
            {value}
          </p>
          <div className="flex items-center gap-1.5">
            {changeType === "positive" ? (
              <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-500">
                <ArrowUpRight className="h-4 w-4" />
                <span className="text-sm font-medium">{change}</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 text-red-600 dark:text-red-500">
                <ArrowDownRight className="h-4 w-4" />
                <span className="text-sm font-medium">{change}</span>
              </div>
            )}
            <span className="text-xs text-muted-foreground">vs last month</span>
          </div>
        </div>
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconBg} shadow-lg`}
        >
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );
}

// Quick Action Card
function QuickActionCard({
  title,
  description,
  icon: Icon,
  color,
}: {
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
}) {
  return (
    <div className="group cursor-pointer rounded-xl border border-border/50 bg-card p-4 hover:border-border hover:shadow-md transition-all duration-300">
      <div className="flex items-center gap-4">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-lg ${color}`}
        >
          <Icon className="h-5 w-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
            {title}
          </p>
          <p className="text-sm text-muted-foreground truncate">
            {description}
          </p>
        </div>
        <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
      </div>
    </div>
  );
}

// Activity Item
function ActivityItem({
  title,
  description,
  time,
  avatar,
}: {
  title: string;
  description: string;
  time: string;
  avatar: string;
}) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm shadow-md flex-shrink-0">
        {avatar}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-foreground">{title}</p>
        <p className="text-sm text-muted-foreground truncate">{description}</p>
      </div>
      <span className="text-xs text-muted-foreground whitespace-nowrap">
        {time}
      </span>
    </div>
  );
}

export default function Home() {
  const stats = [
    {
      title: "Total Revenue",
      value: "रू 12.4M",
      change: "+12.5%",
      changeType: "positive" as const,
      icon: DollarSign,
      iconBg: "bg-gradient-to-br from-emerald-500 to-green-600",
    },
    {
      title: "Active Users",
      value: "8,249",
      change: "+18.2%",
      changeType: "positive" as const,
      icon: Users,
      iconBg: "bg-gradient-to-br from-blue-500 to-indigo-600",
    },
    {
      title: "Energy Output",
      value: "245 MW",
      change: "-2.4%",
      changeType: "negative" as const,
      icon: Zap,
      iconBg: "bg-gradient-to-br from-amber-500 to-orange-600",
    },
    {
      title: "Documents",
      value: "1,429",
      change: "+8.1%",
      changeType: "positive" as const,
      icon: FileText,
      iconBg: "bg-gradient-to-br from-violet-500 to-purple-600",
    },
  ];

  const quickActions = [
    {
      title: "Create Report",
      description: "Generate new analytics report",
      icon: BarChart3,
      color: "bg-gradient-to-br from-blue-500 to-indigo-600",
    },
    {
      title: "Add User",
      description: "Invite new team member",
      icon: Users,
      color: "bg-gradient-to-br from-emerald-500 to-green-600",
    },
    {
      title: "Schedule Meeting",
      description: "Plan upcoming session",
      icon: Calendar,
      color: "bg-gradient-to-br from-violet-500 to-purple-600",
    },
    {
      title: "View Activity",
      description: "Check system logs",
      icon: Activity,
      color: "bg-gradient-to-br from-amber-500 to-orange-600",
    },
  ];

  const activities = [
    {
      title: "New user registered",
      description: "John Doe joined the platform",
      time: "2 min ago",
      avatar: "JD",
    },
    {
      title: "Report generated",
      description: "Monthly revenue report is ready",
      time: "15 min ago",
      avatar: "SY",
    },
    {
      title: "System update",
      description: "Platform updated to v2.4.0",
      time: "1 hour ago",
      avatar: "AD",
    },
    {
      title: "New project created",
      description: "Hydropower Plant Phase II",
      time: "3 hours ago",
      avatar: "RK",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <PageHeader
          title="Dashboard"
          description="Welcome back! Here's an overview of your platform."
        />

        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            <span className="hidden sm:inline">Last 30 days</span>
          </Button>
          <Button className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all">
            <TrendingUp className="h-4 w-4" />
            <span>View Reports</span>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Quick Actions */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">
              Quick Actions
            </h2>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground"
            >
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {quickActions.map((action) => (
              <QuickActionCard key={action.title} {...action} />
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">
              Recent Activity
            </h2>
            <Button
              variant="ghost"
              size="sm"
              className="text-blue-600 hover:text-blue-700"
            >
              View all
            </Button>
          </div>
          <div className="rounded-2xl border border-border/50 bg-card overflow-hidden">
            <div className="divide-y divide-border/50">
              {activities.map((activity, index) => (
                <ActivityItem key={index} {...activity} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
