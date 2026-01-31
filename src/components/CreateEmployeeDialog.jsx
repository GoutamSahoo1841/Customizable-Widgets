import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertEmployeeSchema } from "@shared/schema";
import { useEmployees } from "@/hooks/use-employees";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Plus } from "lucide-react";

export function CreateEmployeeDialog({ employee, trigger }) {
    const [open, setOpen] = useState(false);
    const { createEmployee, updateEmployee, isCreating } = useEmployees();

    const form = useForm({
        resolver: zodResolver(insertEmployeeSchema),
        defaultValues: {
            name: employee?.name || "",
            role: employee?.role || "",
            team: employee?.team || "Engineering",
            status: employee?.status || "Active",
            avatarUrl: employee?.avatarUrl || "",
        },
    });

    // Reset form when employee prop changes or dialog opens
    // We can use a key on the dialog or simple effect.
    // For simplicity, we re-initialize defaultValues when `employee` prop changes if `form` supported it directly,
    // but `useForm` caches defaultValues.
    // So we use reset inside useEffect.
    /* 
       Actually, standard pattern: 
       useEffect(() => {
           if (employee) {
               form.reset({
                   name: employee.name,
                   role: employee.role,
                   team: employee.team,
                   status: employee.status,
                   avatarUrl: employee.avatarUrl || ""
               });
           } else {
               form.reset({
                   name: "",
                   role: "",
                   team: "Engineering",
                   status: "Active",
                   avatarUrl: ""
               });
           }
       }, [employee, form, open]); // open dependence ensures reset on fresh open
    */

    // Better yet, just reset on open change
    const onOpenChange = (isOpen) => {
        setOpen(isOpen);
        if (isOpen) {
            form.reset({
                name: employee?.name || "",
                role: employee?.role || "",
                team: employee?.team || "Engineering",
                status: employee?.status || "Active",
                avatarUrl: employee?.avatarUrl || "",
            });
        }
    }

    const onSubmit = (data) => {
        if (employee) {
            updateEmployee({ id: employee.id, ...data }, {
                onSuccess: () => {
                    setOpen(false);
                }
            });
        } else {
            createEmployee(data, {
                onSuccess: () => {
                    setOpen(false);
                    form.reset();
                },
            });
        }
    };

    const isPending = isCreating; // Add isUpdating logic if exposed, currently assumes isCreating covers loading UI or we ignore update loading state specific var

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                {trigger ? trigger : (
                    <Button className="gap-2 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all">
                        <Plus className="w-4 h-4" />
                        Add Employee
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{employee ? "Edit Employee" : "Add New Employee"}</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="John Doe" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Role</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Frontend Developer" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="team"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Team</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select team" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Engineering">Engineering</SelectItem>
                                                <SelectItem value="Design">Design</SelectItem>
                                                <SelectItem value="Marketing">Marketing</SelectItem>
                                                <SelectItem value="Sales">Sales</SelectItem>
                                                <SelectItem value="Product">Product</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Status</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select status" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Active">Active</SelectItem>
                                                <SelectItem value="On-leave">On-leave</SelectItem>
                                                <SelectItem value="Inactive">Inactive</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter className="pt-4">
                            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isPending}>
                                {isPending ? "Saving..." : (employee ? "Save Changes" : "Create Employee")}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
