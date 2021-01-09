const express = require("express");
const router = express.Router();
const Todos = require("../../models/todo.model");
const mongoose = require("mongoose");

/* Get all TODOS:   
curl http://localhost:3001/todos
*/
router.get("/", (req, res) => {
  Todos.create(newTodo, (err, newlyCreated) => {
    if (err) {
      //   console.log(err);
      res.status(500).send();
    } else {
      res.status(201).send(newlyCreated);
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
//   let lastday = new Date();
//   lastday.setTime(lastday.getTime() - 15 * 24 * 60 * 60 * 1000);
//   let today = new Date();
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

  let nextday = new Date(req.body.endDate);
  nextday.setTime(nextday.getTime());
  let prevday = new Date(req.query.startDate);
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
  console.log(req);

  // Only accept json request body
  if (!req.is("application/json")) {
    res.status(415).send({ error: "Received non-JSON data" });
  }

  let epochTime = new Date();
  let uniqueId = epochTime.valueOf();

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
      res.status(500).send();
    } else {
      res.status(201).send(newlyCreated);
    }
  });
});

/* Update an existing TODO
curl -X PUT -d 'name=Task-1 &startDate=2020-11-03&endDate=2020-11-20&dateCreated=2020-11-01&pending=false' http://localhost:3000/todos

*/
router.put("/", (req, res) => {
  console.log(req.body.data);

  // Only accept json request body
  if (!req.is("application/json")) {
    res.status(415).send({ error: "Received non-JSON data" });
  }

  let condition = { id: req.body.data.id };

    Todos.findOne(condition, function (err, doc) {
      if (err) {
        console.log(err);
        res.status(500).send();
      } else if (doc == null) {
        res.status(400).send({ error: "Resource not found" });
      } else {
        doc.name = req.body.name;
        doc.startDate = req.body.startDate;
        doc.endDate = req.body.endDate;
        doc.save();

        res.status(204).send();
      }
    });
});

/* Delete a TODO to the list
curl -X "DELETE" -d 'name= ' http://localhost:3001/todos
*/
router.delete("/", (req, res) => {
  console.log(req.body);
  let deleteTodo = req.body.id;

  Todos.deleteOne({ id: deleteTodo }, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send();
    } else {
      console.log(result);
      res.status(200).send({ deletedCount: result.deletedCount });
    }
  });
});

module.exports = router;
