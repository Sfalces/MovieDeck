import { type FC } from 'react'
import { icons } from './icons'

export type IconName = keyof typeof icons

type IconProps = {
  name: IconName
}

export const Icon: FC<IconProps> = ({ name }) => {
  const IconItem = icons[name]

  return <IconItem />
}
