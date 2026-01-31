import { Sidebar, MobileHeader } from "@/components/Sidebar";
import { useTasks } from "@/hooks/use-tasks";
import { CreateTaskDialog } from "@/components/CreateTaskDialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { format } from "date-fns";
import { Calendar, Clock, CheckCircle2, Circle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function Tasks() {
    const { tasks, isLoading } = useTasks();

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return 'text-red-500 bg-red-50 border-red-200';
            case 'medium': return 'text-amber-500 bg-amber-50 border-amber-200';
            default: return 'text-blue-500 bg-blue-50 border-blue-200';
        }
    };

    const TaskCard = ({ task }) => (
        <Card className="hover:shadow-md transition-all duration-200 group border-l-4 border-l-transparent hover:border-l-primary">
            <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="p-2 rounded-full bg-muted text-muted-foreground">
                    {task.status === 'Completed' ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Circle className="w-5 h-5" />}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold truncate">{task.title}</h4>
                        <Badge variant="outline" className={`capitalize text-xs font-normal border ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                        </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            Created {format(new Date(task.createdAt || new Date()), 'MMM d')}
                        </span>
                        {task.deadline && (
                            <span className="flex items-center gap-1 text-amber-600">
                                <Clock className="w-3.5 h-3.5" />
                                Due {format(new Date(task.deadline), 'MMM d')}
                            </span>
                        )}
                    </div>
                </div>
                <div className="flex items-center gap-3 pl-0 sm:pl-4 sm:border-l sm:border-border">
                    {task.assignedToName ? (
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground hidden sm:inline-block">Assigned to</span>
                            <div className="flex items-center gap-2">
                                <Avatar className="w-8 h-8">
                                    <AvatarFallback className="text-xs bg-primary/10 text-primary">
                                        {task.assignedToName.substring(0, 2).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <span className="text-sm font-medium sm:hidden">{task.assignedToName}</span>
                            </div>
                        </div>
                    ) : (
                        <Badge variant="outline" className="border-dashed text-muted-foreground">Unassigned</Badge>
                    )}
                    <Badge className="capitalize ml-auto sm:ml-0" variant={task.status === 'Completed' ? 'secondary' : 'default'}>
                        {task.status}
                    </Badge>
                </div>
            </CardContent>
        </Card>
    );

    return (
        <div className="flex min-h-screen bg-background">
            <Sidebar />
            <div className="flex-1 flex flex-col md:ml-64">
                <MobileHeader />

                <main className="flex-1 p-4 md:p-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight">Tasks</h2>
                            <p className="text-muted-foreground mt-1">
                                Track project progress and assignments.
                            </p>
                        </div>
                        <CreateTaskDialog />
                    </div>

                    {isLoading ? (
                        <div className="space-y-4">
                            {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-24 w-full rounded-xl" />)}
                        </div>
                    ) : (
                        <Tabs defaultValue="all" className="w-full">
                            <TabsList className="mb-6">
                                <TabsTrigger value="all">All Tasks</TabsTrigger>
                                <TabsTrigger value="pending">Pending</TabsTrigger>
                                <TabsTrigger value="inprogress">In Progress</TabsTrigger>
                                <TabsTrigger value="completed">Completed</TabsTrigger>
                            </TabsList>

                            <TabsContent value="all" className="space-y-4">
                                {tasks.map(task => <TaskCard key={task.id} task={task} />)}
                            </TabsContent>
                            <TabsContent value="pending" className="space-y-4">
                                {tasks.filter(t => t.status === 'Pending').map(task => <TaskCard key={task.id} task={task} />)}
                            </TabsContent>
                            <TabsContent value="inprogress" className="space-y-4">
                                {tasks.filter(t => t.status === 'In-progress').map(task => <TaskCard key={task.id} task={task} />)}
                            </TabsContent>
                            <TabsContent value="completed" className="space-y-4">
                                {tasks.filter(t => t.status === 'Completed').map(task => <TaskCard key={task.id} task={task} />)}
                            </TabsContent>
                        </Tabs>
                    )}
                </main>
            </div>
        </div>
    );
}
