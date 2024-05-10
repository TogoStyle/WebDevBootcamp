import React, {useState} from 'react'
import PropTypes from "prop-types"

export const EjercicioComponent = ({year}) => {

    const [yearNow, setYear] = useState(year);

    const siguiente = e => {
        setYear(yearNow + 1);
    }

    const anterior = e => {
        setYear(yearNow - 1);
    }

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