var express = require("express");
var burger = require("../models/burger");

var router = express.Router();

//get route that displays all of the burgers in the db
router.get("/", function (req, res) {
  burger.selectAll(function (data) {
    var hbsObject = {
      burgers: data,
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });

  //route to add a new burger to the db and return back the id of the new burger
  router.post("/api/burgers", function (req, res) {
    burger.insertOne(
      ["burger_name", "devoured"],
      [req.body.burger_name, req.body.devoured],
      function (result) {
        res.json({ id: result.insertId });
      }
    );
  });

  router.put("/api/burgers/:id", function (req, res) {
    var condition = "id =" + req.params.id;

    console.log("condition", condition);

    burger.updateOne(
      {
        devoured: req.body.devoured,
      },
      condition,
      function (result) {
        if (result.changedRows == 0) {
          return res.sendStatus(404);
        } else {
          res.sendStatus(200);
        }
      }
    );
  });
});

module.exports = router;
