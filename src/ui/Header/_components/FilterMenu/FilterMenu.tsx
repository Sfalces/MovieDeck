import { motion } from 'framer-motion'
import type { FC } from 'react'
import { MovieGenreId, MovieGenreNames } from 'core/Movies/domain/MovieGenre'

interface Props {
  onClose: () => void
  genres: [keyof typeof MovieGenreId, number][]
  handleSelect: (id: number) => void
}

export const FilterMenu: FC<Props> = ({ onClose, genres, handleSelect }) => {
  return (
    <>
      <motion.div
        className="fixed left-0 top-[64px] w-full h-[calc(100%-64px)] bg-black/40 z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
      />

      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        exit={{ x: '-100%' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed top-[64px] left-0 h-[calc(100%-64px)] w-64 bg-cyan-900 z-40 shadow-xl border-cyan-300 border-2 rounded-r-lg overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-6">
          <h3 className="text-gray-200 font-bold text-lg mb-4">Select Genre:</h3>
          <ul className="flex flex-col gap-2">
            {genres.map(([key, id]) => (
              <li key={key}>
                <button
                  onClick={() => handleSelect(id)}
                  className="w-full text-left px-4 py-2 rounded-md bg-cyan-800 hover:bg-cyan-700 transition-colors text-white font-medium cursor-pointer"
                >
                  {MovieGenreNames[id]}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </>
  )
}
