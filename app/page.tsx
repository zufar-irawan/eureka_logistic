import Image from "next/image";
import Header from "@/components/header";
import ServiceCards from "@/components/services";

export default function Home() {
  return (
    <>
      <Header />

      <main className="pt-20">



        {/* Project */}
        <section id="project" className="px-10 py-5">
          <div className="text-center w-full">
            <h1 className="font-bold text-2xl py-6">Our Awesome Project</h1>
            <p className="text-gray-700 pt-2 text-sm">Kami Solusi Ekspedisi Anda</p>
            <p className="text-gray-700 pt-3 text-sm w-[50%] mx-auto pb-6">
              Pelayanan pengiriman dari dan ke seluruh indonesia
              melalui darat, laut dan udara dengan waktu kirim cepat
              maupun kirim regular, kirim dari gudang ke gudang,
              kirim dari pelabuhan ke gudang atau kirim dari gudang
              ke pelabuhan serta kirim dari pelabuhan ke pelabuhan.
            </p>
          </div>


          <ServiceCards />

        </section>
      </main>
    </>
  )
}
