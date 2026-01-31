import { useState, useEffect } from "react";
import { Sidebar, MobileHeader } from "@/components/Sidebar";
import { StatsWidget } from "@/components/StatsWidget";
import { TasksChartWidget } from "@/components/TasksChartWidget";
import { TeamPerformanceWidget } from "@/components/TeamPerformanceWidget";
import { UpcomingDeadlinesWidget } from "@/components/UpcomingDeadlinesWidget";
import { RecentActivityWidget } from "@/components/RecentActivityWidget";
import { useDashboard } from "@/hooks/use-dashboard";
import { Button } from "@/components/ui/button";
import { LayoutGrid, Save, GripHorizontal } from "lucide-react";

import { Responsive, useContainerWidth } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const WIDGETS = {
    "stats-overview": StatsWidget,
    "tasks-chart": TasksChartWidget,
    "team-perf": TeamPerformanceWidget,
    "recent-activities": RecentActivityWidget,
    "deadlines": UpcomingDeadlinesWidget,
};

export default function Dashboard() {
    const { layout: initialLayout, saveLayout, isSaving } = useDashboard();
    const [layout, setLayout] = useState(initialLayout);
    const [isDraggable, setIsDraggable] = useState(false);

    // RGL v2 Hooks
    const { width, containerRef, mounted } = useContainerWidth();

    // Sync state if initial layout changes
    useEffect(() => {
        if (initialLayout && initialLayout.length > 0) {
            setLayout(initialLayout);
        }
    }, [initialLayout]);

    const onLayoutChange = (currentLayout) => {
        setLayout(currentLayout);
    };

    const handleSave = () => {
        saveLayout(layout);
        setIsDraggable(false);
    };

    return (
        <div className="flex min-h-screen bg-background text-foreground font-sans">
            <Sidebar />
            <div className="flex-1 flex flex-col md:ml-64 relative">
                <MobileHeader />

                <main className="flex-1 p-4 md:p-8 overflow-y-auto">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                            <p className="text-muted-foreground mt-1">
                                Overview of your team's performance and projects.
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            {isDraggable ? (
                                <Button onClick={handleSave} disabled={isSaving} className="gap-2">
                                    <Save className="w-4 h-4" />
                                    {isSaving ? "Saving..." : "Save Layout"}
                                </Button>
                            ) : (
                                <Button variant="outline" onClick={() => setIsDraggable(true)} className="gap-2">
                                    <LayoutGrid className="w-4 h-4" />
                                    Customize Layout
                                </Button>
                            )}
                        </div>
                    </div>

                    <div ref={containerRef} className="min-h-[500px]">
                        {mounted && (
                            <Responsive
                                className="layout"
                                layouts={{
                                    lg: layout,
                                    md: layout,
                                    sm: layout.map(item => ({
                                        ...item,
                                        h: item.i === 'stats-overview' ? 4 : item.h
                                    })),
                                    xs: (() => {
                                        let currentY = 0;
                                        return [...layout]
                                            .sort((a, b) => (a.y - b.y) || (a.x - b.x))
                                            .map(item => {
                                                const height = item.i === 'stats-overview' ? 9 : item.h;
                                                const newItem = {
                                                    ...item,
                                                    w: 1,
                                                    x: 0,
                                                    y: currentY,
                                                    h: height
                                                };
                                                currentY += height;
                                                return newItem;
                                            });
                                    })()
                                }}
                                breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                                cols={{ lg: 4, md: 4, sm: 2, xs: 1, xxs: 1 }}
                                rowHeight={50}
                                width={width}
                                isDraggable={isDraggable}
                                isResizable={isDraggable}
                                onLayoutChange={onLayoutChange}
                                margin={[24, 24]}
                                containerPadding={[0, 0]}
                            >
                                {layout.map((item) => {
                                    const Component = WIDGETS[item.i];
                                    return (
                                        <div key={item.i} className="bg-transparent h-full">
                                            {Component ? (
                                                <div className="h-full relative group">
                                                    {isDraggable && (
                                                        <div className="absolute inset-0 z-50 pointer-events-none rounded-xl border-2 border-primary border-dashed bg-primary/5 transition-all duration-200">
                                                            <div className="absolute top-2 right-2 p-1 rounded-md bg-background shadow-sm border border-border">
                                                                <GripHorizontal className="w-4 h-4 text-primary" />
                                                            </div>
                                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                                <div className="bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-border">
                                                                    <span className="text-xs font-medium text-foreground flex items-center gap-2">
                                                                        <GripHorizontal className="w-3 h-3" />
                                                                        Drag to Move
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                    <Component />
                                                </div>
                                            ) : (
                                                <div className="flex items-center justify-center h-full border rounded-xl bg-card text-muted-foreground">
                                                    Unknown Widget: {item.i}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </Responsive>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}
