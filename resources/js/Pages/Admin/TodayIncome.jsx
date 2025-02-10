import AdminLayout from "../../Layouts/AdminLayout"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass, faCircleMinus, faCirclePlus } from "@fortawesome/free-solid-svg-icons"
import { Link, router } from "@inertiajs/react"
import { useEffect, useState } from "react"

const DetailedIncome = ({income}) => {

    const [search, setSearch] = useState(null)

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

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (search === null) return; // Prevent initial null state from triggering
    
            router.get('/admin/incomes/today', 
                search.trim() !== "" ? { search } : {}, // Fetch all products if search is empty
                { preserveState: true, replace: true }
            );
        }, 300);
        
        return () => clearTimeout(delayDebounceFn);
    }, [search])

    return(
        <AdminLayout>
            <div className="flex items-center justify-between">
                <h1 className="text-xl md:text-3xl font-bold mx-4 md:mx-8 my-5">Pemasukan Hari ini</h1>
                <Link href="/admin/incomes" className="flex md:hidden mr-5 bg-gray-button hover:bg-gray-button-darker text-white font-bold rounded px-3">Semua</Link>
            </div>
            <div className="relative ml-4 md:ml-8 mr-4 md:mr-0">
                <input type="search" placeholder="Cari" value={search} onChange={(e) => setSearch(e.target.value)} className="py-1 md:py-2 px-4 pl-10 w-full md:w-1/2 rounded focus:outline-none focus:ring-2 border shadow bg-gray-300" />
                <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute top-3 left-3 text-gray-400"/>
            </div>
            <div className="p-4 md:p-8 flex flex-col justify-between gap-10">
                <table className="table-auto w-full shadow-xl rounded-xl text-center">
                    <thead className="bg-gray-300 font-bold text-gray-800">
                        <tr>
                            <th className="hidden md:table-cell"></th>
                            <th>Produk</th>
                            <th className="hidden md:table-cell">Harga</th>
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
                                    <td className="hidden md:table-cell p-3 items-center justify-center"><img src={product.image} alt={product.image} className="h-7"/></td>
                                    <td>{product.name}</td>
                                    <td className="hidden md:table-cell">Rp. {product.price}</td>
                                    <td>{product.pivot.quantity}</td>
                                    <td>Rp. {product.pivot.quantity * product.price}</td>
                                    <td>
                                        <div className="flex justify-center items-center gap-1 md:gap-3 mx-3">
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
                    <div className="flex justify-end items-center gap-5 text-md md:text-xl font-bold">
                        <h3>Total: </h3>
                        <h3 className="bg-gray-300 px-8 rounded">Rp. {income.income}</h3>
                    </div>
                }
            </div>
        </AdminLayout>
    )
}

export default DetailedIncome