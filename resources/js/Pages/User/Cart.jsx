import UserLayout from "../../Layouts/UserLayout"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass, faCircleMinus, faCirclePlus } from "@fortawesome/free-solid-svg-icons"
import { router, usePage } from "@inertiajs/react"
import { useEffect, useRef, useState } from "react"

const Cart = ({products}) => {
    console.log(products)

    const { flash } = usePage().props
    const [checkedProducts, setCheckedProducts] = useState([])

    const handleProductChecked = (e, index, quantity) => {
        const checked = e.target.checked
        if(checked){
            // setTotal((prevTotal) => {
            //     let totalCopy = prevTotal
            //     totalCopy += products[index].price * quantity
            //     return totalCopy
            // })
            setCheckedProducts((prevProducts) => {
                const productsCopy = [...prevProducts]
                productsCopy.push({ 
                    id: products[index].id, 
                    quantity,
                    total: products[index].price * quantity
                })
                return productsCopy
            })
        }else{
            setCheckedProducts((prevProducts) => {
                // prevProducts.filter((item) => item.id !== products[index].id)
                const productsCopy = [...prevProducts]
                const filteredProducts = productsCopy.filter((item) => item.id !== products[index].id)
                return filteredProducts
            })
        }
    }
    
    const handleOrder = (e) => {
        e.preventDefault()
        let total = 0
        checkedProducts.map((product) => {
            total += product.total
        })
        router.post('/user/orders', {
            products: checkedProducts,
            total: total,
        }, {
            onSuccess: () => {
                setCheckedProducts([])
            }
        })
    }

    useEffect(() => {
        console.log('checkedProducts ', checkedProducts)
    }, [checkedProducts])
    useEffect(() => {
        console.log('flash ', flash)
    }, [flash])

    const handlePlusChange = (e, index, productId, quantity) => {
        e.preventDefault()
        quantity += 1
        console.log(quantity)
        if(checkedProducts[index]){
            setCheckedProducts((prevProducts) => {
                const productsCopy = [...prevProducts]
                productsCopy[index].total = products[index].price * quantity
                productsCopy[index].quantity = quantity
                return productsCopy
            })
        }
        router.post(`/user/products/${productId}`, {
            quantity: quantity,
            _method: "put",
        })
    }

    const handleMinusChange = (e, index, productId, quantity) => {
        e.preventDefault()
        quantity -= 1
        if(quantity===0){
            return router.post(`/user/products/${productId}`, {
                _method: "delete",
            })
        }
        if(checkedProducts[index]){
            setCheckedProducts((prevProducts) => {
                const productsCopy = [...prevProducts]
                productsCopy[index].total = products[index].price * quantity
                productsCopy[index].quantity = quantity
                return productsCopy
            })
        }
        router.post(`/user/products/${productId}`, {
            quantity: quantity,
            _method: "put",
        })
    }

    return(
        <UserLayout>
            <div className='px-8 py-5'>
                <h1 className='text-3xl font-bold'>Semua Produk</h1>
            </div>
            <div className="relative ml-8">
                <input type="text" placeholder="Cari" className="py-2 px-4 pl-10 w-1/2 rounded focus:outline-none focus:border-black border shadow bg-gray-300" />
                <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute top-3 left-3 text-gray-400"/>
            </div>
            <div className="p-8 flex flex-col items-end gap-10">
                <table className="rounded shadow-xl w-full text-center">
                    <thead className="bg-gray-300 font-bold text-gray-800">
                        <tr>
                            <th></th>
                            <th className="py-1 px-3">Foto</th>
                            <th>Produk</th>
                            <th>Harga</th>
                            <th>Kuantitas</th>
                            <th>Total</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((product, i) => (
                                <tr key={i}>
                                    <td className="p-3"><input type="checkbox" onChange={(e) => handleProductChecked(e, i, product.pivot.quantity)} /></td>
                                    <td className="p-3 flex justify-center items-center"><img src={`/storage/${product.image}`} alt="" className="h-7"/></td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.quantity}</td>
                                    <td>{product.price * product.pivot.quantity}</td>
                                    <td>
                                        <div className="flex justify-center items-center mx-3 gap-3">
                                            <FontAwesomeIcon onClick={(e) => handleMinusChange(e, i, product.id, product.pivot.quantity)} icon={faCircleMinus} className={`${product.pivot.quantity===0 && 'pointer-events-none text-gray-500'} size-5 hover:text-gray-700 cursor-pointer`}/>
                                            <h1 className="text-md">{product.pivot.quantity}</h1>
                                            <FontAwesomeIcon onClick={(e) => handlePlusChange(e, i, product.id, product.pivot.quantity)} icon={faCirclePlus} className={`${product.pivot.quantity===product.quantity && 'pointer-events-none text-gray-500'} size-5 hover:text-gray-700 cursor-pointer`}/>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                {
                    products.length !== 0 && <button onClick={handleOrder} className="py-1 pr-24 pl-3 text-white font-bold bg-green-button rounded-lg shadow-lg hover:bg-green-button-darker transform duration-200">Pesan</button>
                }
            </div>
        </UserLayout>
    )
}

export default Cart