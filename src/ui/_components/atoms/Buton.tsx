import type { FC } from 'react'

interface Props {
  onClick: () => void
  text: string
}

export const Button: FC<Props> = ({ onClick, text }) => {
  return (
    <button
      onClick={onClick}
      className="bg-white text-cyan-700 hover:bg-gray-100 font-semibold px-3 py-1 rounded-lg cursor-pointer transition-colors"
    >
      {text}
    </button>
  )
}
