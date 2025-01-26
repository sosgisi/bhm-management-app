import AdminLayout from "../../../Layouts/AdminLayout"
import { useForm } from "@inertiajs/react"
import { useEffect, useState } from "react"

const Create = () => {

    const [preview, setPreview] = useState()
    const {data, setData, post, processing, errors} = useForm({
        name: null,
        description: null,
        price: null,
        unit: null, 
        image: null,
        quantity: null,
        category: 'Produk',
    })

    const handleFileChange = (e) => {
        e.preventDefault()
        const selectedFile = e.target.files[0]
        console.log('selectedFile ', selectedFile)
        setData('image', selectedFile)
        if(selectedFile){
            const reader = new FileReader()
            reader.onload = (event) => {
                setPreview(event.target.result)
            }
            reader.readAsDataURL(selectedFile)
        }
    }

    const handleCreate = (e) => {
        e.preventDefault()
        console.log('data ', data)
        post('/admin/products')
    }

    return(
        <AdminLayout>
            <h1 className="px-8 pt-5 text-3xl font-bold">Tambah Produk</h1>
            <form onSubmit={handleCreate} className="flex justify-between gap-5 rounded border border-gray-500 my-5 mx-8 p-5">
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
                        <button className="bg-red-button hover:bg-red-button-darker text-white text-start font-bold rounded-lg shadow-lg py-1 px-10 transform duration-200">Batal</button>
                        <button className="bg-green-button hover:bg-green-button-darker text-white text-start font-bold rounded-lg shadow-lg py-1 px-10 transform duration-200">Simpan</button>
                    </div>
                </div>
            </form>
        </AdminLayout>
    )
}

export default Create