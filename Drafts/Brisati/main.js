const { app, BrowserWindow } = require("electron");

let win;

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1200,
    height: 1000,
    // webPreferences: {
    //   preload: path.join(__dirname, 'preload.js')
    // }
  });
  win.setMenu(null);
  win.maximize();

  win.loadURL(`file://${__dirname}/dist/radnja/index.html`);

  // Uncomment below to open the DevTools
  win.webContents.openDevTools();

  win.on("closed", () => {
    win = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  if (win === null) {
    createWindow();
  }
});

const serve = require("./be.js");

// ipcMain.on("xxxx", (data) => {
//   console.log("data");
//   console.log(data);
// });

// const mysql = require("mysql2");

// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "user",
// });

// con.connect(function (err) {
//   console.log("KRENI KONEKCIJU");
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
