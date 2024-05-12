// Importa React y el hook useState de React para gestionar el estado interno del componente.
// Importa PropTypes para definir las restricciones de tipo de las propiedades que recibe el componente.
import React, {useState} from 'react'
import PropTypes from "prop-types"


// Define un componente funcional llamado EjercicioComponent que recibe una propiedad year.
export const EjercicioComponent = ({year}) => {

    // Declara una variable de estado yearNow utilizando el hook useState. Inicializa el estado con el valor pasado a través de la propiedad year. setYear es la función que se utilizará para actualizar este estado.
    const [yearNow, setYear] = useState(year);

    const siguiente = e => {
        setYear(yearNow + 1);
    }

    const anterior = e => {
        setYear(yearNow - 1);
    }

    // Define una función cambiarYear que se activa cuando el valor del input cambia. Convierte el valor del input a un número entero utilizando parseInt(). Si el valor es un número entero, actualiza el estado yearNow con ese valor. Si no es un número entero, restaura el estado yearNow al valor original.
    const cambiarYear = e => {
        let dato = parseInt(e.target.value);

        if(Number.isInteger(dato)){
            setYear(dato);
        }else{
            setYear(year);
        }

        
    }

  return (
    <div>

    <h2>Ejercicio con Eventos y useState</h2>
    <strong className = " label"> {yearNow}</strong>

    <p>
        <button onClick={siguiente}>Siguiente </button>
        &nbsp;
        <button onClick={anterior}>Anterior</button>
    </p>

    <p> Cambiar year:
        <input onChange={ cambiarYear } type='text' placeholder='Change the year'></input>
    </p>
    </div>
  )
}

EjercicioComponent.propTypes = {
    year: PropTypes.number.isRequired
}