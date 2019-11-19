/* eslint-disable consistent-return */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const chai = require('chai');

const chaiHttp = require('chai-http');

const request = require('supertest');

const { should, expect } = chai;

const server = require('../server');

chai.use(chaiHttp);

const apiBase = '/api/v1';

const userCredentials = {
  email: 'sdprintzprof@gmail.com',
  password: 'dominicade',
};

const fileName = 'test_gif.gif';

let token;
before((done) => {
  request(server)
    .post(`${apiBase}/auth/login`)
    .send(userCredentials)
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);
      token = res.body.data.token;
      done();
    });
});
/*
  * Test for Employee can create gif post
*/
describe('/Articles', () => {
  describe('Employee can create gif Posts', () => {
    it('should create gif post for authenticated employee', (done) => {
      request(server)
        .post(`${apiBase}/articles`)
        .set('Authorization', `bearer ${token}`)
        .field('Content-Type', 'multipart/form-data')
        .field('title', 'New Test Title')
        .attach('file', `test/${fileName}`)
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(201);
          expect(res.body.data).to.not.equal(null);
          expect(res.body.status).equal('success');
        });
      done();
    });
  });
});
