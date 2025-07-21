// app/i18n/dictionary.ts
import 'server-only';

const dictionaries = {
  en: () => import('../../locales/en/common.json').then((module) => module.default),
  id: () => import('../../locales/id/common.json').then((module) => module.default),
};

export const getDictionary = async (locale: keyof typeof dictionaries) => {
  try {
    if (!dictionaries[locale]) {
      return dictionaries.id();
    }
    return await dictionaries[locale]();
  } catch (error) {
    console.error(`Error loading dictionary for ${locale}:`, error);
    return {};
  }
};