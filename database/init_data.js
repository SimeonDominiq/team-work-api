/* eslint-disable no-console */
require('dotenv').config();

const pool = require('../database/config.js');

/*
  Init Data
*/
const insertInitData = () => {
  const queryText = `INSERT INTO users (
    firstname, lastname, middlename, email, password, phone, username, avatar, date_of_birth, gender, address, is_active, role_id, last_login_attempt, login_attempts) values('Opeyemi', 'Adeyeye', null, 'sdprintzprof@gmail.com', '$2a$08$yI7mUE5N5P7ob59Oz8LQi.RYWbLQ.s/rOePNNz0G4cOoSw./vP.rq', '08065612206', null, null, '1993-05-27', 'Male', 'Ipaja, Lagos', 1, 1, null, null)`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Create All Tables
 */
const insertAllData = () => {
  insertInitData();
};

module.exports = {
  insertAllData,
  insertInitData,
};

require('make-runnable');
