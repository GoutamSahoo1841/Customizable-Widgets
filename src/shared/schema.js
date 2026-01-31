import { z } from "zod";

export const insertTaskSchema = z.object({
    title: z.string().min(1, "Title is required"),
    status: z.enum(["Pending", "In-progress", "Completed"]),
    priority: z.enum(["low", "medium", "high"]),
    assignedToId: z.number().optional().nullable(),
    deadline: z.string().optional(),
});

export const insertEmployeeSchema = z.object({
    name: z.string().min(1, "Name is required"),
    role: z.string().min(1, "Role is required"),
    team: z.string(),
    status: z.string(),
    avatarUrl: z.string().optional(),
});
