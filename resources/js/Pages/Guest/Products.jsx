import GuestLayout from "../../Layouts/GuestLayout"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { router } from "@inertiajs/react"
import { useEffect, useState } from "react"

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
            <div className='px-8 py-5 flex justify-between items-center'>
                <h1 className='text-3xl font-bold'>Semua Produk</h1>
            </div>
            <div className="relative ml-4 md:ml-8 mr-4 md:mr-0">
                <input type="search" placeholder="Cari" value={search} onChange={(e) => setSearch(e.target.value)} className="py-1 md:py-2 px-4 pl-10 w-full md:w-1/2 rounded focus:outline-none focus:ring-2 border shadow bg-gray-300" />
                <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute top-3 left-3 text-gray-400"/>
            </div>
            <div className="p-4 md:p-8">
                <table className="rounded shadow-xl w-full text-center">
                    <thead className="bg-gray-300 font-bold text-gray-800">
                        <tr>
                            <th className="py-1 px-3">Foto</th>
                            <th>Nama</th>
                            <th>Harga</th>
                            <th></th>
                            <th>Kuantitas</th>
                            <th className="hidden md:table-cell">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((product, i) => (
                                <tr key={i}>
                                    <td className="p-3 flex justify-center items-center"><img src={`/storage/${product.image}`} alt="" className="h-7"/></td>
                                    <td onClick={(e) => handleDetailedProduct(e, product.id)} className="hover:underline cursor-pointer">{product.name}</td>
                                    <td>Rp. {product.price}</td>
                                    <td>/{product.unit}</td>
                                    <td>{product.quantity}</td>
                                    <td className="hidden md:table-cell">
                                        <div className={`flex justify-center items-center ${product.quantity>0 ? 'bg-green-area' : 'bg-red-area'} rounded-full py-1`}>
                                            { product.quantity > 0 
                                             ? 'in stock'
                                             : 'out of stock'
                                            }
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </GuestLayout>
    )
}

export default Products