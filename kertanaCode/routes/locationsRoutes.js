var express = require('express');
var router = express.Router();
var mLoc = require('../models/locationsModel');

router.get('/', async function(req, res, next){
  let locations = await mLoc.getAllLocations();
  res.send(locations);
})

router.get('/:id/products', async function(req, res, next){
  let localID = req.params.id;
  let products = await mLoc.getSuitableProducts(localID);
  res.send(products);
});

module.exports = router;