import { useState, useEffect } from "react";
import { useStats } from "@/hooks/use-dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit2, Check, X } from "lucide-react";

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))'];

export function TasksChartWidget() {
    const { data: stats, isLoading } = useStats();
    const [isEditing, setIsEditing] = useState(false);
    const [localData, setLocalData] = useState({ completed: 0, inProgress: 0, pending: 0 });

    useEffect(() => {
        if (stats) {
            setLocalData({
                completed: stats.completedTasks,
                inProgress: stats.inProgressTasks,
                pending: stats.pendingTasks
            });
        }
    }, [stats]);

    if (isLoading) return <Skeleton className="w-full h-full rounded-2xl min-h-[300px]" />;
    if (!stats) return null;

    const data = [
        { name: 'Completed', value: localData.completed },
        { name: 'In Progress', value: localData.inProgress },
        { name: 'Pending', value: localData.pending },
    ];

    const handleSave = () => {
        setIsEditing(false);
        // In a real app, we might persist this
    };

    const handleCancel = () => {
        setIsEditing(false);
        setLocalData({
            completed: stats.completedTasks,
            inProgress: stats.inProgressTasks,
            pending: stats.pendingTasks
        });
    };

    return (
        <Card className="h-full flex flex-col shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-medium">Task Status</CardTitle>
                <div className="flex gap-1">
                    {isEditing ? (
                        <>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-green-500" onClick={handleSave}>
                                <Check className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={handleCancel}>
                                <X className="h-4 w-4" />
                            </Button>
                        </>
                    ) : (
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsEditing(true)}>
                            <Edit2 className="h-4 w-4" />
                        </Button>
                    )}
                </div>
            </CardHeader>
            <CardContent className="flex-1 min-h-[250px] relative">
                {isEditing ? (
                    <div className="space-y-4 p-4">
                        <div className="space-y-2">
                            <Label>Completed</Label>
                            <Input
                                type="number"
                                value={localData.completed}
                                onChange={(e) => setLocalData({ ...localData, completed: Number(e.target.value) })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>In Progress</Label>
                            <Input
                                type="number"
                                value={localData.inProgress}
                                onChange={(e) => setLocalData({ ...localData, inProgress: Number(e.target.value) })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Pending</Label>
                            <Input
                                type="number"
                                value={localData.pending}
                                onChange={(e) => setLocalData({ ...localData, pending: Number(e.target.value) })}
                            />
                        </div>
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} strokeWidth={0} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                            />
                            <Legend verticalAlign="bottom" height={36} />
                        </PieChart>
                    </ResponsiveContainer>
                )}
            </CardContent>
        </Card>
    );
}
