var express = require('express');
var router = express.Router();

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/login', function(req, res, next) {
    console.log(req.body);
    res.redirect('/');
});

router.get('/register', function(req, res, next) {
    res.render('register');
});

router.post('/register', function(req, res, next) {
  console.log(req.body);
  res.redirect('/');
});

router.get('/forgot', function(req, res, next) {
  res.render('forgot');
});

router.post('/forgot', function(req, res, next) {
  console.log(req.body);
  res.redirect('/');
});

router.get('/level', function(req, res, next) {
  res.render('level');
});

module.exports = router;
