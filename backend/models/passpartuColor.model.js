const sql = require("./db.js");

// constructor
const PasspartuColor = function (passpartuColor) {
  this.passpartuColor_name = passpartuColor.passpartuColor_name;
  this.passpartu.oid = passpartuColor.passpartu_oid;
  this.passpartu.name = passpartuColor.passpartu_name;
  this.passpartu.uom = passpartuColor.passpartu_uom;
  this.passpartu.pricePerUom = passpartuColor.passpartu_pricePerUom;
  this.passpartu.cashRegisterNumber =
    passpartuColor.passpartu_cashRegisterNumber;
};

PasspartuColor.create = (newPasspartuColor, result) => {
  sql.query(
    `INSERT INTO passpartuColor SET ?`,
    {
      passpartuColor_oid: newPasspartuColor.oid,
      passpartuColor_name: newPasspartuColor.name,
      passpartu_oid: newPasspartuColor.passpartu.oid,
    },
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      result(null, {
        oid: res.insertId,
        ...newPasspartuColor.map((pc) => {
          return {
            name: pc.passpartuColor_name,
            passpartu: newPasspartuColor.passpartu,
          };
        }),
      });
    }
  );
};

PasspartuColor.findById = (id, result) => {
  sql.query(
    `SELECT * FROM passpartuColor JOIN passpartu on passpartuColor.passpartu_oid=passpartu.passpartu_oid WHERE passpartuColor_oid = ${id}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        result(
          null,
          res[0].map((pc) => {
            return {
              oid: pc.passpartuColor_oid,
              name: pc.passpartuColor_name,
              passpartu: {
                oid: pc.passpartu_oid,
                name: pc.passpartu_name,
                uom: pc.passpartu_uom,
                pricePerUom: pc.passpartu_pricePerUom,
                cashRegisterNumber: pc.passpartu_cashRegisterNumber,
              },
            };
          })
        );
        return;
      }

      // not found PasspartuColor with the id
      result({ kind: "not_found" }, null);
    }
  );
};

PasspartuColor.getAll = (result) => {
  let query = `SELECT * FROM passpartuColor JOIN passpartu on passpartuColor.passpartu_oid=passpartu.passpartu_oid`;

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(
      null,
      res.map((pc) => {
        return {
          oid: pc.passpartuColor_oid,
          name: pc.passpartuColor_name,
          passpartu: {
            oid: pc.passpartu_oid,
            name: pc.passpartu_name,
            uom: pc.passpartu_uom,
            pricePerUom: pc.passpartu_pricePerUom,
            cashRegisterNumber: pc.passpartu_cashRegisterNumber,
          },
        };
      })
    );
  });
};

PasspartuColor.updateById = (id, passpartuColor, result) => {
  sql.query(
    `UPDATE passpartuColor SET passpartuColor_name = ?, passpartu_oid = ? WHERE passpartuColor_oid = ?`,
    [passpartuColor.name, passpartuColor.passpartu.oid, passpartuColor.oid],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found PasspartuColor with the id
        result({ kind: "not_found" }, null);
        return;
      }

      result(null, {
        oid: id,
        ...passpartuColor,
      });
    }
  );
};

PasspartuColor.remove = (id, result) => {
  sql.query(
    `DELETE FROM passpartuColor WHERE passpartuColor_oid = ?`,
    id,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found PasspartuColor with the id
        result({ kind: "not_found" }, null);
        return;
      }

      result(null, res);
    }
  );
};

module.exports = PasspartuColor;
