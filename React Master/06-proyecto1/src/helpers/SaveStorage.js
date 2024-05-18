export const SaveStorage = (key, elements) => {
  // Save the updated array in localStorage
  localStorage.setItem(key, JSON.stringify(elements));

  // Return the updated elements array
  return elements;
};
