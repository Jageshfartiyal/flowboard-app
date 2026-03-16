"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import TopNav from "@/components/dashboard/TopNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { User, Bell, Shield, Palette, Loader2 } from "lucide-react";
import { useStore } from "@/store/useStore";
import { useTheme } from "next-themes";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const sections = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "appearance", label: "Appearance", icon: Palette },
];

export default function SettingsPage() {
  const { data: session } = useSession();
  const { toast } = useToast();
  const { sidebarCollapsed } = useStore();
  const [activeSection, setActiveSection] = useState("profile");
  const [isSaving, setIsSaving] = useState(false);
  const { theme, setTheme } = useTheme();

  const [profileForm, setProfileForm] = useState({
    name: session?.user?.name ?? "",
    email: session?.user?.email ?? "",
  });

  const [notifications, setNotifications] = useState({
    emailDigest: true,
    taskAssigned: true,
    projectUpdates: false,
    weeklyReport: true,
  });

  const userInitials = session?.user?.name
    ? session.user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "U";

  const handleSaveProfile = async () => {
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    setIsSaving(false);
    toast({ title: "Profile updated", description: "Your changes have been saved.", variant: "success" });
  };

  return (
    <div
      className="transition-all duration-300"
      style={{ paddingLeft: sidebarCollapsed ? "84px" : "256px" }}
    >
      <TopNav title="Settings" description="Manage your account and preferences" />

      <div className="pt-16 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-6">
            {/* Sidebar Navigation */}
            <div className="w-48 shrink-0">
              <nav className="space-y-1">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 text-left ${
                      activeSection === section.id
                        ? "bg-indigo-500/20 text-indigo-300"
                        : "text-muted-foreground hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <section.icon className="w-4 h-4 shrink-0" />
                    {section.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Content */}
            <div className="flex-1">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass rounded-2xl p-6 border border-white/5"
              >
                {activeSection === "profile" && (
                  <div>
                    <h2 className="text-xl font-semibold text-white mb-6">Profile</h2>

                    {/* Avatar */}
                    <div className="flex items-center gap-4 mb-8">
                      <Avatar className="w-20 h-20">
                        <AvatarImage src={session?.user?.image ?? ""} />
                        <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-2xl font-bold">
                          {userInitials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <Button variant="outline" size="sm" className="mb-2">
                          Change Photo
                        </Button>
                        <p className="text-muted-foreground text-xs">
                          JPG, PNG or GIF. Max 2MB.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={profileForm.name}
                          onChange={(e) =>
                            setProfileForm({ ...profileForm, name: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileForm.email}
                          onChange={(e) =>
                            setProfileForm({ ...profileForm, email: e.target.value })
                          }
                        />
                      </div>
                    </div>

                    <div className="mt-6">
                      <Button
                        variant="gradient"
                        onClick={handleSaveProfile}
                        disabled={isSaving}
                      >
                        {isSaving ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          "Save Changes"
                        )}
                      </Button>
                    </div>
                  </div>
                )}

                {activeSection === "notifications" && (
                  <div>
                    <h2 className="text-xl font-semibold text-white mb-6">Notifications</h2>
                    <div className="space-y-6">
                      {[
                        {
                          key: "emailDigest" as const,
                          title: "Daily Email Digest",
                          description: "Get a daily summary of your team's activity",
                        },
                        {
                          key: "taskAssigned" as const,
                          title: "Task Assignments",
                          description: "Notify me when tasks are assigned to me",
                        },
                        {
                          key: "projectUpdates" as const,
                          title: "Project Updates",
                          description: "Get notified on project status changes",
                        },
                        {
                          key: "weeklyReport" as const,
                          title: "Weekly Report",
                          description: "Receive weekly performance reports",
                        },
                      ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between">
                          <div>
                            <p className="text-white font-medium text-sm">{item.title}</p>
                            <p className="text-muted-foreground text-xs mt-0.5">
                              {item.description}
                            </p>
                          </div>
                          <Switch
                            checked={notifications[item.key]}
                            onCheckedChange={(checked) =>
                              setNotifications({ ...notifications, [item.key]: checked })
                            }
                          />
                        </div>
                      ))}
                    </div>
                    <div className="mt-6">
                      <Button
                        variant="gradient"
                        onClick={() =>
                          toast({
                            title: "Saved",
                            description: "Notification preferences updated.",
                            variant: "success",
                          })
                        }
                      >
                        Save Preferences
                      </Button>
                    </div>
                  </div>
                )}

                {activeSection === "security" && (
                  <div>
                    <h2 className="text-xl font-semibold text-white mb-6">Security</h2>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-white font-medium mb-4">Change Password</h3>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label>Current Password</Label>
                            <Input type="password" placeholder="••••••••" />
                          </div>
                          <div className="space-y-2">
                            <Label>New Password</Label>
                            <Input type="password" placeholder="••••••••" />
                          </div>
                          <div className="space-y-2">
                            <Label>Confirm New Password</Label>
                            <Input type="password" placeholder="••••••••" />
                          </div>
                          <Button variant="gradient">Update Password</Button>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="text-white font-medium mb-2">
                          Two-Factor Authentication
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4">
                          Add an extra layer of security to your account
                        </p>
                        <Button variant="outline">Enable 2FA</Button>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="text-red-400 font-medium mb-2">Danger Zone</h3>
                        <p className="text-muted-foreground text-sm mb-4">
                          Once you delete your account, there is no going back.
                        </p>
                        <Button variant="destructive">Delete Account</Button>
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === "appearance" && (
                  <div>
                    <h2 className="text-xl font-semibold text-foreground mb-6">Appearance</h2>
                    <div className="space-y-8">
                      {/* Theme selector */}
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="text-foreground font-medium">Theme</h3>
                            <p className="text-muted-foreground text-sm mt-0.5">
                              Choose between light and dark mode
                            </p>
                          </div>
                          <ThemeToggle />
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                          {[
                            { label: "Dark", value: "dark", preview: "bg-gray-900", dot: "bg-gray-700" },
                            { label: "Light", value: "light", preview: "bg-gray-100", dot: "bg-gray-300" },
                            { label: "System", value: "system", preview: "bg-gradient-to-r from-gray-900 to-gray-100", dot: "bg-gradient-to-r from-gray-700 to-gray-300" },
                          ].map((t) => (
                            <button
                              key={t.value}
                              onClick={() => setTheme(t.value)}
                              className={`p-3 rounded-xl border-2 transition-all text-left ${
                                theme === t.value
                                  ? "border-indigo-500 ring-2 ring-indigo-500/20"
                                  : "border-border hover:border-indigo-500/40"
                              }`}
                            >
                              <div className={`w-full h-10 rounded-lg ${t.preview} mb-2 flex items-end p-1.5 gap-1`}>
                                <div className={`h-2 w-8 rounded ${t.dot} opacity-70`} />
                                <div className={`h-2 w-5 rounded ${t.dot} opacity-50`} />
                              </div>
                              <p className="text-sm font-medium text-foreground">{t.label}</p>
                              {theme === t.value && (
                                <p className="text-xs text-indigo-400 mt-0.5">Active</p>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="text-foreground font-medium mb-1">Accent Color</h3>
                        <p className="text-muted-foreground text-sm mb-4">Personalise your workspace colour</p>
                        <div className="flex gap-3">
                          {["#6366f1","#8b5cf6","#ec4899","#22c55e","#f59e0b","#06b6d4"].map((color) => (
                            <button
                              key={color}
                              className="w-8 h-8 rounded-full hover:scale-110 transition-transform ring-2 ring-offset-2 ring-offset-background ring-transparent hover:ring-white/30"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
