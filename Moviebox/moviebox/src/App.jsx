import React, {useState} from 'react';
import { Container, Button } from 'react-bootstrap';
import './App.css';
import MovieList from './components/MovieList';

function App() {
  const [movies, setMovies] = useState([]);

  function fetchMoviesHandler() {
    fetch('https://swapi.dev/api/films/')
      .then((response) => {
        return response.json();
      })
      .then((data) => {  
        const transformedMovies = data.results.map((movieData) => {
          return {
            id: movieData.episode_id,
            title: movieData.title,
            openingText: movieData.opening_crawl,
            releaseDate: movieData.release_date,
          };
        });
        setMovies(transformedMovies);
      });
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
