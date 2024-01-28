import React from 'react';

type PaginationProps = {
  pageSize: number;
  totalItems: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
};

const Pagination: React.FC<PaginationProps> = ({pageSize, totalItems, paginate, currentPage}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / pageSize); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className='mt-4'>
      <ul className='flex justify-center space-x-2'>
        {pageNumbers.map(number => (
          <li key={number} className={`py-2 px-3 ${currentPage === number ? 'text-indigo-600 ' : ' text-white'}`}>
            <a onClick={() => paginate(number)} className='page-link cursor-pointer'>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;