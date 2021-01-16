var express = require('express');
var router = express.Router();
var mLoc = require('../models/locationsModel');

router.get('/', async function(req, res, next){
  let locations = await mLoc.getAllLocations();
  res.send(locations);
})


router.get('/storedProcedure/:id', async function(req, res, next){
  let productId = req.params.id;
  let locations = await mLoc.getSuitableLocations(productId);
    res.send(locations);
  });



module.exports = router;