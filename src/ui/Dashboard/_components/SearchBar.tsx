import { useState, type ChangeEvent, type FC } from 'react'
import { Button } from 'ui/_components/atoms/Buton'

interface Props {
  onSearch: (movie: string) => void
}

export const SearchBar: FC<Props> = ({ onSearch }) => {
  const [search, setSearch] = useState('')

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearch(value)
    if (value.length === 0) onSearch('')
  }

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(search)
    }
  }

  return (
    <div className="flex items-center gap-2 w-full justify-center">
      <input
        value={search}
        onChange={handleOnChange}
        data-testid="search"
        onKeyUp={handleKeyUp}
        className="bg-white text-black rounded-lg p-1 w-1/4"
        type="text"
        placeholder="Search movie"
      />
      <Button text="Search" onClick={() => onSearch(search)} />
    </div>
  )
}
