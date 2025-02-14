import GuestLayout from "../../Layouts/GuestLayout"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { router } from "@inertiajs/react"
import { useEffect, useState } from "react"
import Pagination from "../../Components/Pagination"

const Products = ({products}) => {

    const [search, setSearch] = useState(null)

    const handleDetailedProduct = (e, productId) => {
        e.preventDefault()
        router.post(`/guest/products/${productId}`, {
            _method: "get"
        })
    }

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (search === null) return; // Prevent initial null state from triggering
    
            router.get('/guest/products', 
                search.trim() !== "" ? { search } : {}, // Fetch all products if search is empty
                { preserveState: true, replace: true }
            );
        }, 300);
        
        return () => clearTimeout(delayDebounceFn);
    }, [search])

    return(
        <GuestLayout>
            <div className='ml-14 px-4 md:px-8 py-5 flex justify-between'>
                <h1 className='text-3xl font-bold'>Semua Produk</h1>
            </div>
            <div className="relative ml-4 md:ml-8 mr-4 md:mr-0">
                <input type="search" placeholder="Cari" value={search} onChange={(e) => setSearch(e.target.value)} className="py-1 md:py-2 px-4 pl-10 w-full md:w-1/2 rounded focus:outline-none focus:ring-2 border shadow bg-gray-300" />
                <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute top-3 left-3 text-gray-400"/>
            </div>
            <div className="p-4 md:p-8 overflow-x-auto">
                <table className="rounded-xl shadow-md w-full text-center border-collapse border border-gray-200">
                    <thead className="bg-gray-200 font-bold text-gray-800">
                        <tr>
                            <th className="py-2 px-3 border">Foto</th>
                            <th className="border">Nama</th>
                            <th className="border">Harga</th>
                            <th className="border"></th>
                            <th className="border">Kuantitas</th>
                            <th className="hidden md:table-cell border">Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {
                            products.data.map((product, i) => (
                                <tr key={i} className="border-b hover:bg-gray-100">
                                    <td className="p-3 flex justify-center items-center border"><img src={product.image} alt={product.name} className="h-10 w-10 object-cover"/></td>
                                    <td onClick={(e) => handleDetailedProduct(e, product.id)} className="hover:underline cursor-pointer truncate max-w-24">{product.name}</td>
                                    <td className="border">Rp {new Intl.NumberFormat('id-ID').format(product.price)}</td>
                                    <td className="border">/{product.unit}</td>
                                    <td className="border truncate max-w-5">{product.quantity}</td>
                                    <td className="hidden md:table-cell border">
                                        <span className={`px-3 py-1 rounded-full text-white ${product.quantity > 0 ? 'bg-green-500' : 'bg-red-500'} md:whitespace-nowrap md:overflow-hidden md:text-ellipsis`}>
                                            {product.quantity > 0 ? 'In stock' : 'Out of stock'}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            {products.links && <Pagination pagination={products.links} />}
        </GuestLayout>
    )
}

export default Products