"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/theme-context";
import { LanguageProvider } from "@/contexts/language-context";
import { Toaster } from "sonner";
import { Suspense } from "react";
import { LoadingScreen } from "@/components/loading-screen";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>chemsControll - Smart Hydroponics Dashboard</title>
        <meta name="description" content="Advanced IoT hydroponics dashboard powered by DuinoChems AI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <LanguageProvider>
            <Suspense fallback={<LoadingScreen />}>
              {children}
              <Toaster position="top-right" closeButton />
            </Suspense>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
