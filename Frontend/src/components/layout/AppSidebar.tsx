import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  CalendarClock,
  BarChart3,
  MessageSquare,
  FileText,
  Trophy,
  Settings,
  Brain,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";

const mainItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Study Planner", url: "/planner", icon: CalendarClock },
  { title: "Practice", url: "/practice", icon: BookOpen },
  { title: "Revision", url: "/revision", icon: GraduationCap },
];

const toolItems = [
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "AI Solver", url: "/ai-solver", icon: MessageSquare },
  { title: "Notes", url: "/notes", icon: FileText },
  { title: "Gamification", url: "/gamification", icon: Trophy },
];

const settingsItems = [
  { title: "Profile & Settings", url: "/profile", icon: Settings },
];

function NavGroup({ label, items, collapsed }: { label: string; items: typeof mainItems; collapsed: boolean }) {
  const location = useLocation();
  return (
    <SidebarGroup>
      {!collapsed && <SidebarGroupLabel className="text-muted-foreground/70 text-xs uppercase tracking-wider">{label}</SidebarGroupLabel>}
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <NavLink
                  to={item.url}
                  end={item.url === "/"}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors duration-200"
                  activeClassName="bg-sidebar-accent text-primary font-medium"
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  {!collapsed && <span>{item.title}</span>}
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center shrink-0">
            <Brain className="h-4 w-4 text-primary-foreground" />
          </div>
          {!collapsed && (
            <span className="font-bold text-lg gradient-text">NeuroPrep</span>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavGroup label="Learn" items={mainItems} collapsed={collapsed} />
        <NavGroup label="Tools" items={toolItems} collapsed={collapsed} />
        <NavGroup label="Account" items={settingsItems} collapsed={collapsed} />
      </SidebarContent>
    </Sidebar>
  );
}
