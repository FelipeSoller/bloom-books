import { fetchGenreLists } from '@/api/nytApi';
import GenreList from '@/components/GenreList';

import 'tailwindcss/tailwind.css';

export default function Home({ genreLists }) {
  return (
    <GenreList genreLists={genreLists} />
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
