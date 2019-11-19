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

const InvalidUserCredentials = {
  email: 'sdprintzprof@gmail.com',
  password: 'dominicades',
};

const newUser = {
  firstname: 'Nana',
  lastname: 'Simeon',
  email: 'simdo@gmail.com',
  password: 'dominicade',
  phone: '08065612208',
  username: 'SimDD',
  date_of_birth: '1993-05-27',
};

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

describe('returns test message', () => {
  it('should return a test message', (done) => {
    chai.request(server)
      .get(`${apiBase}/auth/test`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal('success');
      });
    done();
  });
});

/*
  * Test for Admin create an Employee
*/
describe('/Users', () => {
  it('should create an employee user account if Admin', (done) => {
    request(server)
      .post(`${apiBase}/users`)
      .set('Authorization', `bearer ${token}`)
      .send(newUser)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(201);
        expect(res.body.data).to.not.equal(null);
        expect(res.body.status).equal('success');
        expect(res.body.data.token).to.not.equal(null);
      });
    done();
  });

  it('should return 400 error, if user account is already created', (done) => {
    request(server)
      .post(`${apiBase}/users`)
      .set('Authorization', `bearer ${token}`)
      .send(newUser)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(400);
        expect(res.body.status).equal('error');
      });
    done();
  });
});

/**
 * test/test.js
 * Basic tests for Admin/Employee login
 */
describe('/POST auth/login Admin/Employee login', () => {
  it('should return 200 & valid token, if details valid', (done) => {
    chai.request(server)
      .post(`${apiBase}/auth/login`)
      .send(userCredentials)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.data.token).to.not.equal(null);
        done();
      });
  });

  it('should return 401 error, if invalid details', (done) => {
    chai.request(server)
      .post(`${apiBase}/auth/login`)
      .send(InvalidUserCredentials)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(401);
        expect(res.body.status).to.equal('error');
        done();
      });
  });
});
