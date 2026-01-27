import type { FC } from 'react'
import type { Movie } from 'core/Movies/domain/Movie'

interface Props {
  movie: Movie
  onSelect: (movieId: string) => void
  isActive?: boolean
}

export const SearchDropdownItem: FC<Props> = ({ movie, onSelect, isActive = false }) => {
  const handleClick = () => {
    onSelect(movie.id)
  }

  return (
    <li
      onClick={handleClick}
      className={`p-3 cursor-pointer transition-colors flex items-center gap-3 ${isActive ? 'bg-cyan-800' : 'hover:bg-cyan-800'}`}
      data-testid={`search-dropdown-item-${movie.id}`}
      role="option"
      aria-selected={isActive}
    >
      {movie.poster && (
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-12 h-16 object-cover rounded flex-shrink-0"
        />
      )}
      <div className="flex-1 min-w-0">
        <h3 className="text-white font-semibold text-sm truncate">{movie.title}</h3>
        {movie.releaseDate && (
          <p className="text-gray-300 text-xs">{new Date(movie.releaseDate).getFullYear()}</p>
        )}
      </div>
    </li>
  )
}