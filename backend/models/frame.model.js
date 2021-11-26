const sql = require("./db.js");

// constructor
const Frame = function (frame) {
  this.name = frame.name;
  this.uom = frame.uom;
  this.pricePerUom = frame.pricePerUom;
  this.cashRegisterNumber = frame.cashRegisterNumber;
  this.code = frame.code;
  this.frameWidthMM = frame.frameWidthMM;
};

Frame.create = (newFrame, result) => {
  sql.query(
    "INSERT INTO frame SET ?",
    {
      frame_name: newFrame.name,
      frame_uom: newFrame.uom,
      frame_pricePerUom: newFrame.pricePerUom,
      frame_cashRegisterNumber: newFrame.cashRegisterNumber,
      frame_code: newFrame.code,
      frame_frameWidthMM: newFrame.frameWidthMM,
    },
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      result(null, { oid: res.insertId, ...newFrame });
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
            frameWidthMM: frame.frame_frameWidthMM,
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
          frameWidthMM: frame.frame_frameWidthMM,
        };
      })
    );
  });
};

Frame.updateById = (id, frame, result) => {
  sql.query(
    "UPDATE frame SET frame_name = ?, frame_uom = ?, frame_pricePerUom = ?, frame_cashRegisterNumber = ?, frame_code = ?, frame_frameWidthMM = ? WHERE frame_oid = ?",
    [
      frame.name,
      frame.uom,
      frame.pricePerUom,
      frame.cashRegisterNumber,
      frame.code,
      frame.frameWidthMM,
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
          frameWidthMM: frame.frame_frameWidthMM,
        };
      })
    );
  });
};

module.exports = Frame;
