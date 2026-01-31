import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getDashboardLayout, saveDashboardLayout, getStats, DEFAULT_LAYOUT } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";

export function useDashboard() {
    const { toast } = useToast();
    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: ["dashboard"],
        queryFn: getDashboardLayout,
    });

    const saveMutation = useMutation({
        mutationFn: saveDashboardLayout,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["dashboard"] });
            toast({ title: "Dashboard saved", description: "Your layout preferences have been updated." });
        },
        onError: () => {
            toast({ title: "Error", description: "Failed to save dashboard layout.", variant: "destructive" });
        }
    });

    return {
        layout: query.data?.layout || DEFAULT_LAYOUT,
        isLoading: query.isLoading,
        saveLayout: saveMutation.mutate,
        isSaving: saveMutation.isPending
    };
}

export function useStats() {
    return useQuery({
        queryKey: ["stats"],
        queryFn: getStats,
    });
}
