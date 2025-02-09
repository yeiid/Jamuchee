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
    <header className="bg-gray-50 shadow-md ">
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
                className="text-gray-600 hover:text-blue-600 transition duration-300"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center">
            <Card />
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
    </header>
  );
}
