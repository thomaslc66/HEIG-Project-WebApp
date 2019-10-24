const Client = require('../models/client');
const Supplier = require('../models/supplier');
const Contact = require('../models/contact');

const { DataBase } = require('./database');

/***********************************************************************************************
 *
 * @class DataBase
 * @description DataBase class is the class that is used to connect and manage the mongoDB DataBase
 *
 *********************************************************************************************** */
class ContactDatabase extends DataBase {
  constructor() {
    super();
    this.addcontact = this.addcontact.bind(this);
    this.getcontact = this.getcontact.bind(this);
    this.updateClient = this.updateClient.bind(this);
    this.updateSupplier = this.updateSupplier.bind(this);
    this.addsupplier = this.addsupplier.bind(this);
    this.deleteContact = this.deleteContact.bind(this);
  }

  /**************************************************************
   *
   * @function addcontact(contact, done)
   * @param contact The contact to insert
   * @param done Use only this for testing callback
   * @return A Promise which you can catch the saved contact with a then()
   * @description construction and insertion of a contact in DB
   *
   ************************************************************ */
  addcontact(client) {
    return Client.create({
      name: client.name,
      note: client.note,
      phone: client.phone,
      email: client.email,
      url: client.url,
      logo: client.logo,
      credentials: client.credentials,
      licences: client.licences
    });
  }

  deleteContact(contactId) {
    return Contact.deleteOne(
      {
        _id: contactId
      },
      err => {
        if (err) {
          console.log('Error during delete ', err);
          return handleError(err);
        }
      }
    );
  }

  /**************************************************************
   *
   * @function addsupplier(supplier, done)
   * @param supplier The supplier to insert
   * @return A Promise which you can catch the saved supplier with a then()
   * @description construction and insertion of a supplier in DB
   *
   ************************************************************ */
  addsupplier(supplier) {
    return Supplier.create({
      name: supplier.name,
      phone: supplier.phone,
      url: supplier.url,
      email: supplier.email,
      note: supplier.note,
      logo: supplier.logo,
      credentials: supplier.credentials
    });
  }

  /**************************************************************
   *
   * @function getcontact(id)
   * @param id The contact's id to fetch
   * @return A Promise which you can catch the contact with a then()
   * @description construction and insertion of a contact in DB
   *
   ************************************************************ */
  getcontact(id) {
    return Contact.findOne({
      id
    });
  }

  /**************************************************************
   *
   * @function getcontactByName(value)
   * @param value The contact's name to fetch
   * @description Return the result from the db
   *
   ************************************************************ */
  getcontactByName(value) {
    return Contact.find({
      name: new RegExp(value, 'i')
    })
      .populate({
        path:
          'licences.programRef.productor licences.programRef.program licences.programRef.version'
      })
      .limit(1);
  }

  /**************************************************************
   *
   * @function getAllContact()
   * @description Return the name of all suppliers from the db
   *
   ************************************************************ */
  getAllContact() {
    return Contact.find({}, 'name', { sort: { name: 1 } }).then(results => {
      return results.map(c => {
        return { name: c.name };
      });
    });
  }

  /**************************************************************
   *
   * @function updateClient()
   * @param newContact The contact to update
   * @description Update a contact
   *
   *************************************************************/
  updateClient(client) {
    const { _id, _v, ...modifiedClient } = client;
    return Client.findOneAndUpdate(
      {
        _id: _id
      },
      modifiedClient,
      {
        new: true, // return modified
        runValidators: true
      }
    )
      .then(result => {
        console.log('Client Modifié: ', result);
      })
      .catch(err => {
        console.log('Error during update ', err);
      });
  }

  /**************************************************************
   *
   * @function updateSupplier()
   * @param newContact The contact to update
   * @description Update a contact
   *
   *************************************************************/
  updateSupplier(supplier) {
    const { _id, _v, ...modifiedSupplier } = supplier;
    return Supplier.findOneAndUpdate(
      {
        _id: _id
      },
      modifiedSupplier,
      {
        new: true, // return modified
        runValidators: true
      }
    )
      .then(result => {
        console.log('Supplier Modifié: ', result);
      })
      .catch(err => {
        console.log('Error during update ', err);
      });
  }
}

const contactDataBase = new ContactDatabase();

module.exports = contactDataBase;
