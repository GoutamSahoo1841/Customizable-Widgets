import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getEmployees, createEmployee } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";

export function useEmployees() {
    const { toast } = useToast();
    const queryClient = useQueryClient();

    const list = useQuery({
        queryKey: ["employees"],
        queryFn: getEmployees,
    });

    const create = useMutation({
        mutationFn: createEmployee,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["employees"] });
            queryClient.invalidateQueries({ queryKey: ["stats"] }); // Update stats on employee change
            toast({ title: "Success", description: "Employee added successfully." });
        },
        onError: (error) => {
            toast({ title: "Error", description: error.message, variant: "destructive" });
        }
    });

    return {
        employees: list.data || [],
        isLoading: list.isLoading,
        createEmployee: create.mutate,
        isCreating: create.isPending
    };
}
