import AdminLayout from "../../../Layouts/AdminLayout"
import { Link } from '@inertiajs/react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"

const Index = () => {
    return(
        <AdminLayout>
            <div className='px-8 py-5 flex justify-between items-center'>
                <h1 className='text-3xl font-bold'>Semua Produk</h1>
                <Link className='py-1 px-3 text-white font-bold bg-gray-button rounded-md shadow-lg hover:bg-gray-button-darker transform duration-300'>Tambah produk</Link>
            </div>
            <div className="relative ml-8">
                <input type="text" placeholder="Cari" className="py-2 px-4 pl-10 w-1/2 rounded focus:outline-none focus:border-black border shadow bg-gray-300" />
                <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute top-3 left-3 text-gray-400"/>
            </div>
            
        </AdminLayout>
    )
}

export default Index