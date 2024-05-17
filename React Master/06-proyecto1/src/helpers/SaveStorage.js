 // Define a function called "saveStorage" taking a "movie" object as argument
 export const SaveStorage = (key, element) => {
    // Get the elements that are not in the localStorage
    let elements = JSON.parse(localStorage.getItem(key));

    // Check if it's an array
    if (Array.isArray(elements)) {
      // Add the new element to the array
      elements.push(element);
    } else {
      // Create an array with the new movie
      elements = [element];
    }

    // Save in the localStorage
    localStorage.setItem(key, JSON.stringify([element]));

    // Return the "movie" object
    return element;
  };