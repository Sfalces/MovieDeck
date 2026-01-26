import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useInject } from '_di/container'
import type { Person } from 'core/Movies/domain/Movie'
import { Spinner } from 'ui/_components/atoms/Spinner'
import { ActorDetail } from './ActorDetail.tsx'

export const ActorDetailController = () => {
  const { id } = useParams<{ id: string }>()
  const getPersonById = useInject('getPersonById')

  const [person, setPerson] = useState<Person | undefined>(undefined)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    const fetchPerson = async () => {
      try {
        setError(null)
        const result = await getPersonById(id!)
        if (!cancelled) setPerson(result)
      } catch {
        if (!cancelled) setError('Could not load actor details.')
      }
    }

    setPerson(undefined)
    if (id) fetchPerson()

    return () => {
      cancelled = true
    }
  }, [id])

  if (error) {
    return <ActorDetail person={null} error={error} />
  }

  if (!person) {
    return <Spinner />
  }

  return <ActorDetail person={person} error={null} />
}

