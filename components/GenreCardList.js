import Link from "next/link";

export default function GenreCardList({ genreLists }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mr-24">
      {genreLists.map((genre) => (
        <div key={genre.list_name} className="bg-white rounded-lg shadow-md p-4 grid">
          <div>
            <h2 className="text-lg mb-2 text-blue-500 hover:underline h-max">
              <Link href={`/genres/${genre.list_name}`}>
                {genre.display_name}
              </Link>
            </h2>
            <p className="mb-2 text-xs text-slate-500 italic">Frequency: {genre.updated}</p>
          </div>
          <div className="flex flex-col justify-between mt-auto">
            <p className="mb-2">Last Published: {genre.newest_published_date}</p>
            <p className="mb-2">Oldest Published: {genre.oldest_published_date}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
