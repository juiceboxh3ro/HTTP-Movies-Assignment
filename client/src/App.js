import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import axios from 'axios';
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovie from "./Movies/UpdateMovie";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(true);

  console.log(refreshTrigger)

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, [refreshTrigger]);

  const setTrigger = () => {
    setRefreshTrigger(!refreshTrigger)
  }

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} setTrigger={setTrigger} />
      </Route>

      <Route path="/update-movie/:id">
        <UpdateMovie movies={movieList}/>
      </Route>
    </>
  );
};

export default App;
