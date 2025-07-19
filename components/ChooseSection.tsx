"use client";

import { motion, Variants } from "framer-motion";
import { RiTruckLine, RiShieldCheckLine, Ri24HoursLine } from "react-icons/ri";
import Image from "next/image";
import { useTranslation } from "react-i18next";

const WhyChooseUs = () => {
  const { t } = useTranslation('common');

  // Get the features from translation
  const featuresRaw = t('whyChooseUs.features', { returnObjects: true });
  const featuresData = Array.isArray(featuresRaw) ? featuresRaw : Object.values(featuresRaw);

  // Map icons to features
  const icons = [
    <RiTruckLine className="text-5xl" />,
    <RiShieldCheckLine className="text-5xl" />,
    <Ri24HoursLine className="text-5xl" />
  ];

  const features = featuresData.map((feature, index) => ({
  icon: icons[index],
  title: feature.title,
  description: feature.description
  }));

  // Container animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  // Item animation variants
  const itemVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
        duration: 0.8
      }
    }
  };

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/blue.png"
          alt="Background"
          fill
          className="object-cover"
          quality={100}
          priority
        />
        <div className="absolute inset-0 bg-[#2A388A]/70"></div> {/* Overlay untuk meningkatkan keterbacaan */}
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8,
            ease: "easeOut"
          }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.6,
              delay: 0.2,
              ease: "easeOut"
            }}
            viewport={{ once: true }}
          >
            {t('whyChooseUs.title')}
          </motion.h2>
          
          <motion.div 
            className="w-32 h-1.5 bg-[#E92429] mx-auto mb-8"
            initial={{ width: 0 }}
            whileInView={{ width: 128 }}
            transition={{ 
              duration: 0.8,
              delay: 0.4,
              ease: "easeOut"
            }}
            viewport={{ once: true }}
          />
          
          <motion.p 
            className="text-xl text-white/90 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.6,
              delay: 0.6,
              ease: "easeOut"
            }}
            viewport={{ once: true }}
          >
            {t('whyChooseUs.subtitle')}
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group relative bg-white/95 p-10 rounded-xl shadow-2xl hover:shadow-2xl transition-all duration-300 overflow-hidden h-full"
              variants={itemVariants}
              whileHover={{ 
                y: -10, 
                scale: 1.03,
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Red line on hover */}
              <div className="absolute top-0 left-0 w-1.5 h-0 bg-[#E92429] group-hover:h-full transition-all duration-500"></div>

              <div className="flex flex-col items-start h-full">
                <motion.div 
                  className="mb-6 p-4 rounded-full bg-[#2A388A]/10 group-hover:bg-[#E92429]/10 transition-colors duration-300"
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    duration: 0.6,
                    delay: index * 0.1 + 0.8,
                    type: "spring",
                    damping: 15
                  }}
                  viewport={{ once: true }}
                >
                  {feature.icon}
                </motion.div>
                
                <motion.h3 
                  className="text-2xl font-bold text-[#2A388A] mb-4 group-hover:text-[#E92429] transition-colors duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ 
                    duration: 0.5,
                    delay: index * 0.1 + 1.0
                  }}
                  viewport={{ once: true }}
                >
                  {feature.title}
                </motion.h3>
                
                <motion.p 
                  className="text-lg text-gray-700 text-left flex-grow"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5,
                    delay: index * 0.1 + 1.2
                  }}
                  viewport={{ once: true }}
                >
                  {feature.description}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;