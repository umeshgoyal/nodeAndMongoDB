const express = require('express');
const router = express.Router();

let arr = ["Do home Work", "Play Cricket"];

/* Get all TODOS:   
curl http://localhost:3000/todos
*/
router.get("/todos", (req,res) => {
    res.send(arr);
});


/* Add a TODO to the list
curl -X POST -d 'name=redhat' http://localhost:3000/todos
*/
router.post("/todos", (req,res) => {
    let newTodo = req.body.name;
    arr.push(newTodo);
    console.log("new : " +newTodo);
    res.send(arr);
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