
export let employees = [
    { id: 1, name: "Alice Johnson", role: "Frontend Developer", team: "Engineering", status: "Active", avatarUrl: null },
    { id: 2, name: "Bob Smith", role: "Backend Developer", team: "Engineering", status: "Active", avatarUrl: null },
    { id: 3, name: "Charlie Brown", role: "UI Designer", team: "Design", status: "Active", avatarUrl: null },
    { id: 4, name: "Diana Prince", role: "Product Manager", team: "Product", status: "On-leave", avatarUrl: null },
    { id: 5, name: "Evan Wright", role: "Marketing Specialist", team: "Marketing", status: "Active", avatarUrl: null },
];

export let tasks = [
    { id: 1, title: "Implement Dashboard", status: "In-progress", priority: "high", assignedToId: 1, deadline: new Date(Date.now() + 86400000 * 2).toISOString() },
    { id: 2, title: "Design System Updates", status: "Completed", priority: "medium", assignedToId: 3, deadline: new Date(Date.now() - 86400000).toISOString() },
    { id: 3, title: "API Integration", status: "Pending", priority: "high", assignedToId: 2, deadline: new Date(Date.now() + 86400000 * 5).toISOString() },
    { id: 4, title: "User Research", status: "In-progress", priority: "medium", assignedToId: 4, deadline: new Date(Date.now() + 86400000 * 3).toISOString() },
    { id: 5, title: "Q3 Marketing Campaign", status: "Pending", priority: "low", assignedToId: 5, deadline: new Date(Date.now() + 86400000 * 10).toISOString() },
];

export const DEFAULT_LAYOUT = [
    { i: "stats-overview", type: "stats", title: "Overview", w: 4, h: 2, x: 0, y: 0, minW: 4, minH: 2 },
    { i: "tasks-chart", type: "chart", title: "Task Distribution", w: 2, h: 7, x: 0, y: 2, minW: 2, minH: 6 },
    { i: "team-perf", type: "chart", title: "Team Performance", w: 2, h: 7, x: 2, y: 2, minW: 2, minH: 6 },
    { i: "recent-activities", type: "list", title: "Recent Activity", w: 2, h: 7, x: 0, y: 9, minW: 2, minH: 4 },
    { i: "deadlines", type: "table", title: "Upcoming Deadlines", w: 2, h: 7, x: 2, y: 9, minW: 2, minH: 4 },
];

let dashboardLayout = DEFAULT_LAYOUT;

export const getEmployees = () => Promise.resolve([...employees]);

export const createEmployee = (data) => {
    const newEmp = { id: Date.now(), ...data };
    employees = [...employees, newEmp];
    return Promise.resolve(newEmp);
};

export const updateEmployee = (id, updates) => {
    employees = employees.map(e => e.id === id ? { ...e, ...updates } : e);
    return Promise.resolve(employees.find(e => e.id === id));
};

export const getTasks = () => Promise.resolve([...tasks]);

export const createTask = (data) => {
    const newTask = { id: Date.now(), ...data };
    tasks = [...tasks, newTask];
    return Promise.resolve(newTask);
};

export const updateTask = (id, updates) => {
    tasks = tasks.map(t => t.id === id ? { ...t, ...updates } : t);
    return Promise.resolve(tasks.find(t => t.id === id));
};

export const deleteTask = (id) => {
    tasks = tasks.filter(t => t.id !== id);
    return Promise.resolve({ success: true });
};

export const getStats = () => {
    const totalEmployees = employees.length;
    // Hardcoded stats for visual demo as per user request
    const completedTasks = 40;
    const pendingTasks = 35;
    const inProgressTasks = 25;
    const onLeaveEmployees = employees.filter(e => e.status === "On-leave").length;

    // Recent activities (mock logic) - Keep this dynamic to support the Add/Delete Task feature
    const recentActivities = tasks.slice(0, 5).map(t => ({
        id: t.id,
        description: `Task "${t.title}" is ${t.status}`,
        time: "2h ago"
    }));

    // tasksByTeam - Hardcoded for visual demo
    // We'll mimic the request: Engineering, Design, Product, Marketing
    const tasksByTeam = [
        { team: "Engineering", count: 8, completed: 7 },
        { team: "Design", count: 6, completed: 4 },
        { team: "Product", count: 3, completed: 2 },
        { team: "Marketing", count: 2, completed: 1 }
    ];

    return Promise.resolve({
        totalEmployees,
        completedTasks,
        pendingTasks,
        inProgressTasks,
        onLeaveEmployees,
        tasksByTeam,
        recentActivities
    });
};

export const getDashboardLayout = () => Promise.resolve({ layout: dashboardLayout });

export const saveDashboardLayout = (layout) => {
    dashboardLayout = layout;
    return Promise.resolve({ success: true });
};
