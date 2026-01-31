import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/Dashboard";
import Employees from "@/pages/Employees";
import Tasks from "@/pages/Tasks";
import Settings from "@/pages/Settings";

function Router() {
    return (
        <Switch>
            <Route path="/" component={Dashboard} />
            <Route path="/employees" component={Employees} />
            <Route path="/tasks" component={Tasks} />
            <Route path="/settings" component={Settings} />
            <Route component={NotFound} />
        </Switch>
    );
}

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <TooltipProvider>
                <Toaster />
                <Router />
            </TooltipProvider>
        </QueryClientProvider>
    );
}

export default App;
