import AdminLayout from "../../Layouts/AdminLayout"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass, faCircleMinus, faCirclePlus, faCalendarDays } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"

const Income = () => {

    const [sumOfItem, setSumOfItem] = useState(1)

    return(
        <AdminLayout>
            <h1 className="text-3xl font-bold mx-8 my-5">Pemasukan - Hari ini</h1>
            <div className="relative ml-8">
                <input type="text" placeholder="Cari" className="py-2 px-4 pl-10 w-1/2 rounded focus:outline-none focus:border-black border shadow bg-gray-300" />
                <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute top-3 left-3 text-gray-400"/>
            </div>
            <div className="p-8 flex flex-col justify-between gap-10">
                <table className="table-auto w-full shadow-xl rounded-xl text-center">
                    <thead className="bg-gray-300 font-bold text-gray-800">
                        <tr>
                            <th></th>
                            <th>Produk</th>
                            <th>Harga</th>
                            <th>Jumlah</th>
                            <th>Total</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="p-3"><img src="/assets/logo.png" alt="" className="w-7 h-7 bg-black"/></td>
                            <td className="hover:underline cursor-pointer">Cat kuda terbang</td>
                            <td>Rp. 12.000</td>
                            <td>2</td>
                            <td>Rp. 24.000</td>
                            <td>
                                <div className="flex justify-center items-center gap-3 mx-3">
                                    <FontAwesomeIcon onClick={() => setSumOfItem((prevSum) => prevSum-1)} icon={faCircleMinus} className={`${sumOfItem===1 && 'pointer-events-none text-gray-500'} size-5 hover:text-gray-700 cursor-pointer`}/>
                                    <h1 className="text-xl">{sumOfItem}</h1> 
                                    <FontAwesomeIcon onClick={() => setSumOfItem((prevSum) => prevSum+1)} icon={faCirclePlus} className={`size-5 hover:text-gray-700 cursor-pointer`}/>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="flex justify-end items-center gap-5">
                    <div className="flex gap-2 justify-center items-center">
                        <h3>Tanggal: </h3>
                        <h3 className="bg-gray-400 px-8 rounded">today</h3>
                        <FontAwesomeIcon icon={faCalendarDays} />
                    </div>
                    <button className="bg-green-button text-white font-bold rounded py-1 px-10 hover:bg-green-button-darker">Simpan</button>
                </div>
            </div>
        </AdminLayout>
    )
}

export default Income