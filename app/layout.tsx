import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import ProModal from "@/components/ProModal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Companion AI",
  description:
    "Companion AI is a web app that lets you create and chat with your own AI friend. You can choose from different personalities, interests, and styles for your companion. You can also teach them new things and share your experiences with them. Companion AI is built with Next.js, a React framework that enables fast and easy web development. With Companion AI, you can have a fun and engaging conversation with an AI that learns from you and adapts to your preferences.",
  icons: ["https://th.bing.com/th/id/OIG.qG_zf3Eq6uSYvEZUEAX2?pid=ImgGn"],
  openGraph: {
    images: ["https://th.bing.com/th/id/OIG.qG_zf3Eq6uSYvEZUEAX2?pid=ImgGn"],
    url: "https://ai-companion-kaifcoder.vercel.app/",
    siteName: "Companion AI",
    description:
      "Companion AI is a web app that lets you create and chat with your own AI friend. You can choose from different personalities, interests, and styles for your companion. You can also teach them new things and share your experiences with them. Companion AI is built with Next.js, a React framework that enables fast and easy web development. With Companion AI, you can have a fun and engaging conversation with an AI that learns from you and adapts to your preferences.",
    title: "Companion AI",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={cn("bg-secondary/50", inter.className)}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ProModal />
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
