import AdminLayout from "../../Layouts/AdminLayout"

const Orders = () => {
    return(
        <AdminLayout>
            <h1>Pesanan</h1>
            <table>
                <thead>
                    <tr>
                        <td>Nama</td>
                        <td>Pesanan</td>
                        <td>Total</td>
                        <td>Status</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Ahmad</td>
                        <td>Cat x5, kuas 3cm x1, cat kuda terbang x3</td>
                        <td>Rp. 120.000</td>
                        <td>perlu dikirim</td>
                        <td>Rincian</td>
                    </tr>
                </tbody>
            </table>
        </AdminLayout>
    )
}

export default Orders