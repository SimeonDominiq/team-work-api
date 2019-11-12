/* eslint-disable no-param-reassign */
const pool = require('../database/config.js');

const Helper = require('../controllers/helper.js');

function findOneById(id) {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM users WHERE id = $1', [id])
      .then((result) => {
        if (result.rows[0]) {
          resolve(result.rows[0]);
        } else {
          reject(new Error('No user found'));
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function findOneByEmail(email) {
  return new Promise((resolve, reject) => {
    pool.query('SELECT firstname, lastname, middlename, email, phone, role_id, last_login_attempt, login_attempts FROM users WHERE email = $1', [email])
      .then((result) => {
        delete result.rows[0].password;
        if (result.rows[0]) {
          resolve(result.rows[0]);
        } else {
          reject(new Error('No user found'));
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function validateEmail(email) {
  return new Promise(((resolve, reject) => {
    const reg = new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/);
    if (reg.test(email)) {
      resolve();
    } else {
      reject(new Error('Provided email does not match proper email format'));
    }
  }));
}

function validatePassword(password, minCharacters) {
  return new Promise((resolve, reject) => {
    if (password.length < minCharacters) {
      reject(new Error(`password must be at least ${minCharacters} characters long`));
    } else {
      resolve();
    }
  });
}

function validateUserData(data) {
  return new Promise((resolve, reject) => {
    if (!data.password || !data.email) {
      reject(new Error('Important fields are missing'));
    } else {
      validatePassword(data.password, 6)
        .then(() => validateEmail(data.email))
        .then(() => {
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
}

module.exports = {
  findAll: () => new Promise((resolve, reject) => {
    pool.query('SELECT * FROM users', [])
      .then((results) => {
        resolve(results.rows);
      })
      .catch((err) => {
        reject(err);
      });
  }),

  findOne: (data) => new Promise((resolve, reject) => {
    if (!data.id && !data.email) {
      reject(new Error('you must provide id or email'));
    } else if (data.id) {
      findOneById(data.id)
        .then((result) => {
          delete result.password;
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    }
  }),

  create: (data) => new Promise(((resolve, reject) => {
    validateUserData(data)
      .then(() => Helper.hashPassword(data.password))
      .then((hash) => pool.query(
        'INSERT INTO users (firstname, lastname, middlename, email, password, phone, username, date_of_birth, gender, address, created_at, role_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) returning *', [data.firstname, data.lastname, data.middlename, data.email, hash, data.phone, data.username, data.date_of_birth, data.gender, data.address, data.created_at, data.role_id],
      ))
      .then((result) => {
        resolve(result.rows[0]);
      })
      .catch((err) => {
        reject(err);
      });
  })),

  delete: (data) => new Promise(((resolve, reject) => {
    pool.query('DELETE FROM users WHERE id = $1 returning id', [data.id])
      .then((result) => {
        resolve(result.rows[0]);
      })
      .catch((err) => {
        reject(err);
      });
  })),

  authenticate: (data) => new Promise((resolve, reject) => {
    if (!data.email || !data.password) {
      reject(new Error('Email and/or password is missing'));
    } else {
      findOneByEmail(data.email)
        .then((user) => {
          delete user.password;
          // Reset login attempts if more than 15 minutes have passed
          if (Date.now() - user.last_login_attempt >= 900000) {
            user.login_attempts = -1;
          }
          return pool.query(
            'UPDATE users SET last_login_attempt = now(), login_attempts = $2 WHERE email = $1 returning *',
            [data.email, user.login_attempts + 1],
          );
        })
        .then((result) => {
          if (result.rows[0].login_attempts < 10) {
            return result.rows[0];
          }
          return reject(new Error('Too many attempts to login, try again in 15 minutes'));
        })
        .then((user) => Helper.verifyPassword(data.password, user))
        .then((result) => {
          resolve({ isAuthorized: result.isValid, user: result.user });
        })
        .catch((err) => {
          reject(err);
        });
    }
  }),
};
