import { Link } from 'react-router'
import { MovieCard } from 'ui/_components/atoms/MovieCard'
import { useFavorites } from 'ui/_hooks/useFavorites'

export const FavoritesPage = () => {
  const { favorites, count } = useFavorites()

  return (
    <section className="px-5 pb-10">
      <div className="flex items-baseline justify-between mb-4">
        <h2 className="text-2xl font-black text-white">Favorites</h2>
        <span className="text-sm text-white/80">{count} movies</span>
      </div>

      {count === 0 ? (
        <div className="mt-10 rounded-xl border border-white/10 bg-black/20 p-6 text-center text-white">
          <p className="text-lg font-semibold">No favorites yet</p>
          <p className="mt-1 text-white/80">Tap the heart icon on a movie to save it here.</p>
          <Link
            to="/"
            className="mt-4 inline-flex items-center justify-center rounded-md bg-cyan-700 px-4 py-2 font-semibold text-white hover:bg-cyan-600 transition-colors"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Browse movies
          </Link>
        </div>
      ) : (
        <div className="flex flex-wrap gap-4 justify-center">
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </section>
  )
}
