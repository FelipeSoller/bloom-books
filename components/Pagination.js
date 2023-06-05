import React from 'react';

export default function Pagination({ currentPage, totalPages, handlePageChange }) {
  const renderPageButtons = () => {
    return Array.from({ length: totalPages }, (_, index) => {
      const pageNumber = index + 1;
      const isCurrentPage = currentPage === pageNumber;

      return (
        <button
          key={pageNumber}
          onClick={() => handlePageChange(pageNumber)}
          disabled={isCurrentPage}
          className={`px-4 py-2 rounded-2xl ${isCurrentPage ? 'bg-black text-white' : 'border border-black'} mr-2 mb-2`}
        >
          {pageNumber}
        </button>
      );
    });
  };

  return (
    <footer>
      <div className="flex flex-wrap justify-center mt-8">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded-2xl border border-black mr-2 mb-2"
        >
          {'<'}
        </button>
        {renderPageButtons()}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded-2xl border border-black mb-2"
        >
          {'>'}
        </button>
      </div>
    </footer>
  );
}
