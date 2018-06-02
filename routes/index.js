var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('index', { layout: 'layout/treasure' });
});

router.get('/privacy', function (req, res, next) {
  res.render('privacy', { layout: 'layout/treasure' });
});

router.get('/rules', function (req, res, next) {
  res.render('rules', { layout: 'layout/treasure' });
});

router.get('/news', function (req, res, next) {
  res.render('news', { layout: 'layout/treasure' });
});

router.get('/faq', function (req, res, next) {
  res.render('faq', { layout: 'layout/treasure' });
});

module.exports = router;
