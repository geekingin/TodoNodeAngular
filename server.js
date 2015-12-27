// server.js
// set up
var express = require('express')
var mongoose = require('mongoose')
var morgan = require('morgan')
var bodyParser = require('body-parser')
var methodOverride = require('method-override')

var database = require('./config/database')
var routes = require('./app/routes')



var app = express()

// configuration
app.use(express.static(__dirname + '/public'))
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({'extended': 'true'}))					//todo
app.use(bodyParser.json())												//todo
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))			//todo
app.use(methodOverride())


mongoose.connect(database.url)

routes(app)


// start server
app.listen(8080)
console.log('App listening on port 8080')