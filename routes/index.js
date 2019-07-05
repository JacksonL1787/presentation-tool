var express = require('express');
var router = express.Router();

const render = require('./render')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/presentations')
});

router.get('/presentations', function(req, res, next) {
  render.presentations(req,res,next)
});

router.get('/image', function(req, res, next) {
  res.render('image');
});

router.get('/preview/design/:designID', function(req, res, next) {
  res.render('design-preview', {designID: req.params.designID});
});

module.exports = router;
