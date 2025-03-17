"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import PageLayout from "@/components/page-layout";
import { useLanguage, supportedLanguages } from "@/contexts/language-context";
import { useTheme } from "@/contexts/theme-context";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Moon, Sun, Palette, Globe, Bell, Shield, Users, Key } from "lucide-react";

export default function SettingsPage() {
  const { t, language, setLanguage } = useLanguage();
  const { theme, setTheme, customColor, setCustomColor } = useTheme();

  // Sample notification settings
  const [emailNotifications, setEmailNotifications] = React.useState(true);
  const [pushNotifications, setPushNotifications] = React.useState(true);
  const [soundAlerts, setSoundAlerts] = React.useState(false);

  return (
    <PageLayout>
      <div className="py-10">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h1 className="text-4xl font-bold mb-2">{t("settings.title")}</h1>
          <p className="text-muted-foreground max-w-3xl">
            Customize your chemsControll experience with theme preferences, language options, and notification settings.
          </p>
        </motion.div>

        {/* Settings Tabs */}
        <Tabs defaultValue="appearance" className="mt-6">
          <TabsList className="grid grid-cols-3 w-full max-w-md mb-8">
            <TabsTrigger value="appearance" className="flex items-center gap-2">
              <Palette size={16} />
              {t("settings.appearance")}
            </TabsTrigger>
            <TabsTrigger value="language" className="flex items-center gap-2">
              <Globe size={16} />
              {t("settings.language")}
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell size={16} />
              {t("settings.notifications")}
            </TabsTrigger>
          </TabsList>

          {/* Appearance Tab */}
          <TabsContent value="appearance">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t("settings.themeMode")}</CardTitle>
                  <CardDescription>Choose between light, dark, or system theme</CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    defaultValue={theme}
                    onValueChange={(value) => setTheme(value as "light" | "dark" | "system")}
                    className="flex flex-col gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="light" id="light" />
                      <Label htmlFor="light" className="flex items-center gap-2 cursor-pointer">
                        <Sun size={18} />
                        Light
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="dark" id="dark" />
                      <Label htmlFor="dark" className="flex items-center gap-2 cursor-pointer">
                        <Moon size={18} />
                        Dark
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="system" id="system" />
                      <Label htmlFor="system" className="cursor-pointer">System</Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t("settings.customColor")}</CardTitle>
                  <CardDescription>Choose your preferred accent color</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    {(["green", "blue", "purple", "orange", "red"] as const).map((color) => (
                      <Button
                        key={color}
                        variant={customColor === color ? "default" : "outline"}
                        className="h-24 w-full flex flex-col items-center justify-center gap-2"
                        onClick={() => setCustomColor(color)}
                        style={{
                          backgroundColor: customColor === color ? `var(--primary)` : "",
                          color: customColor === color ? "white" : ""
                        }}
                      >
                        <div
                          className="w-8 h-8 rounded-full"
                          style={{ backgroundColor: `var(--theme-${color}-primary)` }}
                        />
                        <span className="capitalize">{color}</span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Language Tab */}
          <TabsContent value="language">
            <Card>
              <CardHeader>
                <CardTitle>{t("settings.language")}</CardTitle>
                <CardDescription>Select your preferred language</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {supportedLanguages.map((lang) => (
                    <Button
                      key={lang.code}
                      variant={language === lang.code ? "default" : "outline"}
                      className="h-16 w-full flex items-center justify-center gap-2"
                      onClick={() => setLanguage(lang.code as any)}
                      style={{
                        backgroundColor: language === lang.code ? `var(--primary)` : "",
                        color: language === lang.code ? "white" : ""
                      }}
                    >
                      <span className="text-xl">{lang.flag}</span>
                      <span>{lang.name}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>{t("settings.notifications")}</CardTitle>
                <CardDescription>Manage how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Email Notifications</h3>
                    <p className="text-sm text-muted-foreground">Receive system alerts via email</p>
                  </div>
                  <Switch
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Push Notifications</h3>
                    <p className="text-sm text-muted-foreground">Receive browser notifications</p>
                  </div>
                  <Switch
                    checked={pushNotifications}
                    onCheckedChange={setPushNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Sound Alerts</h3>
                    <p className="text-sm text-muted-foreground">Play sounds for critical alerts</p>
                  </div>
                  <Switch
                    checked={soundAlerts}
                    onCheckedChange={setSoundAlerts}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Additional Settings (Visual Only) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield size={18} />
                {t("settings.securityCenter")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Manage your account security settings and two-factor authentication.
              </p>
              <Button variant="outline" className="w-full">Manage Security</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users size={18} />
                {t("settings.userManagement")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Invite team members and manage access permissions.
              </p>
              <Button variant="outline" className="w-full">Manage Users</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key size={18} />
                API Access
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Generate and manage API keys for integration with external systems.
              </p>
              <Button variant="outline" className="w-full">Manage API Keys</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
}
