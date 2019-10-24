process.env.NODE_MODE = 'test';

const assert = require('assert');
var supertest = require('supertest');
var should = require('should');
const { app, port } = require('../server');

describe('Connection Test', function() {
  this.timeout(1000);

  let server;
  let request;

  before(done => {
    server = app.listen(port, () => {
      console.log(`Listening on http://localhost:${port}`);
      request = supertest.agent(server);
      done();
    });
  });

  it("should return {message: 'It's working good...'} on home page", function(done) {
    request
      .get('/')
      .expect('Content-type', /json/)
      .expect(200)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.should.have.property('message').eql("It's working good...");
        done();
      });
  });

  it('Should error 404 {message: Route not found}', done => {
    request
      .get('/qwertz')
      .expect('Content-type', /json/)
      .expect(404)
      .end((err, res) => {
        res.status.should.equal(404);
        res.body.should.have.property('message').eql('Route not found');
        done();
      });
  });
});
