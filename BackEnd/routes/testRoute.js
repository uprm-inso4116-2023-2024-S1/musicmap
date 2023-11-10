const express = require('express');
var router = express.Router();

var list = ['test','list']
/* GET home page. */
router.get('/', function(req, res, next) {
  res.send(list);
//   res.send(1)
//   res.send(list)
});

module.exports = router;