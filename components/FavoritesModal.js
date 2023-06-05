import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { FiStar } from 'react-icons/fi';

const FavoritesModal = ({ isOpen, onClose, handleFavorite, favorites }) => {
  const isBookFavorite = (book) => favorites.some((fav) => fav.title === book.title);

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-end bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 w-1/2 h-full relative">
        <button
          className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
          aria-label="Fechar"
        >
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h2 className="text-2xl font-semibold mb-4 text-blue-900">Favoritos</h2>
        {favorites && favorites.length > 0 ? (
          <ul className="space-y-4">
            {favorites.map((book) => (
              <li key={book.title} className="flex items-center">
                <div className="w-12 h-16 mr-4">
                  {book.image ? (
                    <div className="flex items-center justify-center">
                      <Image src={book.image} alt={book.title} width={96} height={144} />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center bg-gray-200 mb-2 w-12 h-16 p-3">
                      <p className="text-xs text-gray-500 py-2">Sem Capa</p>
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-medium">{book.title}</h3>
                  <div className="flex justify-start">
                    <p className="text-gray-500">Autor: {book.author}</p>
                    <button
                      className="ml-2"
                      onClick={() => handleFavorite(book)}
                      aria-label="Favorite"
                    >
                      {isBookFavorite(book) ? (
                        <FaStar className="text-blue-500" />
                      ) : (
                        <FiStar className="text-blue-500" />
                      )}
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Nenhum livro favorito encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default FavoritesModal;
