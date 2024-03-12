const express = require('express');
const router  = express.Router();

const users = require('./users');
const songs = require('./songs');

router.use('', users);
router.use('', songs);

module.exports = router;