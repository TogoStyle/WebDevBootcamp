const fs = require("fs");

fs.writeFile("message.txt", "Hello Toni!", function (err) {
  if (err) throw err;
  console.log('Saved!');
});

fs.readFile("message.txt", 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});
