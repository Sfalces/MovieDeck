import type { FC } from 'react'
import type { Movie } from 'core/Movies/domain/Movie'
import { useFavorites } from 'ui/_hooks/useFavorites'

interface Props {
  movie: Movie
  className?: string
}

const baseClassName =
  'inline-flex h-11 w-11 items-center cursor-pointer justify-center rounded-full bg-black/40 backdrop-blur border border-white/15 shadow-md transition active:scale-95 hover:scale-110  hover:ring-2 hover:ring-cyan-400'

export const FavoriteButton: FC<Props> = ({ movie, className }) => {
  const { isFavorite, toggleFavorite } = useFavorites()
  const fav = isFavorite(movie.id)

  return (
    <button
      type="button"
      aria-pressed={fav}
      aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
      className={[baseClassName, className].filter(Boolean).join(' ')}
      onClick={() => toggleFavorite(movie)}
    >
      <svg viewBox="-1 0 22 24" className="block h-6 w-6" aria-hidden="true">
        <path
          d="M12 21s-7-4.6-9.5-9C.7 8.4 2.7 5 6.4 5c2 0 3.2 1.1 3.6 1.7.4-.6 1.6-1.7 3.6-1.7 3.7 0 5.7 3.4 3.9 7-2.5 4.4-9.5 9-9.5 9z"
          fill={fav ? '#ef4444' : 'transparent'}
          stroke="white"
          strokeWidth="1.6"
        />
      </svg>
    </button>
  )
}

