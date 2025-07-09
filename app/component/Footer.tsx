'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="bg-[#f4f6ff] text-[#0c229f] relative overflow-hidden px-4 sm:px-8 md:px-20 py-10">
      <div className="max-w-7xl mx-auto">

        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center md:text-left text-sm items-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Logo */}
          <div className="flex justify-center md:justify-start">
            <Image src="/logo.png" alt="Eureka Logistics Logo" width={160} height={45} />
          </div>

          {/* Nama Perusahaan */}
          <p className="font-semibold tracking-wide uppercase">PT. EUREKA LOGISTICS</p>

          {/* Copyright */}
          <p className="text-sm opacity-80">@2006 - Eureka Logistics. All Rights Reserved.</p>

          {/* Kebijakan */}
          <div className="flex justify-center md:justify-end">
            <Link href="#" className="hover:underline hover:text-[#eb262c] transition">Kebijakan Privasi</Link>
          </div>
        </motion.div>

      </div>
    </footer>
  )
}