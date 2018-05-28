var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('index', { auth: req.session.uid });
});

router.get('/privacy', function (req, res, next) {
  res.render('privacy', { auth: req.session.uid });
});

router.get('/rules', function (req, res, next) {
  res.render('rules', { auth: req.session.uid });
});

router.get('/news', function (req, res, next) {
  res.render('news', { auth: req.session.uid });
});

router.get('/faq', function (req, res, next) {
  res.render('faq', { auth: req.session.uid });
});

module.exports = router;
