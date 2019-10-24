process.env.NODE_MODE = 'test';

const assert = require('assert');
var supertest = require('supertest');
var should = require('should');
const request = supertest.agent('http://localhost:4000');
const chai = require('chai');
const dirtyChai = require('dirty-chai');
const { expect } = chai;

chai.use(dirtyChai);

describe('Test on client Endpoint', function() {
  this.timeout(10000);

  let client = {
    type: 'Client',
    name: 'Client Test',
    note: 'Client note',
    email: 'test@email.com',
    url: 'www.url.com',
    phone: '02112345',
    credentials: [{ login: 'Login', password: 'Passowrd', account: 'Account' }],
    licences: [
      {
        buydate: '29.04.2019',
        /*         program: {
          version: { version: '2016' },
          program: { name: 'Office' },
          productor: { name: 'Microsoft' }
        }, */
        key: '123',
        computer: 'PC'
      }
    ]
  };

  it('should add and return a client', function(done) {
    request
      .post('/contact/add')
      .send(client)
      .expect('Content-type', /json/)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.should.have.property('email').eql(client.email);
        res.body.should.have.property('name').eql(client.name);
        res.body.should.have.property('note').eql(client.note);
        res.body.should.have.property('_type').equal(client.type);
        client = res.body;
        done();
      });
  });

  it('should not add a client with same name', function(done) {
    let client2 = {
      type: 'Client',
      name: 'Client Test',
      note: 'Client note 2',
      email: 'test@email.com',
      url: 'www.url.com',
      phone: '02112345',
      credentials: [
        { login: 'Login', password: 'Passowrd', account: 'Account' }
      ],
      licences: [
        {
          buydate: '29.04.2019',
          /*         program: {
            version: { version: '2016' },
            program: { name: 'Office' },
            productor: { name: 'Microsoft' }
          }, */
          key: '123',
          computer: 'PC'
        }
      ]
    };

    request
      .post('/contact/add')
      .send(client2)
      .expect('Content-type', /json/)
      .end((err, res) => {
        //res.status.should.equal(500);
        res.body.should.have.property('status').eql(500);
        res.body.should.have.property('code').eql(11000);
        res.body.should.have
          .property('info')
          .eql(
            `E11000 duplicate key error collection: fournisseurs_practeo.contact index: name_1 dup key: { : "${
              client.name
            }" }`
          );
        done();
      });
  });

  it('should delete a client in db', function(done) {
    request
      .post('/contact/delete')
      .send({ contactID: client._id })
      .expect('Content-type', /json/)
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.should.have.property('deleted').eql(true);
        res.body.should.have.property('status').equal(200);
        done();
      });
  });

  it('should refuse a client without name', function(done) {
    let withoutName = {
      type: 'Client',
      note: 'Client note',
      email: 'test@email.com',
      url: 'www.url.com',
      phone: '02112345',
      credentials: [
        { login: 'Login', password: 'Passowrd', account: 'Account' }
      ],
      licences: [
        {
          buydate: '29.04.2019',
          key: '123',
          computer: 'PC'
        }
      ]
    };

    request
      .post('/contact/add')
      .send(withoutName)
      .expect('Content-type', /json/)
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.have
          .property('message')
          .eql(
            'Please add name and/or a type the request body of your contact (JSON format)'
          );
        done();
      });
  });

  it('should refuse a client without type', function(done) {
    let withoutType = {
      name: 'Client Test',
      note: 'Client note',
      email: 'test@email.com',
      url: 'www.url.com',
      phone: '02112345',
      credentials: [
        { login: 'Login', password: 'Passowrd', account: 'Account' }
      ],
      licences: [
        {
          buydate: '29.04.2019',
          key: '123',
          computer: 'PC'
        }
      ]
    };

    request
      .post('/contact/add')
      .send(withoutType)
      .expect('Content-type', /json/)
      .expect(400)
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.have
          .property('message')
          .eql(
            'Please add name and/or a type the request body of your contact (JSON format)'
          );
        done();
      });
  });
});
