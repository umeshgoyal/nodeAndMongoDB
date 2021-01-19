const express = require("express");
const router = express.Router();
const Todos = require("../../models/todo.model");
const mongoose = require("mongoose");

/**
 * Get all TODOS:
 * curl http://localhost:8082/v1/todos
 *
 * Get todos with their "startDate" b/w startDateMin and startDateMax
 * curl http://localhost:8082/v1/todos?startDateMin=2020-11-04&startDateMax=2020-12-30
 */
router.get("/", (req, res) => {
  if (req.query.startDateMax && req.query.startDateMin) {
    let nextday = new Date(req.query.startDateMax);
    nextday.setTime(nextday.getTime());

    let prevday = new Date(req.query.startDateMin);
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
          res.send(allTodos);
        }
      }
    );
  } else {
    Todos.find({}, (err, allTodos) => {
      if (err) {
        console.log(err);
        res.status(500).send();
      } else {
        console.log(allTodos);
        res.send(allTodos);
      }
    });
  }
});

/**
 * Get todos with "pending" field as "true"
 * curl http://localhost:8082/v1/todos/pending
 */
router.get("/todos/pending", (req, res) => {
  Todos.find({ pending: true }, (err, allTodos) => {
    if (err) {
      console.log(err);
    } else {
      console.log(allTodos);
      res.send(allTodos);
      // res.send(allTodos);
    }
  });
});

/**
 * Get todos with "endDate" in the coming x days( EG: 15days )
 * curl http://localhost:8082/v1/todos/endDate?numDays=15
 */
router.get("/todos/endDate", (req, res) => {
  var lastday = new Date();
  const daysAhead = req.params.numDays;
  lastday.setTime(lastday.getTime() - daysAhead * 24 * 60 * 60 * 1000);
  var today = new Date();
  today.setTime(today.getTime());
  Todos.find(
    {
      endDate: {
        $gte: today,
        $lte: lastday,
      },
    },
    (err, allTodos) => {
      if (err) {
        console.log(err);
      } else {
        console.log(allTodos);
        res.send(allTodos);
        // res.send(allTodos);
      }
    }
  );
});

/* Add a TODO to the list
curl -X POST http://localhost:8082/v1/todos \
    -d '{"name": "Learn Nodejs by doing","startDate": "2021-01-07","endDate": "2021-01-09"}' \
    -H 'Content-Type: application/json'

Nb: You'll need to change the "id" value to that of one of your todo items
*/
router.post("/", (req, res) => {
  console.log(req.body);

  if (!req.is("application/json")) {
    res.status(415);
    res.send({ error: "Received non-JSON data" });
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
  // console.log(newTodo);

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
curl -X PUT http://localhost:8082/v1/todos \
    -d '{"id": <id-value>, "name": "Play tennis","startDate": "2021-01-07","endDate": "2021-01-09"}' \
    -H 'Content-Type: application/json'

Nb: You'll need to change the "id" value to that of one of your todo items
*/
router.put("/", (req, res) => {
  //   console.log(req.body);

  if (!req.is("application/json")) {
    res.status(415).send({ error: "Received non-JSON data" });
  }

  let condition = { id: req.body.id };

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

      res.status(200).send(doc);
    }
  });
});

/* Delete a TODO from the list
curl -X "DELETE" http://localhost:8082/v1/todos/<id-value>

Nb: You'll need to change "<id-value>" to the "id" value of one of your todo items
*/
router.delete("/:id", (req, res) => {
  let deleteTodo = req.params.id;

  Todos.deleteOne({ id: deleteTodo }, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send();
    } else {
      console.log(result);
      res
        .status(200)
        .send({ deleted: result.deletedCount == 1 ? true : false });
    }
  });
});

module.exports = router;
