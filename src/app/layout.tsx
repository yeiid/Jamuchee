import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidevar from "@/components/sidenav";
import { CartProvider } from "@/context/Contex";
import Head from "next/head";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JAMUCHEE",
  description: "eccomerce",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Head>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <CartProvider>
          <Sidevar />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
