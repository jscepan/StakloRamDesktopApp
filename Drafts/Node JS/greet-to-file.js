const fs = require("fs");

fs.writeFile("greeting.txt", "Hello world!", (err) => {
  if (err) console.log(err);
});
