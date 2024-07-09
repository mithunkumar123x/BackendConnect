import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Movie from "./Movie";

const MovieList = (props) => {
  return (
    <Container>
      <Row>
        {props.movies.map((movie) => (
          <Col key={movie.id} md={4}>
            <Movie
              title={movie.title}
              releaseDate={movie.releaseDate}
              openingText={movie.openingText}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default MovieList;
