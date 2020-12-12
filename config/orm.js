var connection = require("./connection");

var orm = {
  selectAll: function (table, cb) {
    connection.query("SELECT * FROM " + table) + ";",
      function (err, result) {
        if (err) {
          throw err;
        }
        cb(result);
      };
  },
  insertOne: function (table, column, value, cb) {
    var queryString = "INSERT INTO " + table;

    queryString += " (";
  },
};

module.exports = orm;
