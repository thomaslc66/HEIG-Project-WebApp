process.env.NODE_MODE = 'test';

const assert = require('assert');
var supertest = require('supertest');
var should = require('should');
const request = supertest.agent('http://localhost:4000');
const chai = require('chai');
const dirtyChai = require('dirty-chai');
const { expect } = chai;

chai.use(dirtyChai);

describe('Test on Supplier EndPoint', function() {
  this.timeout(10000);

  let supplier = {
    type: 'Supplier',
    name: 'Supplier Test',
    note: 'Supplier note',
    email: 'test@email.com',
    url: 'www.url.com',
    phone: '02112345',
    credentials: [{ login: 'Login', password: 'Passowrd', account: 'Account' }]
  };

  it('should add and return a supplier', function(done) {
    request
      .post('/contact/add')
      .send(supplier)
      .expect('Content-type', /json/)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.should.have.property('email').eql(supplier.email);
        res.body.should.have.property('name').eql(supplier.name);
        res.body.should.have.property('note').eql(supplier.note);
        res.body.should.have.property('_type').equal(supplier.type);
        supplier = res.body;
        done();
      });
  });

  it('should not add a supplier with same name', function(done) {
    request
      .post('/contact/add')
      .send(supplier)
      .expect('Content-type', /json/)
      .end((err, res) => {
        //res.status.should.equal(500);
        res.body.should.have.property('status').eql(500);
        res.body.should.have.property('code').eql(11000);
        res.body.should.have
          .property('info')
          .eql(
            `E11000 duplicate key error collection: fournisseurs_practeo.contact index: name_1 dup key: { : "${
              supplier.name
            }" }`
          );
        done();
      });
  });

  it('should delete a supplier in db', function(done) {
    request
      .post('/contact/delete')
      .send({ contactID: supplier._id })
      .expect('Content-type', /json/)
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.should.have.property('deleted').eql(true);
        res.body.should.have.property('status').equal(200);
        done();
      });
  });

  it('should refuse a supplier without name', function(done) {
    let withoutName = {
      type: 'Supplier',
      note: 'Supplier note',
      email: 'test@email.com',
      url: 'www.url.com',
      phone: '02112345',
      credentials: [
        { login: 'Login', password: 'Passowrd', account: 'Account' }
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

  it('should refuse a supplier without type', function(done) {
    let withoutType = {
      type: 'Supplier',
      note: 'Supplier note',
      email: 'test@email.com',
      url: 'www.url.com',
      phone: '02112345',
      credentials: [
        { login: 'Login', password: 'Passowrd', account: 'Account' }
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
