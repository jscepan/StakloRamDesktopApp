const sql = require("./db.js");
const invoiceItemService = require("./invoice-item.model");

// constructor
const Invoice = function (invoice) {
  this.createDate = invoice.createDate;
  this.amount = invoice.amount;
  this.advancePayment = invoice.advancePayment;
  this.buyerName = invoice.buyerName;
  this.invoiceItems = invoice.invoiceItems;
};

Invoice.create = (newInvoice, result) => {
  sql.query(
    "INSERT INTO invoice SET ?",
    {
      invoice_createDate: new Date(newInvoice.createDate)
        .toISOString()
        .slice(0, 19)
        .replace("T", " "),
      invoice_amount: newInvoice.amount,
      invoice_advancePayment: newInvoice.advancePayment,
      invoice_buyerName: newInvoice.buyerName,
    },
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (newInvoice.invoiceItems && newInvoice.invoiceItems.length > 0) {
        newInvoice.invoiceItems.forEach((item) => {
          invoiceItemService.create(item, res.insertId, (result) => {
            console.log("kreiran invoice item sa oid: ");
            console.log(result.oid);
          });
        });
        console.log("vracam ceo invoice nazad");
        result(null, { oid: res.insertId, ...newInvoice });
      } else {
        console.log("else - vracam ceo invoice nazad");
        result(null, { oid: res.insertId, ...newInvoice });
      }
    }
  );
};

Invoice.findById = (id, result) => {
  sql.query(`SELECT * FROM invoice WHERE invoice_oid = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      invoiceItemService.getAll(id, (items) => {
        result(
          null,
          res.map((invoice) => {
            return {
              oid: invoice.invoice_oid,
              createDate: invoice.invoice_createDate,
              amount: invoice.invoice_amount,
              advancePayment: invoice.invoice_advancePayment,
              buyerName: invoice.invoice_buyerName,
              invoiceItems: items,
            };
          })[0]
        );
      });

      return;
    }

    // not found Invoice with the id
    result({ kind: "not_found" }, null);
  });
};

Invoice.getAll = (result) => {
  let query = "SELECT * FROM invoice";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(
      null,
      res.map((invoice) => {
        return {
          oid: invoice.invoice_oid,
          createDate: invoice.invoice_createDate,
          amount: invoice.invoice_amount,
          advancePayment: invoice.invoice_advancePayment,
          buyerName: invoice.invoice_buyerName,
        };
      })
    );
  });
};

Invoice.updateById = (id, invoice, result) => {
  sql.query(
    "UPDATE invoice SET invoice_createDate = ?, invoice_amount = ?, invoice_advancePayment = ?, invoice_buyerName = ? WHERE invoice_oid = ?",
    [
      new Date(newInvoice.createDate)
        .toISOString()
        .slice(0, 19)
        .replace("T", " "),
      ,
      invoice.amount,
      invoice.advancePayment,
      id,
    ],
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

      result(null, {
        oid: id,
        ...invoice,
      });
    }
  );
};

Invoice.remove = (id, result) => {
  sql.query("DELETE FROM invoice WHERE invoice_oid = ?", id, (err, res) => {
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

    result(
      null,
      res.map((invoice) => {
        return {
          createDate: invoice.invoice_createDate,
          amount: invoice.invoice_amount,
          advancePayment: invoice.invoice_advancePayment,
          buyerName: invoice.invoice_buyerName,
        };
      })
    );
  });
};

module.exports = Invoice;
