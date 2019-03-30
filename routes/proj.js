var express = require('express');
var router = express.Router();
var db = require('../database/db.connect.js');

/* Get inicial, retorna a view proj.ejs */
router.get('/', function(req, res, next) {


  if(req.query.lang){
    var query = "SELECT * FROM projetos WHERE linguagem = ? LIMIT 10 OFFSET ?"
    var lang  = req.query.lang;
    var page = (parseInt(req.query.page) - 1) * 5 ;
    var table = [lang, page];

    query = global.db.format(query, table);
    global.db.query(query, function(err, results) {
      if (err) throw err;
      res.render('proj', { title: 'Projetos', results: results });
      return;
    });
  }

  if(!req.query.lang){
    global.db.query("SELECT * FROM projetos", function(err, results, fields) {
      if (err) throw err;
      res.render('proj', { title: 'Projetos', results: results });
      return;
    });
  }

});


/* Get para o formulario, retorna a view projadd.ejs */
router.get('/add', function(req, res, next) {
  res.render('projadd', { title: 'Projetos - Adicionar Projetos', erro:'0', results:'undifinied' });
  return;
});

/* Post que pega toda informacão do formulario e insere */
/* no database, retorna a view proj.ejs                 */
router.post('/add', function(req, res) {
  var dt = Date(Date.now());
  var projadd = req.body;
  var sql = "INSERT INTO projetos SET ?";
  req.body.pimg = '/images/lpic/'+req.body.linguagem+'.jpg';

    if(!req.body.pnome){
      res.render('projadd', { title: 'Projetos - Adicionar Projetos',
                              erro:'Nome do Projeto',
                              results: req.body });
      return;
    }

    if(!req.body.pdesc){
      res.render('projadd', { title: 'Projetos - Adicionar Projetos',
                              erro:'Descrição do Projeto',
                              results: req.body });
      return;
    }

    if(!req.body.plink){
      res.render('projadd', { title: 'Projetos - Adicionar Projetos',
                              erro:'Github do Projeto',
                              results: req.body });
      return;
    }

    if(!req.body.dnome){
      res.render('projadd', { title: 'Projetos - Adicionar Projetos',
                              erro:'Nome do Desenvolvedor',
                              results: req.body });
      return;
    }

    if(req.body.linguagem  == 'Escolha'){
      res.render('projadd', { title: 'Projetos - Adicionar Projetos',
                              erro:'a Linguagem',
                              results: req.body });
      return;
    }

   global.db.query(sql, projadd, function(err, results, fields) {
   if (err) throw err;
   res.redirect('/proj');
   return;
   });
});

/* Get para deletar o projeto, retorna a view proj.ejs */
router.get('/del/:id', function(req, res) {
  var projid = req.params.id;
  var sql = "DELETE FROM projetos WHERE id = ?";
  global.db.query(sql, projid, function(err, results, fields) {
    if (err) throw err;
    res.redirect('/proj/');
    return;
  });
});

module.exports = router;
