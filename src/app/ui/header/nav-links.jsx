"use client";
import { useState } from "react";
import Link from "next/link";
const links = [
  { name: "INICIO", href: "/", icon:"" },
  {name: "PRODUCTOS",href: "/ui/products/",icon:""},
  { name: "NOSOTROS", href: "/ui/about",icon:"" },
  { name: "ESPECIES", href: "/ui/specie",icon:"" },
  { name: "CONTACTO", href: "/ui/contact",icon:"" },
];

export default function NavLinks() {
  const [isCartOpen, setCartOpen] = useState(false);
  const handleToggleCart = () => {
    setCartOpen(!isCartOpen);}
  return (
    <>

      {
      links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className=" grid items-center justify-center rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
            //   {
            //     'bg-sky-100 text-blue-600': pathname === link.href,
            //   },
            // }
          >
            <div className="w-6"><i className={LinkIcon} ></i></div>
            <p className="hidden md:block">{link.name}</p>
          </Link>

        );
      })}
    </>
  );
}
