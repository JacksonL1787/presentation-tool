const express = require('express');
const router = express.Router();

const update = require('./updateDB');
const render = require('./render')
/* GET home page. */

router.get('/create', function(req, res, next) {
  res.render('create');
});

router.get('/edit/:presentationID/:slide', function(req, res, next) {
  render.editor(req,res,next)
});

router.get('/preview/:presentationID/:slide', function(req, res, next) {
  render.preview(req,res,next)
});

router.post('/create', function(req, res, next) {
  update.createPresentation(req,res,next);
});

router.post('/delete', function(req, res, next) {
  update.deletePresentation(req,res,next);
});

module.exports = router;
