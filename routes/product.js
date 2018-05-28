var express = require('express');
var router = express.Router();

router.get('/list', function(req, res, next) {
  res.render('product/list', { auth: req.session.uid });
});

router.get('/item', function(req, res, next) {
  res.render('product/item', { auth: req.session.uid });
});

module.exports = router;
