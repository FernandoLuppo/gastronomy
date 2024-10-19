import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { La_Belle_Aurore } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";
import { ReduxProvider } from "@/shared/lib/provider";

const laBelleAurore = La_Belle_Aurore({
  subsets: ["latin"],
  weight: "400", // Ajuste o peso se necessário
  variable: "--font-la-belle-aurore"
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head></head>
      <body
        className={`${inter.className} ${laBelleAurore.variable} dark:bg-default-black bg-default-white dark:text-default-white text-default-black`}
      >
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
