import AdminLayout from '../../Layouts/AdminLayout'
import { Link } from '@inertiajs/react'

const Dashboard = ({productEmpty, orderNeedToBeSent, productTotal, orderTotal, todayIncome, totalIncome}) => {

    return (
        <AdminLayout>
            <h1 className='ml-14 px-4 md:px-8 py-5 text-xl md:text-3xl font-bold'>Utama</h1>
            <div className='p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
                <Link href="/admin/products" className='flex flex-col justify-between gap-8 border p-3 shadow-xl hover:scale-105 transform duration-150 rounded-tl rounded-tr border-b-4 border-b-green-500 hover:bg-gray-100'>
                    <h1 className='text-xl md:text-2xl font-medium'>Produk</h1>
                    <div className='flex justify-between items-center p'>
                        <p className='text-lg font-extralight'>
                            Total
                            <span className='text-3xl font-bold ml-2'>{productTotal}</span>
                        </p>
                        <p className='text-lg font-extralight'>
                            stok habis
                            <span className='text-3xl font-bold ml-2'>
                                {productEmpty}
                            </span>
                        </p>
                    </div>
                </Link>
                <Link href="/admin/orders" className='flex flex-col justify-between gap-8 border p-3 shadow-xl hover:scale-105 transform duration-150 rounded-tl rounded-tr border-b-4 border-b-indigo-500 hover:bg-gray-100'>
                    <h1 className='text-xl md:text-2xl font-medium'>Pesanan</h1>
                    <div className='flex justify-between items-center p'>
                        <p className='text-lg font-extralight'>
                            Total
                            <span className='text-3xl font-bold ml-2'>{orderTotal}</span>
                        </p>
                        <p className='text-lg font-extralight'>
                            perlu dikirim
                            <span className='text-3xl font-bold ml-2'>{orderNeedToBeSent}</span>
                        </p>
                    </div>
                </Link>
                <Link href="/admin/incomes/today" className='flex flex-col justify-between gap-8 border p-3 shadow-xl hover:scale-105 transform duration-150 rounded-tl rounded-tr border-b-4 border-b-yellow-500 hover:bg-gray-100'>
                    <div className='flex justify-between items-center p'>
                        <h1 className='text-xl md:text-2xl font-medium'>Pemasukan</h1>
                        <div className='text-lg font-extralight text-end'>
                            <p>Total</p>
                            <p>Rp. {totalIncome}</p>
                        </div>
                    </div>
                    <p className='text-lg font-extralight text-end'>
                        hari ini
                        <span className='text-xl font-bold ml-2'>Rp. {todayIncome}</span>
                    </p>
                </Link>
            </div>
        </AdminLayout>
    )
}

export default Dashboard