// routes/suppliers.js
var express = require('express');
var router = express.Router();
const programDatabase = require('../database/programDatabase');

/* EndPoint to add a program */
router.post('/add', (req, res, next) => {
  const { name, productor } = req.body;
  if (name && (productor && productor.match(/^[0-9a-fA-F]{24}$/))) {
    // name and productor are set and productor is a valid id
    programDatabase
      .addProgramm(name, productor)
      .then(program => {
        //we return the program with a 200 value
        res.status(200).send(program);
      })
      .catch(err => {
        //we catch an error
        res.status(500).send({
          message: 'Error during request',
          status: 500,
          code: err.stack.code, //code from mongoose error
          info: err.stack.errmsg
        });
      });
  } else {
    res.status(400).send({
      message:
        'Please add name and productor (id) in the request body (JSON format)',
      status: 500
    });
  }
});

router.get('/get/:productorId', (req, res, next) => {
  const productorId = req.params.productorId;
  if (productorId.match(/^[0-9a-fA-F]{24}$/)) {
    // Yes, it's a valid ObjectId.
    programDatabase
      .getAllProgramOfAProductor(productorId)
      .then(programList => {
        res.status(200).send(programList);
      })
      .catch(err => {
        res.status(500).send({
          message: 'Upps something when wrong',
          status: 500,
          info: err
        });
      });
  } else {
    res.status(400).send({
      message: 'Invalid Id, please check you request parameters',
      status: 400
    });
  }
});

router.get('/all', (req, res, next) => {
  programDatabase
    .getAllPrograms()
    .then(results => {
      res.status(200).send(results);
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error getting all program',
        status: 500,
        info: err.stack.errmsg
      });
    });
});

module.exports = router;
