const sql = require("./db.js");

// constructor
const Invoice = function (invoice) {
  this.createDate = invoice.createDate;
  this.amount = invoice.amount;
  this.advancePayment = invoice.advancePayment;
  this.buyerName = invoice.buyerName;
};

Invoice.create = (newInvoice, result) => {
  sql.query("INSERT INTO invoice SET ?", newInvoice, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created invoice: ", { id: res.insertId, ...newInvoice });
    result(null, { oid: res.insertId, ...newInvoice });
  });
};

Invoice.findById = (id, result) => {
  sql.query(`SELECT * FROM invoice WHERE invoice_id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found invoice: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Invoice with the id
    result({ kind: "not_found" }, null);
  });
};

Invoice.getAll = (result) => {
  let query = "SELECT * FROM radnja.invoice";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("invoices: ", res);
    result(null, res);
  });
};

Invoice.updateById = (id, invoice, result) => {
  sql.query(
    "UPDATE invoice SET invoiceCreateDate = ?, invoiceAmount = ?, invoiceAdvancePayment = ?, invoiceBuyerName = ? WHERE id = ?",
    [invoice.createDate, invoice.amount, invoice.advancePayment, oid],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Invoice with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated invoice: ", { id: id, ...invoice });
      result(null, { id: id, ...invoice });
    }
  );
};

Invoice.remove = (id, result) => {
  sql.query("DELETE FROM invoices WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Invoice with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted invoice with id: ", id);
    result(null, res);
  });
};

module.exports = Invoice;
