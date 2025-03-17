"use client";

import React, { useState, useEffect } from "react";
import PageLayout from "@/components/page-layout";
import { useLanguage } from "@/contexts/language-context";
import { motion } from "framer-motion";
import {
  Droplet,
  Leaf,
  Calendar,
  BrainCircuit,
  BarChart4,
  AlertCircle,
  AlertTriangle,
  InfoIcon,
  Zap,
  ThermometerSun,
  Gauge,
  Ghost,
  ArrowRight,
  Bot,
  Lightbulb
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import HydroponicsVisualization from "@/components/hydroponics-3d-model";

// Demo system health data
const systemHealthData = {
  waterReservoir: {
    level: 65,
    status: "normal", // normal, warning, critical
    timeRemaining: "5 days",
  },
  nutrientLevel: {
    level: 82,
    status: "normal",
    recipe: "Bloom Mix v3",
  },
  nextHarvest: {
    days: 14,
    status: "normal",
    plants: ["Basil", "Lettuce", "Kale"],
  },
};

// Demo quick stats data
const quickStatsData = [
  {
    name: "pH",
    value: 6.2,
    unit: "",
    status: "normal",
    icon: <Droplet className="h-5 w-5" />,
    min: 5.5,
    max: 6.5,
    target: 6.0
  },
  {
    name: "EC",
    value: 1.8,
    unit: "mS/cm",
    status: "normal",
    icon: <Zap className="h-5 w-5" />,
    min: 1.2,
    max: 2.4,
    target: 1.8
  },
  {
    name: "Temperature",
    value: 24.5,
    unit: "°C",
    status: "normal",
    icon: <ThermometerSun className="h-5 w-5" />,
    min: 18,
    max: 28,
    target: 24
  },
  {
    name: "Humidity",
    value: 70,
    unit: "%",
    status: "warning",
    icon: <Droplet className="h-5 w-5 fill-current" />,
    min: 40,
    max: 65,
    target: 60
  },
  {
    name: "Light Intensity",
    value: 550,
    unit: "PPFD",
    status: "normal",
    icon: <Lightbulb className="h-5 w-5" />,
    min: 350,
    max: 650,
    target: 550
  }
];

// AI recommendations demo data
const aiRecommendationsData = [
  {
    title: "Decrease humidity by 10%",
    description: "Current humidity of 70% is above optimal range for your plants.",
    status: "warning",
    icon: <Droplet className="h-5 w-5 fill-current" />,
  },
  {
    title: "Add calcium supplement",
    description: "Leaf analysis indicates early calcium deficiency in tomato plants.",
    status: "info",
    icon: <Leaf className="h-5 w-5" />,
  },
  {
    title: "Increase light duration",
    description: "For better flowering, extend light duration by 1 hour.",
    status: "info",
    icon: <Lightbulb className="h-5 w-5" />,
  },
  {
    title: "System maintenance required",
    description: "pH sensor requires calibration. Last calibration: 30 days ago.",
    status: "alert",
    icon: <Gauge className="h-5 w-5" />,
  },
];

export default function HomePage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("24h");
  const [hydrate, setHydrate] = useState(false);

  useEffect(() => {
    setHydrate(true);
  }, []);

  if (!hydrate) {
    return null;
  }

  // Function to get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal":
        return "text-green-500";
      case "warning":
        return "text-amber-500";
      case "critical":
      case "alert":
        return "text-red-500";
      case "info":
        return "text-blue-500";
      default:
        return "text-muted-foreground";
    }
  };

  // Function to get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "normal":
        return <InfoIcon className="h-4 w-4 text-green-500" />;
      case "warning":
        return <AlertCircle className="h-4 w-4 text-amber-500" />;
      case "critical":
      case "alert":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "info":
        return <InfoIcon className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left side content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            <Badge className="w-fit" variant="outline">
              Powered by DuinoChems AI
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              {t("home.title")}
            </h1>
            <p className="text-xl text-muted-foreground">
              {t("home.subtitle")}
            </p>
            <div className="flex flex-wrap gap-4 mt-4">
              <Button size="lg" className="gap-2">
                Get Started
                <ArrowRight size={16} />
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </motion.div>

          {/* Right side 3D visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-muted rounded-xl h-[400px] relative overflow-hidden glassmorphism"
          >
            <HydroponicsVisualization />
          </motion.div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="py-8">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">{t("home.quickStats")}</h2>
            <Tabs defaultValue="24h" className="w-[240px]">
              <TabsList>
                <TabsTrigger value="24h" onClick={() => setActiveTab("24h")}>24h</TabsTrigger>
                <TabsTrigger value="7d" onClick={() => setActiveTab("7d")}>7d</TabsTrigger>
                <TabsTrigger value="30d" onClick={() => setActiveTab("30d")}>30d</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {quickStatsData.map((stat, index) => (
              <Card key={index} className={cn("transition-all",
                  stat.status === "warning" ? "border-amber-500/50" :
                  stat.status === "critical" ? "border-red-500/50" : "")}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      {stat.icon}
                      <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
                    </div>
                    {getStatusIcon(stat.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline">
                    <span className={`text-2xl font-bold ${getStatusColor(stat.status)}`}>
                      {stat.value}
                    </span>
                    <span className="text-sm text-muted-foreground ml-1">{stat.unit}</span>
                  </div>
                  <div className="mt-3 space-y-1">
                    <div className="flex justify-between text-xs mb-1">
                      <span>{stat.min}</span>
                      <span>{stat.max}</span>
                    </div>
                    <div className="relative h-1.5 w-full bg-muted rounded-full overflow-hidden">
                      <div
                        className={`absolute h-full ${
                          stat.status === "normal" ? "bg-green-500" :
                          stat.status === "warning" ? "bg-amber-500" : "bg-red-500"
                        }`}
                        style={{
                          width: `${((stat.value - stat.min) / (stat.max - stat.min)) * 100}%`,
                        }}
                      />
                      <div
                        className="absolute h-full w-0.5 bg-foreground/30"
                        style={{
                          left: `${((stat.target - stat.min) / (stat.max - stat.min)) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    {t("home.viewDetails")}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* System Health Summary */}
      <section className="py-8">
        <h2 className="text-2xl font-bold mb-6">System Health Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Water Reservoir Card */}
          <Card className={cn(
            systemHealthData.waterReservoir.status === "warning" ? "border-amber-500/50" :
            systemHealthData.waterReservoir.status === "critical" ? "border-red-500/50" : ""
          )}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex items-center gap-2">
                <Droplet className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg font-medium">{t("home.waterReservoir")}</CardTitle>
              </div>
              {getStatusIcon(systemHealthData.waterReservoir.status)}
            </CardHeader>
            <CardContent className="py-4">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-4xl font-bold">{systemHealthData.waterReservoir.level}%</span>
                  <span className="text-sm text-muted-foreground">
                    Time remaining: {systemHealthData.waterReservoir.timeRemaining}
                  </span>
                </div>
                <Progress value={systemHealthData.waterReservoir.level} className="h-2" />
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="default" className="w-full">
                {t("home.refillNow")}
              </Button>
            </CardFooter>
          </Card>

          {/* Nutrient Level Card */}
          <Card className={cn(
            systemHealthData.nutrientLevel.status === "warning" ? "border-amber-500/50" :
            systemHealthData.nutrientLevel.status === "critical" ? "border-red-500/50" : ""
          )}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex items-center gap-2">
                <Leaf className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg font-medium">{t("home.nutrientLevel")}</CardTitle>
              </div>
              {getStatusIcon(systemHealthData.nutrientLevel.status)}
            </CardHeader>
            <CardContent className="py-4">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-4xl font-bold">{systemHealthData.nutrientLevel.level}%</span>
                  <span className="text-sm text-muted-foreground">
                    Recipe: {systemHealthData.nutrientLevel.recipe}
                  </span>
                </div>
                <Progress value={systemHealthData.nutrientLevel.level} className="h-2" />
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="default" className="w-full">
                {t("home.adjustRecipe")}
              </Button>
            </CardFooter>
          </Card>

          {/* Next Harvest Card */}
          <Card className={cn(
            systemHealthData.nextHarvest.status === "warning" ? "border-amber-500/50" :
            systemHealthData.nextHarvest.status === "critical" ? "border-red-500/50" : ""
          )}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg font-medium">{t("home.nextHarvest")}</CardTitle>
              </div>
              {getStatusIcon(systemHealthData.nextHarvest.status)}
            </CardHeader>
            <CardContent className="py-4">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-4xl font-bold">{systemHealthData.nextHarvest.days}</span>
                  <span className="text-sm text-muted-foreground">days remaining</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {systemHealthData.nextHarvest.plants.map((plant, index) => (
                    <Badge key={index} variant="secondary">
                      {plant}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="default" className="w-full">
                {t("home.trackGrowth")}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* AI Recommendations Panel */}
      <section className="py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <BrainCircuit className="h-6 w-6 text-primary" />
            {t("home.aiRecommendations")}
          </h2>
          <Button variant="outline" size="sm" className="gap-2">
            <Bot size={16} />
            Ask DuinoChems
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {aiRecommendationsData.map((rec, index) => (
            <Card
              key={index}
              className={cn(
                "transition-all border-l-4",
                rec.status === "warning" ? "border-l-amber-500" :
                rec.status === "alert" ? "border-l-red-500" :
                rec.status === "info" ? "border-l-blue-500" :
                "border-l-green-500"
              )}
            >
              <CardContent className="py-4">
                <div className="flex gap-3">
                  <div className={cn(
                    "mt-1 p-2 rounded-full",
                    rec.status === "warning" ? "bg-amber-100 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400" :
                    rec.status === "alert" ? "bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400" :
                    rec.status === "info" ? "bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400" :
                    "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400"
                  )}>
                    {rec.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{rec.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{rec.description}</p>
                  </div>
                  <div className="flex flex-col justify-center gap-2">
                    <Button size="sm">
                      {t("home.applyNow")}
                    </Button>
                    <Button size="sm" variant="ghost">
                      {t("home.dismiss")}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
