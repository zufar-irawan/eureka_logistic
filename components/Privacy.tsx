'use client'

import { motion, Variants } from 'framer-motion'
import React from 'react'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'

export default function Privacy() {
  const { t, i18n } = useTranslation()
  const isIndonesian = i18n.language === 'id'

  const privacyData = t('privacyPolicy', { returnObjects: true }) as {
    title: string
    subtitle: string
    sections: Array<{ id: string; title: string; content: string }>
  }

  // Container variants for staggered animation
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  }

  // Item variants for sections
  const itemVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 200,
        duration: 0.6
      }
    }
  }

  // Hero text variants
  const heroTextVariants: Variants = {
    hidden: { opacity: 0, y: 60, scale: 0.8 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
        duration: 0.8
      }
    }
  }

  return (
    <>
      <main className="pt-0">
        {/* Hero Section with Image Background */}
        <section className="relative text-white text-center py-32 px-6 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image 
              src="/images/blue.png"
              alt={privacyData.title}
              layout="fill"
              objectFit="cover"
              quality={100}
              className="brightness-50"
            />
          </div>
          
          <motion.div
            className="relative z-10"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-6"
              variants={heroTextVariants}
            >
              {privacyData.title}
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl max-w-2xl mx-auto"
              variants={heroTextVariants}
            >
              {privacyData.subtitle}
            </motion.p>
          </motion.div>
        </section>

        {/* Policy Content Section */}
        <section className="py-20 px-6 md:px-12 lg:px-24 bg-[#f9f9f9]">
          <motion.div 
            className="max-w-4xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {privacyData.sections?.map((section, index) => (
              <motion.section
                key={section.id}
                className="mb-8 bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
              >
                <motion.h2 
                  className="text-xl sm:text-2xl font-bold text-[#2A388A] mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + (index * 0.15), duration: 0.5 }}
                >
                  {section.title}
                </motion.h2>
                <motion.div 
                  className={`text-base leading-relaxed ${isIndonesian ? 'text-justify' : 'text-left'} space-y-4`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.0 + (index * 0.15), duration: 0.6 }}
                >
                  {section.content.split('\n').map((paragraph, i) => (
                    <motion.p 
                      key={i} 
                      className="text-[#333333]"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        delay: 1.2 + (index * 0.15) + (i * 0.05), 
                        duration: 0.4 
                      }}
                    >
                      {paragraph}
                    </motion.p>
                  ))}
                </motion.div>
              </motion.section>
            ))}
          </motion.div>
        </section>
      </main>
    </>
  )
}