var express = require('express');
var router = express.Router();
var db = require('../database/db.connect.js');


/* GET users listing. */
router.get('/', function(req, res, next) {
  global.db.query('SELECT * FROM projetos ORDER BY pnome ASC', function(err, results) {
    if (err) throw err;
    res.render('proj', { title: 'Projetos', results: results });
  });
});

router.get('/add', function(req, res, next) {
    res.render('projadd', { title: 'Projetos - Adicionar Projetos' });
});

router.post('/add', function(req, res) {

var dt = Date(Date.now());
var projadd = req.body;

var sql = "INSERT INTO projetos SET ?";

  global.db.query(sql, projadd, function(err, results, fields) {
    if (err) throw err;
    res.redirect('/proj');
  });
});



module.exports = router;
