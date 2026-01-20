import type { FC } from 'react'
import type { MovieCredits } from 'core/Movies/domain/MovieCredits'
import { CreditsCard } from './CreditsCard'

interface Props {
  credits: MovieCredits
}

export const Credits: FC<Props> = ({ credits }) => {
  return (
    <div>
      <h1 className="text-xl text-slate-200">Cast:</h1>
      <div className="p-2 grid grid-cols-1 gap-6 sm:grid-cols-3 w-fit ">
        {credits.cast.map((cast) => (
          <CreditsCard key={cast.id} cast={cast} />
        ))}
      </div>
    </div>
  )
}
