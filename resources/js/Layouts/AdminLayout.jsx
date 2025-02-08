import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileInvoiceDollar, faBox, faInbox, faHouse, faCaretDown, faBars, faUser } from '@fortawesome/free-solid-svg-icons'
import { Link, useForm, usePage } from '@inertiajs/react'
import { useEffect, useRef, useState } from 'react'

const AdminLayout = ({children}) => {

    const { auth, flash } = usePage().props;
    const { post } = useForm()
    const { url } = usePage()
    const [notification, setNotification] = useState(null)
    const [profileClick, setProfileClick] = useState(false)
    // const [sidebarClick, setSidebarClick] = useState(false)
    const dropdownRef = useRef(null)

    const isProductRoute = location.pathname.startsWith('/admin/product');
    const isOrderRoute = location.pathname.startsWith('/admin/orders');
    const isIncomeRoute = location.pathname.startsWith('/admin/incomes');
    const isTodayIncomeRoute = location.pathname.startsWith('/admin/incomes/today');
    const isAccountRoute = location.pathname.startsWith('/admin/account');
    
    const handleLogout = (e) => {
        e.preventDefault()
        post('/admin/logout')
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setProfileClick(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (!flash?.success && !flash?.message) return;

        setNotification(flash.success || flash.message);

        const timer = setTimeout(() => {
            setNotification(null)
        }, 5000)
        return () => clearTimeout(timer)
    }, [])

    return(
        <div>
            {
                notification && 
                <div className='absolute bottom-10 right-10 bg-green-600 rounded py-2 px-10 animate-slideInOut'>
                    <h1 className='text-white font-bold text-md tracking-wide'>{notification}</h1>
                </div>
            }
            <div className='flex md:grid grid-cols-5 grid-rows-12 min-h-screen bg-slate-300'>
                {/* sidebar */}
                <nav className='fixed top-0 left-0 bottom-0 md:relative z-10 w-[60px] md:w-auto px-3 py-3 lg:p-5 h-screen md:h-auto flex flex-col justify-between font-bold lg:text-lg md:text-md bg-sidebar row-start-2 row-end-13'>
                    <div className='flex flex-col gap-10'>
                        <Link href='/admin/dashboard' className="flex md:hidden text-black text-md lg:text-3xl font-medium underline cursor-pointer underline-offset-1 decoration-4 decoration-underline">BHM</Link>
                        <Link href='/admin/dashboard' className={`group ${url==='/admin/dashboard' ? 'bg-black text-white pointer-events-none' : 'hover:bg-gray-50 cursor-pointer'} flex gap-3 items-center justify-start py-1 px-2 md:px-3 lg:px-4 rounded transform duration-300`}>
                            <FontAwesomeIcon icon={faHouse} />
                            <span className='md:hidden scale-0 group-hover:scale-100 transition-all duration-100 ml-3 bg-black text-white rounded px-3'>Utama</span>
                            <span className='hidden md:flex'>Utama</span>
                        </Link>
                        <Link href='/admin/products' className={`group ${isProductRoute ? 'bg-black text-white pointer-events-none' : 'hover:bg-gray-50 cursor-pointer'} flex gap-3 items-center justify-start py-1 px-2 md:px-3 lg:px-4 rounded transform duration-300`}>
                            <FontAwesomeIcon icon={faBox} />
                            <span className='md:hidden scale-0 group-hover:scale-100 transition-all duration-100 ml-3 bg-black text-white rounded px-3'>Produk</span>
                            <span className='hidden md:flex'>Produk</span>
                        </Link>
                        <div>
                            <Link href='/admin/orders' className={`group ${isOrderRoute ? 'bg-black text-white pointer-events-none' : 'hover:bg-gray-50 cursor-pointer'} flex gap-3 items-center justify-start py-1 px-2 md:px-3 lg:px-4 rounded transform duration-300`}>
                                <FontAwesomeIcon icon={faFileInvoiceDollar} />
                                <span className='md:hidden scale-0 group-hover:scale-100 transition-all duration-100 ml-3 bg-black text-white rounded px-3'>Pesanan</span>                                
                                <span className='hidden md:flex'>Pesanan</span>
                            </Link>
                        </div>
                        <div>
                            <Link href='/admin/incomes/today' className={`group ${isIncomeRoute ? 'bg-black text-white' : 'hover:bg-gray-50 cursor-pointer'} flex gap-3 items-center justify-start py-1 px-2 md:px-3 lg:px-4 rounded transform duration-300`}>
                                <FontAwesomeIcon icon={faInbox} />
                                <span className='md:hidden scale-0 group-hover:scale-100 transition-all duration-100 ml-3 bg-black text-white rounded px-3'>Pemasukan</span>
                                <span className='hidden md:flex'>Pemasukan</span>
                            </Link>
                            {
                                isIncomeRoute &&
                                <div className='hidden md:flex flex-col'>
                                    <Link href='/admin/incomes' className={`${url==='/admin/incomes' && 'bg-white pointer-events-none'} flex justify-start items-center pl-10 py-1 mt-3 hover:bg-white rounded transform duration-300`}>
                                        Semua
                                    </Link>
                                    <Link href='/admin/incomes/today' className={`${isTodayIncomeRoute && 'bg-white pointer-events-none'} flex justify-start items-center pl-10 py-1 mt-3 hover:bg-white rounded transform duration-300`}>
                                        Hari ini
                                    </Link>
                                </div>
                            }
                        </div>
                    </div>
                    <Link href='/admin/account' className={`md:hidden group ${isAccountRoute ? 'bg-black text-white pointer-events-none' : 'hover:bg-gray-50 cursor-pointer'} flex gap-3 items-center justify-start py-1 px-2 md:px-3 lg:px-4 rounded transform duration-300`}>
                        <FontAwesomeIcon icon={faUser} />
                        <span className='scale-0 group-hover:scale-100 transition-all duration-100 ml-3 bg-black text-white rounded px-3'>Akun</span>
                    </Link>
                </nav>
                {/* navbar */}
                <nav className='hidden md:flex justify-between items-center px-3 md:px-5 bg-black text-white col-start-1 col-end-7 md:col-end-6'>
                    {/* <div className='flex items-center gap-4'>
                        <FontAwesomeIcon icon={faBars} onClick={() => setSidebarClick((prevState) => !prevState)} className='flex md:hidden'/>
                    </div> */}
                    <Link href='/admin/dashboard' className="text-white text-2xl lg:text-3xl font-medium underline cursor-pointer underline-offset-1 decoration-4 decoration-underline">BHM</Link>
                    <div ref={dropdownRef} className='flex justify-center items-center gap-3 font-thin lg:mx-5'>
                        <h1 className='text-md lg:text-xl'>{auth.user[0].email}</h1>
                        <FontAwesomeIcon icon={faCaretDown} onClick={() => setProfileClick((prevState) => !prevState)} className={`${profileClick && 'bg-gray-600'} size-5  hover:bg-gray-600 rounded-full p-2 transform duration-500`}/>
                        { profileClick && 
                            <div className='z-10 absolute top-16 right-2 flex items-start justify-center w-40 h-40 bg-black bg-opacity-70 rounded-md'>
                                <Link onClick={handleLogout} className='absolute font-semibold bg-red-button rounded py-2 px-5 hover:bg-red-button-darker'>Logout</Link> 
                            </div>
                        }
                    </div>
                </nav>
                <main className='relative ml-[60px] md:ml-0 w-full overflow-hidden bg-main col-start-2 col-end-6 row-start-2 row-end-13'>
                    {children}
                </main>
            </div>
        </div>
    )
}

export default AdminLayout