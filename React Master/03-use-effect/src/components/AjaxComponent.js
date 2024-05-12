import React, { useEffect, useState } from "react";

export const AjaxComponent = () => {
  const [usuarios, setUsuarios] = useState([]); // Definimos un estado llamado "usuarios" que almacenará la lista de usuarios obtenidos mediante AJAX
  const [cargando, setCargando] = useState(true);
  const [errores, setErrores] = useState("");

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

  const getUsuariosAjaxPromesa = () => {
    fetch("https://reqres.in/api/users?page=1")
      .then((respuesta) => respuesta.json())
      .then(
        (resultado_final) => {
          setUsuarios(resultado_final.data);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const getUsuariosAjaxAsyncAwait = async () => {
    setTimeout(async () => {
      try {
        const peticion = await fetch("https://reqres.in/api/users?page=2");
        const { data } = await peticion.json();

        setUsuarios(data);
        setCargando(false);
      } catch (err) {
        console.log(err.message);
        setErrores(err.message);
      }
    }, 2000);
  };

  useEffect(() => {
    // Llamamos a la función para obtener usuarios estáticos cuando el componente se monta por primera vez
    // getUsuariosEstaticos();
    // getUsuariosAjaxPromesa();
    getUsuariosAjaxAsyncAwait();
  }, []); // El segundo argumento del useEffect, un arreglo vacío, indica que la función se ejecutará solo una vez después del primer renderizado del componente

  if (errores !== "") {
    //cuando pasa algun error
    return <div className="errores">{errores}</div>;
  } else if (cargando == true) {
    //cuando esta todo cargando
    return <div className="cargando">Cargando datos...</div>;
  } else if (cargando == false && errores === "") {
    //cuando todo ha ido bien
    return (
      <div>
        <h2>Listado de usuarios via Ajax</h2>
        <ol className="usuarios">
          {usuarios.map((usuario) => {
            return (
              <li key={usuario.id}>
                <img src={usuario.avatar} alt="User Avatar" width="80px" />
                {usuario.first_name} {usuario.last_name}{" "}
              </li>
            );
          })}
        </ol>
      </div>
    );
  }
};
