var connection = require("./connection");

//printQuestionMarks taken from cats activity.
//This will add a ? for each value being added to the table into an array and then stringify them so that they act as proper mySQL syntax.
function printQuestionMarks(num) {
  //empty array to be filled with ?s depending on the amount of values being referenced
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

//objToSql taken from cats activity
function objToSql(ob) {
  var arr = [];

  for (var key in ob) {
    var value = ob[key];

    if (Object.hasOwnProperty.call(ob, key)) {
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }

      arr.push(key + "=" + value);
    }
  }

  return arr.toString();
}

var orm = {
  selectAll: function (table, cb) {
    //turning mySQL selection commands into a shorter variable to make it easier to reference multiple times if needed
    var queryString = "SELECT * FROM " + table + ";";
    //invokes a callback function to return the results from the table query
    connection.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }
      //callback returns the result of the database query
      cb(result);
    });
  },
  insertOne: function (table, column, value, cb) {
    //turning mySQL selection commands into a shorter variable to make it easier to reference multiple times if needed
    var queryString =
      "INSERT INTO " +
      table +
      " (" +
      column.toString() +
      ") " +
      "VALUES (" +
      printQuestionMarks(value.length) +
      ") ";
    //console logging to make sure the string displays correctly
    console.log(queryString);
    //execute the query and return either an err or the result of the query
    connection.query(queryString, value, function (err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  updateOne: function (table, objColVals, condition, cb) {
    var queryString = "UPDATE " + table + " SET " + objToSql(objColVals) + " WHERE " + condition;
    //console log to make sure query string displays correctly
    console.log(queryString);

    connection.query(queryString, value, function (err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
};

module.exports = orm;
