var express = require('express');
var router = express.Router();
var mFarmers = require('../models/farmersModel');

router.get('/:farmerID', async function(req, res, next) {
  let farmerID = req.params.farmerID;
  let farmer =  await mFarmers.getFarmer(farmerID);
  res.send(farmer); 
});

module.exports = router;