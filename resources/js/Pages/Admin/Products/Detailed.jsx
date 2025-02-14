import { Link, router } from "@inertiajs/react"
import AdminLayout from "../../../Layouts/AdminLayout"
import { extractPublicId } from 'cloudinary-build-url'

const Detailed = ({product}) => {

    const handleDelete = (e) => {
        e.preventDefault()
        // const publicId = extractPublicId(product.image)
        router.post(`/admin/products/${product.id}`, {
            // publicId: publicId,
            _method: "delete"
        })
    }

    return (
        <AdminLayout>
            <h1 className="ml-14 text-xl md:text-3xl font-bold pt-5 pb-0 md:pb-5 px-4 md:px-8">Detail Produk #{product.id}</h1>
            <div className="p-4 md:p-8 flex flex-col md:flex-row gap-5">
                <div className="flex-shrink-0">
                    <img    
                        onClick={() => {navigator.clipboard.writeText(product.image); 
                            alert('Image URL copied to clipboard!');}} 
                        src={product.image} 
                        alt={product.name} 
                        className="h-40 w-40 object-cover shadow-xl border rounded cursor-pointer hover:opacity-80" 
                    />
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
            <div className="absolute bottom-10 right-5 left-5 flex justify-between">
                <Link href="/admin/products" className="py-1 px-3 md:px-10 text-white font-bold rounded-lg shadow-lg bg-gray-button transform duration-200 hover:bg-gray-button-darker">Back</Link>
                <div className="flex gap-3 md:gap-5">
                    <button onClick={(e) => handleDelete(e, product.id)} className="bg-red-button text-white font-bold py-1 px-4 md:px-10 hover:bg-red-button-darker rounded-lg shadow-lg transform duration-200">Delete</button>
                    <Link href={`/admin/products/${product.id}/edit`} className="bg-gray-button text-white font-bold py-1 px-4 md:px-10 hover:bg-gray-button-darker rounded-lg shadow-lg transform duration-200">Edit</Link>
                </div>
            </div>
        </AdminLayout>
    )
}

export default Detailed