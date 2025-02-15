import { Link } from "@inertiajs/react"

const Pagination = ({ pagination }) => {
    return (
        <nav className="flex space-x-2 justify-center my-5">
            {pagination.map((link, index) => (
                link.url ? (
                    <Link
                        key={index}
                        href={link.url}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                        className={`flex items-center justify-center px-3 py-2 text-sm rounded-lg text-gray-600
                            ${link.active ? 'bg-gray-300' : ''}`}
                    />
                ) : (
                    <span
                        key={index}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                        className="text-slate-300"
                    ></span>
                )
            ))}
        </nav>
    )
}

export default Pagination