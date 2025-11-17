import type { FC } from 'react'
import type { MovieVideo } from 'core/Movies/domain/Movie'

interface Props {
  trailer: MovieVideo
}

export const Trailer: FC<Props> = ({ trailer }) => {
  return (
    <div className="flex flex-col  my-8">
      <h2 className="text-xl text-slate-200 mb-4">Trailer:</h2>
      <div className="items-center justify-center flex">
        <iframe
          className="rounded-lg shadow-lg"
          width="90%"
          height="550"
          src={trailer.url.replace('watch?v=', 'embed/')}
          title={trailer.name}
          allowFullScreen
        />
      </div>
    </div>
  )
}
