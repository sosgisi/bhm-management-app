import UserLayout from "../../Layouts/UserLayout"

const DetailedOrder = ({order}) => {

    console.log(order)

    return (
        <UserLayout>
            <h1 className="text-3xl font-bold px-8 py-5">Detailed Order #{order.id}</h1>
            <div className="p-8 flex flex-col">
                <table className="rounded shadow-xl w-full text-center">
                    <thead className="bg-gray-300 font-bold text-gray-800">
                        <tr>
                            <th></th>
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
                    <button>Batalkan pesanan</button>
                    <div>
                        <h1>Total: <span>{order.total}</span></h1>
                        <div className="flex">
                            <h1>Status: <span>{order.status}</span></h1>
                            {
                                order.status === 'Belum bayar.'
                                && <button>Bayar</button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </UserLayout>
    )
}

export default DetailedOrder