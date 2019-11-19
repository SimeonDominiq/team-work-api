/* eslint-disable no-param-reassign */
const pool = require('../database/config.js');

function findOneById(id) {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM articles WHERE id = $1', [id])
      .then((result) => {
        if (result.rows[0]) {
          resolve(result.rows[0]);
        } else {
          reject(new Error('No Article found'));
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}

module.exports = {
  findAll: () => new Promise((resolve, reject) => {
    pool.query('SELECT a.*, g.url, g.cloudinary_id FROM articles AS a LEFT JOIN gifs AS g ON a.id = g.article_id', [])
      .then((results) => {
        resolve(results.rows);
      })
      .catch((err) => {
        reject(err);
      });
  }),

  findOne: (data) => new Promise((resolve, reject) => {
    if (!data.id) {
      reject(new Error('You must provide article id '));
    } else if (data.id) {
      findOneById(data.id)
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    }
  }),

  create: (data) => new Promise(((resolve, reject) => {
    pool.query(
      'INSERT INTO articles (title, content, user_id, created_at) VALUES ($1, $2, $3, $4) returning *', [data.title, data.content, data.user_id, data.created_at],
    )
      .then((result) => {
        resolve(result.rows[0]);
      })
      .catch((err) => {
        reject(err);
      });
  })),

  insertGif: (data) => new Promise((resolve, reject) => {
    pool.query(
      'INSERT INTO gifs (article_id, url, cloudinary_id, created_at) VALUES ($1, $2, $3, $4) returning *', [data.article_id, data.url, data.cloudinary_id, data.created_at],
    )
      .then((result) => pool.query(`SELECT a.*, g.url, g.cloudinary_id FROM articles AS a LEFT JOIN gifs AS g ON a.id = g.article_id WHERE a.id = ${result.rows[0].article_id}`, []))
      .then((result) => {
        resolve(result.rows[0]);
      })
      .catch((err) => {
        reject(err);
      });
  }),

};
