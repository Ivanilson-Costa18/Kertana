var express = require('express');
var router = express.Router();
var mProductions = require('../models/productionsModel');

router.get('/:fieldID/products', async function(req, res, next) {
  let fieldID = req.params.fieldID;
  let products =  await mProductions.getAllProducts(fieldID);
  res.send(products); 
});

router.get('/:fieldID/coordinates', async function(req, res, next) {
  let fieldID = req.params.fieldID;
  let productionCoordinates =  await mProductions.getProductionCoordinates(fieldID);
  res.send(productionCoordinates); 
});

router.get('/:fieldID/growthStates', async function(req, res, next) {
  let fieldID = req.params.fieldID;
  let growthStates =  await mProductions.getProductionsGrowthState(fieldID);
  res.send(growthStates); 
});

router.post('/:fieldID/production', async function(req, res, next){
  let fieldID = req.params.fieldID
  let production = req.body
  let result = await mProductions.insertProduction(fieldID, production)
  res.send(result)
})

router.post('/:productID/fields', async function(req, res, next){
  let productID = req.params.productID
  let result = await mProductions.removeProduct(productID)
  res.send(result)
})

module.exports = router;