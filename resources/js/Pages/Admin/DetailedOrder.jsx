import { router } from "@inertiajs/react"
import AdminLayout from "../../Layouts/AdminLayout"

const DetailedOrder = ({order}) => {
    
    const handleDeleteOrder = (e) => {
        e.preventDefault()
        router.post(`/admin/orders/${order.id}`, {
            _method: "delete"
        })
    }

    return (
        <AdminLayout>
            <h1 className="text-3xl font-bold px-8 py-5">Detailed Order #{order.id}</h1>
            <div className="p-8 flex flex-col gap-10">
                <table className="rounded shadow-xl w-full text-center">
                    <thead className="bg-gray-300 font-bold text-gray-800">
                        <tr>
                            <th>Foto</th>
                            <th className="py-1 px-3">Produk</th>
                            <th>Harga</th>
                            <th>Jumlah</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            order.products.map((product, i) => (
                            <tr key={i}>
                                <td className="p-3 flex justify-center items-center"><img src={`/storage/${product.image}`} alt="" className="h-7" /></td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.pivot.quantity} {product.unit}</td>
                                <td>{product.pivot.quantity * product.price}</td>
                            </tr>
                            ))
                        }
                    </tbody>
                </table>
                <div className="flex justify-between">
                    <div>
                        <button onClick={handleDeleteOrder} className="bg-red-button rounded-lg shadow-lg hover:bg-red-button-darker text-white text-start font-medium py-1 px-5 transform duration-200">Hapus pesanan</button>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between gap-10">
                            <h1 className="font-bold text-xl">Total: </h1>
                            <p className="font-bold text-xl bg-gray-300 py-1 px-5 rounded-sm">Rp. <span className="font-medium text-md">{order.total}</span></p>
                        </div>
                        <div className="flex justify-between gap-10">
                            <h1 className="font-bold text-xl">Status: </h1>
                            <p className={`${order.status === 'Belum bayar.' ? 'text-red-500' : ''} font-medium text-xl`}>{order.status}</p>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default DetailedOrder