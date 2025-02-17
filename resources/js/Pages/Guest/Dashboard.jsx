import { Link } from "@inertiajs/react"
import GuestLayout from "../../Layouts/GuestLayout"

const Dashboard = ({productsTotal}) => {
    return(
        <GuestLayout>
            <div className="ml-14 px-4 md:px-8 py-5 flex justify-between">
                <h1 className='text-3xl font-bold'>Utama</h1>
                <Link href='/login' className='md:hidden bg-green-button text-white px-4 py-1 rounded shadow-xl hover:bg-green-button-darker transform duration-200'>Login</Link>
            </div>
            <div className='p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
                <Link href="/guest/products" className='flex justify-between gap-8 h-32 border p-3 shadow-xl hover:scale-105 transform duration-150 rounded-tl rounded-tr border-b-4 border-b-green-500 hover:bg-gray-100'>
                    <h1 className='text-2xl font-medium'>Produk</h1>
                    <div className="flex items-end">
                        <p className='text-sm font-extralight text-end'>
                            Total
                            <span className='text-4xl font-bold ml-2'>{productsTotal}</span>
                        </p>
                    </div>
                </Link>
            </div>
        </GuestLayout>
    )
}

export default Dashboard