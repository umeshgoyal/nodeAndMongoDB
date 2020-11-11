const express = require('express');
const router = express.Router();
const Todos = require('../models/todo');
const mongoose = require('mongoose');


/* Get all TODOS:   
curl http://localhost:3000/todos
*/
router.get("/todos", (req,res) => {
    Todos.find({}, (err,allTodos) => {
        if(err){
            console.log(err);
        }
        else{
            console.log(allTodos);
            res.send(allTodos);
        }
    });
});


/* Add a TODO to the list
curl -X POST -d 'name=Play Cricket' http://localhost:3000/todos
curl -X POST -d 'name=HomeWork' http://localhost:3000/todos

*/
router.post("/todos", (req,res) => {
    let newTodo = {
        name: req.body.name
    }
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
    Todos.deleteOne({name:deleteTodo}, (err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            //console.log(result);
            res.json(result);
        }
    });
});

module.exports = router;


