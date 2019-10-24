// routes/suppliers.js
var express = require('express');
var router = express.Router();
const contactDatabase = require('../database/contactDatabase');

/*******************************************
 *
 * @function get(/)
 * @name /contact/all endpoint
 * @abstract return the list of all contact
 *
 * *****************************************/
router.get('/', (req, res) => {
  res.send({ message: "It's working good..." });
});

/* EndPoint to add a list of contact */
router.post('/add/allContacts', (req, res, next) => {
  const contacts = req.body;
  contacts.map((contact, i) => {
    if (contact.licences) {
      contactDatabase
        .addcontact(contact)
        .then(err => {
          // res status 200
          console.log(`Error Adding contact: ${i}`, err);
        })
        .catch(next);
    } else {
      contactDatabase
        .addsupplier(contact)
        .then(err => {
          // res status 200
          console.log(`Error Adding supplier: ${i}`, err);
        })
        .catch(next);
    }
  });
});

module.exports = router;
