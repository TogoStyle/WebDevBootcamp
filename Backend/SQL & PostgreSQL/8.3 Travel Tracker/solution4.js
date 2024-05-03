import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

// PostgreSQL
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "123456",
  port: 5432,
});
db.connect();

// This sets up middleware to parse URL-encoded bodies.
app.use(bodyParser.urlencoded({ extended: true }));
// This serves static files from the "public" directory.
app.use(express.static("public"));
// Defines an asynchronous function named "checkVisited" to retrieve visited countries from the database.
async function checkVisisted() {
  // Executes a SQL query to select country codes from the "visited_countries" table.
  const result = await db.query("SELECT country_code FROM visited_countries");
  let countries = [];
  // iterates over the rows returned from the query and extracts country codes, adding them to the "countries" array.
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}
// GET home page
app.get("/", async (req, res) => {
  const countries = await checkVisisted();
  // renders the "index.ejs" template, passing the list of countries and the total count to it.  
  res.render("index.ejs", { countries: countries, total: countries.length });
});

//INSERT new country
app.post("/add", async (req, res) => {
  const input = req.body["country"];

  try {
      // executes a SQL query to find the country code based on a case-insensitive partial match of the country name.
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    // It extracts the country code from the query result.
    const data = result.rows[0];
    const countryCode = data.country_code;
    try {
      // This inserts the country code into the "visited_countries" table
      await db.query(
        "INSERT INTO visited_countries (country_code) VALUES ($1)",
        [countryCode]
      );
      // If successful, it redirects the user back to the home page.
      res.redirect("/");
    } catch (err) {
      console.log(err);
      const countries = await checkVisisted();
      // The home page is rendered again with an error message indicating that the country has already been added
      res.render("index.ejs", {
        countries: countries,
        total: countries.length,
        error: "Country has already been added, try again.",
      });
    }
  } catch (err) {
    console.log(err);
    const countries = await checkVisisted();
    res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      error: "Country name does not exist, try again.",
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
