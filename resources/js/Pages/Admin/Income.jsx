import { router } from "@inertiajs/react"
import AdminLayout from "../../Layouts/AdminLayout"
import { useEffect, useState } from "react"

const Income = ({incomes}) => {

    const [search, setSearch] = useState(null)

    const handleDetailedIncome = (e, incomeId) => {
        e.preventDefault()
        router.post(`/admin/incomes/${incomeId}`, {
            _method: "get"
        })
    }

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (search === null) return; // Prevent initial null state from triggering
    
            router.get('/admin/incomes', 
                search.trim() !== "" ? { search } : {}, // Fetch all products if search is empty
                { preserveState: true, replace: true }
            );
        }, 300);
        
        return () => clearTimeout(delayDebounceFn);
    }, [search])

    return(
        <AdminLayout>
            <h1 className="ml-14 text-xl md:text-3xl font-bold mx-4 md:mx-8 my-5">Semua Pemasukan</h1>
            <div className="flex gap-5 p-4 md:p-8">
                <h1 className="font-bold">Cari tanggal: </h1>
                <input type="date" onChange={(e) => setSearch(e.target.value)} className="bg-gray-300 rounded px-2"/>
            </div>
            <div className="p-4 md:p-8">
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
                                    <td>Rp {new Intl.NumberFormat('id-ID').format(income.income)}</td>
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