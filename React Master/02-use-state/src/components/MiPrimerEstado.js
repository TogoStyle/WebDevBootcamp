import React, {useState} from 'react'


export const MiPrimerEstado = () => {

        // let nombre = "Toni";

        // const cambiarNombre = e => {
        //     nombre = "Paquito el chocolatero"
        // };

        let [nombre, setNombre] = useState("Toni Vieira");

        const cambiarNombre = (e, nombreFijo) => {
            // nombre === "Fran" ? setNombre("Toni Vieira") : setNombre("Fran");
            setNombre(nombreFijo);
            console.log(e.target);
        }

  return (
    <div>
        <h3>Componente: Mi Primer Estado</h3>

        <strong>{nombre}</strong>
        &nbsp;
        <button onClick={e => cambiarNombre(e, "Fran") }>Cambiar Nombre</button>
        &nbsp;
        <input type="text" onChange={e => cambiarNombre(e, e.target.value)}></input>
    </div>
  )
}
