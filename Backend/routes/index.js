const express = require('express');
const router = express.Router();
const Todos = require('../models/todo');
const mongoose = require('mongoose');


/* Get all TODOS:   
curl http://localhost:3001/todos
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
curl http://localhost:3001/todos/pending
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
curl http://localhost:3001/todos/endDate
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



/* Get all Todos : Between startDate and endDate
curl -X "GET" -d 'name=Task-4 &startDate=2020-11-04&endDate=2020-11-21' http://localhost:3001/todos/search
*/

router.post("/todos/search",(req,res)=>{
    console.log(req.body,req.body.startDate);

    var nextday= new Date(req.body.endDate);
    nextday.setTime(nextday.getTime());
    var prevday=  new Date(req.body.startDate);
    prevday.setTime(prevday.getTime() );
    Todos.find({
        startDate:{
            $lte:nextday, $gte:prevday
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
curl -X POST -d 'name=Task-4 &startDate=2020-11-11&endDate=2020-11-21' http://localhost:3001/todos

*/
router.post("/todos", (req,res) => {
   // console.log(req);
    let newTodo = {
        name: req.body.name,
        startDate:req.body.startDate,
        endDate:req.body.endDate,
        dateCreated:new Date(),
        pending:true
    }
    console.log(newTodo);
    Todos.create(newTodo, (err,newlyCreated)=> {
        if (err) {
            console.log(err);
        } else {
            //console.log(newlyCreated);
            res.send(newlyCreated);
        }
    });
});

/* Delete a TODO to the list
curl -X "DELETE" -d 'name= ' http://localhost:3001/todos
*/
router.delete("/todos", (req,res) => {
    console.log(req.body);
    let deleteTodo = req.body._id;
    console.log("deleteTodo", deleteTodo);
    Todos.deleteOne({_id:deleteTodo}, (err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("Backend",result);
            res.json(result);
        }
    });
});


/* Update an existing TODO
curl -X PUT -d 'name=Task-1 &startDate=2020-11-03&endDate=2020-11-20&dateCreated=2020-11-01&pending=false' http://localhost:3000/todos

*/
router.put("/todos", (req,res) => {

    var condition = { name: req.body.name };
    Todos.findOne(condition, function (err, doc){
        if(err) {
            console.log(err);
        } else {
            doc.name =  req.body.name;
            doc.startDate = req.body.startDate;
            doc.endDate = req.body.endDate;
            doc.dateCreated = req.body.dateCreated;
            doc.pending = req.body.pending;
            doc.save();
            res.send('Updated');
        }
      });
});
module.exports = router;
