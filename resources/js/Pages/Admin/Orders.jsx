import AdminLayout from "../../Layouts/AdminLayout"
import { Link } from '@inertiajs/react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-solid-svg-icons"

const Orders = () => {
    return(
        <AdminLayout>
            <h1 className="text-3xl font-bold my-5 mx-8">Pesanan - Perlu dikirim</h1>
            <div className="p-8">
                <table className="table-auto w-full text-center rounded-xl shadow-xl">
                    <thead className="bg-gray-300 font-bold text-gray-800">
                        <tr>
                            <th className="py-1 px-3">Nama</th>
                            <th>Pesanan</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="m-3 flex gap-2 items-center justify-start">
                                <FontAwesomeIcon icon={faUser}/>
                                Ahmad
                            </td>
                            <td>Cat kuda terbang x5, kuas 3cm x1, lampu x4</td>
                            <td>Rp. 120.000</td>
                            <td>
                                <div className="flex justify-center items-center bg-red-area rounded-full py-1">
                                    perlu dikirim
                                </div>
                            </td>
                            <td>
                                <Link className="bg-gray-button rounded text-white py-1 px-4 hover:bg-gray-button-darker">Rincian</Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    )
}

export default Orders