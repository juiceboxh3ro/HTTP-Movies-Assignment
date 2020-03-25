import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouteMatch, useHistory } from 'react-router-dom';
import MovieCard from './MovieCard';

function Movie({ addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const match = useRouteMatch();

  let { push } = useHistory();

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  const saveMovie = e => {
    e.preventDefault();
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(match.params.id);
  }, [match.params.id]);

  const editMovie = e => {
    e.preventDefault();
    push(`/update-movie/${movie.id}`)
  }

  const deleteMovie = e => {
    e.preventDefault();
    axios
      .delete(`http://localhost:5000/api/movies/${movie.id}`)
      .then(res => {
        console.log(res)
        push('/')
      })
      .catch(err => console.error(err))
  }

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className='save-wrapper'>
      <MovieCard movie={movie} />

      <button className='save-button' onClick={saveMovie}>
        Save
      </button>
      <button className="edit-button" onClick={editMovie}>
        Edit
      </button>
      <button className="delete-button" onClick={deleteMovie}>
        Delete
      </button>
    </div>
  );
}

export default Movie;
