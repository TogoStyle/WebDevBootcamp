import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt, { hash } from "bcrypt"
import e from "express";

const app = express();
const port = 3000;
//  Number of salt rounds for password hashing
const saltRounds = 10;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "secrets",
  password: "Darlington98",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  // Checking if the email already exists in the database
  try {
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (checkResult.rows.length > 0) {
      // Sending response if email already exists
      res.send("Email already exists. Try logging in.");
    } else {
      // Hashing the password
      bcrypt.hash(password, saltRounds, async (err, hash)=> {
        if(err){
            console.log(err);
        }else {
          // Inserting user data into the database
        const result = await db.query(
          "INSERT INTO users (email, password) VALUES ($1, $2)",
          [email, hash]
        );
        console.log(result);
        res.render("secrets.ejs");
      }
      })
      
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    // Retrieving user data from the database based on email
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      // Retrieving stored password from database
      const storedPassword = user.password;

      // Comparing provided password with stored hashed password
      bcrypt.compare(password, storedPassword, (err, result) =>{
        if(err){
          console.log(err);
        }else{
          if(result) {
            res.render("secrets.ejs");
          } else {
            res.send("Incorrect Password");
          }
        }
      })
      if (password === storedPassword) {
        res.render("secrets.ejs");
      } else {
        res.send("Incorrect Password");
      }
    } else {
      res.send("User not found");
    }
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
