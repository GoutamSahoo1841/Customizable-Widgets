export const api = {
    employees: {
        list: {
            path: "/api/employees",
            responses: { 200: { parse: (data) => data } },
        },
        create: {
            path: "/api/employees",
            responses: { 201: { parse: (data) => data } },
        },
    },
    tasks: {
        list: {
            path: "/api/tasks",
            responses: { 200: { parse: (data) => data } },
        },
        create: {
            path: "/api/tasks",
            responses: { 201: { parse: (data) => data } },
        },
    },
    stats: {
        get: {
            path: "/api/stats",
            responses: { 200: { parse: (data) => data } },
        },
    },
    dashboard: {
        get: {
            path: "/api/dashboard/:userId",
            responses: { 200: { parse: (data) => data } },
        },
        save: {
            path: "/api/dashboard/save",
            responses: { 200: { parse: (data) => data } },
        },
    },
}
