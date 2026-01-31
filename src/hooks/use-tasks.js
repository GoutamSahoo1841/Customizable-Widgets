import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTasks, createTask } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";

export function useTasks() {
    const { toast } = useToast();
    const queryClient = useQueryClient();

    const list = useQuery({
        queryKey: ["tasks"],
        queryFn: getTasks,
    });

    const create = useMutation({
        mutationFn: createTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
            queryClient.invalidateQueries({ queryKey: ["stats"] }); // Update dashboard stats too
            toast({ title: "Success", description: "Task created successfully." });
        },
        onError: (error) => {
            toast({ title: "Error", description: error.message, variant: "destructive" });
        }
    });

    return {
        tasks: list.data || [],
        isLoading: list.isLoading,
        createTask: create.mutate,
        isCreating: create.isPending,
        updateTask: useMutation({
            mutationFn: ({ id, ...updates }) => import("@/lib/data").then(m => m.updateTask(id, updates)),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["tasks"] });
                queryClient.invalidateQueries({ queryKey: ["stats"] });
                toast({ title: "Updated", description: "Task updated successfully." });
            }
        }).mutate,
        deleteTask: useMutation({
            mutationFn: (id) => import("@/lib/data").then(m => m.deleteTask(id)),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["tasks"] });
                queryClient.invalidateQueries({ queryKey: ["stats"] });
                toast({ title: "Deleted", description: "Task deleted successfully." });
            }
        }).mutate
    };
}
