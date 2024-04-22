// Para ver cómo debería funcionar el sitio web final, ejecuta "node solution.js".
// Asegúrate de haber instalado todas las dependencias con "npm i".

// Importa el framework Express, que se utiliza para crear servidores web en Node.js
import express from "express";

// Importa el middleware 'body-parser', que se utiliza para analizar datos de formularios codificados en la URL
import bodyParser from "body-parser";

// Importa la función 'dirname' del módulo 'path' para obtener el directorio actual
import { dirname } from "path";

// Importa la función 'fileURLToPath' del módulo 'url' para convertir la URL del archivo en una ruta de sistema de archivos
import { fileURLToPath } from "url";

// Obtiene el directorio actual utilizando 'dirname' y 'fileURLToPath'
const __dirname = dirname(fileURLToPath(import.meta.url));

// Crea una aplicación Express
const app = express();

// Define el puerto en el que se ejecutará el servidor
const port = 3000;

// Define una contraseña que se utilizará para la autenticación
var password = "ILoveProgramming";

// Variable para almacenar la contraseña enviada en la solicitud POST
var pass = "";

// Configura el middleware 'body-parser' para analizar datos de formularios codificados en la URL
app.use(bodyParser.urlencoded({extended: true}));

// Manejador de ruta para la ruta principal '/', que envía el archivo 'index.html' ubicado en el directorio 'public'
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// Manejador de ruta para la ruta '/submit' con el método POST
app.post("/check", (req, res) => {
  // Registra los datos enviados en la solicitud POST en la consola
  console.log(req.body);
  // Almacena la contraseña enviada en la variable 'pass'
  pass = req.body["password"];
  // Verifica si la contraseña es correcta y envía la página correspondiente
  correctPassword(res);
});



// Función para verificar si la contraseña es correcta y enviar la página correspondiente
function correctPassword(res) {
  if (pass == password) {
    // Si la contraseña es correcta, envía la página 'secret.html'
    res.sendFile(__dirname + "/public/secret.html");
  } else {
    // Si la contraseña no es correcta, reenvía la página 'index.html'
    res.sendFile(__dirname + "/public/index.html");
  }
}

// El servidor comienza a escuchar las solicitudes en el puerto especificado
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
