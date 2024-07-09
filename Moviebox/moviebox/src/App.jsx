import React, { useState, useRef } from 'react';
import { Container, Button } from 'react-bootstrap';
import './App.css';
import MovieList from './components/MovieList';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retrying, setRetrying] = useState(false);
  const retryInterval = useRef(null);

  async function fetchMoviesHandler() {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://swapi.dev/api/film/');

      if (!response.ok) {
        throw new Error('Something went wrong ... Retrying');
      }

      const data = await response.json();

      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });

      setMovies(transformedMovies);
      setRetrying(false);
      clearInterval(retryInterval.current);
    } catch (error) {
      setError(error.message);
      console.error('No movie present here:', error);
      if (!retrying) {
        setRetrying(true);
        retryInterval.current = setInterval(fetchMoviesHandler, 5000);
      }
    }
    setIsLoading(false);
  }

  function cancelRetryHandler() {
    clearInterval(retryInterval.current);
    setRetrying(false);
    setError('Retrying canceled.');
  }

  let content = <p>Found no movies...</p>;

  if (movies.length > 0) {
    content = <MovieList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <Container>
      <section>
        <Button onClick={fetchMoviesHandler} disabled={retrying}>
          {retrying ? 'Retrying...' : 'Fetch Movies'}
        </Button>
        {retrying && <Button onClick={cancelRetryHandler}>Cancel Retry</Button>}
      </section>
      <section>
        {content}
      </section>
    </Container>
  );
}

export default App;
