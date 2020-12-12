var express = require('express');
var router = express.Router();
var mProd = require('../models/productsModel');

/* GET all. */
router.get('/', async function(req, res, next) {
  let products =  await mProd.getAllProducts();
  res.status(products.status).
    send(products.data); 
});

router.get('/:name', async function(req, res, next) {
  let productName = req.params.name;
  let product =  await mProd.getProduct(productName);
  res.status(product.status).
    send(product.data); 
});


module.exports = router;
 
