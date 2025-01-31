import { Link } from "@inertiajs/react"
import UserLayout from "../../Layouts/UserLayout"

const Orders = ({orders}) => {

    console.log(orders)

    return(
        <UserLayout>
            <h1 className="text-3xl font-bold px-8 py-5">Pesanan Saya</h1>
            <div className="p-8 grid grid-cols-2 lg:grid-cols-3 gap-3">
                {
                    orders.map((order, i) => (
                        <Link href={`/user/orders/${order.id}`} key={i} className="flex flex-col justify-between h-52 rounded-lg bg-white shadow-lg hover:bg-gray-100 cursor-pointer">
                            {
                                order.products.map((product, j) => (
                                    <div key={j} className="py-1 px-3 flex justify-between">
                                        <div className="flex gap-3">
                                            <img src={`/storage/${product.image}`} alt="" className="h-7"/>
                                            <p>{product.name}</p>
                                        </div>
                                        <p>{`x ${product.pivot.quantity} ${product.unit}`}</p>
                                    </div>
                                ))
                            }
                            <div>
                                <div className="py-1 px-3 flex justify-between border-t border-gray-200">
                                    <h1 className="font-medium">Total :</h1>
                                    <h2 className="font-bold">Rp. {order.total}</h2>
                                </div>
                                <div className="py-1 px-3 flex justify-between border-t border-gray-200">
                                    <h1 className="font-medium">Status :</h1>
                                    <h2 className="font-bold">{order.status}</h2>
                                </div>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </UserLayout>
    )
}

export default Orders