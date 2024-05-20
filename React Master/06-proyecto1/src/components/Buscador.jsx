import React, { useState } from "react";

export const Buscador = ({listState, setListState}) => {

  const [search, setSearchState] = useState('');

  const searchMovie = (e) => {
     // Prevenir el comportamiento por defecto del formulario
     e.preventDefault();


    //Creating state and refreshing it
    setSearchState(e.target.value);

    //filtering to search for coincidences
    let foundMovies = listState.filter(movie => {
      return movie.title.toLowerCase().includes(search.toLowerCase())
    })

    //check if there is any result
    if(search.length <= 1 ){
      foundMovies = JSON.parse(localStorage.getItem("movies"))
    }

    //Refresh the listState with what we filter
    setListState(foundMovies);


  }

  return (
    <div className="search">
      <h3 className="title">Search</h3>
      <form>
        <input type="text" 
                id="search_field" 
                name="search"
                autoComplete="off"
                onChange={searchMovie}/>
        <button id="search">Search</button>
      </form>
    </div>
  );
};
