import { useEffect, useState } from 'react'
import { useInject } from '_di/container'
import { Credits } from './Credits'
import type { MovieCredits } from 'core/Movies/domain/MovieCredits'
import { useParams } from 'react-router'

export const CreditsController = () => {
  const { id } = useParams<{ id: string }>()
  const getCredits = useInject('getMovieCredits')
  const [credits, setCredits] = useState<MovieCredits | undefined>()

  useEffect(() => {
    const fetchCredits = async () => {
      const credits = await getCredits(id!)
      setCredits(credits)
    }

    fetchCredits()
  }, [id])

  if (!credits) {
    return (
      <div className="loader-container">
        <div className="spinner" />
      </div>
    )
  }

  return <Credits credits={credits} />
}
