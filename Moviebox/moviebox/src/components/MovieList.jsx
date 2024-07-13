import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Movie from "./Movie";

const MovieList = (props) => {
  const [movies, setMovies] = useState(props.movies);
  const [error, setError] = useState(null);

  async function deleteMovieHandler(movieId) {
    try {
      const response = await fetch(
        `https://moviebox-project-457f7-default-rtdb.firebaseio.com/movies/${movieId}.json`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        const updatedMovies = movies.filter((movie) => movie.id !== movieId);
        setMovies(updatedMovies);
      } else {
        setError("Failed to delete the movie.");
      }
    } catch (error) {
      setError("An error occurred while deleting the movie.");
    }
  }

  return (
    <Container>
      <Row>
        {movies.map((movie) => (
          <Col key={movie.id} md={4}>
            <Movie
              title={movie.title}
              releaseDate={movie.releaseDate}
              openingText={movie.openingText}
            />
            <Button onClick={() => deleteMovieHandler(movie.id)}>Delete</Button>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default MovieList;
