import { useState } from 'react';

import { fetchBooksByGenre } from '@/api/nytApi';

import Header from '@/components/Header';
import SubHeader from '@/components/SubHeader';
import Pagination from '@/components/Pagination';

export default function Genre({ genre, books }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [displayMode, setDisplayMode] = useState('list');
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDisplayMode = (mode) => {
    setDisplayMode(mode);
  };

  const handlePerPage = (e) => {
    setPerPage(parseInt(e.target.value));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBooks.length / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const paginatedBooks = filteredBooks.slice(startIndex, endIndex);

  return (
    <div>
      <Header handleSearch={handleSearch} handleModalOpen={handleModalOpen} />
      <SubHeader
        perPage={perPage}
        handlePerPage={handlePerPage}
        handleDisplayMode={handleDisplayMode}
        displayMode={displayMode}
        genre={genre}
      />
      <main className="sm:pl-5 sm:pr-6">
        <div className="mt-5">
          {displayMode === 'list' ? (
            <BookList books={paginatedBooks} />
          ) : (
            <BookCard books={paginatedBooks} />
          )}
        </div>
      </main>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const genre = params.genre;
  const books = await fetchBooksByGenre(genre);

  return {
    props: {
      genre,
      books,
    },
  };
}
