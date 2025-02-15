import { Link } from "@inertiajs/react"

const Pagination = ({ pagination }) => {
    return (
        <nav className="flex space-x-2 justify-center my-5">
            {pagination.map((link, index) => (
                <Link
                    key={index}
                    href={link.url || ''}
                    className={`flex items-center justify-center px-3 py-2 text-sm rounded-lg text-gray-600
                        ${link.active ? 'bg-gray-300' : ''} 
                        ${!link.url ? '!text-gray-500' : ''}`}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                />
            ))}
        </nav>
    )
}

export default Pagination