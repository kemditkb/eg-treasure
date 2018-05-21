var express = require('express');
var router = express.Router();

router.get('/list', function(req, res, next) {
  res.render('list');
});

router.get('/item', function(req, res, next) {
  res.render('item');
});

module.exports = router;
