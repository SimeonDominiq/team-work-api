/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
require('dotenv').config();

const jwt = require('jsonwebtoken');

const User = require('../models/user');

module.exports = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          status: 'error',
          error: err.message,
        });
      }
      User.findOne({ id: decoded.sub.id })
        .then((user) => {
          req.user = decoded;
          next();
        })
        .catch((err) => res.status(401).json({
          status: 'error',
          error: err.message,
        }));
    });
  } else {
    return res.status(401).json({
      status: 'error',
      error: 'failed authentication: no token provided.',
    });
  }
};
