var express = require('express');
var router = express.Router();
const indexController = require('../controllers/indexController.js');

// mysql setting
const mysql = require('../config/mysql.js');

/* GET home page. */
router.get('/', indexController.indexPage);

module.exports = router;
