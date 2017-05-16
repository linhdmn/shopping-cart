var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var assert = require('assert');

var url = 'mongodb://localhost:27017/shopping';


var Product = require('../models/product');
router.get('/', function(req, res, next) {
    res.render('shop/insert', {tittle: 'Insert books'})
});


router.post('/insert', function (req, res, next) {
    var item =  {
        imagePath:req.body.imagePath,
        tittle: req.body.tittle,
        description: req.body.description,
        price: req.body.price

    }
    mongo.connect(url, function (err, db) {
        if(err){
            console.log("Unable to connect server");
        }else{
            var collection = db.collection('products');
            collection.insert([item], function (err, result) {
                if(err){
                    console.log(err);
                }
                else{
                    res.redirect("index");
                }
            });
        }
    })

    res.redirect('localhost:3000');
});


module.exports = router;