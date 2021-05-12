import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

import axios from 'axios';

const AddMovieForm = (props) => {
  const { push } = useHistory();
  const { id } = useParams();

  const initialValues = {
    id: Date.now(),
    title: '',
    director: '',
    genre: '',
    metascore: 0,
    description: '',
  };

  const [movie, setMovie] = useState(initialValues);

  const handleChange = (e) => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value,
    });
  };

  const formReset = () => {
    setMovie(initialValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/api/movies/`, movie)
      .then((res) => {
        props.setMovie(res.data, { id: Date.now() });
        push(`/movies/`);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <div className='col'>
      <div className='modal-content'>
        <form onSubmit={handleSubmit}>
          <div className='modal-header'>
            <h4 className='modal-title'>
              Add New Movie <strong>{movie.title}</strong>
            </h4>
          </div>
          <div className='modal-body'>
            <div className='form-group'>
              <label>Title</label>
              <input
                value={movie.title}
                onChange={handleChange}
                name='title'
                type='text'
                className='form-control'
              />
            </div>
            <div className='form-group'>
              <label>Director</label>
              <input
                value={movie.director}
                onChange={handleChange}
                name='director'
                type='text'
                className='form-control'
              />
            </div>
            <div className='form-group'>
              <label>Genre</label>
              <input
                value={movie.genre}
                onChange={handleChange}
                name='genre'
                type='text'
                className='form-control'
              />
            </div>
            <div className='form-group'>
              <label>Metascore</label>
              <input
                value={movie.metascore}
                onChange={handleChange}
                name='metascore'
                type='number'
                className='form-control'
              />
            </div>
            <div className='form-group'>
              <label>Description</label>
              <textarea
                value={movie.description}
                onChange={handleChange}
                name='description'
                className='form-control'
              ></textarea>
            </div>
          </div>
          <div className='modal-footer'>
            <input type='submit' className='btn btn-info' value='Save' />
            <Link to={`/movies/`}>
              <input type='button' className='btn btn-default' value='Cancel' />
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMovieForm;