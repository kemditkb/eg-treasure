var express = require('express');
var router = express.Router();

router.get('/list', function(req, res, next) {
  res.render('product/list');
});

router.get('/item', function(req, res, next) {
  res.render('product/item');
});

module.exports = router;
