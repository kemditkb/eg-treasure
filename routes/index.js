var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/privacy', function(req, res, next) {
  res.render('privacy');
});

router.get('/rules', function(req, res, next) {
  res.render('rules');
});

router.get('/news', function(req, res, next) {
  res.render('news');
});

router.get('/faq', function(req, res, next) {
  res.render('faq');
});

module.exports = router;
