import { Sidebar, MobileHeader } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function Settings() {
    return (
        <div className="flex min-h-screen bg-background">
            <Sidebar />
            <div className="flex-1 flex flex-col md:ml-64">
                <MobileHeader />

                <main className="flex-1 p-4 md:p-8 max-w-4xl">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
                        <p className="text-muted-foreground mt-1">
                            Manage your workspace preferences.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Appearance</CardTitle>
                                <CardDescription>Customize the look and feel of the dashboard.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Dark Mode</Label>
                                        <p className="text-sm text-muted-foreground">Enable dark theme for low-light environments.</p>
                                    </div>
                                    <Switch />
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Compact Mode</Label>
                                        <p className="text-sm text-muted-foreground">Reduce whitespace in lists and tables.</p>
                                    </div>
                                    <Switch />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Notifications</CardTitle>
                                <CardDescription>Configure how you receive alerts.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Email Notifications</Label>
                                        <p className="text-sm text-muted-foreground">Receive daily digests and major alerts.</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Task Updates</Label>
                                        <p className="text-sm text-muted-foreground">Get notified when task status changes.</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Workspace Profile</CardTitle>
                                <CardDescription>Update your company details.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="companyName">Company Name</Label>
                                    <Input id="companyName" defaultValue="Acme Corp" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="adminEmail">Admin Email</Label>
                                    <Input id="adminEmail" defaultValue="admin@acme.com" />
                                </div>
                                <div className="pt-2">
                                    <Button>Save Changes</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>
        </div>
    );
}
