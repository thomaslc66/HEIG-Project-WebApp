// const Schema = require('./src/User.js');
const mongoose = require('mongoose');
// To Avoid findAndModify is deprecated
mongoose.set('useFindAndModify', false);
// To Avoid collection.ensureIndex is deprecated is deprecated
mongoose.set('useCreateIndex', true);
const config = require('../utils/config');
const DUP_KEY_ERROR = 11000;

/**
 * Database features
 *
 * @class DataBase
 */
class DataBase {
  constructor() {
    if (process.env.NODE_MODE != 'test') {
      this.dbUrl = `${config.db.host}${config.db.port}${config.db.name}`;
    } else {
      this.dbUrl = `${config.db.host}${config.db.port}/test`;
    }
    this.db = null;
    this.connect = this.connect.bind(this);
    this.close = this.close.bind(this);
    this.clear = this.clear.bind(this);
  }

  /**
   * initialize db connection
   *
   * @memberof DataBase
   */
  connect() {
    mongoose.connect(this.dbUrl, {
      useNewUrlParser: true,
    });

    mongoose.Promise = global.Promise;
    const me = this;

    // CONNECTION EVENTS
    // When successfully connected
    mongoose.connection.on('connected', function(err, db) {
      console.log('Mongoose default connection open to ' + me.dbUrl);
    });

    // If the connection throws an error
    mongoose.connection.on('error', function(err) {
      console.log(
        'Mongoose default connection to ' + me.dbUrl + ' error: ' + err
      );
    });

    // When the connection is disconnected
    mongoose.connection.on('disconnected', function() {
      console.log('Mongoose default connection disconnected');
    });

    mongoose.connection.on('open', () => {
      console.log('Connected to DB => OK');
    });

    // If the Node process ends, close the Mongoose connection
    process.on('SIGINT', function() {
      mongoose.connection.close(function() {
        console.log(
          'Mongoose default connection disconnected through app termination'
        );
        process.exit(0);
      });
    });
  }

  /**
   * Use for test purpose to close the connection
   *
   * @memberof DataBase
   */
  close() {
    return this.db.close();
  }

  /**
   * Clear the database - for test purpose
   *
   * @memberof DataBase
   */
  clear() {
    return this.db.dropDatabase();
  }
}

const db = new DataBase({});

module.exports = {
  db,
  DataBase,
};
