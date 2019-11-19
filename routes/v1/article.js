const express = require('express');

const router = express.Router();

const multer = require('../../middleware/multer-config');

const articleCtrl = require('../../controllers/article');

router.get('/', articleCtrl.getAllArticles);

router.post('/', multer, articleCtrl.createArticle);

module.exports = router;
