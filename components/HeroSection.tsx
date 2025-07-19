"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

// Tipe data banner dari JSON
type BannerData = {
  id: number;
  slider: string;
  link: string;
};

export default function HeroSection() {
  const [slideData, setSlideData] = useState<BannerData[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    fetch("/data/el_banner.json")
      .then((res) => res.json())
      .then((json) => {
        if (json.status?.code === 200) {
          setSlideData(json.data.banner);
        }
      });
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideData.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [slideData.length]);

  if (slideData.length === 0) return null;

  return (
    <section className="relative w-full overflow-hidden">
      {/* Container utama dengan padding top untuk mengakomodasi header */}
      <div className="pt-20"> {/* Padding top sesuai tinggi header (h-20) */}
        {/* Gambar banner */}
        <div className="relative w-full h-auto">
          <img
            src={slideData[currentSlide]?.slider}
            alt="Banner Eureka"
            className="w-full max-h-[calc(90vh-5rem)] object-contain sm:object-cover"
          />
          
          {/* Overlay gradient untuk meningkatkan kontras (opsional) */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20"></div>
        </div>

        {/* Dot navigation */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
          {slideData.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i === currentSlide 
                  ? "bg-red-600 shadow-lg transform scale-110" 
                  : "bg-white/70 hover:bg-white/90"
              }`}
            />
          ))}
        </div>

        {/* Arrow navigation (opsional) */}
        <button
          onClick={() => setCurrentSlide(prev => prev === 0 ? slideData.length - 1 : prev - 1)}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 group"
        >
          <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button
          onClick={() => setCurrentSlide(prev => (prev + 1) % slideData.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 group"
        >
          <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}