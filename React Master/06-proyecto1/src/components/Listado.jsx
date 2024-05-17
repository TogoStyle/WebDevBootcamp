import React, { useEffect } from "react";

// Define the Listado component that takes in listState and setListState as props
export const Listado = ({ listState, setListState }) => {
  // useEffect hook to run getMovies function after the component mounts
  useEffect(() => {
    getMovies();
  }, []);

  // Function to retrieve movies from localStorage and update listState
  const getMovies = () => {
    // Get the "movies" item from localStorage and parse it from JSON
    let movies = JSON.parse(localStorage.getItem("movies")) || [];

    // Update the state with the retrieved movies
    setListState(movies);

    return movies;
  };

  const deleteMovie = (Id) => {
    // Get saved movies
    let savedMovies = getMovies();

    // Create a new array excluding the movie with the specified ID
    let newSavedMovies = savedMovies.filter(movie => movie.Id !== parseInt(Id));

    // Update the state with the new array
    setListState(newSavedMovies);

    // Update localStorage with the new array
    localStorage.setItem('movies', JSON.stringify(newSavedMovies));

    // Log the updated list to verify
    console.log("Updated movies list: ", newSavedMovies);
  };

  // Render the component
  return (
    <>
      {/* If listState is not null and has movies, map through the listState array and display each movie */}
      {listState != null && listState.length > 0 ? listState.map((movie) => {
        return (
          // Each movie is rendered inside an article element with a unique key
          <article key={movie.Id} className="peli-item">
            {/* Display the title of the movie */}
            <h3 className="title">{movie.tittle}</h3>
            {/* Display the description of the movie */}
            <p className="description">{movie.description}</p>

            {/* Buttons for editing and deleting the movie (functionality not yet implemented) */}
            <button className="edit">Edit</button>
            <button className="delete" onClick={() => deleteMovie(movie.Id)}>Delete</button>
          </article>
        );
      })
      // If listState is null or empty, display a message indicating there are no movies to show
      : <h2 className="no-movies">There are no movies to show</h2>
      }
    </>
  );
};
