import AdminLayout from "../../Layouts/AdminLayout"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import { router } from "@inertiajs/react"

const DetailedIncome = ({income}) => {

    const [search, setSearch] = useState(null)

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (search === null) return; // Prevent initial null state from triggering
    
            router.get(`/admin/incomes/${income.id}`, 
                search.trim() !== "" ? { search } : {}, // Fetch all products if search is empty
                { preserveState: true, replace: true }
            );
        }, 300);
        
        return () => clearTimeout(delayDebounceFn);
    }, [search])

    return(
        <AdminLayout>
            <h1 className="ml-14 text-xl md:text-3xl font-bold mx-4 md:mx-8 my-5">Pemasukan tanggal {income.date}</h1>
            <div className="relative ml-4 md:ml-8 mr-4 md:mr-0">
                <input type="search" placeholder="Cari" value={search} onChange={(e) => setSearch(e.target.value)} className="py-1 md:py-2 px-4 pl-10 w-full md:w-1/2 rounded focus:outline-none focus:ring-2 border shadow bg-gray-300" />
                <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute top-3 left-3 text-gray-400"/>
            </div>
            <div className="p-4 md:p-8 flex flex-col justify-between gap-10">
                <table className="table-auto w-full shadow-xl rounded-xl text-center">
                    <thead className="bg-gray-300 font-bold text-gray-800">
                        <tr>
                            <th></th>
                            <th>Produk</th>
                            <th className="hidden md:table-cell">Harga</th>
                            <th>Jumlah</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            income.products.map((product, i) => (
                                <tr key={i}>
                                    <td className="hidden md:table-cell p-3 items-center justify-center"><img src={product.image} alt={product.image} className="h-7"/></td>
                                    <td>{product.name}</td>
                                    <td className="hidden md:table-cell">Rp {new Intl.NumberFormat('id-ID').format(product.price)}</td>
                                    <td>{product.pivot.quantity}</td>
                                    <td>Rp {new Intl.NumberFormat('id-ID').format(product.pivot.quantity * product.price)}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <div className="flex justify-end items-center gap-5 text-md md:text-xl font-bold">
                    <h3>Total: </h3>
                    <h3 className="bg-gray-300 px-8 rounded">Rp {new Intl.NumberFormat('id-ID').format(income.income)}</h3>
                </div>
            </div>
        </AdminLayout>
    )
}

export default DetailedIncome