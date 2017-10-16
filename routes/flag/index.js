'use strict';

const express = require('express');
const fetch = require('node-fetch');

const router = express.Router();

// Flags
router.get('/:flag', (req, res) => {
  let urls = [
    req.protocol + '://' + req.get('host') + '/api/flag/' + req.params.flag
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
      res.render('flag', json[0].data);
    })
    .catch(err => {
      if (err.status === 404)
        res.send('Flag ' + req.params.flag + ' not found.');
      else res.send("Oops, that wasn't expected!");

      next(err);
    });
});

module.exports = router;
