import AdminLayout from "../../../Layouts/AdminLayout"
import { Link } from '@inertiajs/react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"

const Index = () => {
    return(
        <AdminLayout>
            <div className='px-8 py-5 flex justify-between items-center'>
                <h1 className='text-3xl font-bold'>Semua Produk</h1>
                <Link className='py-1 px-3 text-white font-bold bg-gray-button rounded-md shadow-lg'>Tambah produk</Link>
            </div>
            <input type="text" placeholder="Cari" className="" >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </input>
        </AdminLayout>
    )
}

export default Index