import AdminLayout from '../../Layouts/AdminLayout'
import { Link } from '@inertiajs/react'

const Dashboard = () => {
    return (
        <AdminLayout>
            <h1 className='px-8 py-5 text-3xl font-bold'>Utama</h1>
            <div className='p-5 grid grid-cols-2 lg:grid-cols-3 gap-5'>
                <Link className='flex flex-col justify-between gap-8 border p-3 rounded-tl rounded-tr border-b-4 border-b-green-500 hover:bg-gray-50'>
                    <h1 className='text-2xl font-medium'>Produk</h1>
                    <div className='flex justify-between items-center p'>
                        <p className='text-sm font-extralight'>
                            Total
                            <span className='text-3xl font-bold ml-2'>102</span>
                        </p>
                        <p className='text-sm font-extralight'>
                            stok habis
                            <span className='text-3xl font-bold ml-2'>7</span>
                        </p>
                    </div>
                </Link>
                <Link className='flex flex-col justify-between gap-8 border p-3 rounded-tl rounded-tr border-b-4 border-b-indigo-500 hover:bg-gray-50'>
                    <h1 className='text-2xl font-medium'>Pesanan</h1>
                    <div className='flex justify-between items-center p'>
                        <p className='text-sm font-extralight'>
                            Total
                            <span className='text-3xl font-bold ml-2'>32</span>
                        </p>
                        <p className='text-sm font-extralight'>
                            perlu dikirim
                            <span className='text-3xl font-bold ml-2'>05</span>
                        </p>
                    </div>
                </Link>
                <Link className='flex flex-col justify-between gap-8 border p-3 rounded-tl rounded-tr border-b-4 border-b-yellow-500 hover:bg-gray-50'>
                    <div className='flex justify-between items-center p'>
                        <h1 className='text-2xl font-medium'>Pemasukan</h1>
                        <div className='text-sm font-extralight text-end'>
                            <p>Total</p>
                            <p>Rp. 57.673.540</p>
                        </div>
                    </div>
                    <p className='text-sm font-extralight text-end'>
                        hari ini
                        <span className='text-xl font-bold ml-2'>Rp. 3.203.500</span>
                    </p>
                </Link>
            </div>
        </AdminLayout>
    )
}

export default Dashboard