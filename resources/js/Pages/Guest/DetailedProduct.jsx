import GuestLayout from "../../Layouts/GuestLayout"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleMinus, faCirclePlus } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"

const DetailedProduct = ({product}) => {
    
    const [tempAmount, setTempAmount] = useState(1)

    const handleAddToCart = (e) => {
        e.preventDefault()
    }

    const handleOrder = (e) => {
        e.preventDefault()
    }

    return (
        <GuestLayout>
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
                    <div className="flex gap-3">
                        <div className="flex justify-center items-center mx-3 gap-3">
                            <FontAwesomeIcon onClick={() => setTempAmount((prevAmount) => prevAmount-1)} icon={faCircleMinus} className={`${tempAmount===1 && 'pointer-events-none text-gray-500'} size-8 hover:text-gray-700 cursor-pointer`}/>
                            <h1 className="text-xl font-medium">{tempAmount}</h1>
                            <FontAwesomeIcon onClick={() => setTempAmount((prevAmount) => prevAmount+1)} icon={faCirclePlus} className={`${tempAmount===product.quantity && 'pointer-events-none text-gray-500'} size-8 hover:text-gray-700 cursor-pointer`}/>
                        </div>
                        <button onClick={handleAddToCart} className="bg-yellow-button rounded-lg shadow-lg text-white font-bold hover:bg-yellow-button-darker py-2 px-10 transform duration-200">Tambah ke keranjang</button>
                        <button onClick={handleOrder} className="bg-green-button rounded-lg shadow-lg text-white font-bold hover:bg-green-button-darker py-2 px-10 transform duration-200">Pesan</button>
                    </div>
                </div>
        </GuestLayout>
    )
}

export default DetailedProduct