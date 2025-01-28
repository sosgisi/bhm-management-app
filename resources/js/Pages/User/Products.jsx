import UserLayout from "../../Layouts/UserLayout"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass, faCircleMinus, faCirclePlus, faCartPlus } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import { useForm, usePage } from "@inertiajs/react"

const Products = ({products}) => {

    const [tempAmount, setTempAmount] = useState(() => new Array(products.length).fill(1))
    const { data, setData, post } = useForm({
        'quantity': 1
    })

    const handleAddToCart = (e, productId) => {
        console.log('productId ', productId)
        console.log('data on click ', data)
        e.preventDefault()
        post(`/user/products/${productId}`, {
            onSuccess: () => {
                setTempAmount(() => new Array(products.length).fill(1))
                setData('quantity', 1)
            }
        })
    }

    const handlePlus = (e, i) => {
        e.preventDefault()
        setTempAmount((prevArray) => {
            const newArray = [...prevArray]
            newArray[i] = newArray[i] + 1
            return newArray
        })
        setData('quantity', tempAmount[i]+1)
    }

    const handleMinus = (e, i) => {
        e.preventDefault()
        setTempAmount((prevArray) => {
            const newArray = [...prevArray]
            newArray[i] = newArray[i] - 1
            return newArray
        })
        setData('quantity', tempAmount[i]-1)
    }

    return(
        <UserLayout>
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
                            <th>Keranjang</th>
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
                                    <td>
                                        <div className="flex justify-center items-center mx-3 gap-3">
                                            <FontAwesomeIcon onClick={(e) => handleMinus(e, i)} icon={faCircleMinus} className={`${tempAmount[i]===1 && 'pointer-events-none text-gray-500'} size-5 hover:text-gray-700 cursor-pointer`}/>
                                            <h1 className="text-md">{tempAmount[i]}</h1>
                                            <FontAwesomeIcon onClick={(e) => handlePlus(e, i)} icon={faCirclePlus} className={`${tempAmount[i]===product.quantity && 'pointer-events-none text-gray-500'} size-5 hover:text-gray-700 cursor-pointer`}/>
                                        </div>
                                    </td>
                                    <td>
                                        <FontAwesomeIcon onClick={(e) => handleAddToCart(e, product.id)} icon={faCartPlus} className="size-7  text-green-button hover:text-green-button-darker cursor-pointer mr-2" />
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </UserLayout>
    )
}

export default Products