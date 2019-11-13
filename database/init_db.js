/* eslint-disable no-console */
require('dotenv').config();

const pool = require('../database/config.js');

/**
 * Create Users Table
 */
const createUsersTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
      users(
        id serial primary key,
        firstname varchar(50) not null,
        lastname varchar(50),
        middlename varchar(50),
        email varchar(255) unique not null,
        password varchar(255) not null,
        phone varchar(20) unique,
        username varchar(50) unique,
        avatar varchar(500), 
        date_of_birth date,
        gender varchar(6), 
        address text, 
        is_active int, 
        role_id int,
        last_login_attempt timestamp, 
        login_attempts int,
        created_at TIMESTAMP,
        updated_at TIMESTAMP,
        FOREIGN KEY (role_id) REFERENCES roles (id)
      )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/*
  Create Roles table
*/
const createRolesTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
      roles(
        id serial primary key not null,
        name varchar(50) not null, 
        code varchar(50) not null, 
        created_at timestamp
      )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/*
  Create Articles table
*/
const createArticlesTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS 
      articles(
        id serial primary key, 
        title varchar(500), 
        content text, 
        user_id int not null, 
        created_at timestamp, 
        updated_at timestamp,
        FOREIGN KEY (user_id) REFERENCES users (id)
      )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/*
  Create gifs table
*/
const createGifsTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
      gifs(
        id serial primary key, 
        article_id int not null, 
        url text, 
        cloudinary_id varchar(500), 
        created_at timestamp, 
        updated_at timestamp,
        FOREIGN KEY (article_id) REFERENCES articles (id)
      )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/*
  Create Article comments
*/
const createArticleCommentsTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
      article_comments(
        id serial primary key, 
        article_id int not null, 
        comment text, 
        created_at timestamp, 
        updated_at timestamp,
        FOREIGN KEY (article_id) REFERENCES articles (id)
      )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/*
  Init Data
*/
const insertInitData = () => {
  const queryText = `INSERT INTO users (
    firstname, lastname, middlename, email, password, phone, username, avatar, date_of_birth, gender, address, is_active, role_id, last_login_attempt, login_attempts
    values('Opeyemi', 'Adeyeye', null, 'sdprintzprof@gmail.com', '$2a$08$yI7mUE5N5P7ob59Oz8LQi.RYWbLQ.s/rOePNNz0G4cOoSw./vP.rq', '08065612206', null, null, '1993-05-27', 'Male', 'Ipaja, Lagos', 1, 1, null, null)`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Drop User Table
 */
const dropUserTable = () => {
  const queryText = 'DROP TABLE IF EXISTS users returning *';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Drop Roles Table
 */
const dropRolesTable = () => {
  const queryText = 'DROP TABLE IF EXISTS roles returning *';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Drop Articles Table
 */
const dropArticlesTable = () => {
  const queryText = 'DROP TABLE IF EXISTS articles returning *';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Drop Gifs Table
 */
const dropGifsTable = () => {
  const queryText = 'DROP TABLE IF EXISTS gifs returning *';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Drop Article comments Table
 */
const dropArticleCommentsTable = () => {
  const queryText = 'DROP TABLE IF EXISTS article_comments returning *';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Create All Tables
 */
const createAllTables = () => {
  createUsersTable();
  createRolesTable();
  createArticlesTable();
  createGifsTable();
  createArticleCommentsTable();
  insertInitData();
};

/**
 * Drop All Tables
 */
const dropAllTables = () => {
  dropUserTable();
  dropRolesTable();
  dropArticlesTable();
  dropGifsTable();
  dropArticleCommentsTable();
};

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

module.exports = {
  createAllTables,
  createUsersTable,
  createRolesTable,
  createArticlesTable,
  createGifsTable,
  createArticleCommentsTable,
  dropAllTables,
  dropUserTable,
  dropRolesTable,
  dropArticlesTable,
  dropGifsTable,
  dropArticleCommentsTable,
};

require('make-runnable');
