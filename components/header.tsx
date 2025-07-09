'use client';
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md p-4 flex items-center justify-between">

      <Link href="#">
        <Image
          src="/images/logo.png"
          alt="Eureka Logistic Logo"
          width={80}
          height={80}
        />
      </Link>

      {/* Desktop Nav */}
      <nav className="hidden md:flex gap-6">
        <Link className="text-gray-500 hover:text-blue-600" href="#">Beranda</Link>
        <Link className="text-gray-500 hover:text-blue-600" href="#">Tentang</Link>
        <Link className="text-gray-500 hover:text-blue-600" href="#">Projek</Link>
        <Link className="text-gray-500 hover:text-blue-600" href="#">Kontak</Link>
        <Link className="text-gray-500 hover:text-blue-600" href="/Privacy">Cabang</Link>
      </nav>

      {/* Mobile Button */}
      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-3xl text-blue-600">
          {isOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md md:hidden">
          <div className="flex flex-col items-center gap-4 py-4">
            <Link className="text-gray-500 hover:text-blue-600" href="#" onClick={toggleMenu}>Beranda</Link>
            <Link className="text-gray-500 hover:text-blue-600" href="#" onClick={toggleMenu}>Tentang</Link>
            <Link className="text-gray-500 hover:text-blue-600" href="#" onClick={toggleMenu}>Projek</Link>
            <Link className="text-gray-500 hover:text-blue-600" href="#" onClick={toggleMenu}>Kontak</Link>
            <Link className="text-gray-500 hover:text-blue-600" href="/Privacy" onClick={toggleMenu}>Cabang</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
