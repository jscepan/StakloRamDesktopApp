const fs = require("fs");

// Find a single Settings with a id
exports.find = (req, res) => {};

// Update a Settings identified by the id in the request
exports.update = (req, res) => {};

const Setting = function (settings) {
  this.thousandsNumberSign = settings.thousandsNumberSign;
  this.decimalNumberSign = settings.decimalNumberSign;
  this.dateFormat = settings.dateFormat;
  this.currencyFormat = settings.currencyFormat;
  this.currencyDisplayValue = settings.currencyDisplayValue;
  this.language = settings.language;
  this.copies = settings.copies;
  this.footer = settings.footer;
  this.header = settings.header;
  this.printer = settings.printer;
};

exports.find = (req, res) => {
  res.send(new Setting(JSON.parse(fs.readFileSync("settings.json"))));
};

exports.update = (req, res) => {
  fs.writeFileSync("settings.json", JSON.stringify(req.body));
  res.send(req.body);
};
