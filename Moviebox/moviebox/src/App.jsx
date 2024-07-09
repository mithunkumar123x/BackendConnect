import React, {useState} from 'react';
import { Container, Button } from 'react-bootstrap';
import './App.css';
import MovieList from './components/MovieList';

function App() {
  const [movies, setMovies] = useState([]);

  
  async function fetchMoviesHandler() {
    try {
      const response = await fetch('https://swapi.dev/api/films/');
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
    } catch (error) {
      console.error('No movie present here :', error);
    }
  }

  return (
    <Container>
      <section>
        <Button onClick={fetchMoviesHandler}>Fetch Movies</Button>
      </section>
      <section>
        <MovieList movies={movies} />
      </section>
    </Container>
  );
}

export default App;
