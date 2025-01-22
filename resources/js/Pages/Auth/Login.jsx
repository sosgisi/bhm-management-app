import { Link, useForm } from "@inertiajs/react"
import { useEffect } from "react"

const Login = () => {

    const {data, setData, post, processing, errors } = useForm({
        name: '',
        password: ''
    })

    const handleLogin = (e) => {
        console.log('here')
        e.preventDefault(); 
        post('/login')
    }

    useEffect(() => {
        console.log(errors)
    }, [errors])

    return (
        <div className="flex justify-center items-center h-screen">
            <img src="/assets/toko-bangunan.jpg" alt="" className="absolute top-0 bottom-0 left-0 right-0 w-full h-screen object-cover" />
            <form onSubmit={handleLogin} className="z-10 flex flex-col justify-between gap-20 border shadow-xl w-1/3 py-14 px-10 backdrop-blur-sm rounded-lg">
                <div className="flex flex-col gap-2">
                    <label className="text-gray-900 font-medium text-lg">Name</label>
                    <input value={data.name} onChange={(e) => setData('name', e.target.value)} type="text" placeholder="name" className={`${errors?.name ? 'ring-1 ring-red-500' : 'mb-5'} bg-gray-300 focus:bg-gray-200 rounded px-3 py-2 shadow focus:outline-none`}/>
                    {errors?.name && 
                        <p className="text-red-500">{errors.name}</p>
                    }
                    <label className="text-gray-900 font-medium text-lg">Password</label>
                    <input value={data.password} onChange={(e) => setData('password', e.target.value)} type="password" placeholder="password" className={`${errors?.name && 'ring-1 ring-red-500'} bg-gray-300 focus:bg-gray-200 rounded px-3 py-2 shadow focus:outline-none`}/>
                    {errors?.password && 
                        <p className="text-red-500">{errors.password}</p>
                    }
                </div>
                <div className="flex flex-col items-end gap-5">
                    {errors?.message && 
                        <p className="text-red-500">{errors.message}</p>
                    }
                    <button disabled={processing} className="text-xl text-white font-bold text-center py-2 bg-green-button rounded shadow-xl w-40 hover:bg-green-button-darker trasnform duration-200">Login</button>
                    <Link href="/guest/dashboard" className="underline cursor-pointer">continue as a guest</Link>
                </div>
            </form>
        </div>
    )
}

export default Login