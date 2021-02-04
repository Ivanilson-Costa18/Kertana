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

router.get('/:id/locations', async function(req, res, next){
  let productId = req.params.id;
  let locations = await mProd.getSuitableLocations(productId);
    res.send(locations);
  });


module.exports = router;