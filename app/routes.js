var Todo = require('./models/todo')

module.exports = function(app) {
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

    app.post('/api/todos/check/:todo_id', function(req, res) {
    	Todo.update({
    		_id: req.params.todo_id
    	},{
    		$set:{
    			done: true    			
    		}
    	},function(err, status) {
    		if (err) {
    			res.send(err) 
    			return 
    		}
    		Todo.find(function(err, todos){
    			if (err) {
    				res.send(err) 
    				return 
    			}
    			res.json(todos)
    		})
    	})
    })

    app.post('/api/todos/uncheck/:todo_id', function(req, res) {
    	Todo.update({
    		_id: req.params.todo_id
    	},{
    		$set:{
    			done: false    			
    		}
    	},function(err, status) {
    		if (err) {
    			res.send(err) 
    			return 
    		}
    		Todo.find(function(err, todos){
    			if (err) {
    				res.send(err) 
    				return 
    			}
    			res.json(todos)
    		})
    	})
    })

    app.get('*', function(req, res) {
        res.sendFile('./public/index.html')
    })
}
