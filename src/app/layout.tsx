import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { TableProvider } from "@/context/TableContext";
import ThemeToggle from "@/components/ThemeToggle";
import { DataProvider } from "@/context/DataContext";
import ModeToggle from "@/components/ModeToggle";
import DummyDataFetchButton from "@/components/DummyDataFetchButton";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Front End Engineer - Zach",
  description: "First Task",
  icons: {
    icon: "/Z_Logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/Z_Logo.svg" type="image/x-icon" />
      </Head>
      <body className={inter.className}>
        <ThemeProvider>
          <DataProvider>
            <TableProvider>{children}</TableProvider>
            <ThemeToggle />
            <ModeToggle />
            <DummyDataFetchButton />
          </DataProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
