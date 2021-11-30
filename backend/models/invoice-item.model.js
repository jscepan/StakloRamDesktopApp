const sql = require("./db.js");

// constructor
const InvoiceItem = function (invoiceItem) {
  this.count = invoiceItem.count;
  this.title = invoiceItem.title;
  this.amount = invoiceItem.amount;
  this.dimensionsWidth = invoiceItem.dimensionsWidth;
  this.dimensionsHeight = invoiceItem.dimensionsHeight;
  this.dimensionsUom = invoiceItem.dimensionsUom;
  this.dimensionsOutterWidth = invoiceItem.dimensionsOutterWidth;
  this.dimensionsOutterHeight = invoiceItem.dimensionsOutterHeight;
  this.selectedFrames = invoiceItem.selectedFrames;
  this.glass = invoiceItem.glass;
};

InvoiceItem.create = (newInvoiceItem, invoiceOid, result) => {
  sql.query(
    "INSERT INTO invoiceItem SET ?",
    {
      invoiceItem_count: newInvoiceItem.count,
      invoiceItem_title: newInvoiceItem.title,
      invoiceItem_amount: newInvoiceItem.amount,
      invoiceItem_dimensionsWidth: newInvoiceItem.dimensionsWidth,
      invoiceItem_dimensionsHeight: newInvoiceItem.dimensionsHeight,
      invoiceItem_dimensionsUom: newInvoiceItem.dimensionsUom,
      invoiceItem_outterWidth: newInvoiceItem.dimensionsOutterWidth,
      invoiceItem_outterHeight: newInvoiceItem.dimensionsOutterHeight,
      invoice_invoice_oid: invoiceOid,
    },
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (
        newInvoiceItem.selectedFrames &&
        newInvoiceItem.selectedFrames.length > 0
      ) {
        newInvoiceItem.selectedFrames.forEach((f) => {
          sql.query(
            `INSERT INTO invoiceitem_has_frame SET invoiceItem_invoiceItem_oid=${res.insertId}, frame_frame_oid=${f.frame.oid}, colorCode=${f.colorCode}`,
            (errFrame) => {
              if (errFrame) {
                console.log("error: ", errFrame);
                return;
              }
            }
          );
        });
      }

      if (newInvoiceItem.glass) {
        sql.query(
          `INSERT INTO invoiceitem_has_glass SET invoiceItem_invoiceItem_oid=${res.insertId}, glass_glass_oid=${newInvoiceItem.glass.oid}`,
          (errGlass) => {
            if (errGlass) {
              console.log("error: ", errGlass);
              return;
            }
          }
        );
      }

      if (newInvoiceItem.mirror) {
        sql.query(
          `INSERT INTO invoiceitem_has_mirror SET invoiceItem_invoiceItem_oid=${res.insertId}, mirror_mirror_oid=${newInvoiceItem.mirror.oid}`,
          (errMirror) => {
            if (errMirror) {
              console.log("error: ", errMirror);
              return;
            }
          }
        );
      }

      if (newInvoiceItem.faceting) {
        sql.query(
          `INSERT INTO invoiceitem_has_faceting SET invoiceItem_invoiceItem_oid=${res.insertId}, faceting_faceting_oid=${newInvoiceItem.faceting.oid}`,
          (errFaceting) => {
            if (errFaceting) {
              console.log("error: ", errFaceting);
              return;
            }
          }
        );
      }

      if (newInvoiceItem.sanding) {
        sql.query(
          `INSERT INTO invoiceitem_has_sanding SET invoiceItem_invoiceItem_oid=${res.insertId}, sanding_sanding_oid=${newInvoiceItem.sanding.oid}`,
          (errSanding) => {
            if (errSanding) {
              console.log("error: ", errSanding);
              return;
            }
          }
        );
      }

      if (newInvoiceItem.passpartuColor) {
        sql.query(
          `INSERT INTO invoiceitem_has_passpartucolor SET invoiceItem_oid=${res.insertId}, passpartuColor_oid=${newInvoiceItem.passpartuColor.value.oid}, invoiceItem_width=${newInvoiceItem.passpartuColor.width} , invoiceItem_widthUom='${newInvoiceItem.passpartuColor.widthUom}'`,
          (errSanding) => {
            if (errSanding) {
              console.log("error: ", errSanding);
              return;
            }
          }
        );
      }
      result({ oid: res.insertId, ...newInvoiceItem });
    }
  );
};

