var operatorsObj = require("./add.js");

function greet(name) {
  console.log("Hello there " + name + "!");
}

greet("Scepan");
console.log(operatorsObj.add(10, 20));
console.log(operatorsObj.subtract(10, 20));
