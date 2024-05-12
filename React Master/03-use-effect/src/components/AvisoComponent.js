import React, { useEffect } from 'react'

export const AvisoComponent = () => {

    useEffect(() => {
        alert("El componente aviso component esta montado")

        return () => {
            alert("COMPONENTE DESMONTADO");
        }

    }, []);

  return (
    <div>

    <hr/>
    <h3 className='saludo'>Saludos Toni</h3>

    <button onClick={ e => {
        alert("Saludos")
    }}>Mostrar alerta</button>

{/* <button onClick={() => {
    const elementos = document.getElementsByClassName("saludo");
    for (let i = 0; i < elementos.length; i++) {
        elementos[i].style.color = "red";
    }
}}>Mostrar alerta</button> */}


    </div>
  )
}
