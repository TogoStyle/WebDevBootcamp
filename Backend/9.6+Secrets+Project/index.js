
// Importamos las librerías necesarias para nuestra aplicación, como Express.js para la creación del servidor, pg para interactuar con la base de datos PostgreSQL, bcrypt para el cifrado de contraseñas, Passport.js para la autenticación de usuarios, y otras dependencias.import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy } from "passport-local";
import GoogleStrategy from "passport-google-oauth2";
import session from "express-session";
import env from "dotenv";
// Creamos una instancia de la aplicación Express y establecemos el puerto en el que escuchará las solicitudes. También configuramos el número de rondas para la generación de la sal en el cifrado de contraseñas y cargamos las variables de entorno desde un archivo .env.
const app = express();
const port = 3000;
const saltRounds = 10;
env.config();
// Configuramos Express para usar sesiones de usuario, analizar las solicitudes de cuerpo codificadas en URL y servir archivos estáticos. También inicializamos y configuramos Passport.js para la autenticación y la gestión de sesiones de usuario.
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(passport.initialize());
app.use(passport.session());
// ----------------------------------------------------
// Creamos una instancia del cliente PostgreSQL y nos conectamos a la base de datos utilizando las variables de entorno para las credenciales de conexión.
const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});
db.connect();

// Configuramos una ruta para manejar las solicitudes GET a la ruta raíz ("/"), que renderiza el archivo home.ejs.
app.get("/", (req, res) => {
  res.render("home.ejs");
});
// Configuramos rutas para manejar las solicitudes GET a las páginas de inicio de sesión, registro y cierre de sesión.
app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});
// ----------------------------------------------------
// Configuramos una ruta para manejar las solicitudes GET a la página de secretos, que verifica si el usuario está autenticado antes de mostrar la información secreta.
app.get("/secrets", async (req, res) => {
  console.log(req.user);

  ////////////////UPDATED GET SECRETS ROUTE/////////////////
  if (req.isAuthenticated()) {
    try {
      const result = await db.query(
        `SELECT secret FROM users WHERE email = $1`,
        [req.user.email]
      );
      console.log(result);
      const secret = result.rows[0].secret;
      if (secret) {
        res.render("secrets.ejs", { secret: secret });
      } else {
        res.render("secrets.ejs", { secret: "Jack Bauer is my hero." });
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    res.redirect("/login");
  }
});

// Configuramos una ruta para manejar las solicitudes GET a la página de envío de secretos, que verifica si el usuario está autenticado antes de permitir el acceso a la página.
////////////////SUBMIT GET ROUTE/////////////////
app.get("/submit", function (req, res) {
  if (req.isAuthenticated()) {
    res.render("submit.ejs");
  } else {
    res.redirect("/login");
  }
});

// Configuramos una ruta para manejar las solicitudes GET a la autenticación de Google, que redirige al usuario a la página de inicio de sesión de Google.
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// Configuramos una ruta para manejar las solicitudes GET a la autenticación exitosa de Google, que redirige al usuario a la página de secretos si la autenticación es exitosa, o a la página de inicio de sesión si falla.
app.get(
  "/auth/google/secrets",
  passport.authenticate("google", {
    successRedirect: "/secrets",
    failureRedirect: "/login",
  })
);

// Configuramos una ruta para manejar las solicitudes POST al iniciar sesión, que utiliza Passport.js para autenticar al usuario y redirigirlo a la página de secretos si la autenticación es exitosa, o a la página de inicio de sesión si falla.
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/secrets",
    failureRedirect: "/login",
  })
);

// Configuramos una ruta para manejar las solicitudes POST al registrar un nuevo usuario, que verifica si el usuario ya existe en la base de datos antes de crear una nueva cuenta.
app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (checkResult.rows.length > 0) {
      req.redirect("/login");
    } else {
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
        } else {
          const result = await db.query(
            "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
            [email, hash]
          );
          const user = result.rows[0];
          req.login(user, (err) => {
            console.log("success");
            res.redirect("/secrets");
          });
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
});

// Configuramos una ruta para manejar las solicitudes POST al enviar un nuevo secreto, que actualiza el secreto del usuario en la base de datos.
////////////////SUBMIT POST ROUTE/////////////////
app.post("/submit", async function (req, res) {
  const submittedSecret = req.body.secret;
  console.log(req.user);
  try {
    await db.query(`UPDATE users SET secret = $1 WHERE email = $2`, [
      submittedSecret,
      req.user.email,
    ]);
    res.redirect("/secrets");
  } catch (err) {
    console.log(err);
  }
});

// Configuramos una estrategia de autenticación local utilizando Passport.js, que verifica las credenciales del usuario en la base de datos.
passport.use(
  "local",
  new Strategy(async function verify(username, password, cb) {
    try {
      const result = await db.query("SELECT * FROM users WHERE email = $1 ", [
        username,
      ]);
      if (result.rows.length > 0) {
        const user = result.rows[0];
        const storedHashedPassword = user.password;
        bcrypt.compare(password, storedHashedPassword, (err, valid) => {
          if (err) {
            console.error("Error comparing passwords:", err);
            return cb(err);
          } else {
            if (valid) {
              return cb(null, user);
            } else {
              return cb(null, false);
            }
          }
        });
      } else {
        return cb("User not found");
      }
    } catch (err) {
      console.log(err);
    }
  })
);

// Configuramos una estrategia de autenticación de Google utilizando Passport.js, que permite a los usuarios autenticarse con su cuenta de Google.
passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/secrets",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        const result = await db.query("SELECT * FROM users WHERE email = $1", [
          profile.email,
        ]);
        if (result.rows.length === 0) {
          const newUser = await db.query(
            "INSERT INTO users (email, password) VALUES ($1, $2)",
            [profile.email, "google"]
          );
          return cb(null, newUser.rows[0]);
        } else {
          return cb(null, result.rows[0]);
        }
      } catch (err) {
        return cb(err);
      }
    }
  )
);

// Configuramos las funciones de serialización y deserialización de usuarios para Passport.js, que se utilizan para almacenar y recuperar usuarios de la sesión de usuario.
passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
