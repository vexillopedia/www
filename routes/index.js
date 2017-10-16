'use strict';

const express = require('express');

const router = express.Router();

router.use('/api', require('./api'));

router.use('/', require('./home'));
router.use('/category', require('./category'));
router.use('/flag', require('./flag'));
router.use('/random', require('./random'));
router.use('/contribute', require('./contribute'));

module.exports = router;
