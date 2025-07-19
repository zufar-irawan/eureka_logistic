"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useRouter, usePathname } from "next/navigation";
import i18n from "@/app/i18n/client";

export default function CTASection() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const itemWidth = 350;
  const pathname = usePathname();
  const router = useRouter();

  const localizedHref = (href: string) => {
    if (href.startsWith("#")) return href;
    return `/${i18n.language}${href}`;
  };

  const ctaItems = [
    { 
      id: 6, 
      image: "/images/Background5.jpg",
      title: t('ctaSection.services.5.title'),
      description: t('ctaSection.services.5.description')
    },
    { 
      id: 1, 
      image: "/images/container.jpg",
      title: t('ctaSection.services.0.title'),
      description: t('ctaSection.services.0.description')
    },
    { 
      id: 2, 
      image: "/images/Background1.jpeg",
      title: t('ctaSection.services.1.title'),
      description: t('ctaSection.services.1.description')
    },
    { 
      id: 3, 
      image: "/images/Background2.jpeg",
      title: t('ctaSection.services.2.title'),
      description: t('ctaSection.services.2.description')
    },
    { 
      id: 4, 
      image: "/images/Background3.jpg",
      title: t('ctaSection.services.3.title'),
      description: t('ctaSection.services.3.description')
    },
    { 
      id: 5, 
      image: "/images/Background4.jpg",
      title: t('ctaSection.services.4.title'),
      description: t('ctaSection.services.4.description')
    },
  ];

  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      if (containerRef.current) {
        const container = containerRef.current;
        const nextScroll =
          scrollPosition + itemWidth >= container.scrollWidth - container.clientWidth
            ? 0
            : scrollPosition + itemWidth;

        container.scrollTo({ left: nextScroll, behavior: "smooth" });
        setScrollPosition(nextScroll);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [scrollPosition, isHovered]);

  const scrollToNext = () => {
    if (containerRef.current) {
      const container = containerRef.current;
      const nextScroll =
        scrollPosition + itemWidth >= container.scrollWidth - container.clientWidth
          ? 0
          : scrollPosition + itemWidth;
      container.scrollTo({ left: nextScroll, behavior: "smooth" });
      setScrollPosition(nextScroll);
    }
  };

  const scrollToPrev = () => {
    if (containerRef.current) {
      const container = containerRef.current;
      const prevScroll =
        scrollPosition - itemWidth <= 0
          ? container.scrollWidth - container.clientWidth
          : scrollPosition - itemWidth;
      container.scrollTo({ left: prevScroll, behavior: "smooth" });
      setScrollPosition(prevScroll);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/30 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            {t('ctaSection.badge')}
          </div>
          
          <h1 className="font-bold text-3xl md:text-4xl text-gray-800 mb-2">
            {t('ctaSection.title.line1')}
          </h1>
          <h1 className="font-bold text-4xl md:text-5xl text-gray-800 mb-6 leading-tight">
            {t('ctaSection.title.line2')} <span className="text-blue-500">Logistics</span>
            <span className="text-[#E92429]">{t('ctaSection.title.exclamation')}</span>
          </h1>
          <p className="text-base md:text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            {t('ctaSection.description')}
          </p>
        </motion.div>

        {/* Cards Slider */}
        <div className="relative mb-16">
          {/* Navigation Buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none z-20">
            <button
              onClick={scrollToPrev}
              className="bg-white/90 hover:bg-white text-gray-700 hover:text-blue-600 w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center backdrop-blur-sm border border-gray-100 pointer-events-auto ml-4"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={scrollToNext}
              className="bg-white/90 hover:bg-white text-gray-700 hover:text-blue-600 w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center backdrop-blur-sm border border-gray-100 pointer-events-auto mr-4"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div
            ref={containerRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-4 px-2 scroll-smooth"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {ctaItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="flex-shrink-0 w-[85vw] md:w-[45vw] lg:w-[30vw] bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500 group cursor-pointer"
                style={{ scrollSnapAlign: "start" }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
              >
                <div className="h-64 md:h-80 relative overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    quality={90}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-200">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Hide scrollbar */}
          <style jsx>{`
            .flex::-webkit-scrollbar {
              display: none;
            }
          `}</style>
        </div>

        {/* Value Proposition Section */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {[
            { 
              icon: t('ctaSection.valueProposition.0.icon'),
              title: t('ctaSection.valueProposition.0.title'),
              description: t('ctaSection.valueProposition.0.description')
            },
            { 
              icon: t('ctaSection.valueProposition.1.icon'),
              title: t('ctaSection.valueProposition.1.title'),
              description: t('ctaSection.valueProposition.1.description')
            },
            { 
              icon: t('ctaSection.valueProposition.2.icon'),
              title: t('ctaSection.valueProposition.2.title'),
              description: t('ctaSection.valueProposition.2.description')
            },
          ].map((feature, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href={localizedHref("/contact")}
              className="inline-flex items-center bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 group"
            >
              {t('ctaSection.buttons.contact')}
              <svg
                className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </Link>
            
            <Link
              href={localizedHref("/#Service")}
              className="inline-flex items-center bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-200 hover:border-blue-500 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 group"
            >
              {t('ctaSection.buttons.learnServices')}
              <svg
                className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </Link>
          </div>
          
        </motion.div>
      </div>
    </section>
  );
}