var express = require('express');
var router = express.Router();
var db = require('../database/db.connect.js');


/* GET users listing. */
router.get('/', function(req, res, next) {
  global.db.query('SELECT * FROM bibliotecas', function(err, results) {
    if (err) throw err;
    res.render('lib', { title: 'Bibliotecas', results: results });
  });
});

module.exports = router;
