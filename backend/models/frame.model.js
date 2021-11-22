const sql = require("./db.js");

// constructor
const Frame = function (frame) {
  this.frame_name = frame.frame_name;
  this.frame_uom = frame.frame_uom;
  this.frame_pricePerUom = frame.frame_pricePerUom;
  this.frame_cashRegisterNumber = frame.frame_cashRegisterNumber;
  this.frame_code = frame.frame_code;
  this.frame_widthMM = frame.frame_widthMM;
};

Frame.create = (newFrame, result) => {
  sql.query(
    "INSERT INTO frame SET ?",
    newFrame.map((frame) => {
      return {
        frame_name: frame.name,
        frame_uom: frame.uom,
        frame_pricePerUom: frame.pricePerUom,
        frame_cashRegisterNumber: frame.cashRegisterNumber,
        frame_code: frame.code,
        frame_widthMM: frame.widthMM,
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
        ...newFrame.map((frame) => {
          return {
            name: frame.frame_name,
            uom: frame.frame_uom,
            pricePerUom: frame.frame_pricePerUom,
            cashRegisterNumber: frame.frame_cashRegisterNumber,
            code: frame.frame_code,
            widthMM: frame.frame_widthMM,
          };
        }),
      });
    }
  );
};

Frame.findById = (id, result) => {
  sql.query(`SELECT * FROM frame WHERE frame_oid = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      result(
        null,
        res[0].map((frame) => {
          return {
            oid: frame.frame_oid,
            name: frame.frame_name,
            uom: frame.frame_uom,
            pricePerUom: frame.frame_pricePerUom,
            cashRegisterNumber: frame.frame_cashRegisterNumber,
            code: frame.frame_code,
            widthMM: frame.frame_widthMM,
          };
        })
      );
      return;
    }

    // not found Frame with the id
    result({ kind: "not_found" }, null);
  });
};

Frame.getAll = (result) => {
  let query = "SELECT * FROM frame";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(
      null,
      res.map((frame) => {
        return {
          oid: frame.frame_oid,
          name: frame.frame_name,
          uom: frame.frame_uom,
          pricePerUom: frame.frame_pricePerUom,
          cashRegisterNumber: frame.frame_cashRegisterNumber,
          code: frame.frame_code,
          widthMM: frame.frame_widthMM,
        };
      })
    );
  });
};

Frame.updateById = (id, frame, result) => {
  sql.query(
    "UPDATE frame SET frame_name = ?, frame_uom = ?, frame_pricePerUom = ?, frame_cashRegisterNumber = ?, frame_code = ?, frame_widthMM = ? WHERE frame_oid = ?",
    [
      frame.name,
      frame.uom,
      frame.pricePerUom,
      frame.cashRegisterNumber,
      frame.code,
      frame.widthMM,
      id,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Frame with the id
        result({ kind: "not_found" }, null);
        return;
      }

      result(null, {
        oid: id,
        ...frame,
      });
    }
  );
};

Frame.remove = (id, result) => {
  sql.query("DELETE FROM frame WHERE frame_oid = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Frame with the id
      result({ kind: "not_found" }, null);
      return;
    }

    result(
      null,
      res.map((frame) => {
        return {
          name: frame.frame_name,
          uom: frame.frame_uom,
          pricePerUom: frame.frame_pricePerUom,
          cashRegisterNumber: frame.frame_cashRegisterNumber,
          code: frame.frame_code,
          widthMM: frame.frame_widthMM,
        };
      })
    );
  });
};

module.exports = Frame;
