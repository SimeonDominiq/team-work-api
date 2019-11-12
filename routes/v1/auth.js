const express = require('express');

const router = express.Router();

const authCtrl = require('../../controllers/auth');

router.get('/test', authCtrl.test);

router.post('/signup', authCtrl.signup);

module.exports = router;
