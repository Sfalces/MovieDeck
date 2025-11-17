import type { FC } from 'react'
import { Icon, type IconName } from './Icons/Icon'

interface Props {
  onClick: () => void
  name: IconName
}

export const IconButton: FC<Props> = ({ onClick, name }) => {
  return (
    <button
      onClick={onClick}
      className="bg-cyan-600 px-4 py-2 rounded-lg text-white hover:bg-cyan-500 cursor-pointer flex items-center justify-center min-w-[2.5rem] h-[2.5rem]"
    >
      <Icon name={name} />
    </button>
  )
}
