var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var productsRouter = require('./routes/productsRoutes');
var locationsRouter = require('./routes/locationsRoutes');
var farmersRouter = require('./routes/farmersRoutes');
var fieldsRouter = require('./routes/fieldsRoutes');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/products', productsRouter);
app.use('/api/locations', locationsRouter);
app.use('/api/farmers', farmersRouter);
app.use('/api/fields', fieldsRouter);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next)=>{
    res.status(error.status || 500)
    res.send(error.message)
})



module.exports = app;
