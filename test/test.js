/* eslint-disable prefer-destructuring */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const chai = require('chai');

const request = require('request');

const should = require('chai').should;

const expect = require('chai').expect;

const baseURL = 'http://localhost:3300/api/v1';

describe('returns test message', () => {
  it('returns test message', (done) => {
    request.get(`${baseURL}/auth/test`, (error, response, body) => {
      expect(response.statusCode).to.equal(200);
      console.log(body);
      done();
    });
  });
});
