import AdminLayout from "../../../Layouts/AdminLayout"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUpload } from "@fortawesome/free-solid-svg-icons"

const Edit = () => {
    return(
        <AdminLayout>
            <h1 className="px-8 pt-5 text-3xl font-bold">Tambah Produk</h1>
            <div className="flex justify-between gap-5 rounded border border-gray-500 my-5 mx-8 p-5">
                <div className="flex flex-col gap-2 w-1/2">
                    <label className="font-medium text-lg">Nama</label>
                    <input type="text" className="bg-gray-200 focus:outline-gray-600 rounded border border-gray-500 py-1 px-3 mb-5"/>
                    <div className="flex justify-between">
                        <label className="font-medium text-lg">Harga</label>
                        <label className="font-medium text-md">Satuan</label>
                    </div>
                    <div className="flex justify-between gap-5 mb-5">
                        <input type="number" className="w-full bg-gray-200 focus:outline-gray-600 rounded border border-gray-500 py-1 px-3"/>
                        <div className="flex gap-3">
                            <p className="font-bold">1x</p>
                            <select className="bg-gray-200 focus:outline-gray-600 rounded border border-gray-500 py-1 px-2">
                                <option value=""></option>
                                <option value="kg">kg</option>
                                <option value="cm">cm</option>
                                <option value="m">m</option>
                                <option value="gram">gram</option>
                                <option value="sak">sak</option>
                            </select>
                        </div>
                    </div>
                    <label className="font-medium text-lg">Kuantitas</label>
                    <input type="number" className="bg-gray-200 focus:outline-gray-600 rounded border border-gray-500 py-1 px-3 mb-5"/>
                    <label className="font-medium text-lg">Foto</label>
                    <div className="h-40 rounded border border-gray-500"></div>
                    <div className="flex justify-end">
                        <button className="flex gap-2 justify-center items-center bg-gray-200 focus:outline-gray-600 hover:bg-gray-400 rounded-lg border border-gray-500 py-1 px-5 transform duration-200">
                            <FontAwesomeIcon icon={faUpload} />
                            Upload file
                        </button>
                    </div>
                </div>
                <div className="flex flex-col justify-between w-1/2 gap-2">
                    <div className="flex flex-col">
                        <label className="font-medium text-lg">Deskripsi</label>
                        <textarea rows={7} className="bg-gray-200 focus:outline-gray-600 rounded border border-gray-500 py-1 px-3"></textarea>
                    </div>
                    <div className="flex justify-end gap-5">
                        <button className="bg-red-button hover:bg-red-button-darker text-white text-start font-bold rounded-lg shadow-lg py-1 px-10 transform duration-200">Batal</button>
                        <button className="bg-green-button hover:bg-green-button-darker text-white text-start font-bold rounded-lg shadow-lg py-1 px-10 transform duration-200">Simpan</button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default Edit