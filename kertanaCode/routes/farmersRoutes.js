var express = require('express');
var router = express.Router();
var mFarmers = require('../models/farmersModel');

router.get('/:farmerID', async function(req, res, next) {
  let farmerID = req.params.farmerID;
  let farmer =  await mFarmers.getFarmer(farmerID);
  res.send(farmer); 
});

router.get('/:farmerID/fields', async function(req, res, next) {
  let farmerID = req.params.farmerID;
  let fields =  await mFarmers.getAllFields(farmerID);
  res.send(fields); 
});

router.post('/:farmerID/fields', async function (req, res, next) {
  let farmerID = req.params.farmerID;
  let field = req.body
  let result = await mFarmers.insertField(farmerID, field);
  res.send(result);
});

router.post('/:farmerID/fields/:fieldID', async function (req, res, next){
  let farmerID = req.params.farmerID;
  let fieldID = req.params.fieldID;
  let result = await mFarmers.removeField(farmerID, fieldID)
  res.send(result)
})

module.exports = router;