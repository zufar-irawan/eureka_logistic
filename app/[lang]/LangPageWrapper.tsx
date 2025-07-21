// app/[lang]/LangPageWrapper.tsx
'use client';

import dynamic from 'next/dynamic';

const HomeClient = dynamic(() => import('./HomeClient'), { ssr: false });

export default function LangPageWrapper({ lang }: { lang: string }) {
  return <HomeClient lang={lang} />;
}
