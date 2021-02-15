var express = require('express');
const { checkout } = require('../app');
var router = express.Router();
var mProd = require('../models/productsModel');

/* Get all products. */
router.get('/', async function(req, res, next) {
  let products =  await mProd.getAllProducts();
  res.status(200).send(products); 
});

/* Get a specific product*/ 
router.get('/:id', async function(req, res, next) {
  let productID = req.params.id;
  let product =  await mProd.getProduct(productID);
  if (product.length != 0){
    res.status(200).send(product); 
    } else {
      res.status(404).send({
        "status":404,
        "error":"Not Found",
        "message":"The requested resource does not exist",
        "detail": "There are no products with that ID"
      }); 
    }});

/* Get suitable locations for a specific product*/
router.get('/:id/locations', async function(req, res, next){
  let productId = req.params.id;
  let locations = await mProd.getSuitableLocations(productId);
  if (locations[0].length != 0){
    res.status(200).send(locations); 
    } else {
      res.status(404).send({
        "status":404,
        "error":"Not Found",
        "message":"The requested resource does not exist",
        "detail": "The given ID for the product doesn't have any suitable locations"
      }); 
    }});


module.exports = router; 