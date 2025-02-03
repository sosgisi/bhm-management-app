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

    const isProductRoute = location.pathname.startsWith('/admin/product');
    const isOrderRoute = location.pathname.startsWith('/admin/orders');
    const isIncomeRoute = location.pathname.startsWith('/admin/incomes');

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
                        <Link href='/admin/products' className={`${isProductRoute ? 'bg-black text-white pointer-events-none' : 'hover:bg-gray-50 cursor-pointer'} flex gap-3 items-center justify-start py-1 px-2 md:px-3 lg:px-4 rounded transform duration-300`}>
                            <FontAwesomeIcon icon={faBox} />
                            Produk
                        </Link>
                        <div>
                            <Link href='/admin/orders' className={`${isOrderRoute ? 'bg-black text-white pointer-events-none' : 'hover:bg-gray-50 cursor-pointer'} flex gap-3 items-center justify-start py-1 px-2 md:px-3 lg:px-4 rounded transform duration-300`}>
                                <FontAwesomeIcon icon={faFileInvoiceDollar} />
                                Pesanan
                            </Link>
                        </div>
                        <div>
                            <Link href='/admin/incomes/today' className={`${isIncomeRoute ? 'bg-black text-white pointer-events-none' : 'hover:bg-gray-50 cursor-pointer'} flex gap-3 items-center justify-start py-1 px-2 md:px-3 lg:px-4 rounded transform duration-300`}>
                                <FontAwesomeIcon icon={faInbox} />
                                Pemasukan
                            </Link>
                            {
                                isIncomeRoute &&
                                <div>
                                    <Link href='/admin/incomes' className={`${url==='/admin/incomes' && 'bg-white pointer-events-none'} flex justify-start items-center pl-10 py-1 mt-3 hover:bg-white rounded transform duration-300`}>
                                        Semua
                                    </Link>
                                    <Link href='/admin/incomes/today' className={`${url==='/admin/incomes/today' && 'bg-white pointer-events-none'} flex justify-start items-center pl-10 py-1 mt-3 hover:bg-white rounded transform duration-300`}>
                                        Hari ini
                                    </Link>
                                </div>
                            }
                        </div>
                    </div>
                    {/* <Link href='/admin/settings' className={`${url==='/admin/settings' ? 'bg-black text-white pointer-events-none' : 'hover:bg-gray-50 cursor-pointer'} flex gap-3 items-center justify-start py-1 px-4 rounded transform duration-300`}>
                        <FontAwesomeIcon icon={faGear} />
                        Pengaturan
                    </Link> */}
                </nav>
                {/* navbar */}
                <nav className='flex justify-between items-center px-5 bg-black text-white col-start-1 col-end-6'>
                    <h1 className="text-white text-3xl font-medium underline cursor-pointer underline-offset-1 decoration-4 decoration-underline">BHM</h1>
                    <div className='flex justify-center items-center gap-3 font-thin mx-5'>
                        <h1 className='text-xl'>{auth.user[0].name}</h1>
                        <div className='bg-gray-500 rounded-full py-1 px-2'>
                            <FontAwesomeIcon icon={faUser} />
                        </div>
                        <FontAwesomeIcon icon={faCaretDown} onClick={() => setProfileClick((prevState) => !prevState)} className='size-5 hover:text-gray-200 hover:bg-gray-600 rounded-full p-1'/>
                        { profileClick && 
                            <div className='z-10 absolute top-16 right-2 flex items-start justify-center w-40 h-40 bg-black bg-opacity-50 rounded-md'>
                                <Link onClick={handleLogout} className='absolute font-semibold bg-red-button rounded py-2 px-5 hover:bg-red-button-darker'>Logout</Link> 
                            </div>
                        }
                    </div>
                </nav>
                <main className='bg-main col-start-1 md:col-start-2 col-end-6 row-start-2 row-end-13'>
                    {children}
                </main>
            </div>
        </div>
    )
}

export default AdminLayout