import { router, useForm } from "@inertiajs/react"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleMinus, faCirclePlus, faPlusSquare } from "@fortawesome/free-solid-svg-icons"

const ListView = ({products, role}) => {

    const [tempAmount, setTempAmount] = useState(() => new Array(products.data.length).fill(1))
    const { setData, post} = useForm({
        quantity: 1
    })

    const handleAddProduct = (productId) => {
        post(`/admin/incomes/products/${productId}`, {
            onSuccess: () => {
                setData('quantity', 1)
                setTempAmount(() => new Array(products.data.length).fill(1))
            }
        })
    }

    const handleDetailedProduct = (productId) => {
        let path = 'guest'
        if(role === 'Admin'){
            path = 'admin'
        }else if(role === 'User'){
            path = 'user'
        }
        router.post(`/${path}/products/${productId}`, {
            _method: "get"
        })
    }

    const handleMinus = (i) => {
        setTempAmount((prevArray) => {
            const newArray = [...prevArray]
            newArray[i] = newArray[i]-1
            return newArray
        })
        setData('quantity', tempAmount[i]-1)
    }

    const handlePlus = (i) => {
        setTempAmount((prevArray) => {
            const newArray = [...prevArray]
            newArray[i] = newArray[i]+1
            return newArray
        })
        setData('quantity', tempAmount[i]+1)
    }

    return(
        <div className="p-4 md:p-8 overflow-x-auto">
            <table className="rounded-xl shadow-md w-full text-center border-collapse border border-gray-200">
                <thead className="bg-gray-200 font-bold text-gray-800">
                    <tr>
                        <th className="py-2 px-3 border">Foto</th>
                        <th className="border">Nama</th>
                        <th className="border">Harga</th>
                        <th className="border"></th>
                        <th className="border">Kuantitas</th>
                        <th className="border">Status</th>
                        { role === 'Admin' &&
                            <>
                                <th className="border">Tambah</th>
                                <th className="border"></th>
                            </>
                        }
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {products.data.map((product, i) => (
                        <tr key={i} className="border-b hover:bg-gray-100">
                            <td className="p-3 flex justify-center items-center border px-3"><img src={product.image} alt={product.name} className="h-10 w-10 object-cover"/></td>
                            <td onClick={() => handleDetailedProduct(product.id)} className="border px-3 hover:underline cursor-pointer truncate max-w-40">{product.name}</td>
                            <td className="border px-3">Rp {new Intl.NumberFormat('id-ID').format(product.price)}</td>
                            <td className="border px-3">/{product.unit}</td>
                            <td className="border px-3 truncate max-w-5">{product.quantity}</td>
                            <td className="border px-3">
                                <span className={`px-3 py-1 rounded-full text-white ${product.quantity > 0 ? 'bg-green-500' : 'bg-red-500'} whitespace-nowrap overflow-hidden text-ellipsis`}>
                                    {product.quantity > 0 ? 'In stock' : 'Out of stock'}
                                </span>
                            </td>
                            { role === 'Admin' &&
                                <>
                                    <td className="border px-3">
                                        <div className="flex justify-center items-center gap-2">
                                            <FontAwesomeIcon onClick={() => handleMinus(i)} icon={faCircleMinus} className={`size-5 cursor-pointer ${tempAmount[i] === 1 ? 'text-gray-400 pointer-events-none' : 'hover:text-gray-700'}`}/>
                                            <span className="text-md">{tempAmount[i]}</span>
                                            <FontAwesomeIcon onClick={() => handlePlus(i)} icon={faCirclePlus} className={`size-5 cursor-pointer ${tempAmount[i] === product.quantity ? 'text-gray-400 pointer-events-none' : 'hover:text-gray-700'}`}/>
                                        </div>
                                    </td>
                                    <td className="border px-3">
                                        <FontAwesomeIcon icon={faPlusSquare} onClick={() => handleAddProduct(product.id)} className={`size-6 text-green-500 hover:text-green-700 ${product.quantity === 0 ? 'text-gray-400 pointer-events-none' : ''}`}/>
                                    </td>
                                </>
                            }
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ListView