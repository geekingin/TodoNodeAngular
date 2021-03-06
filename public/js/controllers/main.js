angular.module('todoController', [])
    .controller('mainController', function($scope, Todos) {
        $scope.formData = {}
        $scope.searchText = ''

        Todos.get()
            .success(function(data) {
                $scope.todos = data
            })

        $scope.createTodo = function() {
            if (!$.isEmptyObject($scope.formData)) {
                Todos.create($scope.formData)
                    .success(function(data) {
                        $scope.formData = {}
                        $scope.todos = data
                    })
            }
        }

        $scope.deleteTodo = function(id) {
            Todos.delete(id)
                .success(function(data) {
                    $scope.todos = data
                })
        }

        $scope.checkTodo = function(id) {
            Todos.check(id)
                .success(function(data) {
                    $scope.todos = data
                })
        }

        $scope.uncheckTodo = function(id) {
            Todos.uncheck(id)
                .success(function(data) {
                    $scope.todos = data
                })
        }

        $scope.toggleTodoStatus = function(todo) {
            todo.done ? $scope.uncheckTodo(todo._id) : $scope.checkTodo(todo._id)
        }
    })
