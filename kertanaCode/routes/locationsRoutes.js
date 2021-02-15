var express = require('express');
var router = express.Router();
var mLoc = require('../models/locationsModel');


/* Get all locations*/ 
router.get('/', async function(req, res, next){
  let locations = await mLoc.getAllLocations();
  res.status(200).send(locations);
})

/* Get all products from a specific location*/ 
router.get('/:id/products', async function(req, res, next){
  let localID = req.params.id;
  let products = await mLoc.getSuitableProducts(localID);
  if (products[0].length != 0){
    res.status(200).send(products); 
    } else {
      res.status(404).send({
        "status":404,
        "error":"Not Found",
        "message":"The requested resource does not exist",
        "detail": "The given ID for the location doesn't have suitable products"
      }); 
    }});

module.exports = router;