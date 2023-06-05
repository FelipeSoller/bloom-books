import { useEffect, useState } from 'react';

import { fetchGenreLists } from '@/api/nytApi';

import Header from '@/components/Header';
import SubHeader from '@/components/SubHeader';
import GenreList from '@/components/GenreList';
import GenreCardList from '@/components/GenreCardList';
import Pagination from '@/components/Pagination';
import FavoritesModal from '@/components/FavoritesModal';

import 'tailwindcss/tailwind.css';

export default function Home({ genreLists }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [displayMode, setDisplayMode] = useState('list');
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);

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

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleFavorite = (book) => {
    const isFavorite = favorites.some((fav) => fav.title === book.title);
    if (isFavorite) {
      setFavorites(favorites.filter((fav) => fav.title !== book.title));
    } else {
      setFavorites([...favorites, book]);
    }
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
      <main>
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
      </main>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
      <FavoritesModal isOpen={isModalOpen} onClose={handleModalClose} handleFavorite={handleFavorite} favorites={favorites} />
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
