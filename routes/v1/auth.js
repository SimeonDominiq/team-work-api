const express = require('express');

const router = express.Router();

const authCtrl = require('../../controllers/auth');

router.get('/test', authCtrl.test);

module.exports = router;
