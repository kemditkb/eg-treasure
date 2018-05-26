var express = require('express');
var router = express.Router();


var firebase = require('../connections/firebase_connect');
var fireDB = require('../connections/firebase_admin_connect');
var fireAuth = firebase.auth();

router.get('/login', function (req, res, next) {
  res.render('login');
});

router.post('/login', function (req, res, next) {
  console.log(req.body);
  res.redirect('/');
});

router.get('/register', function (req, res, next) {
  res.render('register');
});

router.post('/register', function (req, res, next) {
  console.log(req.body);
  var newUser = req.body;
  fireAuth.createUserWithEmailAndPassword(newUser.email, newUser.password)
    .then(function (user) {
      delete newUser ['password'];
      fireDB.ref('/user/'+user.uid).set(newUser);
      res.send({
        'success': true,
        'message': ''
      });
    })
    .catch(function (error) {
      res.send({ 
        'success': false,
        'message': error.message
      });
    })
});

router.get('/forgot', function (req, res, next) {
  res.render('forgot');
});

router.post('/forgot', function (req, res, next) {
  console.log(req.body);
  res.redirect('/');
});

router.get('/level', function (req, res, next) {
  res.render('level');
});

module.exports = router;
