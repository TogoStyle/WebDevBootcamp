import React, { useEffect, useState } from "react";
import { Editar } from "./Editar";

// Define a functional component called "Listado" which takes "listState" and "setListState" as props
export const Listado = ({ listState, setListState }) => {
  // useEffect hook to run getMovies function after the component mounts
  useEffect(() => {
    getMovies(); // Call the getMovies function to retrieve movies from localStorage
  }, []);

  const [editar, setEditar] = useState(0);

  // Function to retrieve movies from localStorage and update listState
  const getMovies = () => {
    // Get the "movies" item from localStorage and parse it from JSON, or initialize an empty array if it doesn't exist
    let movies = JSON.parse(localStorage.getItem("movies")) || [];
    // Update the state with the retrieved movies
    setListState(movies);
    return movies; // Return the retrieved movies
  };

  // Function to delete a movie by its ID
  const deleteMovie = (id) => {
    // Retrieve the list of saved movies
    let savedMovies = getMovies();
    // Filter out the movie with the specified ID and create a new array without it
    let newSavedMovies = savedMovies.filter(movie => movie.id !== id);
    // Update the state with the new array of movies, removing the deleted movie
    setListState(newSavedMovies);
    // Update localStorage with the new array of movies
    localStorage.setItem('movies', JSON.stringify(newSavedMovies));
  };

  // Render the component UI
  return (
    <>
      {/* Conditionally render movies if the listState is not empty */}
      {listState != null && listState.length > 0 ? listState.map((movie) => {
        return (
          // Each movie is rendered inside an article element with a unique key
          <article key={movie.id} className="peli-item">
            {/* Display the title of the movie */}
            <h3 className="title">{movie.title}</h3>
            {/* Display the description of the movie */}
            <p className="description">{movie.description}</p>

            {/* Buttons for editing and deleting the movie */}
            <button className="edit" onClick={() => setEditar(movie.id)}>Edit</button>
            {/* Button to delete the movie, onClick event calls deleteMovie function with movie ID */}
            <button className="delete" onClick={() => deleteMovie(movie.id)}>Delete</button>


          {/* Aparece formulario para editar */}
          {editar == movie.id && (
            <Editar movie={movie}
                    getMovies = {getMovies}
                    setEditar = {setEditar}
                    setListState = {setListState}/>
          )}
          </article>
        );
      })
      // If listState is null or empty, display a message indicating there are no movies to show
      : <h2 className="no-movies">There are no movies to show</h2>
      }
    </>
  );
};
