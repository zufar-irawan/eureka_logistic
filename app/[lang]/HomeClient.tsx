"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Header from "@/components/header";
import Footer from "@/components/Footer";
import ServiceCards from "@/components/services";
import TransportCards from "@/components/Transport";
import "remixicon/fonts/remixicon.css";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import CtaSection from "@/components/CtaSection";
import WhyChooseUs from "@/components/ChooseSection";
import HeroSection from "@/components/HeroSection";
import BranchSlider, { BranchHero } from "@/components/BranchSlider";
import i18n from "@/app/i18n/client";
import { useTranslation } from "react-i18next";
import Operational from "@/components/Operasional";

export default function HomeClient({ lang }: { lang: string }) {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isIntroDone, setIsIntroDone] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    AOS.init({ once: true, duration: 1000, easing: "ease-in-out-cubic" });

    if (lang && i18n.language !== lang) {
      i18n.changeLanguage(lang);
      localStorage.setItem("bahasa", lang);
    }

    const introTimeout = setTimeout(() => setIsIntroDone(true), 2200);
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearTimeout(introTimeout);
      clearInterval(timeInterval);
    };
  }, [lang]);

  const isOpen = () => {
    const day = currentTime.getDay();
    const hour = currentTime.getHours();
    const minute = currentTime.getMinutes();
    const time = hour + minute / 60;
    if (day === 6) return time >= 8 && time <= 15;
    return day >= 1 && day <= 5 && time >= 8 && time <= 17;
  };

  const localizedHref = (path: string) => `/${lang}${path}`;

  return (
    <>
      <AnimatePresence>
        {!isIntroDone && (
          <motion.div
            className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1, transition: { duration: 1 } }}
              className="flex flex-col items-center"
            >
              <motion.div
                initial={{ rotateY: 0 }}
                animate={{ rotateY: 360, transition: { duration: 1.5, ease: "easeInOut" } }}
              >
                <Image
                  src="/logo.png"
                  alt="Eureka Logo"
                  width={150}
                  height={150}
                  className="mb-4"
                />
              </motion.div>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1, transition: { duration: 0.8, delay: 0.3 } }}
                className="text-2xl font-semibold text-[#2A388A]"
              >
                Welcome to Eureka Logistic
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Header />

      <main className="font-montserrat">
        <section id="Beranda" className="relative w-full">
          <HeroSection />
        </section>

        <section id="WhyChoose" className="relative w-full">
          <WhyChooseUs />
        </section>

        <section
          id="Services"
          className="relative w-full py-20 bg-gradient-to-br from-slate-50 to-blue-50 overflow-hidden"
        >
          <div className="container mx-auto px-6">
            <TransportCards />
          </div>
        </section>

        <section id="Products" className="relative w-full">
          <ServiceCards />
        </section>

       {/* ============ OPERATIONAL SECTION ============ */}
       <section id="Operasional">
        <Operational lang={lang} />
       </section>

        <section id="Cabang" className="relative w-full">
          <BranchHero />
          <BranchSlider />
        </section>

        <section id="Cta">
          <CtaSection />
        </section>
      </main>

      <Footer />
    </>
  );
}
