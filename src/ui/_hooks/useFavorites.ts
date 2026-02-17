import { useContext } from 'react'
import { FavoritesContext } from 'ui/_context/FavoritesContext'

export const useFavorites = () => {
  const ctx = useContext(FavoritesContext)
  if (!ctx) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return ctx
}

