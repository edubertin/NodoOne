var express = require('express');
var router = express.Router();
var db = require('../database/db.connect.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users', { title: 'Login'});
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Registro', erro:'0', results:'undifinied' });
});

router.post('/register', function(req, res) {
  var users = req.body;
  var sql = "INSERT INTO users SET ?";


    if(!req.body.nome){
      res.render('register', { title: 'Registro',
                              erro:'Nome',
                              results: req.body });
      return;
    }

    if(!req.body.email){
      res.render('register', { title: 'Registro',
                              erro:'Email',
                              results: req.body });
      return;
    }

    if(!req.body.github){
      res.render('register', { title: 'Registro',
                              erro:'Link do Github',
                              results: req.body });
      return;
    }

    if(!req.body.password){
      res.render('register', { title: 'Registro',
                              erro:'sua senha',
                              results: req.body });
      return;
    }
   global.db.query(sql, users, function(err, results, fields) {
   if (err) throw err;
   res.redirect('/users');
   });
  return;
});



module.exports = router;
