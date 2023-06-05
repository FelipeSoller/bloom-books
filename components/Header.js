import React from 'react';
import Link from 'next/link';
import { IoSearch } from 'react-icons/io5';
import { FiStar } from 'react-icons/fi';

export default function Header({ handleSearch, handleModalOpen }) {
  return (
    <header className="bg-royalBlue p-4 px-2 md:px-28 flex flex-col md:flex-row justify-between items-center">
      <div className="flex items-center justify-between w-full md:w-auto mb-2 md:mb-0">
        <Link href="/" className="text-white text-3xl font-bold">
          Bloom Books
        </Link>
        <button className="md:hidden" onClick={handleModalOpen}>
          <FiStar className="text-white text-2xl ml-1" />
        </button>
      </div>
      <div className="relative w-full md:w-auto">
        <input
          type="text"
          placeholder="Search genres"
          className="pl-10 py-2 rounded-3xl w-full md:w-96"
          onChange={handleSearch}
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <IoSearch className="text-black" />
        </div>
      </div>
      <div>
        <button className="hidden md:block" onClick={handleModalOpen}>
          <FiStar className="text-white text-2xl mr-1" />
        </button>
      </div>
    </header>
  );
}
