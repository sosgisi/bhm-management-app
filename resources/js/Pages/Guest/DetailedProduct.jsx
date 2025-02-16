import { Link } from "@inertiajs/react"
import GuestLayout from "../../Layouts/GuestLayout"

const DetailedProduct = ({product}) => {
    
    const handleBack = (e) => {
        e.preventDefault()
        window.history.back()
        preserveScroll
        preserveState
    }
    
    return (
        <GuestLayout>
            <h1 className="ml-14 text-xl md:text-3xl font-bold pt-5 pb-0 md:pb-5 px-4 md:px-8">Detail Produk #{product.id}</h1>
            <div className="p-4 md:p-8 flex flex-col md:flex-row gap-5">
                <div className="flex-shrink-0">
                    <img src={product.image} alt={product.name} className="h-40 w-40 object-cover shadow-xl border rounded" />
                </div>
                <div className="flex flex-col gap-4 md:w-2/3">
                    {[{ label: 'Nama', value: product.name },
                    { label: 'Harga', value: new Intl.NumberFormat('id-ID').format(product.price) },
                    { label: 'Satuan', value: product.unit },
                    { label: 'Kuantitas', value: product.quantity },
                    { label: 'Deskripsi', value: product.description }
                    ].map((item, index) => (
                        <div key={index} className="flex justify-between items-start text-lg font-medium">
                            <span className="text-gray-700">{item.label}:</span>
                            <span className="font-semibold text-end max-w-xs truncate md:whitespace-normal md:overflow-visible">{item.value}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-20 ml-5">
                <Link onClick={handleBack} preserveScroll preserveState className="py-2 px-10 text-white font-bold rounded-lg shadow-lg bg-gray-button transform duration-200 hover:bg-gray-button-darker">Back</Link>
            </div>
        </GuestLayout>
    )
}

export default DetailedProduct