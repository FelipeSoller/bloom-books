import { useState } from 'react';

import { fetchGenreLists } from '@/api/nytApi';

import GenreCardList from '@/components/GenreCardList';
import GenreList from '@/components/GenreList';
import SubHeader from '@/components/SubHeader';

import 'tailwindcss/tailwind.css';
import Pagination from '@/components/Pagination';

export default function Home({ genreLists }) {
  const [displayMode, setDisplayMode] = useState('list');
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const handleDisplayMode = (mode) => {
    setDisplayMode(mode);
  };

  const handlePerPage = (e) => {
    setPerPage(parseInt(e.target.value));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(genreLists.length / perPage);
  const startIndex = (currentPage - 1) * perPage;
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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
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
