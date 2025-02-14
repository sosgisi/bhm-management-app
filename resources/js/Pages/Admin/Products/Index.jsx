import AdminLayout from "../../../Layouts/AdminLayout"
import { Link, router, useForm } from '@inertiajs/react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass, faCircleMinus, faCirclePlus, faPlusSquare } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import Pagination from "../../../Components/Pagination"

const Index = ({products}) => {

    const [search, setSearch] = useState(null)
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
        router.post(`/admin/products/${productId}`, {
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

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (search === null) return; // Prevent initial null state from triggering
    
            router.get('/admin/products', 
                search.trim() !== "" ? { search } : {}, // Fetch all products if search is empty
                { preserveState: true, replace: true }
            );
        }, 300);
        
        return () => clearTimeout(delayDebounceFn);
    }, [search])

    return(
        <AdminLayout>
            <div className='ml-14 px-4 md:px-8 py-5 flex justify-between items-center'>
                <h1 className='text-xl md:text-3xl font-bold'>Semua Produk</h1>
                <Link href='/admin/product/create' className='py-1 px-1 md:px-3 text-white font-bold bg-gray-button rounded-md shadow-lg hover:bg-gray-button-darker transition duration-300'>Tambah produk</Link>
            </div>
            <div className="relative ml-4 md:ml-8 mr-4 md:mr-0">
                <input type="search" placeholder="Cari" value={search} onChange={(e) => setSearch(e.target.value)} className="py-2 px-4 pl-10 w-full md:w-1/2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 border shadow bg-gray-200" />
                <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute top-3 left-3 text-gray-500"/>
            </div>
            <div className="p-4 md:p-8 overflow-x-auto">
                <table className="rounded-xl shadow-md w-full text-center border-collapse border border-gray-200">
                    <thead className="bg-gray-200 font-bold text-gray-800">
                        <tr>
                            <th className="py-2 px-3 border">Foto</th>
                            <th className="border">Nama</th>
                            <th className="border">Harga</th>
                            <th className="border"></th>
                            <th className="hidden md:table-cell border">Kuantitas</th>
                            <th className="hidden md:table-cell border">Status</th>
                            <th className="border">Tambah</th>
                            <th className="border"></th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {products.data.map((product, i) => (
                            <tr key={i} className="border-b hover:bg-gray-100">
                                <td className="p-3 flex justify-center items-center border"><img src={product.image} alt={product.name} className="h-10 w-10 object-cover"/></td>
                                <td onClick={() => handleDetailedProduct(product.id)} className="border hover:underline cursor-pointer truncate max-w-24">{product.name}</td>
                                <td className="border">Rp {new Intl.NumberFormat('id-ID').format(product.price)}</td>
                                <td className="border">/{product.unit}</td>
                                <td className="hidden md:table-cell border truncate max-w-5">{product.quantity}</td>
                                <td className="hidden md:table-cell border">
                                    <span className={`px-3 py-1 rounded-full text-white ${product.quantity > 0 ? 'bg-green-500' : 'bg-red-500'} md:whitespace-nowrap md:overflow-hidden md:text-ellipsis`}>
                                        {product.quantity > 0 ? 'In stock' : 'Out of stock'}
                                    </span>
                                </td>
                                <td className="border">
                                    <div className="flex justify-center items-center gap-2">
                                        <FontAwesomeIcon onClick={() => handleMinus(i)} icon={faCircleMinus} className={`size-5 cursor-pointer ${tempAmount[i] === 1 ? 'text-gray-400 pointer-events-none' : 'hover:text-gray-700'}`}/>
                                        <span className="text-md">{tempAmount[i]}</span>
                                        <FontAwesomeIcon onClick={() => handlePlus(i)} icon={faCirclePlus} className={`size-5 cursor-pointer ${tempAmount[i] === product.quantity ? 'text-gray-400 pointer-events-none' : 'hover:text-gray-700'}`}/>
                                    </div>
                                </td>
                                <td className="border">
                                    <FontAwesomeIcon icon={faPlusSquare} onClick={() => handleAddProduct(product.id)} className={`size-6 text-green-500 hover:text-green-700 ${product.quantity === 0 ? 'text-gray-400 pointer-events-none' : ''}`}/>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {products.links && <Pagination pagination={products.links} />}
        </AdminLayout>
    )
}

export default Index