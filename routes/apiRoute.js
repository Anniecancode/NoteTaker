const noteRoute = require('./noteRoute.js');

const api = require('express').Router();

api.use('/notes', noteRoute);


module.exports = api;