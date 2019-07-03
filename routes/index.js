var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/presentations')
});

router.get('/presentations', function(req, res, next) {
  res.render('presentations');
});

router.get('/create', function(req, res, next) {
  res.render('create');
});

router.get('/image', function(req, res, next) {
  res.render('image');
});

module.exports = router;
