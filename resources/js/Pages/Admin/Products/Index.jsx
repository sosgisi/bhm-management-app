import AdminLayout from "../../../Layouts/AdminLayout"
import { Link, router, useForm, usePage } from '@inertiajs/react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass, faPlusCircle, faCircleMinus, faCirclePlus, faPlusSquare } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"

const Index = ({products}) => {

    console.log(products)

    const [tempAmount, setTempAmount] = useState(() => new Array(products.length).fill(1))

    const {flash} = usePage().props
    const {data, setData, post} = useForm({
        'quantity' : 1
    })

    useEffect(() => {
        console.log(flash)
    }, [flash])

    const handleAddProduct = (e, productId) => {
        e.preventDefault()
        post(`/admin/incomes/products/${productId}`, {
            onSuccess: () => {
                setData('quantity', 1)
                setTempAmount(() => new Array(products.length).fill(1))
            }
        })
    }

    const handleDetailedProduct = (e, productId) => {
        e.preventDefault()
        router.post(`/admin/products/${productId}`, {
            _method: "get"
        })
    }

    const handleMinus = (e, i) => {
        e.preventDefault()
        setTempAmount((prevArray) => {
            const newArray = [...prevArray]
            newArray[i] = newArray[i]-1
            return newArray
        })
        setData('quantity', tempAmount[i]-1)
    }

    const handlePlus = (e, i) => {
        e.preventDefault()
        setTempAmount((prevArray) => {
            const newArray = [...prevArray]
            newArray[i] = newArray[i]+1
            return newArray
        })
        setData('quantity', tempAmount[i]+1)
    }

    return(
        <AdminLayout>
            <div className='px-8 py-5 flex justify-between items-center'>
                <h1 className='text-3xl font-bold'>Semua Produk</h1>
                <Link href='/admin/product/create' className='py-1 px-3 text-white font-bold bg-gray-button rounded-md shadow-lg hover:bg-gray-button-darker transform duration-300'>Tambah produk</Link>
            </div>
            <div className="relative ml-8">
                <input type="text" placeholder="Cari" className="py-2 px-4 pl-10 w-1/2 rounded focus:outline-none focus:border-black border shadow bg-gray-300" />
                <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute top-3 left-3 text-gray-400"/>
            </div>
            <div className="p-8">
                <table className="rounded-xl shadow-xl w-full text-center">
                    <thead className="bg-gray-300 font-bold text-gray-800">
                        <tr>
                            <th className="py-1 px-3">Foto</th>
                            <th>Nama</th>
                            <th>Harga</th>
                            <th></th>
                            <th>Kuantitas</th>
                            <th>Status</th>
                            <th>Tambah</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {
                            products.map((product, i) => (
                                <tr key={i}>
                                    <td className="p-3 flex justify-center items-center"><img src={`/storage/${product.image}`} alt="" className="h-7"/></td>
                                    <td onClick={(e) => handleDetailedProduct(e, product.id)} className="hover:underline cursor-pointer">{product.name}</td>
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
                                    <td>
                                        {
                                            <div className="flex justify-center items-center mx-3 gap-3">
                                                <FontAwesomeIcon onClick={(e) => handleMinus(e, i)} icon={faCircleMinus} className={`${tempAmount[i]===1 && 'pointer-events-none text-gray-500'} size-5 hover:text-gray-700 cursor-pointer`}/>
                                                <h1 className="text-md">{tempAmount[i]}</h1>
                                                <FontAwesomeIcon onClick={(e) => handlePlus(e, i)} icon={faCirclePlus} className={`${tempAmount[i]===product.quantity && 'pointer-events-none text-gray-500'} size-5 hover:text-gray-700 cursor-pointer`}/>
                                            </div>
                                        }
                                    </td>
                                    <td>
                                        <div className="flex justify-center items-center">
                                            <FontAwesomeIcon icon={faPlusSquare} onClick={(e) => handleAddProduct(e, product.id)} className={`${product.quantity === 0 && 'pointer-events-none text-gray-400'} size-6 text-green-button hover:text-green-button-darker`}/>
                                        </div>
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