var express = require('express');
var router = express.Router();

var Product = require('../models/product');

var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectId;
var assert = require('assert');

var url = 'mongodb://localhost:27017/shopping';

/* GET home page. */
router.get('/', function(req, res, next) {
  Product.find(function (err, docs) {
      res.render('shop/index', {tittle: 'Books store', product: docs});
  });

});

router.get('/insert', function(req, res, next) {
    res.render('shop/insert', {tittle: 'Insert books'})
});


router.post('/insert', function (req, res, next) {
    var item =  {
        imagePath:req.body.imagePath,
        tittle: req.body.tittle,
        description: req.body.description,
        price: req.body.price

    };

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
                    console.log("data update!");
                    res.redirect('/');
                }
            });
        }
    });

});

router.get('/update', function(req, res, next) {
    res.render('shop/update', {tittle: 'Update books'})
});

router.post('/update', function (req, res, next) {
    var item =  {
        imagePath:req.body.imagePath,
        tittle: req.body.tittle,
        description: req.body.description,
        price: req.body.price

    }
    var id = req.body.id;
    mongo.connect(url, function (err, db) {
        if(err){
            console.log("Unable to connect server");
        }else{
            var collection = db.collection('products');
            collection.updateOne({"_id": objectId(id)}, {$set: item}, function (err, result) {
                if(err){
                    console.log(err);
                }
                else{
                    res.redirect('/');
                }
            });
        }
    });

});

router.get('/detail/:id', function(req, res, next) {
    var productId = req.params.id;
    Product.findById(productId, function (err, docs) {
        if(err){
            return res.redirect('/');
        }
        var item =  {
            imagePath:this.imagePath,
            tittle: this.tittle,
            description: this.description,
            price: this.price

        };

        res.render('shop/detail', {tittle: 'Detail books', product:docs})
    });
});


router.post('/detail/:id', function (req, res, next) {
    var id = req.params.id;

    mongo.connect(url, function (err, db) {
        if(err){
            console.log("Unable to connect server");
        }else{
            var collection = db.collection('products');
            collection.deleteOne({"_id": objectId(id)}, function (err, result) {
                if(err){
                    console.log(err);
                }
                else{
                    console.log("book deleted!");
                    res.redirect('/');
                }
            });
        }
    });

});

module.exports = router;
