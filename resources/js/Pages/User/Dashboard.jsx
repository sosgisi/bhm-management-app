import { Link } from "@inertiajs/react"
import UserLayout from "../../Layouts/UserLayout"

const Dashboard = ({productsTotal, cartTotal, orderTotal}) => {

    return(
        <UserLayout>
            <h1 className='px-8 py-5 text-3xl font-bold'>Utama</h1>
            <div className='p-5 grid grid-cols-2 lg:grid-cols-3 gap-5'>
                <Link href="/user/products" className='flex flex-col justify-between gap-8 border px-3 py-2 shadow-xl hover:scale-105 transform duration-150 rounded-tl rounded-tr border-b-4 border-b-green-500 hover:bg-gray-100'>
                    <h1 className='text-2xl font-medium'>Produk</h1>
                    <div className="flex justify-end">
                        <p className='text-sm font-extralight text-end'>
                            Total
                            <span className='text-4xl font-bold ml-2'>{productsTotal}</span>
                        </p>
                    </div>
                </Link>
                <Link href="/user/cart" className='flex flex-col justify-between gap-8 border px-3 py-2 shadow-xl hover:scale-105 transform duration-150 rounded-tl rounded-tr border-b-4 border-b-indigo-500 hover:bg-gray-100'>
                    <h1 className='text-2xl font-medium'>Keranjang</h1>
                    <div className="flex justify-end">
                        <p className='text-sm font-extralight text-end'>
                            Total
                            <span className='text-4xl font-bold ml-2'>{cartTotal}</span>
                        </p>
                    </div>
                </Link>
                <Link href="/user/orders" className='flex flex-col justify-between gap-8 border px-3 py-2 shadow-xl hover:scale-105 transform duration-150 rounded-tl rounded-tr border-b-4 border-b-yellow-500 hover:bg-gray-100'>
                    <h1 className='text-2xl font-medium'>Pesanan saya</h1>
                    <div className="flex justify-end">
                        <p>
                            Total 
                            <span className='text-4xl font-bold ml-2'>{orderTotal}</span>
                        </p>
                    </div>
                </Link>
            </div>
        </UserLayout>
    )
}

export default Dashboard