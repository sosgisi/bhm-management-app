import AdminLayout from "../../Layouts/AdminLayout"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass, faCircleMinus, faCirclePlus, faCalendarDays } from "@fortawesome/free-solid-svg-icons"
import { router } from "@inertiajs/react"

const DetailedIncome = ({income}) => {

    console.log(income)

    const handleMinusChange = (e, productId, quantity) => {
        e.preventDefault()
        quantity -= 1
        if(quantity===0){
            return router.post(`/admin/incomes/products/${productId}`, {
                _method: "delete"
            })
        }
        router.post(`/admin/incomes/products/${productId}`, {
            quantity: quantity,
            _method: "put"
        })
    }

    const handlePlusChange = (e, productId, quantity) => {
        e.preventDefault()
        quantity += 1
        router.post(`/admin/incomes/products/${productId}`, {
            quantity: quantity,
            _method: "put"
        })
    }

    return(
        <AdminLayout>
            <h1 className="text-3xl font-bold mx-8 my-5">Pemasukan Hari ini</h1>
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
                        {
                            income &&
                            <>
                            {
                            income.products.map((product, i) => (
                                <tr key={i}>
                                    <td className="p-3 flex items-center justify-center"><img src={`/storage/${product.image}`} alt="" className="h-7"/></td>
                                    <td>{product.name}</td>
                                    <td>Rp. {product.price}</td>
                                    <td>{product.pivot.quantity}</td>
                                    <td>Rp. {product.pivot.quantity * product.price}</td>
                                    <td>
                                        <div className="flex justify-center items-center gap-3 mx-3">
                                            <FontAwesomeIcon onClick={(e) => handleMinusChange(e, product.id, product.pivot.quantity)} icon={faCircleMinus} className={`${product.pivot.quantity===0 && 'pointer-events-none text-gray-500'} size-5 hover:text-gray-700 cursor-pointer`}/>
                                            <h1 className="text-xl">{product.pivot.quantity}</h1>
                                            <FontAwesomeIcon onClick={(e) => handlePlusChange(e, product.id, product.pivot.quantity)} icon={faCirclePlus} className={`size-5 hover:text-gray-700 cursor-pointer`}/>
                                        </div>
                                    </td>
                                </tr>
                            ))
                            }
                            </>
                        }
                    </tbody>
                </table>
                {
                    income && 
                    <div className="flex justify-end items-center gap-5 text-xl font-bold">
                        <h3>Total: </h3>
                        <h3 className="bg-gray-300 px-8 rounded">Rp. {income.income}</h3>
                    </div>
                    // <div className="flex justify-end items-center gap-5">
                    //     <button className="bg-green-button text-white font-bold rounded py-1 px-10 hover:bg-green-button-darker">Simpan</button>
                    // </div>
                }
            </div>
        </AdminLayout>
    )
}

export default DetailedIncome