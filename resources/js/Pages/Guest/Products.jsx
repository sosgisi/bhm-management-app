import GuestLayout from "../../Layouts/GuestLayout"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGrip, faList, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { router } from "@inertiajs/react"
import { useEffect, useState } from "react"
import Pagination from "../../Components/Pagination"
import ListView from "../../Components/ListView"
import GripView from "../../Components/GripView"

const Products = ({products}) => {

    const [viewType, setViewType] = useState(() => {
        return localStorage.getItem('viewType') || 'grip'
    })
    const [search, setSearch] = useState(null)

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

    useEffect(() => {
        localStorage.setItem('viewType', viewType)
    }, [viewType])

    return(
        <GuestLayout>
            <div className='ml-14 px-4 md:px-8 py-5 flex justify-between'>
                <h1 className='text-3xl font-bold'>Semua Produk</h1>
            </div>
            <div className="relative ml-4 md:ml-8 mr-4 md:mr-0">
                <input type="search" placeholder="Cari" value={search} onChange={(e) => setSearch(e.target.value)} className="py-1 md:py-2 px-4 pl-10 w-full md:w-1/2 rounded focus:outline-none focus:ring-2 border shadow bg-gray-300" />
                <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute top-3 left-3 text-gray-400"/>
            </div>
            <div className="ml-4 md:ml-10 mt-8 flex gap-5">
                <FontAwesomeIcon icon={faGrip} onClick={() => setViewType('grip')} className={`${viewType==='grip' ? 'bg-gray-300' : ''} size-5 hover:bg-gray-300 py-1 px-2 rounded transform duration-300`}/>
                <FontAwesomeIcon icon={faList} onClick={() => setViewType('list')} className={`${viewType==='list' ? 'bg-gray-300' : ''} size-5 hover:bg-gray-300 py-1 px-2 rounded transform duration-300`}/>
            </div>
            {
                viewType === 'list' 
                ? <ListView products={products} role="Guest" />
                : <GripView products={products} role="Guest" />
            }
            {products.links && <Pagination pagination={products.links} />}
        </GuestLayout>
    )
}

export default Products