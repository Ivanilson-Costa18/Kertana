var express = require('express');
var router = express.Router();
var mFields = require('../models/fieldsModel');

router.get('/:farmerID', async function(req, res, next) {
  let farmerID = req.params.farmerID;
  let fields =  await mFields.getAllFields(farmerID);
  res.send(fields); 
});

router.post('/:farmerID/Terreno', async function (req, res, next) {
  let farmerID = req.params.farmerID;
  let field = req.body
  let result = await mFields.insertField(farmerID, field);
  res.send(result);
});

module.exports = router;