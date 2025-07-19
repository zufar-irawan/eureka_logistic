"use client";

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// Tipe data untuk layanan
interface ServiceItem {
  id: number;
  title: string;
  description: string;
  icon: string; // String emoji
  features: string[];
  color: string;
  gradient: string;
}

interface ServicesData {
  title?: string;
  subtitle?: string;
  bottomText?: string;
  serviceList?: ServiceItem[];
}

const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${2 + Math.random() * 3}s`
          }}
        />
      ))}
    </div>
  );
};

const ServiceCard = ({ service, index }: { service: ServiceItem; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group cursor-pointer transform transition-all duration-300 hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        animationDelay: `${index * 0.1}s`
      }}
    >
      <div className="relative bg-white rounded-2xl p-6 md:p-8 h-full flex flex-col items-center text-center shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
        {/* Animated Background */}
        <div 
          className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
        />
        
        {/* Icon Container */}
        <div className={`relative mb-4 md:mb-6 transition-all duration-300 ${isHovered ? 'scale-110 rotate-3' : ''}`}>
          <div className={`relative p-4 rounded-2xl transition-all duration-300 ${isHovered ? 'shadow-lg' : ''}`}
               style={{ backgroundColor: isHovered ? service.color + '15' : 'transparent' }}>
            <div className="text-6xl">{service.icon}</div>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3 md:mb-4 group-hover:text-gray-900 transition-all duration-300">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm md:text-base mb-4 md:mb-6 leading-relaxed flex-grow group-hover:text-gray-700 transition-colors duration-300">
          {service.description}
        </p>

        {/* Features - Diratakan ke kiri */}
        <div className="w-full space-y-2 md:space-y-3">
          {service.features.map((feature, featureIndex) => (
            <div
              key={featureIndex}
              className={`flex items-center text-xs md:text-sm text-gray-500 text-left group-hover:text-gray-600 transition-all duration-300 ${isHovered ? 'translate-x-1' : ''}`}
              style={{
                transitionDelay: `${featureIndex * 0.1}s`
              }}
            >
              <div 
                className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full mr-2 md:mr-3 flex-shrink-0 ${isHovered ? 'scale-125' : ''} transition-transform duration-200`}
                style={{ backgroundColor: service.color }}
              />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        {/* Bottom Accent */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl transition-all duration-300 ${isHovered ? 'h-2' : ''}`}
          style={{ backgroundColor: service.color }}
        />

        {/* Hover Border */}
        <div
          className={`absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gray-100 transition-all duration-300 ${isHovered ? 'border-opacity-50' : ''}`}
          style={{ borderColor: isHovered ? service.color + '30' : 'transparent' }}
        />
      </div>
    </div>
  );
};

const ServiceCards = () => {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const [servicesData, setServicesData] = useState<ServicesData | null>(null);

  useEffect(() => {
    setMounted(true);
    // Mengambil data dari i18n
    const data = t('services', { returnObjects: true });
    setServicesData(data as ServicesData);
  }, [t]);

  if (!mounted || !servicesData) return null;

  const { title, subtitle, bottomText, serviceList = [] } = servicesData;

  return (
    <div className="relative bg-gradient-to-br from-[#1a2554] via-[#2A388A] to-[#3d4fb8] py-12 md:py-20 px-4 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        <FloatingParticles />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 md:mb-6">
            {title}
          </h2>
          
          <p className="text-blue-100 text-sm md:text-base lg:text-lg max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {serviceList.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* Bottom Text */}
        <div className="text-center mt-12 md:mt-20 animate-in fade-in slide-in-from-bottom-2 duration-700 delay-500">
          <p className="text-blue-100 text-base md:text-lg lg:text-xl hover:scale-105 transition-transform duration-200">
            {bottomText}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServiceCards;