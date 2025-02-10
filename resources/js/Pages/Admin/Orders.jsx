import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import AdminLayout from "../../Layouts/AdminLayout"
import { Link } from '@inertiajs/react'
import { faUser } from "@fortawesome/free-solid-svg-icons"

const Orders = ({orders}) => {

    return(
        <AdminLayout>
            <h1 className="text-xl md:text-3xl font-bold my-5 mx-4 md:mx-8">Pesanan</h1>
            <div className="p-4 md:p-8 grid grid-cols-1 dm:grid-cols-2 lg:grid-cols-3 gap-3">
                {
                    orders.map((order, i) => (
                        <Link href={`/admin/orders/${order.id}`} key={i} className="flex flex-col justify-between h-52 rounded-lg bg-white shadow-lg hover:bg-gray-100 cursor-pointer">
                            <div>
                                <div className="py-1 px-3 flex justify-center items-center gap-2 border-b border-gray-400">
                                    <FontAwesomeIcon icon={faUser} className="size-4 bg-gray-400 rounded-full p-1 text-white"/>
                                    <h1 className="font-medium">{order.user.name}</h1>
                                </div>
                                <div className="flex flex-col gap-1">
                                    {
                                        order.products.map((product, j) => (
                                            <div key={j} className="py-1 px-2 flex justify-between">
                                                <div className="flex gap-3">
                                                    <img src={product.image} alt={product.image} className="w-8"/>
                                                    <p>{product.name}</p>
                                                </div>
                                                <p>{`x ${product.pivot.quantity} ${product.unit}`}</p>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div>
                                <div className="py-1 px-3 flex justify-between border-t border-gray-200">
                                    <h1 className="font-medium">Total :</h1>
                                    <h2 className="font-bold">Rp. {order.total}</h2>
                                </div>
                                <div className="py-1 px-3 flex justify-between border-t border-gray-200">
                                    <h1 className="font-medium">Status :</h1>
                                    <h2 className={`${order.status === 'Belum bayar.' ? 'text-red-500' : ''} font-bold`}>{order.status}</h2>
                                </div>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </AdminLayout>
    )
}

export default Orders