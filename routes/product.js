var express = require('express');
var router = express.Router();

router.get('/list', function(req, res, next) {
  res.render('product_list');
});

router.get('/detial', function(req, res, next) {
    res.render('product_detial');
  });

module.exports = router;
