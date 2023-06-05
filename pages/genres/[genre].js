import { useState } from 'react';

import { fetchBooksByGenre } from '@/api/nytApi';

import BookCard from '@/components/BookCard';
import BookList from '@/components/BookList';
import SubHeader from '@/components/SubHeader';

export default function Genre({ genre, books }) {
  const [displayMode, setDisplayMode] = useState('list');
  const [perPage, setPerPage] = useState(5);

  const handleDisplayMode = (mode) => {
    setDisplayMode(mode);
  };

  const handlePerPage = (e) => {
    setPerPage(parseInt(e.target.value));
  };

  const startIndex = perPage
  const endIndex = startIndex + perPage;
  const paginatedBooks = books.slice(startIndex, endIndex);

  return (
    <div>
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
