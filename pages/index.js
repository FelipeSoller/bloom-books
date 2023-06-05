import { fetchGenreLists } from '@/api/nytApi';
import Link from 'next/link';

export default function Home({ genreLists }) {
  return (
    <main>
      <ul>
        {genreLists.map((genre) => (
          <li key={genre.list_name}>
            <div>
              <Link href={`/genres/${genre.list_name}`}>
                {genre.display_name}
              </Link>
              <p>Frequency: {genre.updated}</p>
            </div>
            <p>Frequency: {genre.updated}</p>
            <p>Last Published: {genre.newest_published_date}</p>
            <p>Oldest Published: {genre.oldest_published_date}</p>
          </li>
        ))}
      </ul>
    </main>
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
