const connection = require("../config/connection");
var orm = require("../config/orm");

//burger will just be calling back the functions outlined in orm.js
var burger = {
  selectAll: function (cb) {
    orm.selectAll("burgers", function (result) {
      cb(result);
    });
  },
  insertOne: function (column, value, cb) {
    orm.insertOne("burgers", column, value, function (result) {
      cb(result);
    });
  },
  updateOne: function (objColVals, condition, cb) {
    orm.updateOne("burgers", objColVals, condition, function (result) {
      cb(result);
    });
  },
};

module.exports = burger;
