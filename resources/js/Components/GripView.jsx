import { faCircleMinus, faCirclePlus, faPlusSquare } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { router, useForm } from "@inertiajs/react"
import { useState } from "react"

const GripView = ({products}) => {

    const [tempAmount, setTempAmount] = useState(() => new Array(products.data.length).fill(1))
    const { setData, post} = useForm({
        quantity: 1
    })

    const handleDetailedProduct = (productId) => {
        router.post(`/admin/products/${productId}`, {
            _method: "get"
        })
    }

    const handleAddProduct = (productId) => {
        post(`/admin/incomes/products/${productId}`, {
            onSuccess: () => {
                setData('quantity', 1)
                setTempAmount(() => new Array(products.data.length).fill(1))
            }
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
        <div className="p-4 md:p-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            { products.data.map((product, i) => (
                <div key={i} className="bg-white rounded flex flex-col justify-between">
                    <div>
                        <img src={product.image} alt={product.name} className="w-full h-20 object-cover rounded-t"/>
                        <div className="p-2 flex flex-col justify-between gap-3">
                            <div onClick={() => handleDetailedProduct(product.id)} className="cursor-pointer hover:underline flex flex-col gap-1">
                                <h1 className="text-sm font-bold">{product.name}</h1>
                                <h1 className="text-sm">Rp {new Intl.NumberFormat('id-ID').format(product.price)} /{product.unit}</h1>
                                <h1 className="text-xs text-gray-500">{product.description}</h1>
                                <h1 className="text-sm flex items-center">
                                    <span className={`px-2 rounded-full text-white ${product.quantity > 0 ? 'bg-green-500' : 'bg-red-500'} whitespace-nowrap overflow-hidden text-ellipsis`}>
                                        {product.quantity > 0 ? 'In stock' : 'Out of stock'}
                                    </span>
                                </h1>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between text-sm p-2">
                        <div className="flex justify-center items-center gap-2">
                            <FontAwesomeIcon onClick={() => handleMinus(i)} icon={faCircleMinus} className={`size-5 cursor-pointer ${tempAmount[i] === 1 ? 'text-gray-400 pointer-events-none' : 'hover:text-gray-700'}`}/>
                            <span className="text-md">{tempAmount[i]}</span>
                            <FontAwesomeIcon onClick={() => handlePlus(i)} icon={faCirclePlus} className={`size-5 cursor-pointer ${tempAmount[i] === product.quantity ? 'text-gray-400 pointer-events-none' : 'hover:text-gray-700'}`}/>
                        </div>
                        {/* <button onClick={() => handleAddProduct(product.id)} className={`bg-green-500 text-white rounded hover:bg-green-300 px-2 ${product.quantity === 0 ? 'bg-gray-400 pointer-events-none' : ''}`}>Add</button> */}
                        <FontAwesomeIcon icon={faPlusSquare} onClick={() => handleAddProduct(product.id)} className={`size-6 text-green-500 hover:text-green-700 ${product.quantity === 0 ? 'text-gray-400 pointer-events-none' : ''}`}/>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default GripView