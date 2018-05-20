var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('product/list');
});

router.get('/detial', function(req, res, next) {
    res.render('product/detial');
  });

module.exports = router;
