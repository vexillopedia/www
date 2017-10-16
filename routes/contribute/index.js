'use strict';

const express = require('express');

const router = express.Router();

// Contribute
router.get('/', (req, res) => {
  res.redirect('https://github.com/AntonioVdlC/vexillopedia');
});

module.exports = router;