InvoiceItem.findById = (id, result) => {
  sql.query(
    `SELECT * FROM invoiceItem WHERE invoiceItem_oid = ${id}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        result(
          null,
          res.map((invoiceItem) => {
            return {
              oid: invoiceItem.invoiceItem_oid,
              createDate: invoiceItem.invoiceItem_createDate,
              amount: invoiceItem.invoiceItem_amount,
              advancePayment: invoiceItem.invoiceItem_advancePayment,
              buyerName: invoiceItem.invoiceItem_buyerName,
            };
          })[0]
        );
        return;
      }

      // not found InvoiceItem with the id
      result({ kind: "not_found" }, null);
    }
  );
};

InvoiceItem.getAll = (invoiceOid, result) => {
  sql.query(
    `SELECT * FROM invoiceitem WHERE invoice_invoice_oid=${invoiceOid}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      let ii = res.map((i) => {
        return {
          oid: i.invoiceitem_oid,
          count: i.invoiceitem_count,
          title: i.invoiceitem_title,
          amount: i.invoiceitem_amount,
          dimensionsWidth: i.invoiceitem_dimensionsWidth,
          dimensionsHeight: i.invoiceitem_dimensionsHeight,
          dimensionsUom: i.invoiceitem_dimensionsUom,
          dimensionsOutterWidth: i.invoiceitem_outterWidth,
          dimensionsOutterHeight: i.invoiceitem_outterHeight,
          selectedFrames: [],
        };
      });

      if (ii.length) {
        let condition = "";
        for (i = 0; i < ii.length; i++) {
          i === 0
            ? (condition += ii[i].oid)
            : (condition +=
                " OR invoiceitem_has_frame.invoiceItem_invoiceItem_oid=" +
                ii[i].oid);
        }
        console.log("condition");
        console.log(condition);
        sql.query(
          `SELECT * FROM invoiceitem_has_frame JOIN frame on invoiceitem_has_frame.frame_frame_oid=frame.frame_oid WHERE invoiceitem_has_frame.invoiceItem_invoiceItem_oid=${condition}`,
          (errFrame, resFrame) => {
            ii.forEach((item) => {
              resFrame.forEach((frame) => {
                if (item.oid === frame.invoiceItem_invoiceItem_oid) {
                  item.selectedFrames.push({
                    oid: frame.frame_frame_oid,
                    name: frame.frame_name,
                    uom: frame.frame_uom,
                    pricePerUom: frame.frame_pricePerUom,
                    cashRegisterNumber: frame.frame_cashRegisterNumber,
                    code: frame.frame_code,
                    frameWidthMM: frame.frame_frameWidthMM,
                  });
                }
              });
            });
            result(ii);
          }
        );
      } else {
        result(ii);
      }
    }
  );
};

InvoiceItem.updateById = (id, invoiceItem, result) => {
  sql.query(
    "UPDATE invoiceItem SET invoiceItem_createDate = ?, invoiceItem_amount = ?, invoiceItem_advancePayment = ?, invoiceItem_buyerName = ? WHERE invoiceItem_oid = ?",
    [
      new Date(newInvoiceItem.createDate)
        .toISOString()
        .slice(0, 19)
        .replace("T", " "),
      ,
      invoiceItem.amount,
      invoiceItem.advancePayment,
      id,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found InvoiceItem with the id
        result({ kind: "not_found" }, null);
        return;
      }

      result(null, {
        oid: id,
        ...invoiceItem,
      });
    }
  );
};

InvoiceItem.remove = (id, result) => {
  sql.query(
    "DELETE FROM invoiceItem WHERE invoiceItem_oid = ?",
    id,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found InvoiceItem with the id
        result({ kind: "not_found" }, null);
        return;
      }

      result(
        null,
        res.map((invoiceItem) => {
          return {
            createDate: invoiceItem.invoiceItem_createDate,
            amount: invoiceItem.invoiceItem_amount,
            advancePayment: invoiceItem.invoiceItem_advancePayment,
            buyerName: invoiceItem.invoiceItem_buyerName,
          };
        })
      );
    }
  );
};

module.exports = InvoiceItem;
