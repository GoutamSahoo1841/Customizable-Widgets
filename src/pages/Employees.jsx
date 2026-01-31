import { Sidebar, MobileHeader } from "@/components/Sidebar";
import { useEmployees } from "@/hooks/use-employees";
import { CreateEmployeeDialog } from "@/components/CreateEmployeeDialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, MoreVertical, Mail, Phone } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function Employees() {
    const { employees, isLoading, updateEmployee } = useEmployees();
    const [search, setSearch] = useState("");

    const filtered = employees.filter(emp =>
        emp.name.toLowerCase().includes(search.toLowerCase()) ||
        emp.role.toLowerCase().includes(search.toLowerCase()) ||
        emp.team.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="flex min-h-screen bg-background">
            <Sidebar />
            <div className="flex-1 flex flex-col md:ml-64">
                <MobileHeader />

                <main className="flex-1 p-4 md:p-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight">Employees</h2>
                            <p className="text-muted-foreground mt-1">
                                Manage your team members and their roles.
                            </p>
                        </div>
                        <CreateEmployeeDialog />
                    </div>

                    <div className="flex items-center gap-4 mb-6">
                        <div className="relative flex-1 max-w-sm">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder="Search employees..."
                                className="pl-10"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3, 4, 5, 6].map(i => <Skeleton key={i} className="h-40 rounded-xl" />)}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filtered.map((emp) => (
                                <Card key={emp.id} className="hover:shadow-md transition-all duration-200 border-border/60">
                                    <CardContent className="p-6">
                                        <div className="flex justify-between items-start">
                                            <div className="flex gap-4">
                                                <Avatar className="w-12 h-12 border-2 border-background shadow-sm">
                                                    <AvatarImage src={emp.avatarUrl || undefined} />
                                                    <AvatarFallback className="bg-primary/10 text-primary font-bold">
                                                        {emp.name.substring(0, 2).toUpperCase()}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <h3 className="font-semibold text-lg leading-tight">{emp.name}</h3>
                                                    <p className="text-sm text-muted-foreground">{emp.role}</p>
                                                </div>
                                            </div>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <MoreVertical className="w-4 h-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem>View Profile</DropdownMenuItem>

                                                    {/* Edit logic using reused dialog */}
                                                    <div onSelect={(e) => e.preventDefault()} className="relative flex cursor-default select-none items-center rounded-sm text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                                                        <CreateEmployeeDialog
                                                            employee={emp}
                                                            trigger={
                                                                <span className="px-2 py-1.5 w-full cursor-pointer block">Edit Details</span>
                                                            }
                                                        />
                                                    </div>

                                                    <DropdownMenuItem
                                                        onSelect={() => updateEmployee({ id: emp.id, status: emp.status === 'Active' ? 'On-leave' : 'Active' })}
                                                        className={emp.status === 'Active' ? "text-amber-600" : "text-green-600"}
                                                    >
                                                        {emp.status === 'Active' ? 'Mark as On Leave' : 'Mark as Active'}
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>

                                        <div className="mt-4 flex flex-wrap gap-2">
                                            <Badge variant="secondary" className="font-normal">{emp.team}</Badge>
                                            <Badge
                                                variant="outline"
                                                className={
                                                    emp.status === 'Active'
                                                        ? 'text-green-600 border-green-200 bg-green-50'
                                                        : 'text-amber-600 border-amber-200 bg-amber-50'
                                                }
                                            >
                                                {emp.status}
                                            </Badge>
                                        </div>

                                        <div className="mt-6 flex gap-2 pt-4 border-t border-border/50">
                                            <Button variant="outline" size="sm" className="flex-1 gap-2 text-xs h-8">
                                                <Mail className="w-3.5 h-3.5" /> Email
                                            </Button>
                                            <Button variant="outline" size="sm" className="flex-1 gap-2 text-xs h-8">
                                                <Phone className="w-3.5 h-3.5" /> Call
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
