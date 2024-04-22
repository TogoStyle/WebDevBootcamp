import express from "express";
// Importa el módulo 'body-parser' para analizar los cuerpos de las solicitudes HTTP
import bodyParser from "body-parser";
//Codigo necesario para rastrear la ubicacion del directorio y del archivo, no siempre trabajamos en local, por lo que cuando trabajemos en la nube, tendremos que hacer uso de ello
// Importa la función 'dirname' del módulo 'path' para obtener el directorio actual
import { dirname } from "path";
// Importa la función 'fileURLToPath' del módulo 'url' para convertir la URL del archivo en una ruta de sistema de archivos
import { fileURLToPath } from "url";
// Obtiene el directorio actual usando 'dirname' y 'fileURLToPath'
const __dirname = dirname(fileURLToPath(import.meta.url));


const app = express();
const port = 3000;
var bandName = "";

// Configura el middleware 'body-parser' para analizar datos de formularios codificados en la URL
app.use(bodyParser.urlencoded({extended: true}));

function bandNameGenerator(req, res, next) {
  console.log(req.body);
  bandName = req.body["street"] + req.body["pet"];
  next();
}

app.use(bandNameGenerator);



app.get("/", (req, res) => {
  // Envía el archivo 'index.html' ubicado en el directorio 'public'
res.sendFile(__dirname + "/public/index.html");
});

// Manejador de ruta para la ruta '/submit' con el método POST
app.post("/submit", (req, res) => {
  // Registra los datos enviados en la solicitud POST en la consola
console.log(req.body);
res.send(`<h1>Your band is:</h1><h2>${bandName}✌️</h2>`);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});