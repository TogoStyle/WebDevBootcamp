import React, { useEffect, useState } from "react";

export const AjaxComponent = () => {
  const [usuarios, setUsuarios] = useState([]); // Definimos un estado llamado "usuarios" que almacenará la lista de usuarios obtenidos mediante AJAX

  // Función para obtener usuarios estáticos (simulación de una llamada AJAX)
  const getUsuariosEstaticos = () => {
    // Aquí simulamos la obtención de usuarios estáticos y los establecemos en el estado "usuarios"
    setUsuarios([
      {
        id: 1,
        email: "michael.lawson@reqres.in",
        first_name: "Michael",
        last_name: "Lawson",
      },
      {
        id: 2,
        email: "lindsay.ferguson@reqres.in",
        first_name: "Lindsay",
        last_name: "Ferguson",
      },
      {
        id: 3,
        email: "tobias.funke@reqres.in",
        first_name: "Tobias",
        last_name: "Funke",
      },
    ]);
  };

  useEffect(() => {
    // Llamamos a la función para obtener usuarios estáticos cuando el componente se monta por primera vez
    getUsuariosEstaticos();
  }, []); // El segundo argumento del useEffect, un arreglo vacío, indica que la función se ejecutará solo una vez después del primer renderizado del componente

  return (
    <div>
      <h2>Listado de usuarios via Ajax</h2>
      <ol className="usuarios">
            {
                usuarios.map(usuario => {
                    return <li key={usuario.id}>{usuario.first_name} {usuario.last_name}</li>
                })
            }
      </ol>
    </div>
  );
};
