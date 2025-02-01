import { Link, router } from "@inertiajs/react"
import AdminLayout from "../../../Layouts/AdminLayout"

const Detailed = ({product}) => {

    console.log(product)

    const handleProductDelete = (e) => {
        e.preventDefault()
        router.post(`/admin/products/${product.id}`, {
            _method: "delete"
        })
    }

    return (
        <AdminLayout>
            <h1 className="text-3xl font-bold py-5 px-8">Detail Produk #{product.id}</h1>
            <div className="p-8 flex gap-5">
                <div>
                    <img src={`/storage/${product.image}`} alt="" className="h-40 shadow-xl border rounded"/>
                </div>
                <div className="flex flex-col gap-2 w-1/3">
                    <p className="relative text-lg font-medium">
                        Nama : &nbsp;
                        <span className="absolute right-0 font-bold">{product.name}</span>
                    </p>
                    <p className="relative text-lg font-medium">
                        Deskripsi : &nbsp;
                        <span className="absolute right-0 font-bold">{product.description}</span>
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
                </div>
            </div>
            <div className="absolute right-10 bottom-10">
                <Link onClick={handleProductDelete}>Delete</Link>
                <Link href={`/user/products/${product.id}/edit`}>Edit</Link>
            </div>
        </AdminLayout>
    )
}

export default Detailed