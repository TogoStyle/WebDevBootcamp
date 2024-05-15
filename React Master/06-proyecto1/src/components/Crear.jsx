// Import the React module and the useState function from the "react" library
import React, { useState } from "react";

// Define a function component called "Crear"
export const Crear = () => {
  // Declare a constant called "componentTittle" and assign it the value "Add Film"
  const componentTittle = "Add Film";

  // Define a state called "movieState" using the useState hook, initialized with an object having properties "tittle" and "description", both with empty initial values
  const [movieState, setMovieState] = useState({
    tittle: "",
    description: "",
  });

  // Extract the properties "tittle" and "description" from the state "movieState" using destructuring
  const { tittle, description } = movieState;

  // Define a function called "getFormData" taking an event as argument
  const getFormData = (e) => {
    // Prevents the default behavior of the form when submitted
    e.preventDefault();

    // Get the element of the form that triggered the event
    let target = e.target;

    // Get the value of the "tittle" field from the form
    let tittle = target.tittle.value;

    // Get the value of the "description" field from the form
    let description = target.description.value;

    // Create a "movie" object with a generated ID and the values obtained from the form
    let movie = {
      id: new Date().getTime(),
      tittle,
      description,
    };

    // Set the state "movieState" to the "movie" object
    setMovieState(movie);

    // Call the "saveStorage" function with the "movie" object as argument
    saveStorage(movie);
  };

  // Define a function called "saveStorage" taking a "movie" object as argument
  const saveStorage = (movie) => {
    // Get the elements that are not in the localStorage
    let elements = JSON.parse(localStorage.getItem("movies"));

    // Check if it's an array
    if (Array.isArray(elements)) {
      // Add the new element to the array
      elements.push(movie);
    } else {
      // Create an array with the new movie
      elements = [movie];
    }

    // Save in the localStorage
    localStorage.setItem("movies", JSON.stringify([movie]));

    // Return the "movie" object
    return movie;
  };

  // Return the JSX code representing the component
  return (
    <div className="add">
      {/* Display the title */}
      <h3 className="title">{componentTittle}</h3>
      
      {/* Display the title and description if both are present */}
      <div className="title-container">
        <strong>{tittle && description && movieState.tittle}</strong>
      </div>

      {/* Form for adding a new movie */}
      <form onSubmit={getFormData}>
        {/* Input field for entering the movie title */}
        <input type="text" id="title" placeholder="Tittle" name="tittle" />
        
        {/* Textarea for entering the movie description */}
        <textarea
          id="description"
          placeholder="Description"
          name="description"
        ></textarea>
        
        {/* Submit button for saving the movie */}
        <input type="submit" id="save" value="Save" />
      </form>
    </div>
  );
};
