import { fetchBooksByGenre } from '@/api/nytApi';

import Image from 'next/image';

export default function Genre({ books }) {
  return (
    <ul>
  {books.map((book) => (
    <li key={book.title}>
      <div>
        {book.image ? (
          <div>
            <Image src={book.image} alt={book.title} width={96} height={144} />
          </div>
        ) : (
          <div>
            <p>Sem Capa</p>
          </div>
        )}
      </div>
      <div>
        <div>
          <h2>{book.title}</h2>
          <p>By {book.author}</p>
        </div>
        <p>{book.description}</p>
        <p>Editora {book.publisher}</p>
        <p>Rank {book.rank}</p>
      </div>
      <div>
        {book.amazonProductUrl && (
          <a href={book.amazonProductUrl}>
            Compre por {book.price}
          </a>
        )}
      </div>
    </li>
  ))}
</ul>

  );
}

export async function getServerSideProps({ params }) {
  const genre = params.genre;
  const books = await fetchBooksByGenre(genre);

  return {
    props: {
      genre,
      books,
    },
  };
}
