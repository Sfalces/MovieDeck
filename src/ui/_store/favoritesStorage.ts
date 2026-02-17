import type { Movie } from 'core/Movies/domain/Movie'

export const FAVORITES_STORAGE_KEY = 'moviedeck:favorites:v1'

export type FavoritesById = Record<string, Movie>

export const favoritesStorage = {
  load(): FavoritesById {
    if (typeof window === 'undefined') return {}

    try {
      const json = window.localStorage.getItem(FAVORITES_STORAGE_KEY)
      if (!json) return {}

      return JSON.parse(json) as FavoritesById
    } catch {
      return {}
    }
  },

  save(favorites: FavoritesById): void {
    if (typeof window === 'undefined') return

    try {
      window.localStorage.setItem(
        FAVORITES_STORAGE_KEY,
        JSON.stringify(favorites),
      )
    } catch {
      // ignore storage errors
    }
  },

  clear(): void {
    if (typeof window === 'undefined') return

    try {
      window.localStorage.removeItem(FAVORITES_STORAGE_KEY)
    } catch {
      // no-op
    }
  },
}
