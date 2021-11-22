const sql = require("./db.js");

// constructor
const Product = function (product) {
  this.name = product.name;
  this.uom = product.uom;
  this.pricePerUom = product.pricePerUom;
  this.cashRegisterNumber = product.cashRegisterNumber;
};

Product.create = (domain, newProduct, result) => {
  sql.query(`INSERT INTO ${domain} SET ?`, newProduct, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    result(null, { oid: res.insertId, ...newProduct });
  });
};

Product.findById = (domain, id, result) => {
  sql.query(
    `SELECT * FROM ${domain} WHERE ${domain}_id = ${id}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        result(null, res[0]);
        return;
      }

      // not found Product with the id
      result({ kind: "not_found" }, null);
    }
  );
};

Product.getAll = (domain, result) => {
  let query = `SELECT * FROM radnja.${domain}`;

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    result(null, res);
  });
};

Product.updateById = (domain, id, product, result) => {
  sql.query(
    `UPDATE ${domain} SET name = ?, uom = ?, pricePerUom = ?, cashRegisterNumber = ? WHERE ${domain}_id = ?`,
    [
      product.name,
      product.uom,
      product.pricePerUom,
      product.cashRegisterNumber,
      id,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Product with the id
        result({ kind: "not_found" }, null);
        return;
      }

      result(null, { id: id, ...product });
    }
  );
};

Product.remove = (domain, id, result) => {
  sql.query(`DELETE FROM ${domain} WHERE ${domain}_id = ?`, id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Product with the id
      result({ kind: "not_found" }, null);
      return;
    }

    result(null, res);
  });
};

module.exports = Product;
