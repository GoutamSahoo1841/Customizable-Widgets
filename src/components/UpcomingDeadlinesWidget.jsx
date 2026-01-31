import { useState } from "react";
import { useTasks } from "@/hooks/use-tasks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { AlertCircle, Edit2, Check, X } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function UpcomingDeadlinesWidget() {
    const { tasks, isLoading, updateTask } = useTasks();
    const [editingId, setEditingId] = useState(null);
    const [editValue, setEditValue] = useState("");

    if (isLoading) return <Skeleton className="w-full h-full rounded-2xl min-h-[300px]" />;

    // Filter pending tasks sorted by deadline
    const upcomingTasks = tasks
        .filter(t => t.status !== 'Completed' && t.deadline)
        .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
        .slice(0, 5);

    const handleEdit = (task) => {
        setEditingId(task.id);
        setEditValue(new Date(task.deadline).toISOString().split('T')[0]);
    };

    const handleSave = (id) => {
        updateTask({ id, deadline: new Date(editValue).toISOString() });
        setEditingId(null);
    };

    const handleCancel = () => {
        setEditingId(null);
        setEditValue("");
    };

    return (
        <Card className="h-full flex flex-col shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-6">
                <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-amber-500" />
                    Upcoming Deadlines
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-auto">
                {upcomingTasks.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                        <p>No pending deadlines</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {upcomingTasks.map(task => (
                            <div key={task.id} className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0 group">
                                <div className="flex-1 mr-4">
                                    <h4 className="font-medium line-clamp-1">{task.title}</h4>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Badge
                                            variant="outline"
                                            className={`text-xs h-5 px-1.5 font-normal capitalize ${task.priority?.toLowerCase() === 'high' ? 'text-red-700 bg-red-100 border-red-200 hover:bg-red-200' :
                                                    task.priority?.toLowerCase() === 'medium' ? 'text-amber-700 bg-amber-100 border-amber-200 hover:bg-amber-200' :
                                                        'text-blue-700 bg-blue-100 border-blue-200 hover:bg-blue-200'
                                                }`}
                                        >
                                            {task.priority}
                                        </Badge>
                                        {task.assignedToName && (
                                            <span className="text-xs text-muted-foreground">{task.assignedToName}</span>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    {editingId === task.id ? (
                                        <div className="flex items-center gap-1">
                                            <Input
                                                type="date"
                                                value={editValue}
                                                onChange={(e) => setEditValue(e.target.value)}
                                                className="h-8 w-[130px]"
                                            />
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-green-500" onClick={() => handleSave(task.id)}>
                                                <Check className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={handleCancel}>
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ) : (
                                        <>
                                            <span className="text-xs font-medium text-destructive whitespace-nowrap">
                                                {format(new Date(task.deadline), 'MMM d')}
                                            </span>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                                                onClick={() => handleEdit(task)}
                                            >
                                                <Edit2 className="h-4 w-4" />
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
