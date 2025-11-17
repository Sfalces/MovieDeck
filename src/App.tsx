import { Route, Routes } from 'react-router'
import { Header } from 'ui/Header'
import { Dashboard } from 'ui/Dashboard'
import { MovieDetails } from 'ui/MovieDetail'
import { MovieListByGenre } from 'ui/MovieListByGenre'

export const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/movieDetails/:id" element={<MovieDetails />} />
        <Route path="/genre/:id" element={<MovieListByGenre />} />
      </Routes>
    </>
  )
}
