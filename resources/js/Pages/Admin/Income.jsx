import { router } from "@inertiajs/react"
import AdminLayout from "../../Layouts/AdminLayout"

const Income = ({incomes}) => {

    const handleDetailedIncome = (e, incomeId) => {
        e.preventDefault()
        router.post(`/admin/incomes/${incomeId}`, {
            _method: "get"
        })
    }

    return(
        <AdminLayout>
            <h1 className="text-3xl font-bold mx-8 my-5">Semua Pemasukan</h1>
            <div className="flex gap-5 p-8">
                <h1 className="font-bold">Cari tanggal: </h1>
                <input type="date" className="bg-gray-300 rounded px-2"/>
            </div>
            <div className="p-8">
                <table className="w-full text-center rounded-xl shadow-xl">
                    <thead className="bg-gray-300 font-bold text-gray-800">
                        <tr>
                            <th className="py-1 px-3">No.</th>
                            <th>Tanggal</th>
                            <th>Total Pemasukan</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {
                            incomes.map((income, i) => (
                                <tr key={i} onClick={(e) => handleDetailedIncome(e, income.id)} className="hover:bg-gray-100 cursor-pointer">
                                    <td className="p-3">{i+1}</td>
                                    <td>{income.date}</td>
                                    <td>Rp. {income.income}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    )
}

export default Income