import superheroes from "superheroes";
const superHeroe = superheroes.random();

console.log("I am " + superHeroe);

// const fs = require("fs");

// fs.writeFile("message.txt", "" + superHeroe, function (err) {
//   if (err) throw err;
//   console.log('Saved!');
// });

// fs.readFile("message.txt", 'utf8', (err, data) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log(data);
// });
