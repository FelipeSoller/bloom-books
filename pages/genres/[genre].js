import { useState } from 'react';
import { FiList, FiGrid } from 'react-icons/fi';

import { fetchBooksByGenre } from '@/api/nytApi';

import BookCard from '@/components/BookCard';
import BookList from '@/components/BookList';

export default function Genre({ books }) {
  const [displayMode, setDisplayMode] = useState('list');

  const handleDisplayMode = (mode) => {
    setDisplayMode(mode);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-center bg-slate-100 p-2 px-5 sm:px-28">
        <div className="flex justify-between items-center mt-2 sm:mt-0">
          <div className="flex">
            <button
              onClick={() => handleDisplayMode('list')}
              className={`p-2 ml-2 rounded-lg ${displayMode === 'list' ? 'text-royalBlue' : ''}`}
            >
              <FiList />
            </button>
            <button
              onClick={() => handleDisplayMode('card')}
              className={`p-2 ml-2 rounded-lg ${displayMode === 'card' ? 'text-royalBlue' : ''}`}
            >
              <FiGrid />
            </button>
          </div>
        </div>
      </div>
      <main className="sm:pl-5 sm:pr-6">
        <div className="mt-5">
          {displayMode === 'list' ? (
            <BookList books={books} />
          ) : (
            <BookCard books={books} />
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
