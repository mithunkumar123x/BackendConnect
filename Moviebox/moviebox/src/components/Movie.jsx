import React from "react";
import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";


const Movie = (props) => {
  return (
    <Card className="movie">
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {props.releaseDate}
        </Card.Subtitle>
        <Card.Text>{props.openingText}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Movie;