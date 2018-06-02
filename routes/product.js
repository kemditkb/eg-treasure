var express = require('express');
var router = express.Router();

router.get('/list', function(req, res, next) {
  res.render('product/list', { layout: 'layout/treasure' });
});

router.get('/item', function(req, res, next) {
  res.render('product/item', { layout: 'layout/treasure' });
});

module.exports = router;
