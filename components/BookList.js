import Image from 'next/image';
import Link from 'next/link';
import { FiStar } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';

export default function BookList({ books, handleFavorite, favorites }) {
  const isBookFavorite = (book) => favorites.some((fav) => fav.title === book.title);

  return (
    <ul className="space-y-4 sm:space-y-2">
      {books.map((book) => (
        <li key={book.title}>
          <div className="flex flex-col sm:flex-row items-center">
            <div className="mb-4 sm:mr-4 sm:mb-0">
              {book.image ? (
                <div className="flex items-center justify-center">
                  <Image src={book.image} alt={book.title} width={96} height={144} />
                </div>
              ) : (
                <div className="flex items-center justify-center bg-gray-200 w-24 h-36">
                  <p className="text-sm text-gray-500">Sem Capa</p>
                </div>
              )}
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <div className="flex justify-start items-end">
                  <h2 className="text-base font-semibold mb-2">{book.title}</h2>
                  <p className="text-sm text-slate-500 mb-2 ml-2">By {book.author}</p>
                  <button
                    className="ml-2 mb-3"
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
              <div className="mt-auto">
                {!book.amazonProductUrl ? (
                  <button
                    className="inline-block bg-gray-400 text-white py-2 px-4 text-xs rounded-2xl cursor-not-allowed"
                    disabled
                  >
                    Indisponível
                  </button>
                ) : (
                  <Link
                    href={book.amazonProductUrl}
                    className="inline-block bg-blue-500 text-white py-2 px-4 text-xs rounded-2xl mt-2"
                  >
                    Compre por {book.price}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
