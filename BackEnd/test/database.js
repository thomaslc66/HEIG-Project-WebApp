process.env.NODE_MODE = 'test';

const chai = require('chai');
const dirtyChai = require('dirty-chai');
const { expect } = chai;
const { db } = require('../src/database/database');
const Client = require('../src/models/client');
const mongoose = require('mongoose');

chai.use(dirtyChai);

describe('Tests on DataBase', function() {
  this.timeout(10000);

  it('Can connect to database', async () => {
    await mongoose.connect(
      db.dbUrl,
      {
        useNewUrlParser: true
      },
      (err, result) => {
        if (err) {
          console.log('error', err);
        }
        result.should.have.property('base');
      }
    );
  });

  it('Can save data to Database', async () => {
    Client.create(
      {
        name: 'Client Test',
        note: 'Test note',
        email: 'test@email.com',
        url: 'www.url.com',
        phone: '02112345',
        credentials: [
          { login: 'Login', password: 'Passowrd', account: 'Account' }
        ],
        licences: [
          {
            buydate: '29.04.2019',
            /*             program: {
              version: { version: '2016' },
              program: { name: 'Office' },
              productor: { name: 'Microsoft' }
            }, */
            key: '123',
            computer: 'PC'
          }
        ]
      },
      (result, err) => {
        if (!err) {
          expect(result).to.not.be.undefined();
          expect(result.name).to.be.equal('Client Test');
          expect(result.email).to.be.deep.equal('test@email.com');
        }
      }
    );
  });

  it('Can drop collection', async () => {
    await mongoose.connection.db.dropDatabase((err, res) => {
      expect(err).to.be.null();
    });
  });
});
