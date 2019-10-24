// routes/suppliers.js
var express = require('express');
var router = express.Router();
const programDatabase = require('../database/programDatabase');

/* EndPoint to add a contact of type contact */
router.post('/add', (req, res, next) => {
  console.log('req.body (version):', req.body);
  const { version, program } = req.body;
  if (version && (program && program.match(/^[0-9a-fA-F]{24}$/))) {
    // version and program are set and program is a valid id
    programDatabase
      .addProgramVersion(version, program)
      .then(program => {
        //we return the program with a 200 value
        res.status(200).send(program);
      })
      .catch(err => {
        //we catch an error
        res.status(500).send({
          message: 'Error adding a new program',
          status: 500,
          code: err.stack.code, //code from mongoose error
          info: err.stack.errmsg
        });
      });
  } else {
    res.status(400).send({
      message:
        'Please add version and program (id) in the request body (JSON format)',
      status: 500
    });
  }
});

/** find all version of a program */
router.get('/get/:programId', (req, res, next) => {
  const programId = req.params.programId;
  if (programId.match(/^[0-9a-fA-F]{24}$/)) {
    // Yes, it's a valid ObjectId.
    programDatabase
      .getAllVersionOfProgram(programId)
      .then(results => {
        res.status(200).send(results);
      })
      .catch(err => {
        res.status(err.status).send({
          message: 'Invalid Id, please check you request parameters',
          status: err.status
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
    .getAllVersion()
    .then(results => {
      res.status(200).send(results);
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error getting all versions',
        status: 500,
        info: err.stack.errmsg
      });
    });
});

module.exports = router;
