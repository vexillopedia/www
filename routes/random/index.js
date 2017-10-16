'use strict';

const express = require('express');
const fetch = require('node-fetch');
const uniqueRandom = require('unique-random-array');

const router = express.Router();

// Random Flag
router.get('/', (req, res) => {
  let urls = [req.protocol + '://' + req.get('host') + '/api/flags/'];

  Promise.all(urls.map(url => fetch(url).then(response => response.json())))
    .then(json => {
      res.redirect('/flag/' + uniqueRandom(json[0].data)());
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
