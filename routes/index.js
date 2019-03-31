var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'NodoOne' });
});

router.get('/sobre', function(req, res, next) {
  res.render('sobre', { title: 'NodoOne - Sobre' });
});


module.exports = router;
