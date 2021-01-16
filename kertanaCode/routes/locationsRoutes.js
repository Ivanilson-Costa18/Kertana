var express = require('express');
var router = express.Router();
var mLoc = require('../models/locationsModel');

router.get('/', async function(req, res, next){
  let locations = await mLoc.getAllLocations();
  res.send(locations);
})


router.get('/storedProcedure/:name', async function(req, res, next){
    let productName = req.params.name;
    let locations = await mLoc.getSuitableLocations(productName);
    res.send(locations);
  });



module.exports = router;