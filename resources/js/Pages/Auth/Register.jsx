import { Link } from "@inertiajs/react"

const Register = () => {
    return(
        <div className="flex justify-center items-center h-screen">
            <img src="/assets/toko-bangunan.jpg" alt="" className="absolute top-0 bottom-0 left-0 right-0 w-full h-screen object-cover" />
            <div className="z-10 flex flex-col justify-between gap-20 border shadow-xl w-1/3 py-14 px-10 backdrop-blur-sm rounded-lg">
                <div className="flex flex-col gap-2">
                    <label className="text-gray-900 font-medium text-lg">Name</label>
                    <input type="text" placeholder="name" className="bg-gray-300 focus:bg-gray-200 rounded px-3 py-2 shadow mb-5 focus:outline-none"/>
                    <label className="text-gray-900 font-medium text-lg">Email</label>
                    <input type="email" placeholder="name" className="bg-gray-300 focus:bg-gray-200 rounded px-3 py-2 shadow mb-5 focus:outline-none"/>
                    <label className="text-gray-900 font-medium text-lg">Password</label>
                    <input type="password" placeholder="password" className="bg-gray-300 focus:bg-gray-200 rounded px-3 py-2 shadow focus:outline-none"/>
                    <label className="text-gray-900 font-medium text-lg">Re-enter Password</label>
                    <input type="password" placeholder="password" className="bg-gray-300 focus:bg-gray-200 rounded px-3 py-2 shadow focus:outline-none"/>
                </div>
                <div className="flex flex-col items-end gap-5">
                    <button className="text-xl text-white font-bold text-center py-2 bg-green-button rounded shadow-xl w-40 hover:bg-green-button-darker trasnform duration-200">Sign up</button>
                    <Link href="/login" className="underline cursor-pointer">already have an account?</Link>
                </div>
            </div>
        </div>
    )
}

export default Register