import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const initialMovie = {
  title: '',
  director: '',
  metascore: '',
  stars: []
}

const UpdateMovie = ({movies}) => {
  const [movie, setMovie] = useState(initialMovie);
  const {id} = useParams();
  const {push} = useHistory();

  const changeHandler = e => {
    
    let value = e.target.value;
    if (e.target.name === 'metascore') {
      value = parseInt(value, 10);
    }

    setMovie({
      ...movie,
      [e.target.name]: value
    });
  };

  const starsHandler = e => {
    var stars = e.target.value;
    var newStars = stars.split(',');
    setMovie({
      ...movie,
      stars: newStars
    })
  }

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, movie)
      .then(res => {
        setMovie(res.data)
        push(`/movies/${id}`)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    const movieToUpdate = movies.find(e => `${e.id}` === id)
    if (movieToUpdate) {
      setMovie(movieToUpdate)
    }
  }, [movies, id])


  return (
    <>
    <h2>Movie Updater 3000</h2>
    <form id="movie-updater" onSubmit={handleSubmit}>
      <input type="text" name="title" onChange={changeHandler} placeholder="title" value={movie.title}/>
      <hr />
      <input type="text" name="director" onChange={changeHandler} placeholder="director" value={movie.director}/>
      <hr />
      <input type="text" name="metascore" onChange={changeHandler} placeholder="metascore" value={movie.metascore}/>
      <hr />
      <input type="text" name="stars" onChange={starsHandler} placeholder="stars" value={movie.stars}/>
      <hr />
      <button className="submit-button" onClick={handleSubmit}>Update Movie</button>
    </form>
    </>
  )
}

export default UpdateMovie