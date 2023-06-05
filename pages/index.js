import { useState } from 'react';
import { FiList, FiGrid } from 'react-icons/fi';

import { fetchGenreLists } from '@/api/nytApi';

import GenreCardList from '@/components/GenreCardList';
import GenreList from '@/components/GenreList';

import 'tailwindcss/tailwind.css';

export default function Home({ genreLists }) {
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
      <div className="mt-5 pl-28 pr-6">
        {displayMode === 'list' ? (
          <GenreList genreLists={genreLists} />
        ) : (
          <GenreCardList genreLists={genreLists} />
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
