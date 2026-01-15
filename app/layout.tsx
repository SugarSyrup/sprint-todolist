import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sprint To-Do List",
  description: "Sprint To-Do List Test Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
