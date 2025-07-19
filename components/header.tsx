'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from 'next/navigation';
import { locales } from "@/app/i18n/config";
import i18n from '@/app/i18n/client';
import { useTranslation } from 'react-i18next';
import 'remixicon/fonts/remixicon.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMedium, setIsMedium] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { label: t('header.navigation.home'), href: "/", section: "home" },
    { label: t('header.navigation.about'), href: "/about", section: "about" },
    { label: t('header.navigation.contact'), href: "/contact", section: "contact" },
  ];

  const changeLanguage = async (lang: 'id' | 'en') => {
    try {
      await i18n.changeLanguage(lang);
      localStorage.setItem('bahasa', lang);
      const currentPath = pathname.replace(new RegExp(`^/(${locales.join('|')})`), '');
      const newPath = `/${lang}${currentPath}`;
      router.push(newPath);
      setShowLanguageDropdown(false);
    } catch (error) {
      console.error('Language change failed:', error);
    }
  };

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const linkClick = () => {
    setIsOpen(false);
  };

  // Fungsi untuk menentukan active section berdasarkan pathname
  const getActiveSectionFromPath = () => {
    // Remove language prefix from pathname
    const cleanPath = pathname.replace(new RegExp(`^/(${locales.join('|')})`), '');
    
    if (cleanPath === '' || cleanPath === '/') {
      return 'home';
    } else if (cleanPath.includes('/about')) {
      return 'about';
    } else if (cleanPath.includes('/contact')) {
      return 'contact';
    }
    
    // Fallback: check if there's a hash in the URL for homepage sections
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash) {
        const sectionName = hash.replace('#', '').toLowerCase();
        const fragmentToSection: { [key: string]: string } = {
          'beranda': 'home',
          'home': 'home',
          'about': 'about',
          'contact': 'contact'
        };
        return fragmentToSection[sectionName] || 'home';
      }
    }
    
    return 'home';
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Update isScrolled untuk styling
      setIsScrolled(currentScrollY > 50);
      
      // Logic untuk show/hide header
      if (currentScrollY < 10) {
        // Selalu tampilkan header saat di bagian paling atas
        setIsVisible(true);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - tampilkan header
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down dan sudah cukup jauh dari atas - sembunyikan header
        setIsVisible(false);
        // Tutup mobile menu dan dropdown saat header disembunyikan
        setIsOpen(false);
        setShowLanguageDropdown(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    const handleHashChange = () => {
      const activeSection = getActiveSectionFromPath();
      setActiveSection(activeSection);
    };

    const media = window.matchMedia('(max-width: 1090px)');
    const handler = (e: MediaQueryListEvent) => {
      setIsMedium(e.matches);
      if (!e.matches) {
        setIsOpen(false);
      }
    };

    // Set initial state
    setIsMedium(media.matches);
    setLastScrollY(window.scrollY);
    
    // Set active section berdasarkan pathname saat component mount
    const initialSection = getActiveSectionFromPath();
    setActiveSection(initialSection);

    // Event listeners
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("hashchange", handleHashChange);
    media.addEventListener('change', handler);

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", handleHashChange);
      media.removeEventListener('change', handler);
    };
  }, [lastScrollY, pathname]);

  // Update active section when pathname changes
  useEffect(() => {
    const activeSection = getActiveSectionFromPath();
    setActiveSection(activeSection);
  }, [pathname]);

  const localizedHref = (href: string) => {
    if (href === '/') {
      return `/${i18n.language}`;
    }
    return `/${i18n.language}${href}`;
  };

  return (
    <>
      {/* Header dengan auto hide/show */}
      <header className={`w-full fixed top-0 z-40 transition-all duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-100' 
          : 'bg-white/90 backdrop-blur-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href={`/${i18n.language}`} className="flex-shrink-0">
              <Image
                src="/images/logo.png"
                alt="Eureka Logistics"
                width={160}
                height={45}
                className="h-12 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className={`hidden md:flex items-center space-x-2 ${isMedium ? 'hidden' : ''}`}>
              {menuItems.map((item) => (
                <Link
                  key={item.section}
                  href={localizedHref(item.href)}
                  className={`relative text-base font-medium transition-colors duration-200 py-3 px-6 rounded-lg ${
                    activeSection === item.section
                      ? 'text-[#2A388A] bg-blue-50 shadow-sm'
                      : isScrolled 
                        ? 'text-gray-700 hover:text-[#2A388A] hover:bg-gray-50'
                        : 'text-gray-800 hover:text-[#2A388A] hover:bg-white/20'
                  }`}
                >
                  {item.label}
                  {activeSection === item.section && (
                    <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#2A388A] rounded-full" />
                  )}
                </Link>
              ))}
              
              {/* Language Switcher */}
              <div className="relative ml-6">
                <button
                  onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                  className={`flex items-center space-x-2 px-4 py-3 text-base font-medium transition-colors duration-200 rounded-lg ${
                    isScrolled
                      ? 'text-gray-700 hover:text-[#2A388A] hover:bg-gray-50'
                      : 'text-gray-800 hover:text-[#2A388A] hover:bg-white/20'
                  }`}
                >
                  <i className="ri-global-line w-5 h-5"></i>
                  <span>{t('header.language.current')}</span>
                  <i className={`ri-arrow-down-s-line w-5 h-5 transition-transform ${showLanguageDropdown ? 'rotate-180' : ''}`}></i>
                </button>

                {showLanguageDropdown && (
                  <div className="absolute top-full mt-2 right-0 bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-[120px] z-50">
                    <button
                      onClick={() => changeLanguage('id')}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-sm hover:bg-gray-50 transition-colors"
                    >
                      <img
                        className="w-5 h-5 rounded-sm"
                        src="https://cdn.masterdiskon.com/masterdiskon/assets/front/img/icon/flag/209-indonesia.svg"
                        alt="Indonesia"
                      />
                      <span>ID</span>
                    </button>
                    <button
                      onClick={() => changeLanguage('en')}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-sm hover:bg-gray-50 transition-colors"
                    >
                      <img
                        className="w-5 h-5 rounded-sm"
                        src="https://cdn.masterdiskon.com/masterdiskon/assets/front/img/icon/flag/260-united-kingdom.svg"
                        alt="English"
                      />
                      <span>EN</span>
                    </button>
                  </div>
                )}
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={handleClick}
              className={`md:hidden p-3 transition-colors ${
                isScrolled 
                  ? 'text-gray-700 hover:text-[#2A388A]'
                  : 'text-gray-800 hover:text-[#2A388A]'
              } ${isMedium ? '' : 'hidden'}`}
            >
              <i className="ri-menu-3-line text-3xl"></i>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Nav */}
      <nav className={`py-12 text-center z-50 fixed bg-white transition-all w-72 shadow-2xl ${
        isVisible ? 'top-20' : 'top-0'
      } ${isOpen ? 'right-0' : '-right-72'}`}>
        <ul className="text-lg font-medium mr-20 w-full">
          {menuItems.map((item) => (
            <li key={item.section} className="py-8 w-full text-gray-700 hover:text-white hover:bg-[#FBB338] transition-colors">
              <Link 
                href={localizedHref(item.href)} 
                onClick={linkClick} 
                className={`w-full py-6 block ${activeSection === item.section ? 'text-[#2A388A] font-semibold' : ''}`}
              >
                {item.label}
              </Link>
            </li>
          ))}
          
          {/* Language Switcher Mobile */}
          <li className="py-8 w-full">
            <div className="px-6">
              <p className="text-gray-500 text-base mb-4">{t('header.language.current')}</p>
              <div className="flex justify-center gap-6">
                <button
                  onClick={() => changeLanguage('id')}
                  className="flex items-center space-x-3 px-4 py-3 text-base hover:bg-gray-50 transition-colors rounded"
                >
                  <img
                    className="w-6 h-6 rounded-sm"
                    src="https://cdn.masterdiskon.com/masterdiskon/assets/front/img/icon/flag/209-indonesia.svg"
                    alt="Indonesia"
                  />
                  <span>ID</span>
                </button>
                <button
                  onClick={() => changeLanguage('en')}
                  className="flex items-center space-x-3 px-4 py-3 text-base hover:bg-gray-50 transition-colors rounded"
                >
                  <img
                    className="w-6 h-6 rounded-sm"
                    src="https://cdn.masterdiskon.com/masterdiskon/assets/front/img/icon/flag/260-united-kingdom.svg"
                    alt="English"
                  />
                  <span>EN</span>
                </button>
                </div>
            </div>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Header;