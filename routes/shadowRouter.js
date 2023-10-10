const express = require('express')
const shadow = require('../controllers/HomeContoller')

const app = express();

app.get('/shadow',shadow)


module.exports =app;