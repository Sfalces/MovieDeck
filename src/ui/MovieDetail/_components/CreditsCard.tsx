import type { FC } from 'react'
import type { Cast } from 'core/Movies/domain/MovieCredits'

interface Props {
  cast: Cast
}
export const CreditsCard: FC<Props> = ({ cast }) => {
  return (
    <div className="flex flex-row gap-4 items-center">
      <img src={cast.profilePath!} className="rounded-full w-20 h-20 object-cover" />
      <div className="flex flex-col">
        <p>{cast.character}</p>
        <p>{cast.name}</p>
      </div>
    </div>
  )
}
