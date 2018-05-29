var express = require('express');
var router = express.Router();

var firebase = require('../connections/firebase_connect');
var fireDB = require('../connections/firebase_admin_connect');
var mitake = require('../connections/mitake_connect');
var fireAuth = firebase.auth();

var axios = require('axios');
var querystring = require('querystring');

router.get('/login', function (req, res, next) {
  res.render('user/login');
});

router.post('/login', function (req, res, next) {
  var loginUser = req.body;
  fireAuth.signInWithEmailAndPassword(loginUser.email, loginUser.password)
    .then(function (user) {
      req.session.uid = user.uid;
      fireDB.ref('/user/' + user.uid).once('value')
        .then(function (snapshot) {
          var profile = snapshot.val();
          if (!user.emailVerified || !profile.phoneVerified) {
            req.session.phone = profile.phone;
            res.send({
              'success': true,
              'message': '登入成功',
              'redirect': '/user/verify'
            });
          } else {
            res.send({
              'success': true,
              'message': '登入成功',
              'redirect': '/'
            });
          }
        })
    })
    .catch(function (error) {
      res.send({
        'success': false,
        'message': '登入失敗',
        'redirect': null
      });
    })
});

router.get('/logout', function (req, res, next) {
  fireAuth.signOut();
  req.session.destroy();
  res.redirect('/');
});

router.get('/signup', function (req, res, next) {
  res.render('user/signup', { auth: req.session.uid });
});

router.post('/signup', function (req, res, next) {
  var newUser = req.body;
  fireAuth.createUserWithEmailAndPassword(newUser.email, newUser.password)
    .then(function (user) {
      delete newUser['password'];
      newUser.admin = 0;
      newUser.level = 0;
      newUser.phoneVerified = false;
      fireDB.ref('/user/' + user.uid).set(newUser);
      req.session.uid = user.uid;
      req.session.phone = newUser.phone;
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
  if ((req.session.uid) && (req.session.phone)) {
    var user = fireAuth.currentUser;
    if(!user.emailVerified) {
      user.sendEmailVerification();
    }
    res.render('user/verify', { auth: req.session.uid, email: user.email, phone: req.session.phone });
  } else {
    res.redirect('/user/signup');
  }
});

router.get('/success', function (req, res, next) {
  if (req.session.uid) {
    res.render('user/success', { auth: req.session.uid });
  } else {
    res.redirect('/user/signup');
  }
});

router.get('/forgot', function (req, res, next) {
  res.render('user/forgot');
});

router.post('/forgot', function (req, res, next) {
  var email = req.body.email;
  fireAuth.sendPasswordResetEmail(email)
  .then(function () {
    res.send({
      'success': true,
      'message': "密碼重置的郵件已發送，請查收郵件。",
      'redirect': null
    });
  })
  .catch(function(error) {
    res.send({
      'success': false,
      'message': "你輸入的郵件位置無效，請重新輸入。",
      'redirect': null
    });
  })
});

router.get('/level', function (req, res, next) {
  res.render('user/level', { auth: req.session.uid });
});

router.post('/checkEmail', function (req, res, next) {
  if (req.session.uid) {
    var user = fireAuth.currentUser;
    user.reload()
      .then(function () {
        var success = fireAuth.currentUser.emailVerified;
        res.send({
          'success': success,
          'message': null,
          'redirect': null
        });
      })
  }
});

router.post('/checkPhone', function (req, res, next) {
  if (req.session.uid) {
    fireDB.ref('/user/' + req.session.uid + '/phoneVerified').once('value')
      .then(function (snapshot) {
        var success = snapshot.val();
        res.send({
          'success': success,
          'message': null,
          'redirect': null
        });
      })
  }
});

router.post('/checkPhoneCode', function (req, res, next) {
  if (req.session.uid) {
    var code = req.body.code;
    if (code === req.session.code) {
      fireDB.ref('/user/' + req.session.uid).update({ 'phoneVerified': true });
      res.send({
        'success': true,
        'message': null,
        'redirect': null
      });
    } else {
      res.send({
        'success': false,
        'message': "驗證碼錯誤，請重新輸入",
        'redirect': null
      });
    }
  }
});

router.post('/sendEmailVerification', function (req, res, next) {
  if (req.session.uid) {
    var user = fireAuth.currentUser;
    user.sendEmailVerification()
      .then(function () {
        res.send({
          'success': true,
          'message': "驗證信已寄出",
          'redirect': null
        });
      })
  }
});

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

router.post('/sendPhoneVerification', function (req, res, next) {
  if ((req.session.uid) && (req.session.phone)) {
    var username = mitake.username;
    var password = mitake.password;
    var phone = req.session.phone;
    var code = getRandomInt(10000, 99999);
    req.session.code = code.toString();
    var message = querystring.escape("感謝您註冊世界古董國寶交換中心網站會員，請於驗證網頁輸入驗證碼「" + code + "」，驗證碼於發送後15鐘有效，逾期請重新取得驗證碼。");
    var smsApi = "http://smexpress.mitake.com.tw:9600/SmSendGet.asp?username=" + username + "&password=" + password + "&dstaddr=" + phone + "&smbody=" + message + "&encoding=UTF8";

    axios.get(smsApi)
      .then(function (response) {
        res.send({
          'success': true,
          'message': "驗證碼已發送",
          'redirect': null
        });
      })
      .catch(function (error) {
        res.send({
          'success': false,
          'message': "",
          'redirect': null
        });
      })
  }
});

module.exports = router;
