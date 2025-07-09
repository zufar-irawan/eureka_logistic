import Image from "next/image"
import Link from "next/link"

const Header = () => {
    return (
        <>
            <header className="fixed flex p-5 items-center justify-between w-full bg-white z-50 shadow-2xl">
                <Link href="#">
                    <Image
                        src="/images/logo.png"
                        alt="Eureka Logistic Logo"
                        width={100}
                        height={100}
                    />
                </Link>

                <nav>
                    <ul className="flex gap-6">
                        <li className="text-gray-500 hover:text-blue-600"><Link href="#beranda">Beranda</Link></li>
                        <li className="text-gray-500 hover:text-blue-600"><Link href="#project">Service</Link></li>
                        <li className="text-gray-500 hover:text-blue-600"><Link href="#alamat">Kontak</Link></li>
                        <li className="text-gray-500 hover:text-blue-600"><Link href="#branch">Cabang</Link></li>
                        <li className="text-gray-500 hover:text-blue-600"><Link href="#operasional">Operasional</Link></li>
                    </ul>
                </nav>
            </header>
        </>
    )
}

export default Header