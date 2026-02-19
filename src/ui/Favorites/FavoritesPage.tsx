import { useState, useMemo } from 'react'
import { Link } from 'react-router'
import { MovieCard } from 'ui/_components/atoms/MovieCard'
import { useFavorites } from 'ui/_hooks/useFavorites'

type SortOption = 'default' | 'rating' | 'year'

export const FavoritesPage = () => {
  const { favorites, count } = useFavorites()
  const [sortBy, setSortBy] = useState<SortOption>('default')

  const sortedFavorites = useMemo(() => {
    const movies = [...favorites]

    switch (sortBy) {
      case 'rating':
        return movies.sort((a, b) => b.vote - a.vote)
      case 'year':
        return movies.sort((a, b) => {
          const dateA = new Date(a.releaseDate).getTime()
          const dateB = new Date(b.releaseDate).getTime()
          return dateB - dateA
        })

      default:
        return movies
    }
  }, [favorites, sortBy])

  return (
    <section className="px-5 pb-10">
      <div className="flex flex-col sm:flex-row items-baseline justify-between mb-6 gap-4">
        <div className="flex items-baseline gap-4">
          <h2 className="text-2xl font-black text-white">Favorites</h2>
          <span className="text-sm text-white/80">{count} movies</span>
        </div>

        {count > 0 && (
          <div className="flex items-center gap-2">
            <label htmlFor="sort-select" className="text-sm text-white/70">
              Sort by:
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-black/40 border border-white/20 text-white text-sm rounded-md px-3 py-1.5 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 cursor-pointer"
            >
              <option value="default">Default</option>
              <option value="rating">Rating (High to Low)</option>
              <option value="year">Release Year (Newest)</option>
            </select>
          </div>
        )}
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
          {sortedFavorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </section>
  )
}
