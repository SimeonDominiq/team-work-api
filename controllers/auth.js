/* eslint-disable max-len */
/* eslint-disable consistent-return */
const User = require('../models/user.js');

const Helper = require('../controllers/helper');

/**
 * Create a User
 * @param {object} req
 * @param {object} res
 * @returns {object} object
 */
exports.signup = (req, res) => {
  const createdAt = new Date(Date.now());

  req.body.created_at = createdAt;

  User.create(req.body)
    .then((result) => res.status(201).json({
      status: 'success',
      data: result,
    }))
    .catch((err) => {
      res.status(400).json({
        status: 'error',
        error: err.message,
      });
    });
};

/**
 * Login a user
 * @param {object} req
 * @param {object} res
 * @returns {object} object
 */
exports.login = (req, res) => {
  User.authenticate(req.body)
    .then((result) => {
      if (result.isAuthorized === true) {
        Helper.generateToken(result).then((token) => res.status(200).json({
          status: 'success',
          data: token,
        })).catch((err) => res.status(401).json({
          status: 'error',
          message: err.message,
        }));
      } else {
        return res.status(401).json({
          status: 'error',
          message: 'Invalid credentials',
        });
      }
    })
    .catch((err) => res.status(400).json({
      status: 'error',
      error: err.message,
    }));
};

exports.test = (req, res) => {
  res.status(200).json({
    message: 'Test successful!',
  });
};
