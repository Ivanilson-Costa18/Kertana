var express = require('express');
var router = express.Router();
var mProd = require('../models/productsModel');

/* GET all. */
router.get('/', async function(req, res, next) {
  let products =  await mProd.getAllProducts();
  res.send(products); 
});

router.get('/:id', async function(req, res, next) {
  let productID = req.params.id;
  let product =  await mProd.getProduct(productID);
  res.send(product); 
});

router.get('/storedProcedure/:id', async function(req, res, next){
  let localID = req.params.id;
  let products = await mProd.getSuitableProducts(localID);
  res.send(products);
});


module.exports = router;