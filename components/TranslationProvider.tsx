'use client';

import { I18nextProvider } from 'react-i18next';
import i18n from '@/app/i18n/client';

export default function TranslationProvider({ children }: { children: React.ReactNode }) {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
