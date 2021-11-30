module.exports = (app) => {
  const invoiceItems = require("../controllers/invoice-item.controller");

  var router = require("express").Router();

  // Retrieve a single InvoiceItem with id
  router.get("/:id", invoiceItems.findOne);

  // Update a InvoiceItem with id
  router.put("/:id", invoiceItems.update);

  // Delete a InvoiceItem with id
  router.delete("/:id", invoiceItems.delete);

  app.use("/invoiceItems", router);
};
