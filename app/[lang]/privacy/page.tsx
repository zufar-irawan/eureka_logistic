'use client';

import Header from '@/components/header';
import Footer from '@/components/Footer';
import Privacy from '@/components/Privacy';

export default function PrivacyPage() {
  return (
    <div>
      <Header />
      <section className='relative w-full'>
      <Privacy />
      </section>
      <Footer />
    </div>
  );
}
