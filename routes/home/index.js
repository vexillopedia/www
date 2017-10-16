'use strict';

const express = require('express');
const fetch = require('node-fetch');

const router = express.Router();

// Home
router.get('/', (req, res, next) => {
  let urls = [
    req.protocol + '://' + req.get('host') + '/api/categories',
    req.protocol + '://' + req.get('host') + '/api/flags'
  ];

  Promise.all(urls.map(url => fetch(url).then(data => data.json())))
    .then(json => {
      res.render('index', {
        categories: json[0].data,
        flags: json[1].data
      });
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
