import { Link, router } from "@inertiajs/react"
import AdminLayout from "../../../Layouts/AdminLayout"
import { extractPublicId } from 'cloudinary-build-url'

const Detailed = ({product}) => {

    const handleDelete = (e) => {
        e.preventDefault()
        const publicId = extractPublicId(product.image)
        router.post(`/admin/products/${product.id}`, {
            publicId: publicId,
            _method: "delete"
        })
    }

    return (
        <AdminLayout>
            <h1 className="text-xl md:text-3xl font-bold pt-5 pb-0 md:pb-5 px-4 md:px-8">Detail Produk #{product.id}</h1>
            <div className="p-4 md:p-8 flex flex-col md:flex-row gap-5">
                <div>
                    <img src={product.image} alt={product.image} className="h-40 shadow-xl border rounded"/>
                </div>
                <div className="flex flex-col gap-2 md:w-1/3">
                    <p className="relative text-lg font-medium">
                        Nama : &nbsp;
                        <span className="absolute right-0 font-bold">{product.name}</span>
                    </p>
                    <p className="relative text-lg font-medium">
                        Harga : &nbsp;
                        <span className="absolute right-0 font-bold">{product.price}</span>
                    </p>
                    <p className="relative text-lg font-medium text-balance">
                        Satuan : &nbsp;
                        <span className="absolute right-0 font-bold">{product.unit}</span>
                    </p>
                    <p className="relative text-lg font-medium">
                        Kuantitas : &nbsp;
                        <span className="absolute right-0 font-bold">{product.quantity}</span>
                    </p>
                    <p className="relative text-lg font-medium">
                        Deskripsi : &nbsp;
                        <span className="absolute right-0 font-bold w-48 text-end">{product.description}</span>
                    </p>
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