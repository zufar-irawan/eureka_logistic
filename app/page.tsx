'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Header from '@/components/header';
import Footer from '@/components/Footer';
import Branch from '@/components/Branch'
import ServiceCards from '@/components/services';
import 'remixicon/fonts/remixicon.css';
import Link from 'next/link';

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
        <section id="beranda" className="relative h-[600px] text-white text-center px-4 overflow-hidden">
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

          <div className="relative flex flex-col items-center justify-center h-full">
            <h1 className="text-5xl font-bold mb-4">
              Start Your Journey with Eureka!Logistic.
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl">
              Kami Solusi Ekspedisi Anda
            </p>
          </div>
        </section>

        {/* Floating Cards */}
        <section className="-mt-[120px] pb-10 relative z-40 overflow-hidden">
          <div className="max-w-6xl pt-5 mx-auto px-4 grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Jalur Darat",
                desc: "Pelayanan darat dengan berbagai jenis kendaraan dilengkapi GPS & ERP.",
                icon: "ri-truck-fill text-gray-800 text-xl"
              },
              {
                title: "Jalur Laut",
                desc: "Pengiriman luar Jawa dengan kapal Roro, Pelni, cargo melalui DTD, DTP, PTD, PTP.",
                icon: "ri-ship-2-fill text-gray-800 text-xl"
              },
              {
                title: "Jalur Udara",
                desc: "Transportasi udara untuk pengiriman nasional & internasional.",
                icon: "ri-flight-takeoff-fill text-gray-800 text-xl"
              },
            ].map((card, idx) => (
              <div
                key={idx}
                className="
                  bg-white p-6 rounded-xl shadow-xl 
                  text-center transform transition 
                  duration-300 hover:scale-110 
                  hover:shadow-2xl
                ">
                <div className="flex justify-center mb-4">
                  <div className="bg-gray-200 py-2 px-3 rounded-full">
                    <i className={card.icon}></i>
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
                <p className="text-gray-600 text-sm">{card.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Our Project */}
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

        {/* Operasional */}
        <section id="operasional" className="py-10">
          <div className="w-full bg-blue-500 py-10">

            <div className='text-center mb-10'>
              <h3 className="text-md text-white">Opening Hours</h3>
              <h3 className="font-bold text-2xl text-white">Head Office</h3>
            </div>

            <div className="grid grid-cols-2 w-[50%] mx-auto text-center">
              <div>
                <h3 className="text-xl text-gray-200">Monday - Friday</h3>
              </div>

              <div>
                <h3 className="text-xl text-gray-200">08:00 - 16:00</h3>
              </div>
            </div>
          </div>
        </section>

        {/* hook */}
        <section id="hook" className="py-10 pb-20 px-10">
          <div className='w-full'>
            <div className='flex gap-18 w-[90%] mx-auto flex-col md:flex-row'>
              <div className='py-2'>
                <h1 className="font-bold text-2xl text-gray-800 pb-2">
                  Ayo Tunggu Apa Lagi, Gabung Bersama
                </h1>
                <h1 className='font-bold text-4xl text-gray-800 pb-4'>
                  Eureka <span className='text-blue-500'>Logistics</span><span className='text-red-400'>!</span>
                </h1>
                <p className="text-md text-gray-800 mb-8">
                  Solusi logistik untuk perusahaan yang
                  memproduksi dan mendistribusikan produknya
                  di Indonesia
                </p>

                <Link href={'#alamat'} className='
                  text-white bg-blue-500 px-15 py-4 rounded-xl
                  transition-all ease-in-out hover:bg-blue-700
                '>
                  Contact Us
                </Link>
              </div>

              <div>
                <Image
                  src="/images/container.jpg"
                  alt='Container'
                  width={500}
                  height={500}
                  className='rounded-2xl'
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
