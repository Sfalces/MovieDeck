import type { FC } from 'react'
import { FilterMenu } from './FilterMenu'
import { MovieGenreId } from 'core/Movies/domain/MovieGenre'

interface Props {
  onClose: () => void
  onSelectGenre?: (genreId: number) => void
}

export const FilterMenuController: FC<Props> = ({ onClose, onSelectGenre }) => {
  const genres = Object.entries(MovieGenreId).filter(([key]) => isNaN(Number(key))) as [
    keyof typeof MovieGenreId,
    number,
  ][]

  const handleSelect = (id: number) => {
    if (onSelectGenre) onSelectGenre(id)
    onClose()
  }

  return <FilterMenu onClose={onClose} genres={genres} handleSelect={handleSelect} />
}
