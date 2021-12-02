const sql = require("./db.js");

// constructor
const InvoiceItem = function (invoiceItem) {
  this.title = invoiceItem.title;
  this.amount = invoiceItem.amount;
  this.dimensionsWidth = invoiceItem.dimensionsWidth;
  this.dimensionsHeight = invoiceItem.dimensionsHeight;
  this.dimensionsUom = invoiceItem.dimensionsUom;
  this.dimensionsOutterWidth = invoiceItem.dimensionsOutterWidth;
  this.dimensionsOutterHeight = invoiceItem.dimensionsOutterHeight;
  this.selectedFrames = invoiceItem.selectedFrames;
  this.glass = invoiceItem.glass;
  this.mirror = invoiceItem.mirror;
  this.faceting = invoiceItem.faceting;
  this.sanding = invoiceItem.sanding;
  this.passpartuWidth = invoiceItem.passpartuWidth;
  this.passpartuWidthUom = invoiceItem.passpartuWidthUom;
  this.passpartuColor = invoiceItem.passpartuColor;
};

InvoiceItem.create = (newInvoiceItem, invoiceOid, result) => {
  sql.query(
    "INSERT INTO invoiceItem SET ?",
    {
      invoiceItem_title: newInvoiceItem.title,
      invoiceItem_amount: newInvoiceItem.amount,
      invoiceItem_dimensionsWidth: newInvoiceItem.dimensionsWidth,
      invoiceItem_dimensionsHeight: newInvoiceItem.dimensionsHeight,
      invoiceItem_dimensionsUom: newInvoiceItem.dimensionsUom,
      invoiceItem_outterWidth: newInvoiceItem.dimensionsOutterWidth,
      invoiceItem_outterHeight: newInvoiceItem.dimensionsOutterHeight,
      invoice_invoice_oid: invoiceOid,
      glass_glass_oid: newInvoiceItem.glass ? newInvoiceItem.glass.oid : null,
      mirror_mirror_oid: newInvoiceItem.mirror
        ? newInvoiceItem.mirror.oid
        : null,
      faceting_faceting_oid: newInvoiceItem.faceting
        ? newInvoiceItem.faceting.oid
        : null,
      sanding_sanding_oid: newInvoiceItem.sanding
        ? newInvoiceItem.sanding.oid
        : null,
      invoiceItem_passpartuWidth: newInvoiceItem.passpartuWidth,
      invoiceItem_passpartuWidthUom: newInvoiceItem.passpartuWidthUom,
      passpartucolor_passpartuColor_oid: newInvoiceItem.passpartuColor
        ? newInvoiceItem.passpartuColor.oid
        : null,
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
              result({ oid: res.insertId, ...newInvoiceItem });
            }
          );
        });
      } else {
        result({ oid: res.insertId, ...newInvoiceItem });
      }
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
    `SELECT * FROM invoiceitem
    LEFT JOIN glass on invoiceitem.glass_glass_oid=glass.glass_oid
    LEFT JOIN mirror on invoiceitem.mirror_mirror_oid=mirror.mirror_oid
    LEFT JOIN faceting on invoiceitem.faceting_faceting_oid=faceting.faceting_oid
    LEFT JOIN sanding on invoiceitem.sanding_sanding_oid=sanding.sanding_oid
    LEFT JOIN passpartucolor on invoiceitem.passpartucolor_passpartuColor_oid=passpartucolor.passpartuColor_oid
    LEFT JOIN passpartu on passpartucolor.passpartu_passpartu_oid=passpartu.passpartu_oid
    WHERE invoice_invoice_oid=${invoiceOid}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      let ii = res.map((i) => {
        return {
          oid: i.invoiceitem_oid,
          title: i.invoiceitem_title,
          amount: i.invoiceitem_amount,
          dimensionsWidth: i.invoiceitem_dimensionsWidth,
          dimensionsHeight: i.invoiceitem_dimensionsHeight,
          dimensionsUom: i.invoiceitem_dimensionsUom,
          dimensionsOutterWidth: i.invoiceitem_outterWidth,
          dimensionsOutterHeight: i.invoiceitem_outterHeight,
          selectedFrames: [],
          passpartuWidth: i.invoiceItem_passpartuWidth,
          passpartuWidthUom: i.invoiceItem_passpartuWidthUom,
          passpartuColor: i.passpartucolor_passpartuColor_oid
            ? {
                oid: i.passpartuColor_oid,
                name: i.passpartuColor_name,
                passpartu: {
                  oid: i.passpartu_oid,
                  name: i.passpartu_name,
                  uom: i.passpartu_uom,
                  pricePerUom: i.passpartu_pricePerUom,
                  cashRegisterNumber: i.passpartu_cashRegisterNumber,
                },
              }
            : {},
          glass: i.glass_oid
            ? {
                oid: i.glass_oid,
                name: i.glass_name,
                uom: i.glass_uom,
                pricePerUom: i.glass_pricePerUom,
                cashRegisterNumber: i.glass_cashRegisterNumber,
              }
            : {},
          mirror: i.mirror_oid
            ? {
                oid: i.mirror_oid,
                name: i.mirror_name,
                uom: i.mirror_uom,
                pricePerUom: i.mirror_pricePerUom,
                cashRegisterNumber: i.mirror_cashRegisterNumber,
              }
            : {},
          faceting: i.faceting_oid
            ? {
                oid: i.faceting_oid,
                name: i.faceting_name,
                uom: i.faceting_uom,
                pricePerUom: i.faceting_pricePerUom,
                cashRegisterNumber: i.faceting_cashRegisterNumber,
              }
            : {},
          sanding: i.sanding_oid
            ? {
                oid: i.sanding_oid,
                name: i.sanding_name,
                uom: i.sanding_uom,
                pricePerUom: i.sanding_pricePerUom,
                cashRegisterNumber: i.sanding_cashRegisterNumber,
              }
            : {},
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
