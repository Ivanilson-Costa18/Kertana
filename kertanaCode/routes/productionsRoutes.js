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


module.exports = router;