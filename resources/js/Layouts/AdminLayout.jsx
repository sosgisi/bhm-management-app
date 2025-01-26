import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faFileInvoiceDollar, faBox, faInbox, faHouse, faGear, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { Link, useForm, usePage } from '@inertiajs/react'
import { useState } from 'react'

const AdminLayout = ({children}) => {

    const { auth } = usePage().props;
    const { post } = useForm()
    const { url } = usePage()

    const [profileClick, setProfileClick] = useState(false)

    const handleLogout = (e) => {
        e.preventDefault()
        post('/admin/logout')
    }

    return(
        <div>
            <div className='grid grid-cols-5 grid-rows-12 h-screen bg-slate-300'>
                {/* sidebar */}
                <nav className='p-3 lg:p-5 hidden md:flex flex-col justify-between font-bold lg:text-lg md:text-md bg-sidebar md:row-start-2 row-end-13'>
                    <div className='flex flex-col gap-10'>
                        <Link href='/admin/dashboard' className={`${url==='/admin/dashboard' ? 'bg-black text-white pointer-events-none' : 'hover:bg-gray-50 cursor-pointer'} flex gap-3 items-center justify-start py-1 px-2 md:px-3 lg:px-4 rounded transform duration-300`}>
                            <FontAwesomeIcon icon={faHouse} />
                            Utama
                        </Link>
                        <Link href='/admin/products' className={`${url==='/admin/products' ? 'bg-black text-white pointer-events-none' : 'hover:bg-gray-50 cursor-pointer'} flex gap-3 items-center justify-start py-1 px-2 md:px-3 lg:px-4 rounded transform duration-300`}>
                            <FontAwesomeIcon icon={faBox} />
                            Produk
                        </Link>
                        <Link href='/admin/orders' className={`${url==='/admin/orders' ? 'bg-black text-white pointer-events-none' : 'hover:bg-gray-50 cursor-pointer'} flex gap-3 items-center justify-start py-1 px-2 md:px-3 lg:px-4 rounded transform duration-300`}>
                            <FontAwesomeIcon icon={faFileInvoiceDollar} />
                            Pesanan
                        </Link>
                        <Link href='/admin/income' className={`${url==='/admin/income' ? 'bg-black text-white pointer-events-none' : 'hover:bg-gray-50 cursor-pointer'} flex gap-3 items-center justify-start py-1 px-2 md:px-3 lg:px-4 rounded transform duration-300`}>
                            <FontAwesomeIcon icon={faInbox} />
                            Pemasukan
                        </Link>
                    </div>
                    <Link href='/admin/settings' className={`${url==='/admin/settings' ? 'bg-black text-white pointer-events-none' : 'hover:bg-gray-50 cursor-pointer'} flex gap-3 items-center justify-start py-1 px-4 rounded transform duration-300`}>
                        <FontAwesomeIcon icon={faGear} />
                        Pengaturan
                    </Link>
                </nav>
                {/* navbar */}
                <nav className='flex justify-between items-center px-5 bg-black text-white col-start-1 col-end-6'>
                    <h1 className="text-white text-3xl font-medium underline cursor-pointer underline-offset-1 decoration-4 decoration-underline">BHM</h1>
                    <div className='flex justify-center items-center gap-3 font-thin mx-5'>
                        <h1 className='text-xl'>{auth.user[0].name}</h1>
                        <div className='bg-gray-500 rounded-full py-1 px-2'>
                            <FontAwesomeIcon icon={faUser} />
                        </div>
                        <FontAwesomeIcon icon={faCaretDown} onClick={() => setProfileClick((prevState) => !prevState)} className='cursor-pointer size-5 hover:text-gray-200'/>
                        { profileClick && 
                            <div className='absolute top-16 right-2 flex items-start justify-center w-40 h-40 bg-black bg-opacity-50 rounded-md'>
                                <Link onClick={handleLogout} className='absolute font-semibold bg-red-button rounded py-2 px-5 hover:bg-red-button-darker'>Logout</Link> 
                            </div>
                        }
                    </div>
                </nav>
                <main className='bg-white col-start-1 md:col-start-2 col-end-6 row-start-2 row-end-13'>
                    {children}
                </main>
            </div>
        </div>
    )
}

export default AdminLayout