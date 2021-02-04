var express = require('express');
var router = express.Router();
var mFields = require('../models/fieldsModel');

router.get('/:fieldID/productions', async function(req, res, next) {
  let fieldID = req.params.fieldID;
  let productions =  await mFields.getAllProductions(fieldID);
  res.send(productions); 
})

router.post('/:fieldID/productions', async function(req, res, next){
  let fieldID = req.params.fieldID
  let production = req.body
  let result = await mFields.insertProduction(fieldID, production)
  res.send(result)
})

router.post('/:fieldID/productions/:productionID', async function(req, res, next){
  let fieldID = req.params.fieldID
  let productionID = req.params.productionID
  let result = await mFields.removeProduction(productionID, fieldID)
  res.send(result)
})



module.exports = router;