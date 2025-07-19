'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaPhoneAlt, FaEnvelope, FaWhatsapp } from 'react-icons/fa';
import { useSwipeable } from 'react-swipeable';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

// Define proper types for your data structures
interface BranchData {
  id: string;
  title: string;
  address: string;
  tel: string;
  email: string;
  wa: string;
}

interface BranchHeroData {
  badge: string;
  title: string;
  description: string;
  imageAlt: string;
}

export default function BranchSlider() {
  const { t } = useTranslation('common');
  const branchData = t('branchSlider.branches', { returnObjects: true }) as BranchData[];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % branchData.length);
    }, 60000);
    return () => clearInterval(interval);
  }, [branchData.length]);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => setCurrent((prev) => (prev + 1) % branchData.length),
    onSwipedRight: () => setCurrent((prev) => (prev - 1 + branchData.length) % branchData.length),
    preventScrollOnSwipe: true, // Changed from preventDefaultTouchmoveEvent
    trackMouse: true,
  });

  if (!branchData || branchData.length === 0) {
    return <div className="w-full py-14 px-6 text-center">{t('common.loading')}</div>;
  }

  return (
    <div className="w-full py-14 px-6 md:px-10">
      <div
        {...swipeHandlers}
        className="max-w-6xl mx-auto flex flex-col items-center gap-10 touch-pan-x"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={branchData[current].id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
            className="w-full"
          >
            <motion.div
              className="bg-white text-[#2A388A] rounded-3xl p-8 shadow-xl border border-[#d9e2ff] hover:shadow-2xl transition duration-300 w-full"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.h2
                className="text-3xl font-bold mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {t('branchSlider.title')} {branchData[current].title}
              </motion.h2>
              <motion.p
                className="mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {branchData[current].address}
              </motion.p>

              <motion.div
                className="text-sm mt-4 space-y-1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <p className="flex items-center gap-2">
                  <FaPhoneAlt /> {t('branchSlider.contact.tel')} {branchData[current].tel}
                </p>
                <p className="flex items-center gap-2">
                  <FaEnvelope /> {t('branchSlider.contact.email')} {branchData[current].email}
                </p>
                <p className="flex items-center gap-2">
                  <FaWhatsapp /> {t('branchSlider.contact.wa')} {branchData[current].wa}
                </p>
              </motion.div>

              <motion.div
                className="overflow-hidden rounded-xl border mt-6 border-[#cfd6e0] shadow-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <iframe
                  title={`${t('branchSlider.mapTitle')} ${branchData[current].title}`}
                  src={`https://maps.google.com/maps?q=${branchData[current].address}&output=embed`}
                  width="100%"
                  height="350"
                  className="w-full border-none"
                  loading="lazy"
                  allowFullScreen
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center gap-2 mt-6">
          {branchData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full transition duration-300 ${
                index === current ? 'bg-[#2A388A]' : 'bg-gray-300'
              }`}
              aria-label={t('common.navigation.branch', { index: index + 1 })}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function BranchHero() {
  const { t } = useTranslation('common');
  const branchHero = t('branchHero', { returnObjects: true }) as BranchHeroData;

  return (
    <section className="relative text-white text-center py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/blue.png"
          alt={branchHero.imageAlt}
          layout="fill"
          objectFit="cover"
          quality={100}
          className="brightness-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-indigo-900/80"></div>
      </div>
      
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"
          animate={{
            y: [0, -20, 0],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-40 right-20 w-32 h-32 bg-blue-300/20 rounded-full blur-2xl"
          animate={{
            y: [0, 20, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      <motion.div
        className="relative z-10 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="inline-block px-6 py-2 bg-white/20 rounded-full backdrop-blur-sm mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-sm font-medium">{branchHero.badge}</p>
        </motion.div>
        
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {branchHero.title}
        </motion.h1>
        
        <motion.p
          className="text-xl md:text-2xl max-w-2xl mx-auto text-blue-100 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {branchHero.description}
        </motion.p>
      </motion.div>
    </section>
  );
}