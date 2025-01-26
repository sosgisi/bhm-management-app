import AdminLayout from "../../../Layouts/AdminLayout"
import { Link, router, useForm } from '@inertiajs/react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"

const Index = ({products}) => {

    const [kebabClicked, setKebabClicked] = useState({})
    // const {delete: destroy} = useForm()

    const toggleKebabMenu = (productId) => {
        setKebabClicked(prevState => ({
            ...prevState,
            [productId]: !prevState[productId]
        }));
    };

    const handleDelete = (e, productId) => {
        e.preventDefault()
        if (confirm('Are you sure you want to delete this product?')) {
            router.post(`/admin/products/${productId}`, {
                _method: "delete", // Explicitly send the DELETE method
            });
        }
    }

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
                                    <td className="relative">
                                        <FontAwesomeIcon icon={faEllipsisVertical} onClick={() => toggleKebabMenu(product.id)} className="size-5 hover:bg-gray-300 rounded-full p-1"/>
                                        {
                                            kebabClicked[product.id] && (
                                            <div className="absolute flex flex-col w-20 gap-1 bg-black bg-opacity-50 top-0 right-12 text-white rounded">
                                                <Link href={`/admin/products/${product.id}/edit`} className="bg-gray-button hover:bg-gray-button-darker rounded">Edit</Link>
                                                <button onClick={(e) => handleDelete(e, product.id)} className="bg-red-button hover:bg-red-button-darker rounded">Delete</button>
                                            </div> )
                                        }
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    )
}

export default Index