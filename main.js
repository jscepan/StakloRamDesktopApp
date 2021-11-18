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
