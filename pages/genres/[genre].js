import { fetchBooksByGenre } from '@/api/nytApi';

import BookList from '@/components/BookList';

export default function Genre({ books }) {
  return (
    <BookList books={books} />
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
