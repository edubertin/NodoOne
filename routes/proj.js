var express = require('express');
var router = express.Router();
var db = require('../database/db.connect.js');

/* Get inicial, retorna a view proj.ejs */
router.get('/', function(req, res, next) {
  global.db.query("SELECT * FROM projetos ORDER BY pnome ASC", function(err, results) {
    if (err) throw err;
    res.render('proj', { title: 'Projetos', results: results });
  });
});

/* Get para o formulario, retorna a view projadd.ejs */
router.get('/add', function(req, res, next) {
  res.render('projadd', { title: 'Projetos - Adicionar Projetos' });
});

/* Post que pega toda informacão do formulario e insere */
/* no database, retorna a view proj.ejs                 */
router.post('/add', function(req, res) {
  var dt = Date(Date.now());
  var projadd = req.body;
  var sql = "INSERT INTO projetos SET ?";
  global.db.query(sql, projadd, function(err, results, fields) {
    if (err) throw err;
    res.redirect('/proj');
  });
});

/* Get para deletar o projeto, retorna a view proj.ejs */
router.get('/del/:id', function(req, res) {
  var projid = req.params.id;
  var sql = "DELETE FROM projetos WHERE id = ?";
  global.db.query(sql, projid, function(err, results, fields) {
    if (err) throw err;
    res.redirect('/proj');
  });
});

module.exports = router;
