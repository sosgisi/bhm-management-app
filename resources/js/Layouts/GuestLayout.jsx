import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBox, faHouse, faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { Link, usePage } from '@inertiajs/react'

const GuestLayout = ({children}) => {

    const { url } = usePage()

    return(
        <div>
            <div className='grid grid-cols-5 grid-rows-12 h-screen bg-slate-300'>
                {/* sidebar */}
                <nav className='p-3 lg:p-5 hidden md:flex flex-col gap-10 font-bold lg:text-xl md:text-md bg-sidebar md:row-start-2 row-end-13'>
                    <Link href='/guest/dashboard' className={`${url==='/guest/dashboard' ? 'bg-black text-white pointer-events-none' : 'hover:bg-gray-50 cursor-pointer'} flex gap-3 items-center justify-start py-1 px-2 md:px-3 lg:px-4 rounded transform duration-300`}>
                        <FontAwesomeIcon icon={faHouse} />
                        Utama
                    </Link>
                    <Link href='/guest/products' className={`${url==='/guest/products' ? 'bg-black text-white pointer-events-none' : 'hover:bg-gray-50 cursor-pointer'} flex gap-3 items-center justify-start py-1 px-2 md:px-3 lg:px-4 rounded transform duration-300`}>
                        <FontAwesomeIcon icon={faBox} />
                        Produk
                    </Link>
                </nav>
                {/* navbar */}
                <nav className='flex justify-between items-center px-5 bg-black text-white col-start-1 col-end-6'>
                    <h1 className="text-white text-3xl font-medium underline cursor-pointer underline-offset-1 decoration-4 decoration-underline">BHM</h1>
                    <div className='flex justify-center items-center gap-3 font-thin cursor-pointer'>
                        <Link href='/login' className='bg-green-button px-4 py-1 rounded shadow-xl hover:bg-green-button-darker transform duration-200'>Login</Link>
                        <Link href='/register' className='bg-gray-button px-4 py-1 rounded shadow-xl hover:bg-gray-button-darker transform duration-200'>Sign up</Link>
                    </div>
                </nav>
                <main className='bg-white col-start-1 md:col-start-2 col-end-6 row-start-2 row-end-13'>
                    {children}
                </main>
            </div>
        </div>
    )
}

export default GuestLayout