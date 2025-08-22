// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Alumni Connect",
  description: "Connect with your college alumni community",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        {/* ✅ Navbar visible on all pages */}
        <Navbar />
        
        <main className="pt-0"> {/* padding so content doesn’t overlap navbar */}
          {children}
        </main>
      </body>
    </html>
  );
}
