import React from 'react'

export const Editar = ({movie, getMovies, setEditar, setListState}) => {
  const component_title = "Edit Movie";

const saveEdition = (e, id)=> {
    e.preventDefault();

    let target = e.target;
    
    //get event target
    const saved_movies = getMovies();

    //search the index of the object from the movie that we want to edit
    const index = saved_movies.findIndex(movie => movie.id === id);

    //create an object with that index with the info that we have from the form event
    let edited_movie = {
      id,
      title: target.title.value,
      description: target.description.value
    };

    //Edit the element from that index
    saved_movies[index] = edited_movie;

    //Save the new object array in the localStorage
    localStorage.setItem("movies", JSON.stringify(saved_movies));

    //refresh the states
    setListState(saved_movies);
    setEditar(0);

    
}

const cancelEdit = () =>{
  document.getElementById("edit_movie").style.display = 'none';
}

  return (
    <div className='edit_form' id='edit_movie'>
        <h3 className='title'>{component_title}</h3>

        <form onSubmit={e => saveEdition(e, movie.id)}>
            <input type='text'
                    name='title'
                    className='edited_title'
                    defaultValue={movie.title} />

            <textarea 
                    name='description'
                    defaultValue={movie.description}
                    className='edited_description' />

            <input type='submit' className='editar' value = "Save" id='button_form_save'/>

            <button onClick={cancelEdit} className='cancelar'>Cancel</button>


        </form>
    </div>
  )
}
