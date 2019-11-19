const express = require('express');

const router = express.Router();

const auth = require('../../middleware/auth.js');

const authUser = require('./auth');

const users = require('./user');

const articles = require('./article');

router.use('/auth', authUser);

router.use('/users', auth, users);

router.use('/articles', auth, articles);

module.exports = router;
