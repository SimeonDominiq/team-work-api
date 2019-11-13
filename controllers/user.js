const User = require('../models/user.js');

exports.createUser = (req, res) => {
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
