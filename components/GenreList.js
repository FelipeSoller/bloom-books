import Link from 'next/link';

export default function GenreList({ genreLists }) {
  return (
    <ul className="space-y-4">
      {genreLists.map((genre) => (
        <li key={genre.list_name} className="flex flex-col sm:flex-row items-center pl-1">
          <div className="w-full sm:w-2/4 flex items-center">
            <Link href={`/genres/${genre.list_name}`} className="text-blue-500 text-xl">
              {genre.display_name}
            </Link>
            <p className="ml-2 text-xs text-slate-500 italic hidden md:block">Frequency: {genre.updated}</p>
          </div>
          <p className="w-full text-xs text-slate-500 italic md:hidden ">Frequency: {genre.updated}</p>
          <p className="w-full sm:w-1/4 text-sm">Last Published: {genre.newest_published_date}</p>
          <p className="w-full sm:w-1/4 text-sm">Oldest Published: {genre.oldest_published_date}</p>
        </li>
      ))}
    </ul>
  );
}
