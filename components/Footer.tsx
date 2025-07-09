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
            <Link href="/Privacy" className="hover:underline hover:text-[#eb262c] transition">Kebijakan Privasi</Link>
          </div>
        </motion.div>

        {/* Mitra Industri */}
        <motion.div
          className="mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-center text-sm font-semibold mb-6 uppercase tracking-widest text-[#0c229f]">
            Mitra Industri
          </h3>
          <div className="flex justify-center flex-wrap gap-6">
            {[
              ["eurekabook", "Eureka Bookhouse"],
              ["jajaid", "Jaja.id"],
              ["jajato", "Jajato"],
              ["masterdis", "Master Diskon"],
              ["rajacepat", "Raja Cepat"],
              ["katarasa", "Katarasa"]
            ].map(([src, alt], i) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="w-20 h-20 bg-blue-900 rounded-full flex items-center justify-center shadow-md hover:scale-105 transition-transform"
              >
                <Image
                  src={`/images/${src}.png`}
                  alt={alt}
                  width={40}
                  height={40}
                  className="object-contain rounded-full"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </footer>
  )
}
