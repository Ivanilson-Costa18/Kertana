var express = require('express');
var router = express.Router();
var mFields = require('../models/fieldsModel');

/* Get all productions for a specific field*/ 
router.get('/:fieldID/productions', async function(req, res, next) {
  let fieldID = req.params.fieldID;
  let productions =  await mFields.getAllProductions(fieldID);
  console.log(productions)
  if (productions.length != 0){
    res.status(200).send(productions); 
    } else {
      res.status(404).json({
        "status":404,
        "error":"Not Found",
        "message":"The requested resource does not exist",
        "detail": "The given ID for the field doesn't have any productions"
      }); 
    }})

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