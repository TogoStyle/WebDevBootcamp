// Import necessary dependencies from React and custom helper functions
import React, { useState } from "react";
import { SaveStorage } from "../helpers/SaveStorage";

// Define a functional component called "Crear" which takes a prop "setListState"
export const Crear = ({ setListState }) => {
  // Define a constant variable for the component title
  const componentTitle = "Add Film";

  // Define state variables using the useState hook to manage movie data and error messages
  const [movieState, setMovieState] = useState({
    title: "",
    description: "",
  });
  const [error, setError] = useState("");

  // Destructure movieState object to access title and description
  const { title, description } = movieState;

  // Define a function to handle form submission
  const getFormData = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Extract form input values
    let target = e.target;
    let title = target.title.value;
    let description = target.description.value;

    // Validate title input
    if (title.trim() === "") {
      setError("Title is required."); // Set error message if title is empty
      return;
    }

    // Create a new movie object with a unique ID
    let movie = {
      id: new Date().getTime(),
      title,
      description,
    };

    // Update the state and localStorage with the new movie
    setListState((elements) => {
      const updatedElements = elements ? [...elements, movie] : [movie]; // Add the new movie to the existing list of movies
      SaveStorage("movies", updatedElements); // Call the SaveStorage function to save the updated list to localStorage
      return updatedElements; // Return the updated list of movies
    });

    // Reset the movieState and error variables after form submission
    setMovieState({
      title: "",
      description: "",
    });
    setError(""); // Clear any existing error message
  };

  // Render the component UI
  return (
    <div className="add">
      {/* Display the component title */}
      <h3 className="title">{componentTitle}</h3>

      {/* Display the title if both title and description are present */}
      <div className="title-container">
        <strong>{title && description && movieState.title}</strong>
      </div>

      {/* Display error message if present */}
      {error && <div className="error">{error}</div>}

      {/* Form for adding a new movie */}
      <form onSubmit={getFormData}>
        {/* Input field for entering the movie title */}
        <input
          type="text"
          id="title"
          placeholder="Title"
          name="title"
          value={title}
          onChange={(e) =>
            setMovieState({ ...movieState, title: e.target.value })
          }
        />

        {/* Textarea for entering the movie description */}
        <textarea
          id="description"
          placeholder="Description"
          name="description"
          value={description}
          onChange={(e) =>
            setMovieState({ ...movieState, description: e.target.value })
          }
        ></textarea>

        {/* Submit button for saving the movie */}
        <input type="submit" id="save" value="Save" />
      </form>
    </div>
  );
};
