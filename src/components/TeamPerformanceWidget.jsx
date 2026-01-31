import { useState, useEffect } from "react";
import { useStats } from "@/hooks/use-dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit2, Check, X } from "lucide-react";
import { Label } from "@/components/ui/label";

export function TeamPerformanceWidget() {
    const { data: stats, isLoading } = useStats();
    const [isEditing, setIsEditing] = useState(false);
    const [localData, setLocalData] = useState([]);

    useEffect(() => {
        if (stats?.tasksByTeam) {
            setLocalData(stats.tasksByTeam);
        }
    }, [stats]);

    if (isLoading) return <Skeleton className="w-full h-full rounded-2xl min-h-[300px]" />;
    if (!stats) return null;

    const handleSave = () => {
        setIsEditing(false);
        // Persist if needed
    };

    const handleCancel = () => {
        setIsEditing(false);
        setLocalData(stats.tasksByTeam);
    };

    const handleTeamChange = (index, field, value) => {
        const newData = [...localData];
        newData[index] = { ...newData[index], [field]: Number(value) };
        setLocalData(newData);
    };

    return (
        <Card className="h-full flex flex-col shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-medium">Team Workload</CardTitle>
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
            <CardContent className="flex-1 min-h-[250px] overflow-auto">
                {isEditing ? (
                    <div className="space-y-4 p-2">
                        {localData.map((team, index) => (
                            <div key={team.team} className="space-y-2 border-b pb-2 last:border-0">
                                <Label className="font-semibold">{team.team}</Label>
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="space-y-1">
                                        <Label className="text-xs text-muted-foreground">Total</Label>
                                        <Input
                                            type="number"
                                            value={team.count}
                                            onChange={(e) => handleTeamChange(index, 'count', e.target.value)}
                                            className="h-8"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <Label className="text-xs text-muted-foreground">Completed</Label>
                                        <Input
                                            type="number"
                                            value={team.completed}
                                            onChange={(e) => handleTeamChange(index, 'completed', e.target.value)}
                                            className="h-8"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={localData.length > 0 ? localData : stats.tasksByTeam}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                            <XAxis
                                dataKey="team"
                                stroke="hsl(var(--muted-foreground))"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                stroke="hsl(var(--muted-foreground))"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `${value}`}
                            />
                            <Tooltip
                                cursor={{ fill: 'hsl(var(--muted)/0.5)' }}
                                contentStyle={{
                                    borderRadius: '8px',
                                    border: '1px solid hsl(var(--border))',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                                    backgroundColor: 'hsl(var(--card))'
                                }}
                            />
                            <Bar
                                dataKey="count"
                                name="Total Tasks"
                                fill="hsl(var(--chart-1))"
                                radius={[4, 4, 0, 0]}
                                maxBarSize={50}
                            />
                            <Bar
                                dataKey="completed"
                                name="Completed"
                                fill="hsl(var(--chart-2))"
                                radius={[4, 4, 0, 0]}
                                maxBarSize={50}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </CardContent>
        </Card>
    );
}
