const Program = require('../models/program');
const Version = require('../models/version');
const Productor = require('../models/productor');
const { DataBase } = require('./database');

/** **********************************************************************************************
 *
 * @class DataBase
 * @description DataBase class is the class that is used to connect and manage the mongoDB DataBase
 *
 *********************************************************************************************** */
class ProgramDatabase extends DataBase {
  constructor() {
    super();
    //PRODUCTORS
    this.addProductor = this.addProductor.bind(this);
    this.getAllProductor = this.getAllProductor.bind(this);

    //PROGRAM

    this.getAllProgramOfAProductor = this.getAllProgramOfAProductor.bind(this);
    this.addProgramm = this.addProgramm.bind(this);
    this.getAllPrograms = this.getAllPrograms.bind(this);

    //VERSION
    this.addProgramVersion = this.addProgramVersion.bind(this);
    this.getAllVersionOfProgram = this.getAllVersionOfProgram.bind(this);
  }

  // PRODUCTORS
  /** *************************************************************
   *
   * @function addProductor(contact)
   * @param productor The productor to insert
   * @return A Promise which you can catch the saved productor with a then()
   * @description construction and insertion of a productor in DB
   *
   ************************************************************ */
  addProductor(name) {
    return Productor.findOrCreate({
      name: name
    })
      .then(productor => {
        return productor.doc;
      })
      .catch(err => {
        let error = new Error('Error in productor request');
        error.status = 422;
        error.stack = err;
        throw error;
      });
  }

  /** ************************************************************
   *
   * @function getAllProductor
   * @abstract return all the productor avaliable. return [] if no
   * 			avaliable productor
   *
   ************************************************************* */
  getAllProductor() {
    return Productor.find();
  }

  //PROGRAMS
  /** *************************************************************
   *
   *  @function getAllProgramOfAProductor
   * @param {*} productorId Id of the productor selected
   * @abstract Retrun all the program base on a selected productor
   * 			if the productor is not found return an empty list
   *
   ************************************************************ */
  getAllProgramOfAProductor(productorId) {
    return Program.find({ productor: productorId }, 'name', {
      sort: { name: 1 }
    });
  }

  /** *************************************************************
   *
   * @function addProgram(program, productorId)
   * @param {*} program The program to insert
   * @param {*} productorId need to keep a reference in the program
   * @return A Promise which you can catch the saved program with a then()
   * @description construction and insertion of a program in DB
   *
   ************************************************************ */
  addProgramm(name, productorId) {
    return Program.findOrCreate({
      name: name,
      productor: productorId
    })
      .then(program => {
        return program.doc;
      })
      .catch(err => {
        let error = new Error('Error in Program Request');
        error.status = 422;
        error.stack = err;
        throw error;
      });
  }

  /** *************************************************************
   *
   * @function getAllPrograms()
   * @return A Promise which you can catch
   * @description construction of a list of program with productor
   * 				and version populated.
   * 				find() method return an empty list
   *
   ************************************************************ */
  getAllPrograms() {
    return Program.find()
      .populate('productor')
      .populate('version');
  }

  //VERSION
  /** ****************************************************
   *
   * @function addProgramVersion
   * @param {*} name name of the version
   * @param {*} programId id of the program
   * @abstract method to add a new version of a program
   *
   ******************************************************* */
  addProgramVersion(version, programId) {
    return Version.findOrCreate({
      name: version
    }).then(result => {
      if (result.created) {
        Program.findOneAndUpdate(
          { _id: programId },
          { $addToSet: { versions: result.doc.id } },
          {
            runValidators: true
          }
        )
          .then((result, err) => {
            if (err) {
              console.log(err);
            }
            console.log(result);
          })
          .catch(err => {
            //error when inserting version in program
            console.log(err);
          });
      }
      return result.doc;
    });
  }

  /** *****************************************************
   *
   * @function getAllVersionOfProgram
   * @param {*} programId the id of the program selected
   * @abstract return all the version based on the selected program
   *
   ****************************************************** */
  getAllVersionOfProgram(programId) {
    return Program.findOne({ _id: programId }, 'versions')
      .populate('versions')
      .then((result, err) => {
        if (err) {
          console.log('getAllVersionProgram error:', err);
        }
        if (result) {
          //we have result
          return result;
        } else {
          let error = new Error('Error in ProgramId');
          error.status = 400;
          throw error;
        }
      });
  }

  getAllVersion() {
    return Version.find();
  }

  //Generic method
}

const programDatabase = new ProgramDatabase();
module.exports = programDatabase;
