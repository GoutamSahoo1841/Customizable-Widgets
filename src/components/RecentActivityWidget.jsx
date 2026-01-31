import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStats } from "@/hooks/use-dashboard";
import { useTasks } from "@/hooks/use-tasks";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Trash2, Plus } from "lucide-react";
import { CreateTaskDialog } from "@/components/CreateTaskDialog";

export function RecentActivityWidget() {
    const { data: stats, isLoading } = useStats();
    const { deleteTask } = useTasks();

    if (isLoading) return <Skeleton className="w-full h-full rounded-2xl min-h-[300px]" />;
    if (!stats) return null;

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this task?")) {
            deleteTask(id);
        }
    };

    return (
        <Card className="h-full flex flex-col shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-6">
                <CardTitle>Recent Activity</CardTitle>
                <CreateTaskDialog
                    trigger={
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Plus className="h-4 w-4" />
                        </Button>
                    }
                />
            </CardHeader>
            <CardContent className="flex-1 overflow-auto">
                <div className="space-y-4">
                    {stats.recentActivities.map(activity => (
                        <div key={activity.id} className="flex gap-4 group items-center justify-between">
                            <div className="flex gap-4 items-center">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs shrink-0">
                                    AD
                                </div>
                                <div>
                                    <p className="text-sm font-medium">{activity.description}</p>
                                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10"
                                onClick={() => handleDelete(activity.id)}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
