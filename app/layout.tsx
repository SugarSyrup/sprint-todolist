import type { Metadata } from "next";
import localFont from "next/font/local";

import { GNB } from "@/src/components/common/GNB";

import "./globals.css";
import Providers from "./providers";

const nanumsquare = localFont({
  src: [
    {
      path: "../public/fonts/NanumSquareB.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/NanumSquarEB.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/fonts/NanumSquareR.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-nanumsquare",
  display: "swap",
});

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
    <html lang="ko" className={`${nanumsquare.variable}`}>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <body>
        <Providers>
          <GNB />
          {children}
        </Providers>
      </body>
    </html>
  );
}
