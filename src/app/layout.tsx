"use client";

import "./globals.css";
import { usePathname, redirect } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import Providers from "./provider";
import NavBar from "./components/nav-bar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  if (pathname === "/") {
    redirect("/login");
  }

  const hideNav = pathname === "/login";

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          {!hideNav && <NavBar />}
          {children}
        </Providers>
      </body>
    </html>
  );
}
