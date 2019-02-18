const Supplier = require("../models/supplier");
const { DataBase } = require("./database");

/* **********************************************************************************************
 *
 * @class DataBase
 * @description DataBase class is the class that is used to connect and manage the mongoDB DataBase
 *
 *********************************************************************************************** */
class SuppliersDatabase extends DataBase {
  constructor() {
    super();
    this.addSuppliers = this.addSuppliers.bind(this);
    this.getSupplier = this.getSupplier.bind(this);
    this.updateSupplier = this.updateSupplier.bind(this);
  }

  /* *************************************************************
   *
   * @function addSuppliers(supplier, done)
   * @param supplier The supplier to insert
   * @param done Use only this for testing callback
   * @return A Promise which you can catch the saved supplier with a then()
   * @description construction and insertion of a supplier in DB
   *
   ************************************************************ */
  addSuppliers(supplier, done) {
    const dbSupplier = new Supplier({
      id: supplier.id,
      name: supplier.name,
      address: supplier.address,
      logo: supplier.logo,
      login: supplier.login,
      passwords: supplier.passwords,
      tags: supplier.tags
    });

    return this.saveInDB(dbSupplier, done);
  }

  /* *************************************************************
   *
   * @function getSupplier(id)
   * @param id The suppliers's id to fetch
   * @return A Promise which you can catch the supplier with a then()
   * @description construction and insertion of a supplier in DB
   *
   ************************************************************ */
  async getSupplier(id) {
    const result = await Supplier.findOne({
      id
    });
    return result.toJSON();
  }

  /* *************************************************************
   *
   * @function getSupplier(id)
   * @param id The suppliers's id to fetch
   * @return A Promise which you can catch the supplier with a then()
   * @description construction and insertion of a supplier in DB
   *
   ************************************************************ */
  async getSupplierByTag(t) {
    const result = await Supplier.find({
      tags: new RegExp(t, "i")
    });

    return result;
  }

  /* *************************************************************
   *
   * @function updateSupplier()
   * @param supplier The supplier to update
   * @param done Use only this for testing callback
   * @return A Promise which you can catch the updated supplier with a then()
   * @description Update a supplier
   *
   ************************************************************ */
  async updateSupplier(supplier) {
    await Supplier.findOneAndUpdate(
      {
        id: supplier.id
      },
      supplier,
      {
        runValidators: true
      }
    ).then(res => {
      //console.log('edited supplier result', res);
    });
  }
}

const suppliersDataBase = new SuppliersDatabase();

module.exports = suppliersDataBase;
