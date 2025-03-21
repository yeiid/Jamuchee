import { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidevar from "@/components/navigation/sidenav";
import ScrollToTopButton from "@/components/common/Scroll";
import { ThemeProvider } from "@/context/ThemeContext";
import ThemeToggle from "@/components/common/ThemeToggle";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "JAMUCHEE - Tu Tienda Online",
  description:
    "La mejor experiencia de compra online con productos de alta calidad",
  keywords: ["ecommerce", "tienda online", "productos", "compras"],
  authors: [{ name: "JAMUCHEE Team" }],
  creator: "JAMUCHEE",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={inter.variable}>
      <body className={inter.className}>
        <ThemeProvider>
          <header className="sticky top-0 z-50">
            <Sidevar />
          </header>
          <main className="min-h-screen">{children}</main>
          <footer className="bg-gray-800 text-white p-6 mt-8 dark:bg-gray-900">
            <div className="container mx-auto">
              <p className="text-center">
                © {new Date().getFullYear()} JAMUCHEE - Todos los derechos
                reservados
              </p>
            </div>
          </footer>
          <ScrollToTopButton />
          <ThemeToggle />
        </ThemeProvider>
      </body>
    </html>
  );
}
