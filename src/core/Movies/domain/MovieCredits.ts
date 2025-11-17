export interface MovieCredits {
  cast: {
    id: number
    name: string
    character: string
    profilePath: string | null
  }[]
  screenplay: {
    id: number
    name: string
    job: string
    profilePath: string | null
  } | null
}

export interface Cast {
  id: number
  name: string
  character: string
  profilePath: string | null
}
