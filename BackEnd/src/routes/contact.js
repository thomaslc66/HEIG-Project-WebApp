// routes/suppliers.js
var express = require('express');
var router = express.Router();
const contactDatabase = require('../database/contactDatabase');

// @@@@@ GET METHOD @@@@@@@@@

/*******************************************
 *
 * @function get(/name/:searchValue)
 * @name /contact/search/ endpoint
 * @param {id} searchValue value entered by the user
 * @abstract return the list of all contact
 *
 * *****************************************/
router.get('/name/:searchValue', (req, res) => {
  const searchValue = req.params.searchValue;
  contactDatabase.getcontactByName(searchValue).then(result => {
    res.send(result);
  });
});

/*******************************************
 *
 * @function get(/all)
 * @name /contact/all endpoint
 * @abstract return the list of all contact
 *
 * *****************************************/
router.get('/all', (req, res, next) => {
  contactDatabase
    .getAllContact()
    .then(result => res.send(result))
    .catch(next);
});

/*******************************************
 *
 * @function get(/:id)
 * @name /contact/:id endpoint
 * @param {id} id id of the contact
 * @abstract return the contact
 *
 * *****************************************/
router.get('/get/:id', (req, res, next) => {
  const id = req.params.id;
  console.log('id: ', id);
  contactDatabase
    .getcontact(id)
    .then(result => {
      res.send(result);
    })
    .catch(() => {
      //call default
      next();
    });
});

// @@@@@ POST METHOD @@@@@@@@@

/*******************************************
 *
 * @function post(/add)
 * @name /contact/add endpoint
 * @abstract add a new contact (Client or supplier)
 *
 * *****************************************/
router.post('/add', (req, res) => {
  const contact = req.body;
  if (contact.type && contact.name) {
    if (contact.type === 'Client') {
      contactDatabase
        .addcontact(contact)
        .then(result => {
          res.status(200).send(result);
        })
        .catch(err => {
          //we catch an error
          console.log('/add(contact) error', err);

          res.status(500).send({
            message: 'Error during request',
            status: 500,
            code: err.code, //code from mongoose error
            info: err.errmsg
          });
        });
    } else {
      contactDatabase
        .addsupplier(contact)
        .then(result => {
          res.status(200).send(result);
        })
        .catch(err => {
          console.log('/add(supplier) error', err);

          //we catch an error
          res.status(500).send({
            message: 'Error during request',
            status: 500,
            code: err.code, //code from mongoose error
            info: err.errmsg
          });
        });
    }
  } else {
    res.status(400).send({
      message:
        'Please add name and/or a type the request body of your contact (JSON format)',
      status: 400
    });
  }
});

/*******************************************
 *
 * @function post(/update)
 * @name /contact/update endpoint
 * @abstract update the contact passed in body
 *
 * *****************************************/
router.post('/update', (req, res, next) => {
  const contact = req.body;
  console.log('contact Info: ', contact);

  if (contact._type === 'Client') {
    contactDatabase
      .updateClient(contact)
      .then(result => {
        res.status(200).send('Mise à jour réussie');
        console.log(result);
      })
      .catch(error => {
        console.log(error);
        next();
      });
  } else {
    contactDatabase
      .updateSupplier(contact)
      .then(result => {
        res.status(200).send('Mise à jour réussie');
        console.log(result);
      })
      .catch(error => {
        console.log('Update error:', error);
        next();
      });
  }
});

/*******************************************
 *
 * @function post(/update)
 * @name /contact/update endpoint
 * @abstract update the contact passed in body
 *
 * *****************************************/
/* EndPoint to delete a contact */
router.post('/delete', (req, res, next) => {
  const contactID = req.body.contactID;
  contactDatabase
    .deleteContact(contactID)
    .then((result, error) => {
      if (error) {
        res.status(500).send({ deleted: false, status: 500 });
      } else {
        res.status(200).send({ deleted: true, status: 200 });
      }
    })
    .catch(err => {
      console.log('error on delete execution request ');
      next();
    });
});

module.exports = router;
