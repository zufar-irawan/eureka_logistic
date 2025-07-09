const Branch = () => {
    const cabang = [
        {
            id: 1,
            title: "Semarang",
            alamat: "JI. Puspowarno Tengah No. 38-40 Semarang - Jawa Tengah.",
            kontak: (
                <>
                    <p>Telp: +62247621968</p>
                    <p>Email: infosmg@eurekalogistics.co.id</p>
                    <p>WA: 6281293941037</p>
                </>
            )
        },
        {
            id: 2,
            title: "Bandung",
            alamat: "JI Soerkarno-Hatta No.554 Bandung - Jawa Barat",
            kontak: (
                <>
                    <p>Telp: +62227507782</p>
                    <p>Email: infobdg@eurekalogistics.co.id</p>
                    <p>WA: 6287811048004</p>
                </>
            )
        },
        {
            id: 3,
            title: "Surabaya",
            alamat: "JI. berbek industri VII/15 Waru Sidoarjo (Komp Sier, Surabaya) Surabaya - Jawa Timur",
            kontak: (
                <>
                    <p>Telp: +62318664620</p>
                    <p>Email: infosby@eurekalogistics.co.id</p>
                    <p>WA: 6282244696077</p>
                </>
            )
        },
        {
            id: 4,
            title: "Yogyakarta",
            alamat: "JI Gedongkuning No. 132, Rejowinangun, Kec. Kotagede, Kota Yogyakarta, Daerah Istimewa Yogyakarta 55171",
            kontak: (
                <>
                    <p>Telp: +62247621968</p>
                    <p>Email: infosmg@eurekalogistics.co.id</p>
                    <p>WA: 6281293941037</p>
                </>
            )
        }
    ]

    return (
        <div className="pt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 w-[60%] mx-auto gap-6">
            {cabang.map((cabang) => (
                <div key={cabang.id} className="
                    bg-white border border-gray-200 
                    rounded-lg p-6 hover:shadow-lg duration-300 
                    hover:border-gray-300 transition-all
                    hover:rounded-4xl hover:scale-110
                ">
                    <h1 className="text-lg font-semibold text-gray-800 mb-3 text-center">
                        {cabang.title}
                    </h1>
                    <p className="text-sm text-gray-600 text-justify leading-relaxed">
                        {cabang.alamat}
                    </p>
                    <div className="text-sm text-gray-600 text-justify leading-relaxed mt-8">
                        {cabang.kontak}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Branch