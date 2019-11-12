const express = require('express');

const router = express.Router();

const auth = require('../../middleware/auth.js');

const authUser = require('./auth.js');

const users = require('./user.js');

router.use('/auth', authUser);

router.use('/users', auth, users);

module.exports = router;
