const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/invoices") {
    res.write(getAllInvoices());
    res.end();
  }
});

server.listen(44563);

console.log("Listening on port 44563....");

function getAllInvoices() {
  let invoices = [];
  console.log("Popuni sve fakture iz baze");
  const mysql = require("../database/mysql");
  console.log("111");
  mysql.con.connect((err) => {
    if (err) {
      throw err;
    }
    console.log("222");
    con.query("SELECT * FROM radnja.invoice", function (error, result) {
      if (error) {
        throw err;
      }
      console.log("Result: ");
      console.log(result);
      invoices = result;
      console.log("kraj");
    });
  });
  console.log("return");
  console.log(invoices);
  console.log("--------------");
  return invoices;
}
