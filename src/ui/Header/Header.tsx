import { Link } from 'react-router'
import { IconButton } from '../_components/atoms/IconButton'
import type { FC } from 'react'
import { FilterMenu } from './_components/FilterMenu'
import { AnimatePresence } from 'framer-motion'

interface Props {
  visible: boolean
  handleIsVisible: () => void
  onClose: () => void
  handleSelectGenre: (id: number) => void
}

export const Header: FC<Props> = ({ handleIsVisible, visible, onClose, handleSelectGenre }) => {
  return (
    <>
      <div className="sticky top-0 z-50 w-full bg-cyan-800 text-gray-200 py-3 flex items-center justify-center">
        <div className="absolute left-4">
          <IconButton name="filter" onClick={handleIsVisible} />
        </div>
        <Link to="/" className="inline-block">
          <h1 className="text-4xl font-black text-center">MovieDeck</h1>
        </Link>
      </div>
      <AnimatePresence>
        {visible && <FilterMenu onClose={onClose} onSelectGenre={handleSelectGenre} />}
      </AnimatePresence>
    </>
  )
}
