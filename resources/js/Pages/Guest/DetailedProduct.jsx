import { Link } from "@inertiajs/react"
import GuestLayout from "../../Layouts/GuestLayout"

const DetailedProduct = ({product}) => {
    
    return (
        <GuestLayout>
            <h1 className="text-xl md:text-3xl font-bold pt-5 pb-0 md:pb-5 px-4 md:px-8">Detail Produk #{product.id}</h1>
            <div className="p-4 md:p-8 flex flex-col md:flex-row gap-5">
                <div>
                    <img src={`/storage/${product.image}`} alt="" className="h-40 shadow-xl border rounded"/>
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
            <div className="mt-20 ml-5">
                <Link href="/guest/products" className="py-2 px-10 text-white font-bold rounded-lg shadow-lg bg-gray-button transform duration-200 hover:bg-gray-button-darker">Back</Link>
            </div>
        </GuestLayout>
    )
}

export default DetailedProduct