"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useRouter, usePathname } from "next/navigation";
import i18n from "@/app/i18n/client";

export default function Footer() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const router = useRouter();
  const footerData = t("footer", { returnObjects: true }) as {
    company: {
      name: string;
      copyright: string;
      privacyPolicy: string;
    };
    industryPartners: {
      title: string;
      partners: Array<{ name: string; alt: string }>;
    };
  };

  const localizedHref = (href: string) => {
    if (href.startsWith("#")) return href;
    return `/${i18n.language}${href}`;
  };
  // Tambahkan link dan src gambar berdasarkan nama mitra
  const partnersWithAssets = footerData.industryPartners.partners.map(
    (partner) => {
      let src = "";
      let link = "#";

      switch (partner.name) {
        case "Eureka Bookhouse":
          src = "eurekabook";
          link = "https://eurekabookhouse.com/";
          break;
        case "Jaja.id":
          src = "jajaid";
          link = "https://jaja.id/";
          break;
        case "Jajato":
          src = "jajato";
          link = "https://auto.jaja.id/";
          break;
        case "Master Diskon":
          src = "masterdis";
          link = "https://masterdiskon.com/id-id";
          break;
        case "Raja Cepat":
          src = "rajacepat";
          link = "https://rajacepat.com/";
          break;
        case "Katarasa":
          src = "katarasa";
          link = "https://sandbox.katarasa.id/home";
          break;
        default:
          src = "default";
      }

      return { ...partner, src, link };
    }
  );

  return (
    <footer className="relative overflow-hidden py-12">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/blue.png"
          alt="Footer Background"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-blue-800/50"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-10 md:p-16 max-w-7xl mx-auto relative z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <motion.div
            className="flex justify-center md:justify-start"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Image
              src="/logo.png"
              alt="Eureka Logistics Logo"
              width={160}
              height={45}
              className="hover:scale-105 transition-transform duration-300"
            />
          </motion.div>

          <div className="flex flex-col items-center space-y-2">
            <motion.p
              className="font-semibold tracking-wide uppercase text-base mb-1"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              {footerData.company.name}
            </motion.p>

            <motion.p
              className="text-sm opacity-80"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              {footerData.company.copyright}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Link
                href={localizedHref("/privacy")}
                className="hover:underline hover:text-[#eb262c] transition-colors duration-300 underline-offset-4 text-sm"
              >
                {footerData.company.privacyPolicy}
              </Link>
            </motion.div>
          </div>

          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.h3
              className="text-sm font-semibold mb-3 uppercase tracking-widest text-[#0c229f] text-center"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              {footerData.industryPartners.title}
            </motion.h3>

            <div className="grid grid-cols-3 gap-3 justify-items-center">
              {partnersWithAssets.map(({ name, alt, src, link }, i) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -3, scale: 1.05 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 10,
                    delay: i * 0.1,
                  }}
                  className="w-14 h-14 md:w-16 md:h-16 bg-[#2A388A] rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all p-1 border border-gray-100"
                >
                  <Link
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-full flex items-center justify-center"
                  >
                    <Image
                      src={`/images/${src}.png`}
                      alt={alt}
                      width={32}
                      height={32}
                      className="object-contain rounded-full hover:opacity-80 transition-opacity"
                    />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </footer>
  );
}
