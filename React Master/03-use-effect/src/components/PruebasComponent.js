import React, { useEffect, useState } from 'react'

export const PruebasComponent = () => {

  const [usuario, setUsuario] = useState("Toni Vieira");
  const [fecha, setFecha] = useState("01-01-1998");
  const [contador, setContador] = useState(0);
  const modUsuario = e => {
      setUsuario(e.target.value);
  };

  const cambiarFecha = e =>{
    setFecha(new Date().toLocaleDateString());
  }
    //solo se ejecuta una vez, solo al cargar el componente
  useEffect(() => {
    console.log("Has cargado el componente")
  }, [])

      //se ejectua solo si cambio el usuario
  useEffect(() => {
    

    setContador(contador+1);
    console.log("Has modificado el usuario: " + contador);

  }, [usuario])

  return (
    <div>
        <h1>El efecto - Hook useEffect</h1>
        <strong className={ contador >= 10+1 ? 'label label-green' : 'label'}>{usuario}</strong>

        &nbsp;
        <strong>{fecha}</strong>
        &nbsp;

    <p>
        <input type='text'onChange={modUsuario} placeholder='Cambia el nombre'></input>
        <button onClick={cambiarFecha}>Cambiar Fecha</button>
    </p>

        
    </div>
  )
}
