var express = require('express');
var router = express.Router();


var firebase = require('../connections/firebase_connect');
var fireDB = require('../connections/firebase_admin_connect');
var fireAuth = firebase.auth();

router.get('/login', function (req, res, next) {
  res.render('user/login');
});

router.post('/login', function (req, res, next) {
  console.log(req.body);
  res.redirect('/');
});

router.get('/signup', function (req, res, next) {
  res.render('user/signup');
});

router.post('/signup', function (req, res, next) {
  var newUser = req.body;
  fireAuth.createUserWithEmailAndPassword(newUser.email, newUser.password)
    .then(function (user) {
      delete newUser ['password'];
      newUser.admin = 0;
      newUser.level = 0;
      fireDB.ref('/user/'+user.uid).set(newUser);
      return user.getIdToken();
    })
    .then(function(token) {
      req.session.token = token;
      res.send({
        'success': true,
        'message': '',
        'redirect': '/user/verify'
      });
    })
    .catch(function (error) {
      res.send({ 
        'success': false,
        'message': error.message,
        'redirect': null
      });
    })
});

router.get('/verify', function (req, res, next) {
  console.log(req.session.token);
  res.render('user/verify');
});

router.get('/forgot', function (req, res, next) {
  res.render('user/forgot');
});

router.post('/forgot', function (req, res, next) {
  console.log(req.body);
  res.redirect('/');
});

router.get('/level', function (req, res, next) {
  res.render('user/level');
});

module.exports = router;
