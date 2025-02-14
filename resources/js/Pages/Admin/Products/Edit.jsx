import AdminLayout from "../../../Layouts/AdminLayout"
import { Link, router, useForm } from "@inertiajs/react"
import { useState } from "react"
import { extractPublicId } from 'cloudinary-build-url'

const Edit = ({product}) => {

    const [errors, setErrors] = useState([])
    const [customUnit, setCustomUnit] = useState(""); // State for custom unit
    const [isCustomUnit, setIsCustomUnit] = useState(false);
    const [preview, setPreview] = useState(product.image)
    const { data, setData } = useForm({
        name: product.name,
        price: product.price,
        unit: product.unit,
        quantity: product.quantity,
        image: product.image,
        description: product.description,
        category: product.category,
    })
    // const [prevImage, setPrevImage] = useState(product.image)
    const [imageChanged, setImageChanged] = useState(false)

    const handleUpdate = async(e) => {
        e.preventDefault()
        let publicId = null
        // if(imageChanged){
        //     publicId = extractPublicId(prevImage)
        // }
        if(imageChanged){
            publicId = product.image
        }
        router.post(`/admin/products/${product.id}`, {
            ...data,
            prevImage: publicId,
            _method: "put",
        },{
            onError: (error) => setErrors(error),
        })
        setImageChanged(false)
    }

    const handleFileChange = (e) => {
        e.preventDefault()
        const selectedFile = e.target.files[0]
        // if(typeof data.image === "string"){
        //     setPrevImage(data.image)
        // }
        setImageChanged(true)
        setData('image', selectedFile)
        if(selectedFile){
            const reader = new FileReader()
            reader.onload = (event) => {
                setPreview(event.target.result)
            }
            reader.readAsDataURL(selectedFile)
        }
    }

    const handleUnitChange = (e) => {
        const selectedValue = e.target.value;
        setData("unit", selectedValue);
        setIsCustomUnit(selectedValue === "custom");
        if (selectedValue !== "custom") {
            setCustomUnit(""); // Clear custom input if predefined is selected
        }
    };

    const handleCustomUnitChange = (e) => {
        setCustomUnit(e.target.value);
        setData("unit", e.target.value); // Update the form data with the custom unit
    };

    return(
        <AdminLayout>
            <h1 className="ml-14 px-4 md:px-8 pt-5 text-xl md:text-3xl font-bold">Edit Produk</h1>
            <div className="flex flex-col md:flex-row justify-between gap-5 rounded border border-gray-500 my-5 mx-4 md:mx-8 p-5">
                <div className={`${errors ? 'gap-0' : 'gap-2'} flex flex-col w-full md:w-1/2`}>
                    <label className="font-medium text-lg">Nama</label>
                    <input value={data.name} onChange={(e) => setData('name', e.target.value)} type="text" className={`${errors.name ? 'ring-1 ring-red-500': 'mb-5'} bg-gray-200 focus:outline-gray-600 rounded border border-gray-500 py-1 px-3`}/>
                    {
                        errors.name &&
                        <p className="text-red-500">{errors.name}</p>
                    }
                    <div className="flex justify-between">
                        <label className="font-medium text-lg">Harga</label>
                        <label className="font-medium text-md">Satuan</label>
                    </div>
                    <div className={`${errors.price || errors.unit ? 'relative mb-0 h-14' : 'mb-5'} flex justify-between gap-2`}>
                        <input value={data.price} onChange={(e) => setData('price', e.target.value)} type="number" className={`${errors.price && 'ring-1 ring-red-500'} w-full h-8 bg-gray-200 focus:outline-gray-600 rounded border border-gray-500 py-1 px-3`}/>
                        {
                            errors.price &&
                            <p className="absolute bottom-0 text-red-500 text-sm">{errors.price}</p>
                        }
                        <div className="flex gap-1">
                            <p className="font-bold">1x</p>
                            <div className="flex flex-col gap-1 w-24">
                                <select value={data.unit} onChange={handleUnitChange} className={`${errors.unit && 'ring-1 ring-red-500'} bg-gray-200 focus:outline-gray-600 rounded border border-gray-500 py-1 px-2`}>
                                    <option value=""></option>
                                    <option value="pcs">pcs</option>
                                    <option value="kg">kg</option>
                                    <option value="cm">cm</option>
                                    <option value="m">m</option>
                                    <option value="gram">gram</option>
                                    <option value="sak">sak</option>
                                    <option value="custom">Lainnya</option>
                                </select>
                                {isCustomUnit && (
                                    <input
                                        type="text"
                                        value={customUnit}
                                        onChange={handleCustomUnitChange}
                                        placeholder="Satuan lainnya"
                                        className="bg-gray-200 focus:outline-gray-600 rounded border border-gray-500 py-1 px-2"
                                    />
                                )}
                            </div>
                        </div>
                        {
                            errors.unit &&
                            <p className={`${!errors.price ? 'flex' : 'hidden'} lg:flex absolute right-0 bottom-0 text-red-500 text-sm`}>{errors.unit}</p>
                        }
                    </div>
                    <label className="font-medium text-lg">Kuantitas</label>
                    <input value={data.quantity} onChange={(e) => setData('quantity', e.target.value)} type="number" className={`${errors.quantity ? 'ring-1 ring-red-500' : 'mb-5'} bg-gray-200 focus:outline-gray-600 rounded border border-gray-500 py-1 px-3`}/>
                    {
                        errors.quantity &&
                        <p className="text-red-500">{errors.quantity}</p>
                    }
                    <label className="font-medium text-lg">Foto</label>
                    <div className={`${errors.image && 'ring-1 ring-red-500'} h-40 rounded border border-gray-500`} >
                        {
                            preview && 
                            <div className="flex justify-center items-center">
                                <img src={preview} alt="Preview" className="h-36" />
                            </div>
                        }
                    </div>
                    {
                        errors.image &&
                        <p className="text-red-500">{errors.image}</p>
                    }
                    <div className="flex justify-start items-center">
                        <input type="file" onChange={handleFileChange} className="w-64"/>
                    </div>
                </div>
                <div className="flex flex-col gap-5 md:gap-0 justify-between w-full md:w-1/2">
                    <div className="flex flex-col gap-2">
                        <label className="font-medium text-lg">Deskripsi</label>
                        <textarea value={data.description} onChange={(e) => setData('description', e.target.value)} rows={7} className="bg-gray-200 focus:outline-gray-600 rounded border border-gray-500 py-1 px-3"></textarea>
                    </div>
                    <div className="flex justify-end items-center gap-3">
                        <label className="font-medium text-lg">Kategory: </label>
                        <select value={data.category} onChange={(e) => setData('category', e.target.value)} className="bg-gray-200 focus:outline-gray-600 rounded border border-gray-500 w-40 py-1 px-2">
                            <option value="Produk">Barang (default)</option>
                            <option value="Pipa">Pipa</option>
                            <option value="Kayu">Kayu</option>
                            <option value="Cat">Cat</option>
                            <option value="Besi">Besi</option>
                        </select>
                    </div>
                    <div className="flex justify-center md:justify-end gap-5">
                        <Link href="/admin/products" className="bg-red-button hover:bg-red-button-darker text-white text-start font-bold rounded-lg shadow-lg py-1 px-10 transform duration-200">Batal</Link>
                        <button onClick={handleUpdate} className="bg-green-button hover:bg-green-button-darker text-white text-start font-bold rounded-lg shadow-lg py-1 px-10 transform duration-200">Simpan</button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default Edit