var express = require('express');
var router = express.Router();

var firebase = require('../connections/firebase_connect');
var fireDB = require('../connections/firebase_admin_connect');
var fireAuth = firebase.auth();

router.get('/', function (req, res, next) {
  if (req.session.admin) {
    res.render('admin/index', { layout: 'layout/admin' });
  } else {
    res.render('admin/login', { layout: 'layout/basic' });
  }
});

router.get('/category', function (req, res, next) {
  if (req.session.admin) {
    fireDB.ref('category').once('value', function (snapshot) {
      var data = snapshot.val();
      res.render('admin/category', {
        layout: 'layout/admin',
        category: data
      });
    })
  } else {
    res.redirect('/admin');
  }
});

router.get('/product', function (req, res, next) {
  if (req.session.admin) {
    res.render('admin/product', { layout: 'layout/admin' });
  } else {
    res.redirect('/admin');
  }
});

router.post('/login', function (req, res, next) {
  var loginUser = req.body;
  fireAuth.signInWithEmailAndPassword(loginUser.email, loginUser.password)
    .then(function (user) {
      fireDB.ref('/user/' + user.uid).once('value')
        .then(function (snapshot) {
          var profile = snapshot.val();
          if (profile.admin) {
            req.session.admin = true;
            res.json({
              success: true,
              message: '登入成功',
              redirect: '/admin'
            });
          } else {
            res.json({
              success: false,
              message: '權限不足，請洽系統管理員',
              redirect: '/admin'
            });
          }
        })
    })
    .catch(function (error) {
      res.send({
        success: false,
        message: '帳號或密碼錯誤。',
        redirect: null
      });
    })
});

router.get('/logout', function (req, res, next) {
  req.session.admin = false;
  res.render('admin/login', { layout: 'layout/basic' });
});

router.post('/addCategory', function (req, res, next) {
  var name = req.body.name;
  var categoryRef = fireDB.ref('category').push();
  categoryRef.set({ "name": name })
    .then(function () {
      res.json({
        success: true
      });
    })
});

router.post('/updateCategory', function (req, res, next) {
  var id = req.body.id;
  var name = req.body.name;
  fireDB.ref('category/' + id).set({ "name": name })
    .then(function () {
      res.json({
        success: true
      });
    })
});

router.post('/removeCategory', function (req, res, next) {
  var id = req.body.id;
  fireDB.ref('category').child(id).remove()
    .then(function () {
      console.log(id);
      res.json({
        success: true
      });
    })
});

module.exports = router;