"use client";
import { useState } from "react";
import Link from "next/link";
import Image from 'next/image';
import { Menu, X, } from 'lucide-react';
import Card from "./Card";

const links = [
  { name: "INICIO", href: "/ui/", icon: "" },
  { name: "PRODUCTOS", href: "/ui/products/", icon: "v" },
  { name: "NOSOTROS", href: "/ui/about", icon: "v" },
  { name: "ESPECIES", href: "/ui/specie", icon: "v" },
  { name: "CONTACTO", href: "/ui/contact", icon: "v" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleToggleCart = () => {
    setCartOpen(!isCartOpen);
  };

  return (
    <header className="bg-gray-50 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link href="/ui/" className="flex items-center">
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
                className="text-gray-600 hover:text-blue-600 transition duration-300"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center">

            <Card/>
            <button
              onClick={handleToggleMenu}
              className="p-2 ml-4 text-gray-600 hover:text-blue-600 transition duration-300 md:hidden"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block py-2 text-gray-600 hover:text-blue-600 transition duration-300"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        )}
      </div>

      {/* Cart Component (placeholder) */}
      {isCartOpen && (
        <div className="fixed top-0 right-0 h-full w-64 bg-white shadow-lg p-4 z-50">
          <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>
          
        </div>
      )}
    </header>
  );
}