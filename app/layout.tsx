import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Work_Sans } from "next/font/google";
import { Header } from "@/components/Header";

const fontWorkSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-work-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TenTwenty Task",
  description: "A simple task to test your skills",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(fontWorkSans.variable, "antialiased")}>
        <Header />
        {children}
      </body>
    </html>
  );
}
