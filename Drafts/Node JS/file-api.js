let fs = require("fs");

fs.writeFileSync("out.txt", "This should get written to file");
console.log("this should print after previous line");

// fs.writeFile("out.txt", "This should be written asynchronously", (err) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log("After file written");
// });
// console.log("this should print after previous line");
