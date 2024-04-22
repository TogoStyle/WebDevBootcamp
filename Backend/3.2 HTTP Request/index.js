// Este código crea un servidor web utilizando Express en Node.js, define rutas para diferentes páginas y archivos estáticos, y registra los encabezados brutos de las solicitudes en la consola.
// Importación de Express y otras funciones necesarias
import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
// Obtiene la ruta del archivo actual (__filename) y el directorio actual (__dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Crea una aplicación Express
const app = express();
// Puerto en el que se ejecutará el servidor
const port = 3000;
// Middleware para servir archivos estáticos desde el directorio especificado
app.use(express.static(join(__dirname, "../../Simon Game Challenge Starting Files")));
// Define la ruta para la página de inicio
app.get("/", (req, res) => {
      // Envía el archivo index.html en la respuesta
    res.sendFile(join(__dirname, "../../Simon Game Challenge Starting Files/index.html"));
        // Registra los encabezados brutos de la solicitud en la consola
    console.log(req.rawHeaders);
})

// Define la ruta para la página "about"
app.get("/about", (req, res) => {
    res.send("About me");
        // Registra los encabezados brutos de la solicitud en la consola
    console.log(req.rawHeaders);
  })
  
  app.get("/contact", (req, res) => {
    res.send("Contact me");
    console.log(req.rawHeaders);
  })
// Inicia el servidor en el puerto especificado
app.listen(port, () => {
      // Imprime un mensaje en la consola indicando que el servidor está en funcionamiento
  console.log(`Server running on port ${port}.`);
});
