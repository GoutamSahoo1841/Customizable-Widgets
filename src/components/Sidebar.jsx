import { Link, useLocation } from "wouter";
import { LayoutDashboard, Users, CheckSquare, Settings, LogOut, Command } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
    { label: "Dashboard", href: "/", icon: LayoutDashboard },
    { label: "Employees", href: "/employees", icon: Users },
    { label: "Tasks", href: "/tasks", icon: CheckSquare },
    { label: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
    const [location] = useLocation();

    return (
        <aside className="w-64 border-r border-border bg-sidebar hidden md:flex flex-col h-screen fixed left-0 top-0 z-50">
            <div className="p-6 flex items-center gap-3 border-b border-sidebar-border">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Command className="w-6 h-6" />
                </div>
                <div>
                    <h1 className="font-bold text-lg leading-none">AdminOS</h1>
                    <span className="text-xs text-muted-foreground">Workspace v1.0</span>
                </div>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                {NAV_ITEMS.map((item) => {
                    const isActive = location === item.href;
                    return (
                        <Link key={item.href} href={item.href}>
                            <div
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer group",
                                    isActive
                                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                                        : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
                                )}
                            >
                                <item.icon className={cn("w-5 h-5", isActive ? "stroke-[2.5]" : "stroke-2")} />
                                <span className="font-medium">{item.label}</span>
                                {isActive && (
                                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white/50 animate-pulse" />
                                )}
                            </div>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-sidebar-border">
                <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors text-left">
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Sign Out</span>
                </button>
            </div>
        </aside>
    );
}

export function MobileHeader() {
    return (
        <header className="md:hidden h-16 border-b border-border bg-background px-4 flex items-center justify-between sticky top-0 z-40">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <Command className="w-5 h-5" />
                </div>
                <span className="font-bold">AdminOS</span>
            </div>
            <button className="p-2">
                <Users className="w-5 h-5" />
            </button>
        </header>
    );
}
