import type { FC } from 'react'
import { Link } from 'react-router'
import type { Cast } from 'core/Movies/domain/MovieCredits'

interface Props {
  cast: Cast
}
export const CreditsCard: FC<Props> = ({ cast }) => {
  const initial = cast.name?.trim()?.[0]?.toUpperCase() ?? '?'

  return (
    <Link
      to={`/actor/${cast.id}`}
      className="flex flex-row gap-4 items-center hover:bg-white/5 rounded-lg p-2 transition"
    >
      {cast.profilePath ? (
        <img
          src={cast.profilePath}
          alt={cast.name}
          className="rounded-full w-20 h-20 object-cover"
        />
      ) : (
        <div className="rounded-full w-20 h-20 bg-slate-800 border border-slate-700 flex items-center justify-center text-2xl font-bold text-slate-200">
          {initial}
        </div>
      )}
      <div className="flex flex-col">
        <p className="text-slate-200">{cast.character}</p>
        <p className="text-white font-semibold">{cast.name}</p>
      </div>
    </Link>
  )
}
