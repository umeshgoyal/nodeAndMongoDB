const express = require("express");
const router = express.Router();
const Todos = require("../../models/todo.model");
const mongoose = require("mongoose");

/* Get all TODOS:   
curl http://localhost:3001/todos
*/
router.get("/", (req, res) => {
  Todos.find({}, (err, allTodos) => {
    if (err) {
      console.log(err);
    } else {
      console.log(allTodos);
      res.json(allTodos);
      // res.send(allTodos);
    }
  });
});

/* Get all TODOS: Which are pending   
curl http://localhost:3001/todos/pending
*/
// router.get("/pending", (req, res) => {
//   Todos.find({ pending: true }, (err, allTodos) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(allTodos);
//       res.json(allTodos);
//       // res.send(allTodos);
//     }
//   });
// });

/* Get all TODOS: :Last x days( EG: 15days )  
curl http://localhost:3001/todos/endDate
*/
// router.get("/endDate", (req, res) => {
//   var lastday = new Date();
//   lastday.setTime(lastday.getTime() - 15 * 24 * 60 * 60 * 1000);
//   var today = new Date();
//   today.setTime(today.getTime());
//   Todos.find(
//     {
//       startDate: {
//         $lte: today,
//         $gte: lastday,
//       },
//     },
//     (err, allTodos) => {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log(allTodos);
//         res.json(allTodos);
//         // res.send(allTodos);
//       }
//     }
//   );
// });

/* Get all Todos : Between startDate and endDate
curl -X "GET"  http://localhost:3001/todos/search?startDate=2020-11-04&endDate=2020-12-30
*/

router.post("/search", (req, res) => {
  console.log(req.body, req.body.startDate);

  var nextday = new Date(req.body.endDate);
  nextday.setTime(nextday.getTime());
  var prevday = new Date(req.query.startDate);
  prevday.setTime(prevday.getTime());
  Todos.find(
    {
      startDate: {
        $lte: nextday,
        $gte: prevday,
      },
    },
    (err, allTodos) => {
      if (err) {
        console.log(err);
      } else {
        console.log(allTodos);
        res.json(allTodos);
      }
    }
  );
});

/* Add a TODO to the list
curl -X POST -d 'name=Task-4 &startDate=2020-11-11&endDate=2020-11-21' http://localhost:3001/todos

*/
router.post("/", (req, res) => {
  // console.log(req);
  var epochTime = new Date();
  var uniqueId = epochTime.valueOf();
  let newTodo = {
    id: uniqueId,
    name: req.body.name,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    dateCreated: new Date(),
    pending: true,
  };
  Todos.create(newTodo, (err, newlyCreated) => {
    if (err) {
        console.log(err);
    } else {
      res.end(newlyCreated);
    }
  });
});

/* Delete a TODO to the list
curl -X "DELETE" -d 'name= ' http://localhost:3001/todos
*/
router.delete("/", (req, res) => {
  console.log(req.body);
  let deleteTodo = req.body._id;
  console.log("deleteTodo", deleteTodo);
  Todos.deleteOne({ _id: deleteTodo }, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Backend", result);
      res.json(result);
    }
  });
});

/* Update an existing TODO
curl -X PUT -d 'name=Task-1 &startDate=2020-11-03&endDate=2020-11-20&dateCreated=2020-11-01&pending=false' http://localhost:3000/todos

*/
router.put("/", (req, res) => {
  console.log(req.body.data);

  var condition = { id: req.body.data.id };
  Todos.findOne(condition, function (err, doc) {
    if (err) {
      console.log(err);
    } else {
      doc.name = req.body.data.name;
      doc.startDate = req.body.data.startDate;
      doc.endDate = req.body.data.endDate;
      doc.save();
      res.send("Updated");
    }
  });
});

module.exports = router;
