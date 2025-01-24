import { Link } from "@inertiajs/react"
import UserLayout from "../../Layouts/UserLayout"

const Dashboard = () => {
    return(
        <UserLayout>
            <h1 className='px-8 py-5 text-3xl font-bold'>Utama</h1>
            <div className='p-5 grid grid-cols-2 lg:grid-cols-3 gap-5'>
                <Link className='flex justify-between gap-8 h-32 border p-3 shadow-xl hover:scale-105 transform duration-150 rounded-tl rounded-tr border-b-4 border-b-green-500 hover:bg-gray-100'>
                    <h1 className='text-2xl font-medium'>Produk</h1>
                    <div className="flex items-end">
                        <p className='text-sm font-extralight text-end'>
                            Total
                            <span className='text-4xl font-bold ml-2'>102</span>
                        </p>
                    </div>
                </Link>
                <Link className='flex justify-between gap-8 h-32 border p-3 shadow-xl hover:scale-105 transform duration-150 rounded-tl rounded-tr border-b-4 border-b-indigo-500 hover:bg-gray-100'>
                    <h1 className='text-2xl font-medium'>Keranjang</h1>
                    <div className="flex items-end">
                        <p className='text-sm font-extralight text-end'>
                            Total
                            <span className='text-4xl font-bold ml-2'>12</span>
                        </p>
                    </div>
                </Link>
                <Link className='flex justify-between gap-8 h-32 border p-3 shadow-xl hover:scale-105 transform duration-150 rounded-tl rounded-tr border-b-4 border-b-yellow-500 hover:bg-gray-100'>
                    <h1 className='text-2xl font-medium'>Pesanan saya</h1>
                    <div className="flex items-end">
                        <p className='text-sm font-extralight text-end'>
                            status
                            <span className='text-lg font-bold ml-2 underline'>Pengecekan</span>
                        </p>
                    </div>
                </Link>
            </div>
        </UserLayout>
    )
}

export default Dashboard