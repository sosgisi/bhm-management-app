import GuestLayout from "../../Layouts/GuestLayout"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass, faCirclePlus, faCircleMinus } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"

const Products = ({products}) => {

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
            <div className="p-8">
                <table className="rounded shadow-xl w-full text-center">
                    <thead className="bg-gray-300 font-bold text-gray-800">
                        <tr>
                            <th className="py-1 px-3">Foto</th>
                            <th>Nama</th>
                            <th>Harga</th>
                            <th></th>
                            <th>Kuantitas</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((product, i) => (
                                <tr key={i}>
                                    <td className="p-3 flex justify-center items-center"><img src={product.image} alt="" className="h-7"/></td>
                                    <td className="hover:underline cursor-pointer">{product.name}</td>
                                    <td>Rp. {product.price}</td>
                                    <td>/{product.unit}</td>
                                    <td>{product.quantity}</td>
                                    <td>
                                        <div className={`flex justify-center items-center ${product.quantity>0 ? 'bg-green-area' : 'bg-red-area'} rounded-full py-1`}>
                                            { product.quantity > 0 
                                             ? 'in stock'
                                             : 'out of stock'
                                            }
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </GuestLayout>
    )
}

export default Products