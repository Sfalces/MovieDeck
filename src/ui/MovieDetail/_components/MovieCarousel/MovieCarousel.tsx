import { useRef } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import './MovieCarousel.css'
import type { Movie } from 'core/Movies/domain/Movie'
import { MovieCard } from 'ui/_components/atoms/MovieCard'

interface Props {
  movies: Movie[]
  title?: string
}

export default function MovieCarousel({ movies, title = 'You may also like:' }: Props) {
  const carouselRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return
    const cardWidth = carouselRef.current.children[0].clientWidth
    const gap = 16
    const scrollAmount = cardWidth + gap
    if (direction === 'left') {
      carouselRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
    } else {
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <div className="carousel-wrapper">
        <button className="carousel-btn left" onClick={() => scroll('left')}>
          <FaChevronLeft />
        </button>
        <div className="carousel" ref={carouselRef}>
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        <button className="carousel-btn right" onClick={() => scroll('right')}>
          <FaChevronRight />
        </button>
      </div>
    </>
  )
}
