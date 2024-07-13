import React, { useState, useRef,useEffect , useCallback } from 'react';
import { Container, Button } from 'react-bootstrap';
import './App.css';
import MovieList from './components/MovieList';
import MovieForm from './components/Form';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retrying, setRetrying] = useState(false);
  const retryInterval = useRef(null);
  const [addMovie,setAddMovie] = useState([]);
  
  

  const  fetchMoviesHandler = useCallback( async () =>  {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://moviebox-project-457f7-default-rtdb.firebaseio.com/movies.json');

      if (!response.ok) {
        throw new Error('Something went wrong ... Retrying');
      }

      const data = await response.json();
       
      const loadedMovies = [];

      for (let key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].openingText,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        })
      }


      setMovies(loadedMovies);
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
  },[])

  useEffect( () => {
    fetchMoviesHandler
  },[fetchMoviesHandler])
  

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

  async function addMovieHandler(newMovie) {
   const response = await fetch('https://moviebox-project-457f7-default-rtdb.firebaseio.com/movies.json', {
    method: 'POST',
    body: JSON.stringify(newMovie),
    headers: {
      'Content-Type' : 'application/json'
    }
   });
   const data = await response.json();
   console.log(data);
  }

  return (
    <Container>
      <section>
       <MovieForm onAddMovie={addMovieHandler} /> 
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
