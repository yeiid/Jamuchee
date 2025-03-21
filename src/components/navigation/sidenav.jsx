"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import Card from "../common/Card";

const links = [
  { name: "INICIO", href: "/", icon: "" },
  { name: "PRODUCTOS", href: "/features/products/", icon: "v" },
  { name: "NOSOTROS", href: "/features/about", icon: "v" },
  { name: "ESPECIES", href: "/features/specie", icon: "v" },
  { name: "CONTACTO", href: "/features/contact", icon: "v" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="flex items-center">
            <Image
              src="/favicon.ico"
              alt="Logo"
              width={40}
              height={40}
              className="mr-2"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition duration-300"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center">
            <Card />
            <button
              onClick={handleToggleMenu}
              className="p-2 ml-4 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition duration-300 md:hidden"
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
