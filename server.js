// server.js
// set up
var express = require('express')
var mongoose = require('mongoose')
var morgan = require('morgan')
var bodyParser = require('body-parser')
var methodOverride = require('method-override')

var app = express()
// configuration

mongoose.connect('mongodb://localhost/todo_node_angular')
app.use(express.static(__dirname + '/public'))
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({'extended': 'true'}))					//todo
app.use(bodyParser.json())												//todo
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))			//todo
app.use(methodOverride())

// define model
var Todo = mongoose.model('Todo', {
	text: String
})



// routes

// api
// get all todos
app.get('/api/todos', function(req, res) {
	Todo.find(function(err, todos) {
		if (err) {
			res.send(err)
			return 
		}
		res.json(todos)
	})
})

app.post('/api/todos', function(req, res) {
	Todo.create({
		text: req.body.text,
		done: false
	}, function(err, todo) {
		if (err) {
			res.send(err)
			return 
		}
		Todo.find(function(err, todos) {
			if (err) {
				res.send(err)
				return 
			}
			res.json(todos)
		})
	})
})

app.delete('/api/todos/:todo_id', function(req, res) {
	Todo.remove({
		_id: req.params.todo_id
	}, function(err, todo) {
		if (err) {
			res.send(err)
			return 
		}
		Todo.find(function(err, todos) {
			if (err) {
				res.send(err)
				return 
			}
			res.json(todos)
		})
	})
})

// app.get('*', function(req, res) {
// 	res.sendFile('./public/index.html')
// })






// start server
app.listen(8080)
console.log('App listening on port 8080')