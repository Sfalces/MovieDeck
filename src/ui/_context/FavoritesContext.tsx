import type { Movie } from 'core/Movies/domain/Movie'
import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { favoritesStorage } from 'ui/_store/favoritesStorage'
import type { FavoritesById } from 'ui/_store/favoritesStorage'

export interface FavoritesContextValue {
  favorites: Movie[]
  count: number
  isFavorite: (id: string) => boolean
  toggleFavorite: (movie: Movie) => void
  removeFavorite: (id: string) => void
}

export const FavoritesContext = createContext<FavoritesContextValue | null>(null)

interface FavoritesProviderProps {
  children: ReactNode
}

export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
  const [favoritesById, setFavoritesById] = useState<FavoritesById>(() =>
    favoritesStorage.load(),
  )

  useEffect(() => {
    favoritesStorage.save(favoritesById)
  }, [favoritesById])

  const isFavorite = useCallback((id: string) => Boolean(favoritesById[id]), [favoritesById])

  const removeFavorite = useCallback((id: string) => {
    setFavoritesById((prev) => {
      if (!prev[id]) return prev
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [id]: _removed, ...rest } = prev
      return rest
    })
  }, [])

  const toggleFavorite = useCallback((movie: Movie) => {
    setFavoritesById((prev) => {
      if (prev[movie.id]) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [movie.id]: _removed, ...rest } = prev
        return rest
      }

      return {
        ...prev,
        [movie.id]: movie,
      }
    })
  }, [])

  const favorites = useMemo(() => Object.values(favoritesById), [favoritesById])
  const count = favorites.length

  const value = useMemo<FavoritesContextValue>(
    () => ({
      favorites,
      count,
      isFavorite,
      toggleFavorite,
      removeFavorite,
    }),
    [favorites, count, isFavorite, toggleFavorite, removeFavorite],
  )

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

