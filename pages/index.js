import { useState } from 'react';

import { fetchGenreLists } from '@/api/nytApi';

import Header from '@/components/Header';
import SubHeader from '@/components/SubHeader';
import GenreList from '@/components/GenreList';
import GenreCardList from '@/components/GenreCardList';
import GenreList from '@/components/GenreList';
import SubHeader from '@/components/SubHeader';

import 'tailwindcss/tailwind.css';
import Pagination from '@/components/Pagination';

export default function Home({ genreLists }) {
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

  const filteredGenreLists = genreLists.filter((genre) =>
    genre.display_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredGenreLists.length / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const paginatedGenreLists = filteredGenreLists.slice(startIndex, endIndex);

  return (
    <div>
      <Header handleSearch={handleSearch} handleModalOpen={handleModalOpen} />
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
