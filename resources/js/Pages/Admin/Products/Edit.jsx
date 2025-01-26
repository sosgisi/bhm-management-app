import AdminLayout from "../../../Layouts/AdminLayout"
import { Link, router, useForm } from "@inertiajs/react"
import { useEffect, useState } from "react"

const Edit = ({product}) => {

    const [preview, setPreview] = useState(product.image)
    const { data, setData, post, processing, errors } = useForm({
        name: product.name,
        price: product.price,
        unit: product.unit,
        quantity: product.quantity,
        image: product.image,
        description: product.description,
        category: product.category,
    })

    useEffect(() => {
        // Check if `product.image` exists and is a valid string
        if (typeof product.image === "string" && product.image.trim() !== "") {
            console.log("Fetching image from URL:", product.image)
            fetch(product.image)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`Failed to fetch image. Status: ${response.status}`)
                    }
                    return response.blob()
                })
                .then((blob) => {
                    if (blob) {
                        console.log("Blob fetched successfully:", blob)
                        const file = new File([blob], "current-image.jpg", {
                            type: blob.type || "image/jpeg",
                        })
                        setData("image", file) // Set the file for the form
                        setPreview(URL.createObjectURL(file)) // Preview the image
                    } else {
                        console.error("Blob is undefined.")
                    }
                })
                .catch((error) => {
                    console.error("Error fetching or processing the image:", error)
                })
        } else {
            console.warn("Invalid or missing `product.image` URL.")
        }
    }, [product.image])

    const handleUpdate = (e) => {
        console.log(data)
        e.preventDefault()
        router.post(`/admin/products/${product.id}`, {
            ...data,
            _method: "put",
        })
    }

    const handleFileChange = (e) => {
        e.preventDefault()
        const selectedFile = e.target.files[0]
        console.log('selectedFile ', selectedFile)
        setData('image', selectedFile)
        // setFile(selectedFile)
        if(selectedFile){
            const reader = new FileReader()
            reader.onload = (event) => {
                setPreview(event.target.result)
            }
            reader.readAsDataURL(selectedFile)
        }
    }

    return(
        <AdminLayout>
            <h1 className="px-8 pt-5 text-3xl font-bold">Edit Produk</h1>
            <form onSubmit={handleUpdate} className="flex justify-between gap-5 rounded border border-gray-500 my-5 mx-8 p-5">
                <div className="flex flex-col gap-2 w-1/2">
                    <label className="font-medium text-lg">Nama</label>
                    <input value={data.name} onChange={(e) => setData('name', e.target.value)} type="text" className="bg-gray-200 focus:outline-gray-600 rounded border border-gray-500 py-1 px-3 mb-5"/>
                    <div className="flex justify-between">
                        <label className="font-medium text-lg">Harga</label>
                        <label className="font-medium text-md">Satuan</label>
                    </div>
                    <div className="flex justify-between gap-5 mb-5">
                        <input value={data.price} onChange={(e) => setData('price', e.target.value)} type="number" className="w-full bg-gray-200 focus:outline-gray-600 rounded border border-gray-500 py-1 px-3"/>
                        <div className="flex gap-3">
                            <p className="font-bold">1x</p>
                            <select value={data.unit} onChange={(e) => setData('unit', e.target.value)} className="bg-gray-200 focus:outline-gray-600 rounded border border-gray-500 py-1 px-2">
                                <option value=""></option>
                                <option value="pcs">pcs</option>
                                <option value="kg">kg</option>
                                <option value="cm">cm</option>
                                <option value="m">m</option>
                                <option value="gram">gram</option>
                                <option value="sak">sak</option>
                            </select>
                        </div>
                    </div>
                    <label className="font-medium text-lg">Kuantitas</label>
                    <input value={data.quantity} onChange={(e) => setData('quantity', e.target.value)} type="number" className="bg-gray-200 focus:outline-gray-600 rounded border border-gray-500 py-1 px-3 mb-5"/>
                    <label className="font-medium text-lg">Foto</label>
                    <div className="h-40 rounded border border-gray-500">
                        {
                            preview && 
                            <div className="flex justify-center items-center">
                                <img src={preview} alt="Preview" className="h-36" />
                            </div>
                        }
                    </div>
                    <div className="flex justify-start items-center">
                        <input type="file" onChange={handleFileChange} className="w-64"/>
                    </div>
                </div>
                <div className="flex flex-col justify-between w-1/2">
                    <div className="flex flex-col gap-2">
                        <label className="font-medium text-lg">Deskripsi</label>
                        <textarea value={data.description} onChange={(e) => setData('description', e.target.value)} rows={7} className="bg-gray-200 focus:outline-gray-600 rounded border border-gray-500 py-1 px-3"></textarea>
                    </div>
                    <div className="flex justify-end items-center gap-3">
                        <label className="font-medium text-lg">Kategory: </label>
                        <select value={data.category} onChange={(e) => setData('category', e.target.value)} className="bg-gray-200 focus:outline-gray-600 rounded border border-gray-500 w-40 py-1 px-2">
                            <option value="Produk">Barang (default)</option>
                            <option value="Semen">Semen</option>
                            <option value="Kayu">Kayu</option>
                            <option value="Cat">Cat</option>
                            <option value="Besi">Besi</option>
                        </select>
                    </div>
                    <div className="flex justify-end gap-5">
                        <Link href={route('admin.products')} className="bg-red-button hover:bg-red-button-darker text-white text-start font-bold rounded-lg shadow-lg py-1 px-10 transform duration-200">Batal</Link>
                        <button className="bg-green-button hover:bg-green-button-darker text-white text-start font-bold rounded-lg shadow-lg py-1 px-10 transform duration-200">Simpan</button>
                    </div>
                </div>
            </form>
        </AdminLayout>
    )
}

export default Edit