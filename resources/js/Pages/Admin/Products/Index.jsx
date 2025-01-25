import AdminLayout from "../../../Layouts/AdminLayout"
import { Link } from '@inertiajs/react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass, faCircleMinus, faCirclePlus, faSquarePlus, faCartPlus } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"

const Index = () => {

    const [sumOfItem, setSumOfItem] = useState(1)

    return(
        <AdminLayout>
            <div className='px-8 py-5 flex justify-between items-center'>
                <h1 className='text-3xl font-bold'>Semua Produk</h1>
                <Link href="/admin/products/create" className='py-1 px-3 text-white font-bold bg-gray-button rounded-md shadow-lg hover:bg-gray-button-darker transform duration-300'>Tambah produk</Link>
            </div>
            <div className="relative ml-8">
                <input type="text" placeholder="Cari" className="py-2 px-4 pl-10 w-1/2 rounded focus:outline-none focus:border-black border shadow bg-gray-300" />
                <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute top-3 left-3 text-gray-400"/>
            </div>
            <div className="p-8">
                <table className="rounded shadow-xl w-full text-center">
                    <thead className="bg-gray-300 font-bold text-gray-800">
                        <tr>
                            <th className="py-1 px-3">Foto</th>
                            <th>Nama</th>
                            <th>Harga</th>
                            <th>Jumlah</th>
                            <th>Kuantitas</th>
                            <th>Status</th>
                            <th>Keranjang</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="p-3 flex justify-center items-center"><img src="/assets/logo.png" alt="" className="w-7 h-7 bg-black"/></td>
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
                                <div className="flex justify-center gap-3 items-center mx-3">
                                    <FontAwesomeIcon onClick={() => setSumOfItem((prevSum) => prevSum-1)} icon={faCircleMinus} className={`${sumOfItem===1 && 'pointer-events-none text-gray-500'} size-5 hover:text-gray-700 cursor-pointer`}/>
                                    <h1 className="text-xl">{sumOfItem}</h1> 
                                    <FontAwesomeIcon onClick={() => setSumOfItem((prevSum) => prevSum+1)} icon={faCirclePlus} className={`size-5 hover:text-gray-700 cursor-pointer`}/>
                                </div>
                            </td>
                            <td>
                                <FontAwesomeIcon icon={faCartPlus} className="size-7  text-green-button hover:text-green-button-darker cursor-pointer" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    )
}

export default Index