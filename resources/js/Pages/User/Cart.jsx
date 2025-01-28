import UserLayout from "../../Layouts/UserLayout"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass, faCircleMinus, faCirclePlus } from "@fortawesome/free-solid-svg-icons"
import { router } from "@inertiajs/react"

const Cart = ({products}) => {

    console.log(products)

    const handlePlusChange = (e, productId, quantity) => {
        e.preventDefault()
        quantity += 1
        console.log(quantity)
        router.post(`/user/products/${productId}`, {
            quantity: quantity,
            _method: "put",
        })
    }

    const handleMinusChange = (e, productId, quantity) => {
        e.preventDefault()
        quantity -= 1
        console.log(quantity)
        router.post(`/user/products/${productId}`, {
            quantity: quantity,
            _method: "put",
        })
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
                            <th>Produk</th>
                            <th>Harga</th>
                            <th>Jumlah</th>
                            <th>Total</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((product, i) => (
                                <tr key={i}>
                                    <td className="p-3 flex justify-center items-center"><img src={product.image} alt="" className="h-7"/></td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.pivot.quantity}</td>
                                    <td>{product.price * product.pivot.quantity}</td>
                                    <td>
                                        <div className="flex justify-center items-center mx-3 gap-3">
                                            <FontAwesomeIcon onClick={(e) => handleMinusChange(e, product.id, product.pivot.quantity)} icon={faCircleMinus} className={`${product.pivot.quantity===0 && 'pointer-events-none text-gray-500'} size-5 hover:text-gray-700 cursor-pointer`}/>
                                            <h1 className="text-md">{product.pivot.quantity}</h1>
                                            <FontAwesomeIcon onClick={(e) => handlePlusChange(e, product.id, product.pivot.quantity)} icon={faCirclePlus} className={`${product.pivot.quantity===product.quantity && 'pointer-events-none text-gray-500'} size-5 hover:text-gray-700 cursor-pointer`}/>
                                        </div>
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

export default Cart