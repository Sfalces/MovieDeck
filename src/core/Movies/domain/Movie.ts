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
