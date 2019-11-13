/* eslint-disable max-len */
require('dotenv').config();

const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

const Helper = {
  /**
   * Hash Password Method
   * @param {string} password
   * @returns {string} returns hashed password
   */
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  },
  /**
   * comparePassword
   * @param {string} hashPassword
   * @param {string} password
   * @returns {Boolean} return True or False
   */
  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },
  /**
   * isValidEmail helper method
   * @param {string} email
   * @returns {Boolean} True or False
   */
  isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  },
  /**
   * Gnerate Token
   * @param {string} id
   * @returns {string} token
   */
  generateToken(result) {
    return new Promise((resolve, reject) => {
      jwt.sign({ sub: result.user }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION, issuer: process.env.JWT_ISSUER }, (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve({ token });
        }
      });
    });
  },

  verifyPassword(password, user) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve({ isValid: result, user });
        }
      });
    });
  },
};

module.exports = Helper;
