"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";
import Header from "@/components/header";
import Footer from "@/components/Footer";
import { useTranslation } from "react-i18next";

interface TranslationStats {
  [key: string]: {
    value: string;
    label: string;
  };
}

interface StatItem {
  value: string;
  label: string;
}

export default function AboutPage() {
  const { t, ready } = useTranslation("About");
  const [activeTab, setActiveTab] = useState<"about" | "mission">("about");
  const [isMounted, setIsMounted] = useState(false);
  const [isIntroDone, setIsIntroDone] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setIsVisible(true);
    const introTimeout = setTimeout(() => setIsIntroDone(true), 1500);
    return () => clearTimeout(introTimeout);
  }, []);

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const item: Variants = {
    hidden: { y: 30, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1, 
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      } 
    }
  };

  const tabVariants: Variants = {
    hidden: { x: -20, opacity: 0 },
    show: { x: 0, opacity: 1, transition: { duration: 0.5 } },
    exit: { x: 20, opacity: 0, transition: { duration: 0.3 } }
  };

  // Helper function to safely get array from translation
  const getTranslationArray = (key: string): string[] => {
    try {
      const result = t(key, { returnObjects: true });
      if (Array.isArray(result)) {
        return result.map(item => {
          if (typeof item === 'object' && item !== null) {
            // Handle object-to-string conversion as needed.
            // For example, you might want to stringify it or use a specific property.
            return JSON.stringify(item);
          }
          return String(item);
        });
      }
      // If the result is not an array, wrap it in an array of strings
      return [String(result)];
    } catch (error) {
      console.error(`Error getting translation for key: ${key}`, error);
      return [];
    }
  };

  // Helper function to safely get object from translation
  const getTranslationObject = (key: string): TranslationStats => {
    try {
      const result = t(key, { returnObjects: true });
      if (typeof result === "object" && result !== null && !Array.isArray(result)) {
        return result as TranslationStats;
      }
      return {};
    } catch (error) {
      console.error(`Error getting translation object for key: ${key}`, error);
      return {};
    }
  };

  // Get translations safely
  const aboutContent = getTranslationArray("About.about.content");
  const missionItems = getTranslationArray("About.mission.items");
  const stats = getTranslationObject("About.about.stats");

  if (!isMounted || !ready) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex justify-center items-center min-h-[400px]">
          <motion.div
            className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Animated Intro - Faster */}
      <AnimatePresence>
        {!isIntroDone && (
          <motion.div
            className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ 
              opacity: 0, 
              transition: { 
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1]
              } 
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                transition: {
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1]
                }
              }}
              className="flex flex-col items-center"
            >
              <motion.div
                initial={{ rotateY: 0 }}
                animate={{ 
                  rotateY: 360,
                  transition: {
                    duration: 1,
                    ease: "easeInOut",
                    repeat: 0
                  }
                }}
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
                animate={{ 
                  y: 0, 
                  opacity: 1,
                  transition: {
                    duration: 0.5,
                    delay: 0.2,
                    ease: "easeOut"
                  }
                }}
                className="text-2xl font-semibold text-[#2A388A]"
              >
                {t('About.intro.welcome')}
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Header />

      <main className="pt-0 overflow-hidden">
        {/* Hero Section - Text Only */}
        <section className="relative text-white py-28 px-6 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-[#2A388A] to-[#1a245f]"></div>
            <div className="absolute inset-0 opacity-10 bg-[url('/images/grid-pattern.svg')] bg-cover"></div>
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
                ease: "easeInOut",
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
                ease: "easeInOut",
              }}
            />
          </div>

          <motion.div
            className="relative z-10 max-w-7xl mx-auto text-center"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-block px-6 py-2 bg-white/20 rounded-full backdrop-blur-sm mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="text-sm font-medium">
                {t("About.hero.smallTitle")}
              </p>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              dangerouslySetInnerHTML={{
                __html: t("About.hero.bigTitle", {
                  highlightedWord: `<span class="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-400">${t(
                    "About.hero.highlightedWord"
                  )}</span>`,
                }),
              }}
            />

            <motion.p
              className="text-xl max-w-2xl mx-auto text-blue-100 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {t("About.hero.subtitle")}
            </motion.p>
          </motion.div>
        </section>

        {/* Main Content Section */}
        <div className="max-w-7xl mx-auto px-4 py-16 font-['Montserrat']">
          {/* Header with animated title */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-red-500 mb-4">
              {t("About.title")}
            </h1>
            <p className="text-xl text-gray-600">{t("About.subtitle")}</p>
          </motion.div>

          {/* Enhanced Tab Navigation */}
          <motion.div 
            className="flex justify-center mb-12"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <div className="bg-white rounded-xl shadow-lg p-2 border border-gray-200">
              <button
                className={`relative py-4 px-8 font-semibold text-lg rounded-lg transition-all duration-300 ${
                  activeTab === 'about' 
                    ? 'text-white bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg transform scale-105' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
                onClick={() => setActiveTab('about')}
              >
                {activeTab === 'about' && (
                  <motion.div
                    className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700"
                    layoutId="activeTab"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{t("About.tabs.about")}</span>
              </button>
              <button
                className={`relative py-4 px-8 font-semibold text-lg rounded-lg transition-all duration-300 ${
                  activeTab === 'mission' 
                    ? 'text-white bg-gradient-to-r from-red-500 to-red-600 shadow-lg transform scale-105' 
                    : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
                }`}
                onClick={() => setActiveTab('mission')}
              >
                {activeTab === 'mission' && (
                  <motion.div
                    className="absolute inset-0 rounded-lg bg-gradient-to-r from-red-500 to-red-600"
                    layoutId="activeTab"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{t("About.tabs.mission")}</span>
              </button>
            </div>
          </motion.div>

          {/* Content Container */}
          <AnimatePresence mode="wait">
            {/* About Content */}
            {activeTab === 'about' && (
              <motion.div
                key="about"
                className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
                variants={tabVariants}
                initial="hidden"
                animate="show"
                exit="exit"
              >
                <motion.div variants={item} className="space-y-6">
                  <div className="relative">
                    <motion.h2 
                      className="text-4xl font-bold mb-6 text-blue-900 leading-tight"
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {t("About.title")}
                    </motion.h2>
                    <motion.div
                      className="absolute -left-4 top-0 w-2 h-16 bg-gradient-to-b from-blue-600 to-red-500 rounded-full"
                      initial={{ height: 0 }}
                      animate={{ height: 64 }}
                      transition={{ delay: 0.4, duration: 0.8 }}
                    />
                  </div>

                  <div className="space-y-5">
                    {aboutContent.map((paragraph: string, idx: number) => (
                      <motion.p 
                        key={idx}
                        className="text-gray-700 leading-relaxed text-lg hover:text-gray-900 transition-colors duration-300"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + idx * 0.1 }}
                      >
                        {paragraph}
                      </motion.p>
                    ))}
                  </div>

                  {/* Stats */}
                  <motion.div
                    className="grid grid-cols-3 gap-4 mt-8"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    {Object.entries(stats).map(([key, stat], index: number) => (
                      <div key={key} className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">
                          {stat.value}
                        </div>
                        <div className="text-sm text-gray-600">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </motion.div>

                {/* Enhanced Truck Image with 3D effects */}
                <motion.div 
                  className="relative h-96 lg:h-[500px]"
                  variants={item}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <motion.div
                    className="relative w-full h-full"
                    animate={{
                      y: [0, -15, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut"
                    }}
                  >
                    <Image  
                      src="/images/CDE.png" 
                      alt="Eureka Logistics Truck"
                      fill
                      style={{ objectFit: "contain" }}
                      className="drop-shadow-2xl filter brightness-110"
                    />
                  </motion.div>
                  
                  {/* 3D Background Elements */}
                  <motion.div
                    className="absolute -bottom-12 -left-12 w-40 h-40 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full opacity-20 blur-2xl"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.2, 0.3, 0.2],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut"
                    }}
                  />
                  <motion.div
                    className="absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br from-red-400 to-red-600 rounded-full opacity-20 blur-2xl"
                    animate={{
                      scale: [1.2, 1, 1.2],
                      opacity: [0.3, 0.2, 0.3],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut"
                    }}
                  />
                  <motion.div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-blue-100 to-red-100 rounded-full opacity-10 blur-3xl"
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                </motion.div>
              </motion.div>
            )}

            {/* Vision & Mission Content */}
            {activeTab === 'mission' && (
              <motion.div
                key="mission"
                className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
                variants={tabVariants}
                initial="hidden"
                animate="show"
                exit="exit"
              >
                <motion.div variants={item} className="space-y-10">
                  {/* Vision Section */}
                  <motion.div
                    className="relative"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-8 rounded-xl border-l-4 border-blue-600 shadow-lg">
                      <div className="flex items-center mb-4">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                          </svg>
                        </div>
                        <h3 className="text-3xl font-bold text-blue-900">
                          {t("About.vision.title")}
                        </h3>
                      </div>
                      <p className="text-gray-700 text-lg leading-relaxed italic">
                        {t("About.vision.content")}
                      </p>
                    </div>
                  </motion.div>

                  {/* Mission Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="bg-gradient-to-r from-red-50 to-red-100 p-8 rounded-xl border-l-4 border-red-600 shadow-lg">
                      <div className="flex items-center mb-6">
                        <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center mr-3">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
                          </svg>
                        </div>
                        <h3 className="text-3xl font-bold text-red-900">
                          {t("About.mission.title")}
                        </h3>
                      </div>
                      <ul className="space-y-4">
                        {missionItems.map((item: string, idx: number) => (
                          <motion.li 
                            key={idx}
                            className="flex items-start group"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 + idx * 0.1 }}
                          >
                            <motion.div 
                              className="bg-gradient-to-r from-red-500 to-red-600 rounded-full p-2 mt-1 mr-4 flex-shrink-0 group-hover:scale-110 transition-transform"
                              whileHover={{ rotate: 360 }}
                              transition={{ duration: 0.5 }}
                            >
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            </motion.div>
                            <span className="text-gray-700 text-lg group-hover:text-gray-900 transition-colors">
                              {item}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Enhanced Second Truck Image */}``
                <motion.div 
                  className="relative h-96 lg:h-[500px]"
                  variants={item}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <motion.div
                    className="relative w-full h-full"
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 1, -1, 0],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut"
                    }}
                  >
                    <Image 
                      src="/images/CDD.png" 
                      alt="Eureka Logistics Vision"
                      fill
                      style={{ objectFit: "contain" }}
                      className="drop-shadow-2xl filter brightness-110"
                    />
                  </motion.div>
                  
                  {/* Animated background elements for second truck */}
                  <motion.div
                    className="absolute -top-16 -left-16 w-72 h-72 bg-gradient-to-br from-blue-200 to-red-200 rounded-full opacity-30 blur-3xl"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.2, 0.4, 0.2],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <motion.div
                    className="absolute -bottom-8 -right-8 w-48 h-48 bg-gradient-to-br from-yellow-200 to-red-300 rounded-full opacity-25 blur-2xl"
                    animate={{
                      scale: [1.2, 1, 1.2],
                      opacity: [0.3, 0.1, 0.3],
                    }}
                    transition={{
                      duration: 7,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Philosophy Section */}
        <section className="py-20 px-6 bg-gradient-to-r from-[#2A388A] to-[#1a245f]">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-white mb-4">
                {t("About.philosophy.title")}
              </h2>
              <p className="text-xl text-blue-200 max-w-3xl mx-auto">
                {t("About.philosophy.subtitle")}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {["commitment", "improvement", "excellence"].map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl text-center border border-white/20"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -10 }}
                >
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <div className="text-3xl text-white font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {t(`About.philosophy.items.${item}.title`)}
                  </h3>
                  <p className="text-blue-200">
                    {t(`About.philosophy.items.${item}.description`)}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}