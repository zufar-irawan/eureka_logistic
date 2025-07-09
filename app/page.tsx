import Header from "@/components/header"
import Footer from "@/components/Footer";
import ServiceCards from "@/components/services";
import Privacy from "../components/Privacy";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[600px] bg-[url('/images/Background1.jpeg')] bg-cover bg-center bg-no-repeat">
          <div className="absolute inset-0 bg-black bg-opacity-70" />
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
            <h1 className="text-5xl font-bold mb-4">Start Your Journey with Eureka!Logistic.</h1>
            <p className="text-lg text-gray-300 max-w-2xl">
              This is a simple example of a Landing Page you can build using Material Tailwind.
              It features multiple components based on the Tailwind CSS and Material Design by Google.
            </p>
          </div>
        </section>

        {/* Feature Cards - floating tanpa bg section */}
        <section className="-mt-[100px] pb-20 relative z-20 overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Awarded Agency",
                desc: "Divide details about your product or agency work into parts. A paragraph describing a feature will be enough.",
              },
              {
                title: "Free Revisions",
                desc: "Keep you user engaged by providing meaningful information. Remember that by this time, the user is curious.",
              },
              {
                title: "Verified Company",
                desc: "Write a few lines about each one. A paragraph describing a feature will be enough. Keep you user engaged!",
              },
            ].map((card, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-xl shadow-xl text-center hover:shadow-2xl transition"
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

        {/* Project */}
        <section id="project" className="px-10 pt-20 pb-10">
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

        {/* Alamat */}
        <section id="alamat" className="py-10">
          <div className="bg-blue-500 w-full p-20">
            <div className="flex gap-10 w-[80%] mx-auto">
              <div>
                <Image
                  src="/images/alamat.png"
                  alt="Alamat.png"
                  width={500}
                  height={500}
                  className="rounded-4xl"
                />
              </div>

              <div className="text-white h-full my-auto">
                <h1 className="text-3xl font-bold py-5">Alamat Kantor</h1>
                <p className="text-md">JI. H.Baping Raya No.100 Ciracas - Jakarta Timur<br />
                  Odivening Hours Mon-Fri: 08:00-16:00<br />
                  Give us a Call 02187796010<br />
                  Send us a Message info@eurekalogistics.co.id</p>
              </div>


            </div>
          </div>

        </section>
      </main>
      <Footer />
    </>
  );
}
