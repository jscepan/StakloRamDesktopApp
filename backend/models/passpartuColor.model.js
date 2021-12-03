const sql = require("./db.js");

// constructor
const PasspartuColor = function (passpartuColor) {
  this.name = passpartuColor.name;
  this.isActive = passpartuColor.isActive;
  this.passpartu = passpartuColor.passpartu;
  // this.passpartu.name = passpartuColor.passpartu.name;
  // this.passpartu.uom = passpartuColor.passpartu.uom;
  // this.passpartu.pricePerUom = passpartuColor.passpartu.pricePerUom;
  // this.passpartu.cashRegisterNumber =
  //   passpartuColor.passpartu.cashRegisterNumber;
  // this.passpartu.isActive = passpartuColor.passpartu.isActive;
};

PasspartuColor.create = (newPasspartuColor, result) => {
  sql.query(
    `INSERT INTO passpartuColor SET ?`,
    {
      passpartuColor_oid: newPasspartuColor.oid,
      passpartuColor_name: newPasspartuColor.name,
      passpartuColor_isActive: true,
      passpartu_passpartu_oid: newPasspartuColor.passpartu.oid,
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
            name: pc.name,
            passpartu: newPasspartuColor.passpartu,
          };
        }),
      });
    }
  );
};

PasspartuColor.findById = (id, result) => {
  sql.query(
    `SELECT * FROM passpartuColor JOIN passpartu on passpartuColor.passpartu_passpartu_oid=passpartu.passpartu_oid WHERE passpartuColor_oid = ${id}`,
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
              name: pc.name,
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
  let query = `SELECT * FROM passpartuColor JOIN passpartu on passpartuColor.passpartu_passpartu_oid=passpartu.passpartu_oid WHERE passpartucolor_isActive=true`;

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
          isActive: pc.passpartucolor_isActive,
          passpartu: {
            oid: pc.passpartu_oid,
            name: pc.passpartu_name,
            uom: pc.passpartu_uom,
            pricePerUom: pc.passpartu_pricePerUom,
            cashRegisterNumber: pc.passpartu_cashRegisterNumber,
            isActive: pc.passpartu_isActive,
          },
        };
      })
    );
  });
};

PasspartuColor.updateById = (id, passpartuColor, result) => {
  console.log("update");
  console.log(id);
  console.log(passpartuColor);
  sql.query(
    `UPDATE passpartuColor SET passpartuColor_name = ?, passpartu_passpartu_oid = ?, passpartucolor_isActive = ? WHERE passpartuColor_oid = ?`,
    [
      passpartuColor.name,
      passpartuColor.passpartu.oid,
      passpartuColor.isActive,
      id,
    ],
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
