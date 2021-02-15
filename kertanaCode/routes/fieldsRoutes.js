var express = require('express');
var router = express.Router();
var mFields = require('../models/fieldsModel');



/* Create new production on a specific field*/ 
router.post('/:fieldID/productions', async function(req, res, next){
  let fieldID = req.params.fieldID
  let production = req.body
  let result = await mFields.insertProduction(fieldID, production)
  res.status(201).send(result)
})

/* Delete a specific production in field*/ 
router.post('/:fieldID/productions/:productionID', async function(req, res, next){
  let fieldID = req.params.fieldID
  let productionID = req.params.productionID
  let result = await mFields.removeProduction(productionID, fieldID)
  res.status(200).send(result)
})



module.exports = router;