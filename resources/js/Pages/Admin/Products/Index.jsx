import AdminLayout from "../../../Layouts/AdminLayout"
import { Link, router } from '@inertiajs/react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass, faGrip, faList } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import Pagination from "../../../Components/Pagination"
import ListView from "../../../Components/ListView"
import GripView from "../../../Components/GripView"

const Index = ({products}) => {

    const [viewType, setViewType] = useState(() => {
        return localStorage.getItem('viewType') || 'grip'
    })
    const [search, setSearch] = useState(null)

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

    useEffect(() => {
        localStorage.setItem('viewType', viewType)
    }, [viewType])

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
            <div className="ml-4 md:ml-10 mt-8 flex gap-5">
                <FontAwesomeIcon icon={faGrip} onClick={() => setViewType('grip')} className={`${viewType==='grip' ? 'bg-gray-300' : ''} size-5 hover:bg-gray-300 py-1 px-2 rounded transform duration-300`}/>
                <FontAwesomeIcon icon={faList} onClick={() => setViewType('list')} className={`${viewType==='list' ? 'bg-gray-300' : ''} size-5 hover:bg-gray-300 py-1 px-2 rounded transform duration-300`}/>
            </div>
            {
                viewType === 'list' 
                ? <ListView products={products} role="Admin" />
                : <GripView products={products} role="Admin" />
            }
            {products.links && <Pagination pagination={products.links} />}
        </AdminLayout>
    )
}

export default Index