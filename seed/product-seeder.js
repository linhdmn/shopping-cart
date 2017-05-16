var Product = require('../models/product');

var mongoose = require('mongoose');

mongoose.connect('localhost:27017/shopping');

var productsss =
[
    new Product({
       imagePath: 'http://bitemyapp.com/images/lpthw_digi.jpg',
       tittle: 'Learn python the hard way',
       description: 'Awesome book!!!',
       price: 10
    }),
    new Product({
        imagePath: 'https://images-na.ssl-images-amazon.com/images/I/514%2BuJSdhhL._AC_UL320_SR240,320_.jpg',
        tittle: 'Learn ruby the hard way',
        description: 'Awesome book!!!',
        price: 10
    }),
    new Product({
        imagePath: 'https://images-na.ssl-images-amazon.com/images/I/518yVM9PmGL._SX382_BO1,204,203,200_.jpg',
        tittle: 'Learn c the hard way',
        description: 'Awesome book!!!',
        price: 10
    })
];
var done = 0;
for (var i = 0; i < productsss.length; i++) {
    productsss[i].save(function (err, result) {
        done++;
        if(done == productsss.length){
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}