import { Link } from "@inertiajs/react"
import GuestLayout from "../../Layouts/GuestLayout"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass, faCirclePlus, faCircleMinus } from "@fortawesome/free-solid-svg-icons"
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons"
import { useState } from "react"

const Products = () => {

    const [sumOfItem, setSumOfItem] = useState(1)

    return(
        <GuestLayout>
            <div className='px-8 py-5 flex justify-between items-center'>
                <h1 className='text-3xl font-bold'>Semua Produk</h1>
            </div>
            <div className="relative ml-8">
                <input type="text" placeholder="Cari" className="py-2 px-4 pl-10 w-1/2 rounded focus:outline-none focus:border-black border shadow bg-gray-300" />
                <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute top-3 left-3 text-gray-400"/>
            </div>
            <div className="p-10">
                <table className="rounded shadow-xl w-full">
                    <thead className="bg-gray-300 font-bold text-gray-800">
                        <tr>
                            <td className="py-1 px-3">Foto</td>
                            <td>Nama</td>
                            <td>Harga</td>
                            <td>Jumlah</td>
                            <td>Kuantitas</td>
                            <td>Status</td>
                            <td>Keranjang</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="p-3"><img src="/assets/logo.png" alt="" className="w-7 h-7 bg-black"/></td>
                            <td className="hover:underline cursor-pointer">Cat kuda terbang</td>
                            <td>Rp. 12.000</td>
                            <td>1</td>
                            <td>32</td>
                            <td>
                                <div className="flex justify-center items-center bg-green-area rounded-full py-1">
                                    in stock
                                </div>
                            </td>
                            <td>
                                <div className="flex justify-between items-center mx-3">
                                    <div className="flex gap-3 items-center">
                                        <FontAwesomeIcon onClick={() => setSumOfItem((prevSum) => prevSum-1)} icon={faCircleMinus} className={`${sumOfItem===1 && 'pointer-events-none text-gray-500'} size-5 hover:text-gray-700 cursor-pointer`}/>
                                        <h1 className="text-xl">{sumOfItem}</h1> 
                                        <FontAwesomeIcon onClick={() => setSumOfItem((prevSum) => prevSum+1)} icon={faCirclePlus} className={`size-5 hover:text-gray-700 cursor-pointer`}/>
                                    </div>
                                    <FontAwesomeIcon icon={faSquarePlus} className="size-6 hover:text-green-button cursor-pointer" />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </GuestLayout>
    )
}

export default Products