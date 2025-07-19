//page.tsx contact//
'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { FaPhoneAlt, FaEnvelope, FaMapMarkedAlt, FaClock, FaBuilding, FaWhatsapp, FaInstagram, FaFacebook, FaLinkedin } from 'react-icons/fa';
import { BiSend } from 'react-icons/bi';
import { HiOutlineLocationMarker, HiOutlineMail, HiOutlinePhone } from 'react-icons/hi';
import Image from 'next/image';
import Header from '@/components/header';
import Footer from '@/components/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useTranslation } from 'react-i18next';

export default function ContactPage() {
  const { t } = useTranslation();
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isIntroDone, setIsIntroDone] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isHovering, setIsHovering] = useState(false);
  
  const contactMethods = [
    {
      icon: HiOutlinePhone,
      title: t('Contact.quickContact.methods.phone.title'),
      subtitle: t('Contact.quickContact.methods.phone.subtitle'),
      value: t('Contact.quickContact.methods.phone.value'),
      action: t('Contact.quickContact.methods.phone.action'),
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: HiOutlineMail,
      title: t('Contact.quickContact.methods.email.title'),
      subtitle: t('Contact.quickContact.methods.email.subtitle'),
      value: t('Contact.quickContact.methods.email.value'),
      action: t('Contact.quickContact.methods.email.action'),
      color: 'from-green-500 to-green-600'
    },
    {
      icon: HiOutlineLocationMarker,
      title: t('Contact.quickContact.methods.location.title'),
      subtitle: t('Contact.quickContact.methods.location.subtitle'),
      value: t('Contact.quickContact.methods.location.value'),
      action: t('Contact.quickContact.methods.location.action'),
      color: 'from-purple-500 to-purple-600'
    }
  ];

  // Check if currently open (Monday-Friday 8-17, Saturday 8-15)
  const isCurrentlyOpen = () => {
    const now = new Date();
    const day = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const hour = now.getHours();
    
    if (day === 0) return false; // Sunday
    if (day >= 1 && day <= 5) return hour >= 8 && hour < 17; // Monday-Friday
    if (day === 6) return hour >= 8 && hour < 15; // Saturday
    return false;
  };

  const [isOpen, setIsOpen] = useState(isCurrentlyOpen());

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      setIsOpen(isCurrentlyOpen());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Get current day name
  const getCurrentDayName = () => {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return days[currentTime.getDay()];
  };

  // Get operating hours for current day
  const getCurrentDayHours = () => {
    const day = currentTime.getDay();
    if (day === 0) return t('operational.schedule.hours.closed');
    if (day >= 1 && day <= 5) return t('operational.schedule.hours.weekday');
    if (day === 6) return t('operational.schedule.hours.saturday');
    return t('operational.schedule.hours.closed');
  };

  // Improved animation variants with faster timing
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
        duration: 0.3
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const fastVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const slideInLeft: Variants = {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const slideInRight: Variants = {
    hidden: { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const pulseVariants: Variants = {
    initial: { scale: 1 },
    pulse: { 
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  useEffect(() => {
    const introTimeout = setTimeout(() => setIsIntroDone(true), 1500);
    return () => clearTimeout(introTimeout);
  }, []);

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
                {t('intro.welcome')}
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Header />

      <main className="pt-0 overflow-hidden">
        {/* Hero Section */}
        <section className="relative text-white text-center py-32 px-6 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image 
              src="/images/blue.png"
              alt="Office Background"
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
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div
              className="inline-block px-6 py-2 bg-white/20 rounded-full backdrop-blur-sm mb-8"
              variants={fastVariants}
            >
              <p className="text-sm font-medium">{t('Contact.intro.badge')}</p>
            </motion.div>
            
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
              variants={itemVariants}
            >
              {t('Contact.intro.title')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-cyan-200">{t('Contact.intro.titleHighlight')}</span>
            </motion.h1>
            
            <motion.p
              className="text-xl md:text-2xl max-w-2xl mx-auto text-blue-100 leading-relaxed"
              variants={itemVariants}
            >
              {t('Contact.intro.subtitle')}
            </motion.p>
          </motion.div>
        </section>

        {/* Quick Contact Methods */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial="hidden"
              animate="visible"
              variants={fastVariants}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('Contact.quickContact.title')}</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {t('Contact.quickContact.subtitle')}
              </p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              {contactMethods.map((method, index) => (
                <motion.a
                  key={index}
                  href={method.action}
                  className="group relative p-8 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
                  variants={itemVariants}
                  whileHover={{ y: -10, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${method.color} rounded-t-3xl`} />
                  
                  <div className="text-center">
                    <motion.div
                      className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${method.color} rounded-2xl mb-6 shadow-lg`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <method.icon className="text-2xl text-white" />
                    </motion.div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{method.title}</h3>
                    <p className="text-gray-600 mb-4">{method.subtitle}</p>
                    <p className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                      {method.value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Office Location Section */}
        <section className="py-20 px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('Contact.office.title')}</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {t('Contact.office.subtitle')}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Office Image */}
              <motion.div
                className="relative h-96 rounded-3xl overflow-hidden shadow-2xl"
                initial="hidden"
                whileInView="visible"
                variants={slideInLeft}
                viewport={{ once: true, amount: 0.3 }}
              >
                <Image 
                  src="/images/alamat.png"
                  alt="Eureka Logistics Office"
                  layout="fill"
                  objectFit="cover"
                  quality={100}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-1">{t('Contact.office.headOffice')}</h3>
                  <p className="text-blue-200">{t('Contact.office.location')}</p>
                </div>
              </motion.div>

              {/* Office Details */}
              <motion.div
                className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100"
                initial="hidden"
                whileInView="visible"
                variants={slideInRight}
                viewport={{ once: true, amount: 0.3 }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <FaBuilding className="text-2xl text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-[#2A388A]">{t('Contact.office.headOffice')}</h3>
                    <p className="text-gray-600 text-lg">{t('Contact.office.companyName')}</p>
                  </div>
                </div>
                
                <motion.div 
                  className="space-y-6"
                  initial="hidden"
                  whileInView="visible"
                  variants={containerVariants}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <motion.div 
                    className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl"
                    variants={itemVariants}
                  >
                    <FaMapMarkedAlt className="text-blue-600 text-2xl mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900 text-lg mb-1">{t('Contact.office.details.address.label')}</p>
                      <p className="text-gray-600">{t('Contact.office.details.address.value')}</p>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl"
                    variants={itemVariants}
                  >
                    <FaPhoneAlt className="text-blue-600 text-2xl mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900 text-lg mb-1">{t('Contact.office.details.phone.label')}</p>
                      <p className="text-gray-600">{t('Contact.office.details.phone.value')}</p>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl"
                    variants={itemVariants}
                  >
                    <FaEnvelope className="text-blue-600 text-2xl mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900 text-lg mb-1">{t('Contact.office.details.email.label')}</p>
                      <p className="text-gray-600">{t('Contact.office.details.email.value')}</p>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}