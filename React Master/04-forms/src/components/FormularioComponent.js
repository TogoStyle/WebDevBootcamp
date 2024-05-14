import React, { useState } from "react";

export const FormularioComponent = () => {
  const [usuario, setUsuario] = useState({});

  const conseguirDatosFormulario = (e) => {
    e.preventDefault();

    let datos = e.target;
    let usuario = {
      nombre: datos.nombre.value,
      apellido: datos.apellido.value,
      genero: datos.genero.value,
      bio: datos.bio.value,
      enviar: datos.enviar.value
    };

    console.log(usuario);

    setUsuario(usuario);
  };

  const cambiarDatos = e => {
    let nameInput = e.target.name;
    let usuarioModificar = { ...usuario }; // Hacer una copia del objeto usuario

    usuarioModificar[nameInput] = e.target.value;
 
    setUsuario(usuarioModificar);
}


  return (
    <div>
      <h1>Formularios con React</h1>

      { usuario.enviar && 
      (
        <div className="info_usuario">
          {usuario.nombre} {usuario.apellido} es un {usuario.genero} y su
          biografia es esta: <p>{usuario.bio}</p>
        </div>
      )
      }

      <form onSubmit={conseguirDatosFormulario}>
        <input type="text" placeholder="Nombre" name="nombre" onChange={cambiarDatos}></input>
        <input type="text" placeholder="Apellido" name="apellido" onChange={cambiarDatos}></input>
        <select name="genero" onChange={cambiarDatos}>
          <option value="hombre">Hombre</option>
          <option value="mujer">Mujer</option>
        </select>
        <textarea placeholder="Biografia" name="bio" onChange={cambiarDatos}></textarea>

        <input type="submit" value="Enviar" name="enviar"></input>
      </form>
    </div>
  );
};
