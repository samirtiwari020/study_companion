import { LayoutDashboard, BookOpen, MessageSquare, User } from "lucide-react";
import { NavLink } from "@/components/NavLink";

const items = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Practice", url: "/practice", icon: BookOpen },
  { title: "AI Solver", url: "/ai-solver", icon: MessageSquare },
  { title: "Profile", url: "/profile", icon: User },
];

export function MobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-xl border-t border-border md:hidden">
      <div className="flex items-center justify-around h-16">
        {items.map((item) => (
          <NavLink
            key={item.title}
            to={item.url}
            end={item.url === "/"}
            className="flex flex-col items-center gap-1 text-muted-foreground transition-colors"
            activeClassName="text-primary"
          >
            <item.icon className="h-5 w-5" />
            <span className="text-[10px] font-medium">{item.title}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
