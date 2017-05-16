var express = require('express');
var router = express.Router();

var Product = require('../models/product');
router.get('/', function(req, res, next) {
    res.render('shop/detail', {tittle: 'Detail books'})
});


router.post('/delete', function(req, res, next){

});

module.exports = router;
