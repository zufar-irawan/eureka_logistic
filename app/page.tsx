'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Header from '@/components/header';
import Footer from '@/components/Footer';
import ServiceCards from '@/components/services';
import Privacy from '../components/Privacy';
import Branch from '@/components/Branch';

export default function Home() {
  const images = [
    "/images/Background1.jpeg",
    "/images/Background2.jpeg"
  ];

  {/*Transisi Image*/ }
  const [isFirstImage, setIsFirstImage] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFirstImage((prev) => !prev);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[600px] text-white text-center px-4 overflow-hidden">
          {/* Layer Background */}
          <div className="absolute inset-0 transition-opacity duration-1000 bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${images[0]})`,
              opacity: isFirstImage ? 1 : 0,
            }}
          />
          <div className="absolute inset-0 transition-opacity duration-1000 bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${images[1]})`,
              opacity: isFirstImage ? 0 : 1,
            }}
          />

          <div className="relative z-10 flex flex-col items-center justify-center h-full">
            <h1 className="text-5xl font-bold mb-4">
              Start Your Journey with Eureka!Logistic.
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl">
              Kami Solusi Ekspedisi Anda
            </p>
          </div>
        </section>

        {/* Floating Cards */}
        <section className="-mt-[100px] pb-20 relative z-20 overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Jalur Darat",
                desc: "Pelayanan darat dengan berbagai jenis kendaraan dilengkapi GPS & ERP.",
              },
              {
                title: "Jalur Laut",
                desc: "Pengiriman luar Jawa dengan kapal Roro, Pelni, cargo melalui DTD, DTP, PTD, PTP.",
              },
              {
                title: "Jalur Udara",
                desc: "Transportasi udara untuk pengiriman nasional & internasional.",
              },
            ].map((card, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-xl shadow-xl text-center transform transition duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <div className="flex justify-center mb-4">
                  <div className="bg-gray-200 p-3 rounded-full">
                    <svg
                      className="w-6 h-6 text-gray-700"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2L2 7l10 5 10-5-10-5zm0 9.27L3.11 7 12 3.73 20.89 7 12 11.27zM12 13l10-5v6l-10 5-10-5v-6l10 5z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
                <p className="text-gray-600 text-sm">{card.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="project" className="px-10 pt-20 pb-10">
          <div className="text-center w-full">
            <h1 className="font-bold text-2xl py-6">Our Awesome Project</h1>
            <p className="text-gray-700 pt-2 text-sm">Kami Solusi Ekspedisi Anda</p>
            <p className="text-gray-700 pt-3 text-sm w-[50%] mx-auto pb-6">
              Pengiriman ke seluruh Indonesia melalui darat, laut, dan udara dengan berbagai opsi pengiriman.
            </p>
          </div>
          <ServiceCards />
        </section>

        {/* Alamat */}
        <section id="alamat" className="py-10">
          <div className="bg-blue-500 w-full p-20">
            <div className="flex gap-10 w-[80%] mx-auto flex-col md:flex-row">
              <div>
                <Image
                  src="/images/alamat.png"
                  alt="Alamat Kantor"
                  width={500}
                  height={500}
                  className="rounded-4xl"
                />
              </div>

              <div className="text-white h-full my-auto">
                <h1 className="text-3xl font-bold py-5">Head Office</h1>
                <p className="text-md">JI. H.Baping Raya No.100 Ciracas - Jakarta Timur<br />
                  Odivening Hours Mon-Fri: 08:00-16:00<br />
                  Give us a Call 02187796010<br />
                  Send us a Message info@eurekalogistics.co.id</p>
              </div>
            </div>
          </div>

        </section>

        {/* Branch */}
        <section id="branch" className="py-10 px-10">
          <div className="w-full">
            <h1 className="font-bold text-2xl text-center">Cabang</h1>
            <p className="text-gray-500 pt-8 text-sm text-center">Kami membuka banyak cabang dari berbagai daerah di Indonesia</p>
          </div>

          <Branch />
        </section>
      </main>

      <Footer />
    </>
  );
}
