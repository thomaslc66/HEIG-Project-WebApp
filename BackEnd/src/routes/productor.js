// routes/suppliers.js
var express = require('express');
var router = express.Router();
const programDatabase = require('../database/programDatabase');

/* EndPoint to add a contact of type contact */
router.post('/add', (req, res, next) => {
  const { name } = req.body;
  if (name) {
    programDatabase
      .addProductor(name)
      .then(result => {
        res.status(200).send(result);
      })
      .catch(err => {
        res.status(err.status).send({
          message: err.message,
          status: err.status,
          code: err.stack.code,
          info: err.stack.errmsg
        });
      });
  } else {
    res.status(400).send({
      message:
        'Please give you body request a name attribute for your productor (JSON format)',
      status: 400
    });
  }
});

router.get('/all', (req, res, next) => {
  programDatabase
    .getAllProductor()
    .then(results => {
      res.status(200).send(results);
    })
    .catch(next);
});

module.exports = router;
