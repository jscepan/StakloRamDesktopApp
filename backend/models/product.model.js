const sql = require("./db.js");

// constructor
const Product = function (product) {
  this.name = product.name;
  this.uom = product.uom;
  this.pricePerUom = product.pricePerUom;
  this.cashRegisterNumber = product.cashRegisterNumber;
};

Product.create = (domain, newProduct, result) => {
  sql.query(
    `INSERT INTO ${domain} SET ?`,
    newProduct.map((product) => {
      return {
        [`${domain}_name`]: product.name,
        [`${domain}_uom`]: product.uom,
        [`${domain}_pricePerUom`]: product.pricePerUom,
        [`${domain}_cashRegisterNumber`]: product.cashRegisterNumber,
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
        ...newProduct.map((product) => {
          return {
            name: product[`${domain}_name`],
            uom: product[`${domain}_uom`],
            pricePerUom: product[`${domain}_pricePerUom`],
            cashRegisterNumber: product[`${domain}_cashRegisterNumber`],
          };
        }),
      });
    }
  );
};

Product.findById = (domain, id, result) => {
  sql.query(`SELECT * FROM ${domain} WHERE oid = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      result(
        null,
        res[0].map((product) => {
          return {
            oid: product[`${domain}_oid`],
            name: product[`${domain}_name`],
            uom: product[`${domain}_uom`],
            pricePerUom: product[`${domain}_pricePerUom`],
            cashRegisterNumber: product[`${domain}_cashRegisterNumber`],
          };
        })
      );
      return;
    }

    // not found Product with the id
    result({ kind: "not_found" }, null);
  });
};

Product.getAll = (domain, result) => {
  let query = `SELECT * FROM ${domain}`;

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(
      null,
      res.map((product) => {
        return {
          oid: product[`${domain}_oid`],
          name: product[`${domain}_name`],
          uom: product[`${domain}_uom`],
          pricePerUom: product[`${domain}_pricePerUom`],
          cashRegisterNumber: product[`${domain}_cashRegisterNumber`],
        };
      })
    );
  });
};

Product.updateById = (domain, id, product, result) => {
  const xxx = `UPDATE ${domain} SET ${domain}_name = ?, ${domain}_uom = ?, ${domain}_pricePerUom = ?, ${domain}_cashRegisterNumber = ? WHERE ${domain}_oid = ?`;
  console.log("xxx");
  console.log(xxx);
  sql.query(
    xxx,
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
      result(null, {
        oid: id,
        ...product,
      });
    }
  );
};

Product.remove = (domain, id, result) => {
  sql.query(`DELETE FROM ${domain} WHERE ${domain}_oid = ?`, id, (err, res) => {
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

    result(
      null,
      res.map((p) => {
        return {
          oid: p[`${domain}_oid`],
          name: p[`${domain}_name`],
          uom: p[`${domain}_uom`],
          pricePerUom: p[`${domain}_pricePerUom`],
          cashRegisterNumber: p[`${domain}_cashRegisterNumber`],
        };
      })
    );
  });
};

module.exports = Product;
