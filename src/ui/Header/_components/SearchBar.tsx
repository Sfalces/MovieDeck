import { useState, type ChangeEvent, type FC } from 'react'
import { Button } from 'ui/_components/atoms/Buton'
import { useNavigate } from 'react-router'
import { SearchDropdown } from './SearchDropdown'

interface Props {
  onSearch: (movie: string) => void
}

export const SearchBar: FC<Props> = ({ onSearch }) => {
  const [search, setSearch] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const navigate = useNavigate()

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearch(value)
    setShowDropdown(value.length >= 2)
    if (value.length === 0) {
      onSearch('')
      setShowDropdown(false)
    }
  }

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(search)
      setSearch('')
      setShowDropdown(false)
    }
  }

  const handleSelectMovie = (movieId: string) => {
    navigate(`/movieDetails/${movieId}`)
    setSearch('')
    setShowDropdown(false)
  }

  const handleCloseDropdown = () => {
    setShowDropdown(false)
  }

  return (
    <div className="flex items-center gap-2 w-full justify-center relative">
      <input
        value={search}
        onChange={handleOnChange}
        onFocus={() => search.length >= 2 && setShowDropdown(true)}
        data-testid="search"
        onKeyUp={handleKeyUp}
        className="bg-white text-black rounded-lg p-1 w-full"
        type="text"
        placeholder="Search movie"
      />
      <Button text="Search" onClick={() => {
        onSearch(search)
        setShowDropdown(false)
      }} />
      {showDropdown && (
        <SearchDropdown
          searchQuery={search}
          onSelectMovie={handleSelectMovie}
          onClose={handleCloseDropdown}
        />
      )}
    </div>
  )
}