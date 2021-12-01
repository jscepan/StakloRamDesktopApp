const sql = require("./db.js");

// constructor
const User = function (user) {
  this.name = user.name;
  this.isActive = user.isActive;
};

User.create = (newUser, result) => {
  sql.query(
    "INSERT INTO user SET ?",
    {
      user_name: newUser.name,
      user_isActive: newUser.isActive,
    },
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      result(null, { oid: res.insertId, ...newUser });
    }
  );
};

User.getAll = (result) => {
  let query = "SELECT * FROM user";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(
      null,
      res.map((user) => {
        return {
          oid: user.user_oid,
          name: user.user_name,
          isActive: user.user_isActive,
        };
      })
    );
  });
};

User.updateById = (id, user, result) => {
  sql.query(
    "UPDATE user SET user_name = ?, user_isActive = ? WHERE user_oid = ?",
    [user.name, user.isActive, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found User with the id
        result({ kind: "not_found" }, null);
        return;
      }

      result(null, {
        oid: id,
        ...user,
      });
    }
  );
};

module.exports = User;
