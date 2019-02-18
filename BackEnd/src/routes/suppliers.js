// routes/suppliers.js

var express = require("express");
var router = express.Router();
const suppliersDatabase = require("../dataBase/suppliersDatabase");

router.post("/add", (req, res) => {
  const supplier = req.body;
  suppliersDatabase.addSuppliers(supplier).then(result => {
    res.send(result);
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  console.log("id: ", id);
  suppliersDatabase.getSupplier(id).then(result => {
    res.send(result);
  });
});

router.get("/tag/:tag", (req, res) => {
  const tag = req.params.tag;
  console.log(tag);
  suppliersDatabase.getSupplierByTag(tag).then(result => {
    res.send(result);
  });
});

module.exports = router;
