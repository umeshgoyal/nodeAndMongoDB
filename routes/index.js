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
            res.json(allTodos);
           // res.send(allTodos);
        }
    });
});


/* Get all TODOS: Which are pending   
curl http://localhost:3000/todos/pending
*/
router.get("/todos/pending", (req,res) => {
    Todos.find({pending:true}, (err,allTodos) => {
        if(err){
            console.log(err);
        }
        else{
            console.log(allTodos);
            res.json(allTodos);
           // res.send(allTodos);
        }
    });
});


/* Get all TODOS: :Last x days( EG: 15days )  
curl http://localhost:3000/todos/endDate
*/
router.get("/todos/endDate", (req,res) => {
    var lastday= new Date();
    lastday.setTime(lastday.getTime() - (15*24*60*60*1000));
    var today= new Date();
    today.setTime(today.getTime() );
    Todos.find({
        startDate:{
            $lte:today, $gte:lastday
        }
    },
     (err,allTodos) => {
        if(err){
            console.log(err);
        }
        else{
            console.log(allTodos);
            res.json(allTodos);
           // res.send(allTodos);
        }
    });
});



/* Get all Todos : Next x days (EG: 15 days)
curl -X "GET" http://localhost:3000/todos/startDate
*/

router.get("/todos/startDate",(req,res)=>{
    var nextday= new Date();
    nextday.setTime(nextday.getTime() + (15*24*60*60*1000));
    var today= new Date();
    today.setTime(today.getTime() );
    Todos.find({
        startDate:{
            $lte:nextday, $gte:today
        }
    },
    (err,allTodos) => {
        if(err){
            console.log(err);
        }
        else{
            console.log(allTodos);
            res.json(allTodos);
           // res.send(allTodos);
        }
    });
});

/* Add a TODO to the list
curl -X POST -d 'name=Task-1 &startDate=2020-11-01&endDate=2020-11-01&dateCreated=2020-11-01' http://localhost:3000/todos

*/
router.post("/todos", (req,res) => {
    let newTodo = {
        name: req.body.name,
        startDate:req.body.startDate,
        endDate:req.body.endDate,
        dateCreated:req.body.dateCreated,
        pending:true
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
curl -X "DELETE" -d 'name=Codenation Interview ' http://localhost:3000/todos
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
