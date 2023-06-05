import Image from 'next/image';
import Link from 'next/link';
import { FaStar } from 'react-icons/fa';
import { FiStar } from 'react-icons/fi';

export default function BookCard({ books, handleFavorite, favorites }) {

  const isBookFavorite = (book) => favorites.some((fav) => fav.title === book.title);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {books.map((book) => (
        <div key={book.title} className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between">
          <div className="mb-4">
            {book.image ? (
              <div className="flex items-center justify-center">
                <Image
                  src={book.image}
                  alt={book.title}
                  width={96}
                  height={144}
                />
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <div className="flex items-center justify-center bg-gray-200 w-24 h-36">
                  <p className="text-sm text-gray-500">Sem Capa</p>
                </div>
              </div>
            )}
            <h2 className="text-base font-semibold mt-4">{book.title}</h2>
            <div className="flex items-center justify-start">
              <p className="text-sm text-slate-500 mb-2">By {book.author}</p>
              <button
                className="ml-2 mb-2"
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
            <p className="text-sm mb-2">{book.description}</p>
            <p className="text-sm mb-2">Editora {book.publisher}</p>
            <p className="text-sm mb-2">Rank {book.rank}</p>
          </div>
          <div>
            {book.amazonProductUrl && (
              <Link
                href={book.amazonProductUrl}
                className="inline-block bg-blue-500 text-white py-2 px-4 text-xs rounded-2xl mt-auto"
              >
                Compre por {book.price}
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
