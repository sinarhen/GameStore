import React from 'react';

type PaginationProps = {
    itemsPerPage: number;
    totalItems: number;
    paginate: (pageNumber: number) => void;
    currentPage: number;
};

const Pagination: React.FC<PaginationProps> = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className='flex justify-center space-x-2'>
                {pageNumbers.map(number => (
                    <li key={number} className={`py-2 px-3 ${currentPage === number ? 'text-indigo-600 ' : ' text-white'}`}>
                        <a onClick={() => paginate(number)} href='!#' className='page-link'>
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;