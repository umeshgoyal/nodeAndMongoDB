const express = require('express');
const router = express.Router();
const Todos = require('../models/todo');
const mongoose = require('mongoose');
const Todos = require('../models/todo');

let arr = ["Do home Work", "Play Cricket"];

/* Get all TODOS:   
curl http://localhost:3000/todos
*/
router.get("/todos", (req,res) => {
    Todos.find({}, (err,allTodos) => {
        if(err){
            console.log(err);
        }
        else{
            res.send(allPosts);
        }
    });
});


/* Add a TODO to the list
curl -X POST -d 'name=redhat' http://localhost:3000/todos
*/
router.post("/todos", (req,res) => {
    let newTodo = req.body.name;
    Todos.create(newTodo, (err,newlyCreated)=> {
        if (err) {
            console.log(err);
        } else {
            res.send(newlyCreated);
        }
    });
});

/* Delete a TODO to the list
curl -X "DELETE" -d 'name=Play Cricket' http://localhost:3000/todos
*/
router.delete("/todos", (req,res) => {
    let deleteTodo = req.body.name;
    console.log(deleteTodo);
    for( let i = 0; i < arr.length; i++){
         if ( arr[i] === deleteTodo) {
             arr.splice(i,1);
         }
    }
    res.send(arr);
});

module.exports = router;