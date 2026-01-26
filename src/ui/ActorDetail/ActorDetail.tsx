import type { FC } from 'react'
import { useNavigate } from 'react-router'
import { Gender, type Person } from 'core/Movies/domain/Movie'

interface Props {
  person: Person | null
  error: string | null
}

export const ActorDetail: FC<Props> = ({ person, error }) => {
  const navigate = useNavigate()

  if (error) {
    return (
      <div className="text-white p-6">
        <button
          className="mb-4 px-4 py-2 rounded-md bg-cyan-600 hover:bg-cyan-500 transition"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
        <div className="bg-red-950/40 border border-red-900 text-red-200 p-4 rounded-lg">
          {error}
        </div>
      </div>
    )
  }

  if (!person) return null

  const details = [
    { label: 'Known for', value: person.known_for_department },
    { label: 'Birthday', value: person.birthday ?? undefined, condition: person.birthday },
    { label: 'Deathday', value: person.deathday ?? undefined, condition: person.deathday },
    {
      label: 'Place of birth',
      value: person.place_of_birth ?? undefined,
      condition: person.place_of_birth,
    },
    {
      label: 'Also known as',
      value: person.also_known_as.join(', '),
      condition: person.also_known_as.length > 0,
    },
    { label: 'Gender', value: Gender[person.gender] ?? 'Other' },
  ]

  return (
    <div className="text-white h-auto p-6">
      <button
        className="mb-6 px-4 py-2 rounded-md bg-cyan-600 hover:bg-cyan-500 transition cursor-pointer"
        onClick={() => navigate(-1)}
      >
        Back
      </button>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="shrink-0">
          {person.profile_path ? (
            <img
              src={person.profile_path}
              alt={person.name}
              className="w-56 h-56 rounded-2xl object-cover shadow-lg border border-cyan-700/40"
            />
          ) : (
            <div className="w-56 h-56 rounded-2xl bg-slate-800 flex items-center justify-center text-5xl font-black text-slate-200 border border-slate-700">
              {person.name}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <h1 className="text-4xl font-bold">{person.name}</h1>

          <div className="flex flex-col gap-2 mt-1">
            {details
              .filter((d) => d.condition === undefined || d.condition)
              .map(({ label, value }) => (
                <p key={label}>
                  <strong className="text-slate-200">{label}:</strong> <span>{value}</span>
                </p>
              ))}
          </div>

          <div className="mt-4">
            <h2 className="text-xl font-semibold text-slate-200">Biography</h2>
            <p className="text-gray-300 whitespace-pre-line mt-2">
              {person.biography?.trim() ? person.biography : 'No biography available.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

