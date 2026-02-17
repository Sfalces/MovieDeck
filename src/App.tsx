import { Route, Routes } from 'react-router'
import { Header } from 'ui/Header'
import { Dashboard } from 'ui/Dashboard'
import { MovieDetails } from 'ui/MovieDetail'
import { MovieListByGenre } from 'ui/MovieListByGenre'
import { ActorDetail } from 'ui/ActorDetail'
import { SearchResultsController } from 'ui/SearchResults/SearchResults.controller'
import { FavoritesProvider } from 'ui/_context/FavoritesContext'

export const App = () => {
  return (
    <>
      <FavoritesProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/movieDetails/:id" element={<MovieDetails />} />
          <Route path="/genre/:id" element={<MovieListByGenre />} />
          <Route path="/search" element={<SearchResultsController />} />
          <Route path="/actor/:id" element={<ActorDetail />} />
        </Routes>
      </FavoritesProvider>
    </>
  )
}
