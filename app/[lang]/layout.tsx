// app/layout.tsx
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "@/app/globals.css";
import { locales } from "@/app/i18n/config";
import TranslationProvider from "@/components/TranslationProvider";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700"]
});

export const metadata: Metadata = {
  title: "Eureka Logistics",
  description: "Solusi pengiriman terpercaya di seluruh Indonesia",
  alternates: {
    canonical: "https://yourdomain.com",
    languages: {
      id: "https://yourdomain.com/id",
      en: "https://yourdomain.com/en",
    },
  },
};

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const { lang } = params;

  return (
    <html lang={lang} className={`${montserrat.variable} font-sans`} dir="ltr">
      <body className="bg-white text-gray-900">
        <TranslationProvider>
          {children}
        </TranslationProvider>
      </body>
    </html>
  );
}