module.exports = (app) => {
  const users = require("../controllers/product.controller.js");

  var router = require("express").Router();

  // Create a new User
  router.post("/:domain", users.create);

  // Retrieve all Users
  router.get("/:domain", users.findAll);

  // Update a User with id
  router.put("/:domain/:id", users.update);

  app.use("/users", router);
};
