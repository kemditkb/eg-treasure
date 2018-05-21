var express = require('express');
var router = express.Router();

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/login', function(req, res, next) {
    console.log(req.body.email);
    console.log(req.body.password);
    res.redirect('/');
});

router.get('/register', function(req, res, next) {
    res.render('register');
});

router.post('/register', function(req, res, next) {
  console.log(req.body);
  res.redirect('/');
});

module.exports = router;
