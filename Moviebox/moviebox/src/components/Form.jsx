// Form.jsx
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const MovieForm = ({ onAddMovie }) => {
  const [newMovie, setNewMovie] = useState({ title: '', openingText: '', releaseDate: ''  });

  const addMovieHandler = () => {
    onAddMovie(newMovie);
  };

  return (
    <Form>
      <Form.Group controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          value={newMovie.title}
          onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
        />
      </Form.Group>
      <Form.Group controlId="openingText">
        <Form.Label>Opening Text</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={newMovie.openingText}
          onChange={(e) => setNewMovie({ ...newMovie, openingText: e.target.value })}
        />
      </Form.Group>
      <Form.Group controlId="releaseDate">
        <Form.Label>Release Date</Form.Label>
        <br />
        <DatePicker  selected = {newMovie.releaseDate} onChange={(date) => setNewMovie({...newMovie, releaseDate: date })} />
        <Form.Control
          type="date"
          value={newMovie.releaseDate}
          onChange={(e) => setNewMovie({ ...newMovie, releaseDate: e.target.value })}
        />
      </Form.Group>
      <Button variant="primary" onClick={addMovieHandler}>
        Add Movie
      </Button>
    </Form>
  );
};

export default MovieForm;
