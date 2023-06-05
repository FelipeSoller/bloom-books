import { useState } from 'react';
import { FiList, FiGrid } from 'react-icons/fi';

import { fetchGenreLists } from '@/api/nytApi';

import GenreCardList from '@/components/GenreCardList';
import GenreList from '@/components/GenreList';

import 'tailwindcss/tailwind.css';

export default function Home({ genreLists }) {
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
  const paginatedGenreLists = genreLists.slice(startIndex, endIndex);

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-center bg-slate-100 p-2 px-5 sm:px-28">
        <div className="flex justify-between items-center mt-2 sm:mt-0">
          <div className="mr-5">
            <span className="mr-2">Exibir:</span>
            <select
              value={perPage}
              onChange={handlePerPage}
              className="px-4 py-2 rounded-lg bg-transparent"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </select>
            <span className="ml-2">por vez</span>
          </div>
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
      <div className="mt-5 pl-28 pr-6">
        {displayMode === 'list' ? (
          <GenreList genreLists={paginatedGenreLists} />
        ) : (
          <GenreCardList genreLists={paginatedGenreLists} />
        )}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const genreLists = await fetchGenreLists();

  return {
    props: {
      genreLists,
    },
  };
}
