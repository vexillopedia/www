'use strict';

const express = require('express');
const fetch = require('node-fetch');

const router = express.Router();

// Categories
router.get('/:category', (req, res) => {
  let urls = [
    req.protocol +
      '://' +
      req.get('host') +
      '/api/category/' +
      req.params.category
  ];

  Promise.all(
    urls.map(url =>
      fetch(url).then(response => {
        if (response.status === 200) return response.json();
        else return Promise.reject(response);
      })
    )
  )
    .then(json => {
      res.render('category', {
        name: req.params.category,
        flags: json[0].data
      });
    })
    .catch(err => {
      if (err.status === 404)
        res.send('Category ' + req.params.category + ' not found.');
      else res.send("Oops, that wasn't expected!");

      next(err);
    });
});

module.exports = router;
