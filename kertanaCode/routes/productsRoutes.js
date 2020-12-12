var express = require('express');
var router = express.Router();
var mProd = require('../models/productsModel');

/* GET all. */
router.get('/', async function(req, res, next) {
  let products =  await mProd.getAllProducts();
  res.status(products.status).
    send(products.data); 
});


module.exports = router;
 
