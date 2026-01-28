import { Link } from 'react-router'
import { IconButton } from '../_components/atoms/IconButton'
import type { FC } from 'react'
import { FilterMenu } from './_components/FilterMenu'
import { AnimatePresence } from 'framer-motion'
import { SearchBar } from './_components/SearchBar'

interface Props {
  visible: boolean
  handleIsVisible: () => void
  onClose: () => void
  handleSelectGenre: (id: number) => void
  onSearch: (query: string) => void
}

export const Header: FC<Props> = ({
  handleIsVisible,
  visible,
  onClose,
  handleSelectGenre,
  onSearch
}) => {
  return (
    <>
      <div className="sticky top-0 z-50 w-full bg-cyan-800 text-gray-200 px-4 py-3">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex w-full items-center justify-between gap-3 md:w-auto">
            <IconButton name="filter" onClick={handleIsVisible} />
            <Link to="/" className="flex-1 text-center md:text-left"   onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <h1 className="text-2xl font-black md:text-4xl">MovieDeck</h1>
            </Link>
          </div>
          <div className="w-full md:max-w-lg">
            <SearchBar onSearch={onSearch} />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {visible && (
          <FilterMenu onClose={onClose} onSelectGenre={handleSelectGenre} />
        )}
      </AnimatePresence>
    </>
  )
}
