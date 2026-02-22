const express = require('express');
const router = express.Router();
const api = require('./api/index')

router.use(process.env.BASE_URL, api)

module.exports = router;