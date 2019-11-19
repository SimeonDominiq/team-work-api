/* eslint-disable no-unused-vars */
const cloud = require('../config/cloudinary-config');

const Article = require('../models/article');

exports.createArticle = (req, res) => {
  const createdAt = new Date(Date.now());
  const authUser = req.user;
  req.body.created_at = createdAt;
  req.body.user_id = authUser.sub.id;
  const gifData = {};

  if (req.file) {
    const { path } = req.file;

    cloud.uploads(path)
      .then((result) => result)
      .then((result) => {
        Article.create(req.body)
          .then((article) => article)
          .then((article) => {
            // Build gif data to be saved & chain to next promise
            gifData.article_id = article.id;
            gifData.url = result.url;
            gifData.cloudinary_id = result.id;
            gifData.created_at = createdAt;
            return gifData;
          })
          .then((gifDetails) => Article.insertGif(gifDetails))
          .then((response) => res.status(201).json({
            status: 'success',
            data: response,
          }));
      }).catch((err) => res.status(400).json({
        status: 'error',
        error: err,
      }));
  } else {
    Article.create(req.body)
      .then((result) => result)
      .catch((err) => res.status(400).json({
        status: 'error',
        error: err.message,
      }));
  }
};

exports.getAllArticles = (req, res) => {
  Article.findAll()
    .then((result) => res.status(200).json({
      status: 'success',
      data: result,
    }))
    .catch((err) => res.status(400).json({
      status: 'error',
      error: err.message,
    }));
};

exports.deleteArticle = (req, res) => {

};
