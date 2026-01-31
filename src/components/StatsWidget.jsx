import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, CheckCircle2, AlertCircle, Clock } from "lucide-react";
import { useStats } from "@/hooks/use-dashboard";
import { Skeleton } from "@/components/ui/skeleton";

function StatItem({ label, value, icon: Icon, color }) {
    return (
        <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 border border-border/50 hover:bg-muted/50 transition-colors">
            <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center text-white shadow-md`}>
                <Icon className="w-6 h-6" />
            </div>
            <div>
                <p className="text-sm font-medium text-muted-foreground">{label}</p>
                <p className="text-2xl font-bold font-display">{value}</p>
            </div>
        </div>
    );
}

export function StatsWidget() {
    const { data: stats, isLoading } = useStats();

    if (isLoading) {
        return <Skeleton className="w-full h-[200px] rounded-2xl" />;
    }

    if (!stats) return null;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 h-full">
            <StatItem
                label="Total Employees"
                value={stats.totalEmployees}
                icon={Users}
                color="bg-blue-500"
            />
            <StatItem
                label="Tasks Completed"
                value={stats.completedTasks}
                icon={CheckCircle2}
                color="bg-green-500"
            />
            <StatItem
                label="Pending Tasks"
                value={stats.pendingTasks}
                icon={Clock}
                color="bg-amber-500"
            />
            <StatItem
                label="On Leave"
                value={stats.onLeaveEmployees}
                icon={AlertCircle}
                color="bg-rose-500"
            />
        </div>
    );
}
