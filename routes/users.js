var express = require('express');
var router = express.Router();
var db = require('../database/db.connect.js');
const bcrypt = require('bcrypt');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users', { title: 'Login', erro:'0', results:'undifinied'});
});

router.post('/', function(req, res, next) {

  global.db.query("SELECT * FROM users", function(err, results) {
    if (err) throw err;
      for(i = 0; i < results.length ; i++){
        if(results[i].email == req.body.email){
          if(bcrypt.compareSync(req.body.password, results[i].password)) {
                res.render('users', { title: 'Usuários', erro:'LOGADO', results:'undifinied' });
                return;
              } else {
                res.render('users', { title: 'Usuários', erro:'ERRO : Senha Errada', results:'undifinied' });
                return;
          }
        }
      }
    res.render('users', { title: 'Usuários', erro:'ERRO : Email não existe', results:'undifinied' });
    return;
  });
});


router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Registro', erro:'0', results:'undifinied' });
});

router.post('/register', function(req, res, next) {
  var users = req.body;
  var sql = "INSERT INTO users SET ?";


    if(!req.body.nome){
      res.render('register', { title: 'Registro',
                              erro:'Insira seu Nome.',
                              results: req.body });
      return;
    }

    if(!req.body.email){
      res.render('register', { title: 'Registro',
                              erro:'Digite seu Email.',
                              results: req.body });
      return;
    }

    if(!req.body.github){
      res.render('register', { title: 'Registro',
                              erro:'Insira o Link do Github.',
                              results: req.body });
      return;
    }

    if(!req.body.password){
      res.render('register', { title: 'Registro',
                              erro:'Insira sua senha.',
                              results: req.body });
      return;
    }

      global.db.query("SELECT * FROM users where email = ?", req.body.email, function(err, results, fields) {
        if(err){
          console.log(err);
        } else {
            if(results == ''){
                        users.password = bcrypt.hashSync(req.body.password, 10);
                        global.db.query(sql, users, function(err, results) {
                        if (err) throw err;
                        res.render('register', { title: 'Registro', erro:'Usuario cadastrado', results:'undifinied' });
                        return;
                        });
            }  else {
            res.render('register', { title: 'Registro', erro:'Email já cadastrado', results:'undifinied' });
            return;
            }
        }
      });
});

module.exports = router;
