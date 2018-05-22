var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/privacy', function(req, res, next) {
  res.render('privacy');
});

module.exports = router;
