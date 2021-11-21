const mysql = require("mysql2");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "user",
});

// con.connect((err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Connected!");

//     var sql =
//       "INSERT INTO radnja.invoice (invoiceCreateDate, invoiceAmount, invoiceAdvancePayment, invoiceBuyerName) VALUES ('2021-11-21 00:00:00', 666, 555,'Company Inc')";
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log("1 record inserted");
//     });

//     con.query("SELECT * FROM radnja.invoice", function (err, result) {
//       if (err) {
//         throw err;
//       }
//       console.log("Result: ");
//       console.log(result);
//       console.log("kraj");
//     });
//   }
//   con.end(() => console.log("connection closed"));
// });

exports.con = con;
