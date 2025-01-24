import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faBox, faHouse, faGear, faCartShopping, faTruck } from '@fortawesome/free-solid-svg-icons'
import { Link, useForm, usePage } from '@inertiajs/react'

const UserLayout = ({children}) => {

    const { auth } = usePage().props
    const { post } = useForm()

    console.log(auth)

    const handleLogout = (e) => {
        e.preventDefault()
        post('/user/logout')
    }

    return(
        <div>
            <div className='grid grid-cols-5 grid-rows-12 h-screen bg-slate-300'>
                {/* sidebar */}
                <nav className='p-3 lg:p-5 hidden md:flex flex-col justify-between font-bold lg:text-xl md:text-md bg-sidebar md:row-start-2 row-end-13'>
                    <div className='flex flex-col gap-10'>
                        <div className='flex gap-3 items-center justify-start py-1 px-4 rounded hover:bg-gray-50 cursor-pointer transform duration-300'>
                            <FontAwesomeIcon icon={faHouse} />
                            <Link href='/user/dashboard'>Utama</Link>
                        </div>
                        <div className='flex gap-3 items-center justify-start py-1 px-4 rounded hover:bg-gray-50 cursor-pointer transform duration-300'>
                            <FontAwesomeIcon icon={faBox} />
                            <Link href='/user/products'>Produk</Link>
                        </div>
                        <div className='flex gap-3 items-center justify-start py-1 px-4 rounded hover:bg-gray-50 cursor-pointer transform duration-300'>
                            <FontAwesomeIcon icon={faCartShopping} />
                            <Link href='/user/cart'>Keranjang</Link>
                        </div>
                        <div className='flex gap-3 items-center justify-start py-1 px-4 rounded hover:bg-gray-50 cursor-pointer transform duration-300'>
                            <FontAwesomeIcon icon={faTruck} />
                            <Link href='/user/orders'>Pesanan Saya</Link>
                        </div>
                    </div>
                    <div className='flex gap-3 items-center justify-start py-1 px-4 rounded hover:bg-gray-50 cursor-pointer transform duration-300'>
                        <FontAwesomeIcon icon={faGear} />
                        <Link href='/user/settings'>Pengaturan</Link>
                    </div>
                </nav>
                {/* navbar */}
                <nav className='flex justify-between items-center px-5 bg-black text-white col-start-1 col-end-6'>
                    <h1 className="text-white text-3xl font-medium underline cursor-pointer underline-offset-1 decoration-4 decoration-underline">BHM</h1>
                    <div className='flex justify-center items-center gap-3 font-thin cursor-pointer'>
                        <h1>{auth.user[0].name}</h1>
                        <div className='bg-gray-500 rounded-full py-1 px-2'>
                            <FontAwesomeIcon icon={faUser} className=''/>
                        </div>
                        <Link onClick={handleLogout}>Logout</Link>
                    </div>
                </nav>
                <main className='bg-white col-start-1 md:col-start-2 col-end-6 row-start-2 row-end-13'>
                    {children}
                </main>
            </div>
        </div>
    )
}

export default UserLayout