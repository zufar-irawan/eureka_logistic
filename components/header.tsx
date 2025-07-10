'use client';
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md p-4 flex items-center justify-between">

            {/* Logo */}
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
                <Link className="text-gray-500 hover:text-blue-600" href="/#beranda">Beranda</Link>
                <Link className="text-gray-500 hover:text-blue-600" href="/#project">Service</Link>
                <Link className="text-gray-500 hover:text-blue-600" href="/#alamat">Kontak</Link>
                <Link className="text-gray-500 hover:text-blue-600" href="/#branch">Cabang</Link>
                <Link className="text-gray-500 hover:text-blue-600" href="/#operasional">Operasional</Link>
                <Link className="text-gray-500 hover:text-blue-600" href="/Privacy">Privacy</Link>
            </nav>

            <div className="md:hidden">
                <button onClick={toggleMenu} className="text-3xl text-blue-600">
                    {isOpen ? <HiX /> : <HiMenu />}
                </button>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="absolute top-full left-0 w-full bg-white shadow-md md:hidden"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex flex-col items-center gap-4 py-4">
                            <Link className="text-gray-500 hover:text-blue-600" href="/#beranda" onClick={toggleMenu}>Beranda</Link>
                            <Link className="text-gray-500 hover:text-blue-600" href="/#project" onClick={toggleMenu}>Service</Link>
                            <Link className="text-gray-500 hover:text-blue-600" href="/#alamat" onClick={toggleMenu}>Kontak</Link>
                            <Link className="text-gray-500 hover:text-blue-600" href="/#branch" onClick={toggleMenu}>Cabang</Link>
                            <Link className="text-gray-500 hover:text-blue-600" href="/#operasional" onClick={toggleMenu}>Operasional</Link>
                            <Link className="text-gray-500 hover:text-blue-600" href="/Privacy" onClick={toggleMenu}>Privacy</Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;
