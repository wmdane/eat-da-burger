var mysql = require("mysql");

//connection code borrowed from cats activity
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "burgers_db",
});

connection.connect(function (err) {
  if (err) {
    console.error("Error Connecting:" + err.stack);
    return;
  }
  console.log("Connected as id " + connection.threadId);
});

module.exports = connection;
