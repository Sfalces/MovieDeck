export interface Movie {
  id: string
  title: string
  overview: string
  vote: number
  releaseDate: string
  poster: string
  tagline?: string
  runtime?: number
  genres?: string[]
  budget?: number
  revenue?: number
}

export interface MovieVideo {
  id: string
  name: string
  type: string
  url: string
}

export interface MovieVideos {
  videos: MovieVideo[]
  trailer?: MovieVideo | null
}

export interface Person {
  birthday: string | null
  known_for_department: string
  deathday: string | null
  id: string
  name: string
  also_known_as: string[]
  gender: number
  biography: string | null
  place_of_birth: string | null
  profile_path: string | null
}
