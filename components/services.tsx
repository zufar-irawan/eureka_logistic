"use client"

import Image from "next/image"
import { title } from "process"

const ServiceCards = () => {
    const services = [
        {
            id: 1,
            title: "Trucking",
            description: "Pelayanan Pengiriman barang dalam satu unit penuh kendaraan (Full Charter Service)",
            icon: (
                <Image
                    src="/images/delivery-truck.png"
                    alt="Delivery Truck"
                    width={50}
                    height={50}
                />
            )
        },
        {
            id: 2,
            title: "Regular",
            description: "Pelayanan pengiriman cepat, aman, dan handal seperti kirim dokumen, kirim surat dan kirim barang paket keseluruh wilayah Indonesia.",
            icon: (
                <Image
                    src="/images/regular-truck.png"
                    alt="Regular Truck"
                    width={50}
                    height={50}
                />
            )
        },
        {
            id: 3,
            title: "Project Logistics",
            description: "Pengiriman ke seluruh Indonesia menggunakan semua jenis kendaraan melalui jalur darat, laut, maupun udara.",
            icon: (
                <Image
                    src="/images/logistic-truck.png"
                    alt="Logistic Truck"
                    width={50}
                    height={50}
                />
            )
        },
        {
            id: 4,
            title: "Movers (Jasa Pindahan)",
            description: "Pelayanan membantu proses pindahan anda, baik untuk keperluan residensial (rumah, apartemen, kost) maupun komersial (kantor, ruko , gudang , pabrik) ke seluruh Indonesia.",
            icon: (
                <Image
                    src="/images/movers.png"
                    alt="Movers Truck"
                    width={50}
                    height={50}
                />
            )
        }
    ]

    return (
        <div className="pt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
                <div key={service.id}
                    className="
                        bg-white border border-gray-200 
                        rounded-lg p-6 hover:shadow-lg duration-300 
                        cursor-pointer hover:border-gray-300
                        hover:bg-blue-100 transition-all
                    ">
                    <div className="flex justify-center mb-4">
                        {service.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 text-center">
                        {service.title}
                    </h3>
                    <p className="text-sm text-gray-600 text-justify leading-relaxed">
                        {service.description}
                    </p>
                </div>
            ))}
        </div>
    )
}

export default ServiceCards