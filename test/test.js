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

const newUser = {
  firstname: 'Nana',
  lastname: 'Simeon',
  email: 'simdo@gmail.com',
  password: 'dominicade',
  phone: '08065612208',
  username: 'SimDD',
  date_of_birth: '27/05/1993',
};

describe('returns test message', () => {
  it('should return a test message', (done) => {
    chai.request(server)
      .get(`${apiBase}/auth/test`)
      .end((err, res) => {
        console.log(res.body);
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
        .send(newUser)
        .expect(201)
        .end((err, res) => {
          console.log(res.body);
          if (err) return done(err);
          expect(res.status).to.equal(201);
          expect(res.body.data).to.not.equal(null);
          done();
        });
    });
  });
});
