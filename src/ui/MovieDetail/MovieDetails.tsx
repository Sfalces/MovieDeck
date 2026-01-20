import type { FC } from 'react'
import type { Movie, MovieVideos } from 'core/Movies/domain/Movie'
import { Trailer } from './_components/Trailer'
import MovieCarousel from '../_components/molecules/MovieCarousel/MovieCarousel'
import type { MovieCredits } from 'core/Movies/domain/MovieCredits'
import { Credits } from './_components/Credits'

interface Props {
  trailer: MovieVideos
  poster: string
  title: string
  overview: string
  releaseDate: string
  vote: number
  genres: string[] | undefined
  runtime: number | undefined
  budget: number | undefined
  revenue: number | undefined
  similarMovies: Movie[]
  credits: MovieCredits
}

export const MovieDetails: FC<Props> = ({
  poster,
  title,
  overview,
  releaseDate,
  vote,
  genres,
  runtime,
  budget,
  revenue,
  trailer,
  similarMovies,
  credits,
}) => {
  const details = [
    { label: 'Release Date', value: releaseDate },
    { label: 'Rating', value: `⭐ ${vote.toFixed(1)}` },
    { label: 'Genres', value: genres?.join(', '), condition: genres?.length },
    { label: 'Duration', value: `${runtime} min`, condition: runtime },
    { label: 'Budget', value: `$${budget?.toLocaleString()}`, condition: budget && budget !== 0 },
    {
      label: 'Revenue',
      value: `$${revenue?.toLocaleString()}`,
      condition: revenue && revenue !== 0,
    },
  ]
  return (
    <div className=" text-white h-auto p-4">
      <div className="flex flex-row gap-4 pb-3">
        <img src={poster} className="h-120" />
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold">{title}</h1>
          <p className="text-gray-300">{overview}</p>

          <div className="flex flex-col gap-2 mt-2">
            {details
              .filter((d) => d.condition === undefined || d.condition)
              .map(({ label, value }) => (
                <p key={label}>
                  <strong className="text-slate-200">{label}:</strong> <span>{value}</span>
                </p>
              ))}
          </div>
        </div>
      </div>
      <Credits credits={credits} />
      {trailer.trailer && <Trailer trailer={trailer.trailer} />}
      <div className="mt-8">
        <MovieCarousel movies={similarMovies} />
      </div>
    </div>
  )
}
