// app/i18n/client.ts
'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { locales, defaultLocale } from './config';

// Import manual untuk setiap bahasa
import idCommon from '@/locales/id/common.json';
import enCommon from '@/locales/en/common.json';
import idAbout from '@/locales/id/about.json';
import enAbout from '@/locales/en/about.json'

const resources = {
  id: {
    common: idCommon,
    About: idAbout
  },
  en: {
    common: enCommon,
    About: enAbout
  },
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: defaultLocale,
    supportedLngs: locales,
    defaultNS: 'common',
    ns: ['common', 'About'],
    detection: {
      order: ['path', 'localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'bahasa',
      lookupFromPathIndex: 0
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;