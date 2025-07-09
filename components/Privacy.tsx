'use client'

import { motion } from 'framer-motion'
import React from 'react'

const sections = [
  {
    title: 'PENDAHULUAN',
    content: `Selamat datang di platform Eureka Logistics, Kebijakan Privasi ini ("Kebijakan Privasi" atau "Kebijakan") dirancang untuk membantu Anda memahami bagaimana kami mengumpulkan, menggunakan, mengungkapkan dan/atau mengolah data pribadi yang telah Anda percayakan kepada kami dan/atau kami miliki tentang Anda, baik di masa sekarang maupun di masa mendatang, serta untuk membantu Anda membuat keputusan yang tepat sebelum memberikan data pribadi Anda kepada kami. Silakan baca Kebijakan Privasi ini dengan cermat. Apabila Anda memiliki pertanyaan tentang informasi ini atau praktik privasi kami, silakan lihat bagian yang berjudul "Pertanyaan, Masalah atau Keluhan? Hubungi Kami" di akhir Kebijakan Privasi ini.

"Data Pribadi" berarti data, baik benar maupun tidak, tentang individu yang dapat diidentifikasi dari data tersebut, atau dari data dan informasi lainnya yang dapat atau kemungkinan dapat diakses oleh suatu organisasi.

Dengan menggunakan Layanan, mendaftarkan akun pada kami, mengunjungi situs web kami, atau mengakses Layanan, Anda mengakui dan setuju bahwa Anda menerima praktik, persyaratan, dan/atau kebijakan yang diuraikan dalam Kebijakan Privasi ini, dan Anda dengan ini mengizinkan kami untuk mengumpulkan, menggunakan, mengungkapkan dan/atau mengolah data pribadi Anda seperti yang dijelaskan di sini.`
  },
  {
    title: 'KAPAN EUREKA LOGISTICS MENGUMPULKAN DATA PRIBADI?',
    content: `Kami akan/mungkin mengumpulkan data pribadi Anda:
- saat Anda mendaftar dan/atau menggunakan Layanan atau Situs kami
- saat Anda mengirimkan formulir
- saat Anda menggunakan layanan elektronik kami
- saat Anda mengirimkan data pribadi Anda kepada kami
- saat Anda menyampaikan kritik, saran atau keluhan
- saat Anda mendaftar untuk suatu kontes

Kami juga dapat mengumpulkan informasi tertentu secara otomatis atau pasif menggunakan teknologi seperti cookies atau GPS.`
  },
  {
    title: 'DATA PRIBADI APA YANG AKAN DIKUMPULKAN OLEH EUREKA LOGISTICS?',
    content: `Data pribadi yang mungkin dikumpulkan Eureka Logistics termasuk tetapi tidak terbatas pada:
- nama;
- alamat email;
- nomor telepon;
- tanggal lahir;
- jenis kelamin;
- alamat tagihan;
- rekening bank dan informasi pembayaran;
- serta informasi penggunaan layanan.`
  },
  {
    title: 'MEMBUAT AKUN',
    content: `Untuk menggunakan fungsi tertentu dari Layanan, Anda harus membuat akun pengguna. Kami akan meminta nama, email, nomor telepon, dan data relevan lainnya untuk keperluan keamanan dan verifikasi akun.`
  },
  {
    title: 'COOKIES',
    content: `Kami menggunakan cookies untuk meningkatkan pengalaman pengguna, melacak penggunaan layanan, dan menyimpan preferensi pengguna. Cookies dapat dikaitkan dengan data pribadi untuk keperluan analitik dan personalisasi.`
  },
  {
    title: 'BAGAIMANA KAMI MENGGUNAKAN INFORMASI YANG ANDA BERIKAN KEPADA KAMI?',
    content: `Kami menggunakan data pribadi Anda untuk:
- mengelola akun dan layanan
- mengirim pembaruan dan dukungan
- menyelesaikan transaksi
- memberikan konten yang relevan
- menganalisis penggunaan layanan
- mencegah penipuan
- serta untuk tujuan lain yang diberitahukan pada Anda saat pengumpulan.`
  },
  {
    title: 'BAGAIMANA EUREKA LOGISTICS MELINDUNGI INFORMASI PELANGGAN?',
    content: `Kami menggunakan berbagai langkah pengamanan teknis dan administratif untuk menjaga keamanan data pribadi Anda. Akses hanya diberikan kepada pihak yang berwenang dan informasi akan tetap disimpan meski layanan dihentikan, sesuai hukum yang berlaku.`
  },
  {
    title: 'AKSES LOKASI',
    content: `Aplikasi ini mengumpulkan data lokasi, termasuk saat berjalan di latar belakang, untuk mendukung proses pengiriman real-time. Anda dapat mencabut izin lokasi kapan saja, namun ini dapat memengaruhi kinerja aplikasi.`
  },
  {
    title: 'PENAFIAN TENTANG KEAMANAN DAN SITUS PIHAK KETIGA',
    content: `Kami tidak menjamin keamanan data pada situs pihak ketiga. Situs kami dapat menautkan ke pihak luar dengan kebijakan privasi berbeda. Penggunaan layanan pihak ketiga dilakukan dengan risiko Anda sendiri.`
  },
  {
    title: 'BAGAIMANA ANDA DAPAT MEMILIH KELUAR, MENGHAPUS, MEMINTA AKSES ATAU MENGUBAH INFORMASI YANG TELAH ANDA BERIKAN KEPADA KAMI?',
    content: `Anda dapat memilih keluar, mengakses, memperbaiki atau menghapus data pribadi Anda dengan menghubungi info@eurekalogistics.co.id. Kami akan merespons dalam waktu yang wajar, sesuai prosedur hukum yang berlaku.`
  },
  {
    title: 'PERTANYAAN, MASALAH ATAU KELUHAN? HUBUNGI KAMI',
    content: `Silakan hubungi kami melalui email di info@eurekalogistics.co.id jika Anda memiliki pertanyaan, masalah, atau keluhan tentang kebijakan privasi ini.`
  }
]

export default function Privacy() {
  return (
    <main className="bg-white text-[#0c229f] py-20 px-6 sm:px-12 lg:px-32">
      <motion.h1
        className="text-center text-3xl sm:text-4xl font-bold text-[#0c229f] mb-12"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        KEBIJAKAN PRIVASI
      </motion.h1>

      {sections.map((section, index) => (
        <motion.section
          key={index}
          className="mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
        >
          <h2 className="text-xl sm:text-2xl font-semibold mb-3">{section.title}</h2>
          <p className="text-sm sm:text-base leading-relaxed whitespace-pre-line text-justify">
            {section.content}
          </p>
        </motion.section>
      ))}
    </main>
  )
}
