const sql = require("./db.js");

// constructor
const Invoice = function (invoice) {
  this.invoice_createDate = invoice.invoice_createDate;
  this.invoice_amount = invoice.invoice_amount;
  this.invoice_advancePayment = invoice.invoice_advancePayment;
  this.invoice_buyerName = invoice.invoice_buyerName;
};

Invoice.create = (newInvoice, result) => {
  sql.query(
    "INSERT INTO invoice SET ?",
    newInvoice.map((invoice) => {
      return {
        invoice_createDate: invoice.createDate,
        invoice_amount: invoice.amount,
        invoice_advancePayment: invoice.advancePayment,
        invoice_buyerName: invoice.buyerName,
      };
    }),
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      result(null, {
        oid: res.insertId,
        ...newInvoice.map((invoice) => {
          return {
            createDate: invoice.invoice_createDate,
            amount: invoice.invoice_amount,
            advancePayment: invoice.invoice_advancePayment,
            buyerName: invoice.invoice_buyerName,
          };
        }),
      });
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
      result(
        null,
        res[0].map((invoice) => {
          return {
            oid: invoice.invoice_oid,
            createDate: invoice.invoice_createDate,
            amount: invoice.invoice_amount,
            advancePayment: invoice.invoice_advancePayment,
            buyerName: invoice.invoice_buyerName,
          };
        })
      );
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
    [invoice.createDate, invoice.amount, invoice.advancePayment, id],
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
