import { Link, useForm, usePage } from "@inertiajs/react";
import AdminLayout from "../../Layouts/AdminLayout"

const Account = () => {

    const { auth } = usePage().props;
    const { post } = useForm()

    const handleLogout = (e) => {
        e.preventDefault()
        post('/admin/logout')
    }

    return (
        <AdminLayout>
            <h1 className="px-4 md:px-8 py-5 font-bold text-xl md:text-3xl">Account</h1>
            <div className="flex justify-between px-4 md:px-8">
                <h1 className='text-md lg:text-xl'>{auth.user[0].email}</h1>
                <Link onClick={handleLogout} className='bg-red-button text-white font-bold rounded py-1 px-5 hover:bg-red-button-darker'>Logout</Link> 
            </div>
        </AdminLayout>
    )
}

export default Account