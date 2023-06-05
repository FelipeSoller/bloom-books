import { fetchGenreLists } from '@/api/nytApi';

export default function Home({ genreLists }) {
  return (
    <main>
      <ul>
        {genreLists.map((genre) => (
          <li key={genre.list_name}>
            <div>
              <p>{genre.display_name}</p>
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
