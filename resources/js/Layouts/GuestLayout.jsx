import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBox, faHouse, faCartShopping, faTimes, faBars } from '@fortawesome/free-solid-svg-icons'
import { Link, usePage } from '@inertiajs/react'
import { useEffect, useRef, useState } from 'react'

const GuestLayout = ({children}) => {

    const { url } = usePage()
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const sidebarRef = useRef(null)

    const isProductRoute = location.pathname.startsWith('/guest/product');

    const handleCloseSidebar = () => setIsSidebarOpen(false);
    const handleOpenSidebar = () => setIsSidebarOpen(true);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if(sidebarRef.current && !sidebarRef.current.contains(event.target)){
                setIsSidebarOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return(
        <div>
            <div className='flex md:grid grid-cols-5 grid-rows-12 h-screen bg-main'>
                {/* sidebar */}
                <nav ref={sidebarRef} className={`fixed top-0 left-0 md:relative z-10 w-[60px] md:w-auto px-3 py-3 lg:p-5 h-screen md:h-auto flex flex-col justify-between shadow-xl font-bold lg:text-lg md:text-md bg-sidebar row-start-2 row-end-13 transform transition-transform duration-500 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
                    <div className='flex flex-col gap-10'>
                        <button onClick={handleCloseSidebar} className="flex md:hidden text-2xl justify-center items-center hover:bg-gray-300 py-2 rounded-full transition-all duration-300">
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                        <Link href='/guest/dashboard' className={`group ${url==='/guest/dashboard' ? 'bg-black text-white pointer-events-none' : 'hover:bg-gray-50 cursor-pointer'} flex gap-3 items-center justify-start py-1 px-2 md:px-3 lg:px-4 rounded transform duration-300`}>
                            <FontAwesomeIcon icon={faHouse} />
                            <span className='md:hidden scale-0 group-hover:scale-100 transition-all duration-100 ml-3 bg-black text-white rounded px-3'>Utama</span>
                            <span className='hidden md:flex'>Utama</span>
                        </Link>
                        <Link href='/guest/products' className={`group ${isProductRoute ? 'bg-black text-white pointer-events-none' : 'hover:bg-gray-50 cursor-pointer'} flex gap-3 items-center justify-start py-1 px-2 md:px-3 lg:px-4 rounded transform duration-300`}>
                            <FontAwesomeIcon icon={faBox} />
                            <span className='md:hidden scale-0 group-hover:scale-100 transition-all duration-100 ml-3 bg-black text-white rounded px-3'>Produk</span>
                            <span className='hidden md:flex'>Produk</span>
                        </Link>
                    </div>
                </nav>
                {/* navbar */}
                <nav className='hidden md:flex justify-between items-center px-3 md:px-5 bg-black text-white col-start-1 col-end-7 md:col-end-6'>
                    <h1 className="text-white text-3xl font-medium underline cursor-pointer underline-offset-1 decoration-4 decoration-underline">BHM</h1>
                    <div className='flex justify-center items-center gap-3 font-thin cursor-pointer'>
                        <Link href='/login' className='bg-green-button px-4 py-1 rounded shadow-xl hover:bg-green-button-darker transform duration-200'>Login</Link>
                    </div>
                </nav>
                <main className={`relative w-full overflow-hidden overflow-y-auto bg-main col-start-2 col-end-6 row-start-2 row-end-13 transform transition-transform duration-500 ease-in-out`}>
                    {!isSidebarOpen && 
                        <button onClick={handleOpenSidebar} className="fixed top-4 left-4 z-20 flex md:hidden text-2xl justify-center items-center hover:bg-gray-300 p-2 rounded-full transition-all duration-300">
                            <FontAwesomeIcon icon={faBars} />
                        </button>
                    }
                    {children}
                </main>
            </div>
        </div>
    )
}

export default GuestLayout