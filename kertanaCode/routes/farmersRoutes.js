var express = require('express');
var router = express.Router();
var mFarmers = require('../models/farmersModel');


/* Get a specific farmer. */
router.get('/:farmerID', async function(req, res, next) {
  let farmerID = req.params.farmerID;
  let farmer =  await mFarmers.getFarmer(farmerID);
  if (farmer.length != 0){
    res.status(200).send(farmer); 
    } else {
      res.status(404).send({
        "status":404,
        "error":"Not Found",
        "message":"The requested resource does not exist",
        "detail": "There is no farmer with the given ID"
      }); 
    }});


/* Authenticate farmer. */
router.get('/authentication/login', async function(req,res,next) {
  let farmer = req.query;
  console.log(farmer.email +' ' +farmer.password)
  let result = await mFarmers.logFarmer(farmer);
  res.status(200).send(result); 
})

/* Create new Farmer. */
router.post('/', async function(req, res, next){
  let farmer = req.body;
  let result = await mFarmers.createFarmer(farmer)
  res.status(201).send(result)
})

/* Get all fields of a specific farmer. */
router.get('/:farmerID/fields', async function(req, res, next) {
  let farmerID = req.params.farmerID;
  let fields =  await mFarmers.getAllFields(farmerID);
  if (fields.length != 0){
    res.status(200).send(fields); 
    } else {
      res.status(404).send({
        "status":404,
        "error":"Not Found",
        "message":"The requested resource does not exist",
        "detail": "The given farmer ID has no fields"
      }); 
    }});

/* Create a new field for a specific farmer. */
router.post('/:farmerID/fields', async function (req, res, next) {
  let farmerID = req.params.farmerID;
  let field = req.body
  let result = await mFarmers.insertField(farmerID, field);
  if (!field.nome || !field.descricao || !field.coordenadas || !field.agroId || !field.fregID){
    res.status(400).send({
      "status":400,
      "error":"Bad Request",
      "message":"Client sent an invalid request",
      "detail": "Missing requirements in body",
      "requirements":"nome, descricao, coordenadas, agroId, fregID"
    });
    } else {
      res.status(201).send(result); 
    }});

/* Remove specific field of a farmer. */
router.post('/:farmerID/fields/:fieldID', async function (req, res, next){
  let farmerID = req.params.farmerID;
  let fieldID = req.params.fieldID;
  let result = await mFarmers.removeField(farmerID, fieldID)
  res.status(200).send(result)
})


module.exports = router;