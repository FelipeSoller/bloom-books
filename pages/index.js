import { useState } from 'react';

import { fetchGenreLists } from '@/api/nytApi';

import GenreCardList from '@/components/GenreCardList';
import GenreList from '@/components/GenreList';
import SubHeader from '@/components/SubHeader';

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
      <SubHeader
        perPage={perPage}
        handlePerPage={handlePerPage}
        handleDisplayMode={handleDisplayMode}
        displayMode={displayMode}
      />
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
