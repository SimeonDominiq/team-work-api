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

describe('returns test message', () => {
  it('should return a test message', (done) => {
    chai.request(server)
      .get(`${apiBase}/auth/test`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Test successful!');
      });
    done();
  });
});

/*
  * Test for Admin create an Employee
*/
describe('Admin can create employee user account', () => {
  describe('/POST /users', () => {
    let token;
    before((done) => {
      request(server)
        .post(`${apiBase}/auth/login`)
        .send(userCredentials)
        .end((err, res) => {
          console.log(res.body);
          if (err) return done(err);
          token = res.body.data.token;
          done();
        });
    });

    it('creates an employee user account if Admin', (done) => {
      request(server)
        .post(`${apiBase}/users`)
        .set('Authorization', `bearer ${token}`)
        .send({})
        .expect(201)
        .end((err, res) => {
          console.log(err);
          if (err) return done(err);
          expect(res.status).to.equal(201);
          done();
        });
    });
  });
});
