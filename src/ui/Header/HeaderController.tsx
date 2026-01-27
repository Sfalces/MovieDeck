import { useState } from 'react'
import { Header } from './Header'
import { useNavigate } from 'react-router'
import type { Movie } from 'core/Movies/domain/Movie'

export const HeaderController = () => {
  const [visible, setVisible] = useState(false)
  const navigate = useNavigate()
  const [movies, setMovies] = useState<Movie[] | undefined>([])
  const [allMovies, setAllMovies] = useState<Movie[]>([])

  const handleIsVisible = () => {
    setVisible((prev) => !prev)
  }

  const handleClose = () => setVisible(false)

  const handleSelectGenre = (genreId: number) => {
    navigate(`/genre/${genreId}`)
    handleClose()
  }

  const handleSearch = (query: string) => {
    if (query.trim() === '') {
      setMovies(allMovies)
      return
    }

    const filtered = allMovies.filter((movie) =>
      movie.title.toLowerCase().includes(query.toLowerCase()),
    )
    setMovies(filtered)
  }

  return (
    <Header
      handleIsVisible={handleIsVisible}
      visible={visible}
      onClose={handleClose}
      onSearch={handleSearch}
      handleSelectGenre={handleSelectGenre}
    />
  )
}
