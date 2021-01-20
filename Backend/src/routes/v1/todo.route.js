const express = require("express");
const router = express.Router();
const Todos = require("../../models/todo.model");

/**
 * Get all TODOS:
 * curl http://localhost:8082/v1/todos
 *
 * Get todos with their "startDate" b/w startDateMin and startDateMax
 * curl http://localhost:8082/v1/todos?startDateMin=2020-11-04&startDateMax=2020-12-30
 * 
 * Get todos with "pending" field as "true"
 * curl http://localhost:8082/v1/todos?pending=true
 */
router.get("/", async (req, res) => {
  if (req.query.startDateMax && req.query.startDateMin) {
    let startDateMax = new Date(req.query.startDateMax);
    startDateMax.setTime(startDateMax.getTime());

    let startDateMin = new Date(req.query.startDateMin);
    startDateMin.setTime(startDateMin.getTime());

    Todos.find(
      {
        startDate: {
          $lte: startDateMax,
          $gte: startDateMin,
        },
      },
      (err, allTodos) => {
        if (err) {
          console.log(err);
        } else {
          res.send(allTodos);
        }
      }
    );
  } else if (req.query.pending) {
    Todos.find({ pending: req.query.pending }, (err, allTodos) => {
      if (err) {
        console.log(err);
        res.status(500).send();
      } else {
        res.send(allTodos);
      }
    });
  } else {
    Todos.find({}, (err, allTodos) => {
      if (err) {
        console.log(err);
        res.status(500).send();
      } else {
        res.send(allTodos);
      }
    });
  }
});

/**
 * Add a TODO to the list
 * curl -X POST http://localhost:8082/v1/todos \
    -d '{"name": "Learn Nodejs by doing","startDate": "2021-01-07","endDate": "2021-01-09"}' \
    -H 'Content-Type: application/json'
*/
router.post("/", async (req, res) => {
  console.log("Request body: ", req.body);

  if (!req.is("application/json")) {
    res.status(415);
    res.send({ error: "Received non-JSON data" });
  }

  let newTodo = {
    name: req.body.name,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
  };

  Todos.create(newTodo, (err, newlyCreated) => {
    if (err) {
      console.log(err);
      res.status(500).send();
    } else {
      console.log("New todo item: ", newlyCreated);
      res.status(201).send(newlyCreated);
    }
  });
});

/**
 * Update an existing TODO
 * curl -v -X PUT http://localhost:8082/v1/todos \
    -d '{"_id": "6006f0ff94d45f1bb3116b5a", "name": "Play tennis","startDate": "2021-01-07","endDate": "2021-01-09"}' \
    -H 'Content-Type: application/json'
 * 
 * Nb: You'll need to change the "id" value to that of one of your todo items
*/
router.put("/", (req, res) => {
  console.log("Request body: ", req.body);

  if (!req.is("application/json")) {
    res.status(415).send({ error: "Received non-JSON data" });
  }

  const idToUpdate = req.body._id;
  const updatedTodo = {
    name: req.body.name,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    pending: req.body.pending,
  };

  Todos.findByIdAndUpdate(idToUpdate, updatedTodo, (err, doc) => {
    if (err) {
      console.log(err);
      res.status(500).send();
    } else if (doc == null) {
      res.status(400).send({ error: "Resource not found" });
    } else {
      res.status(204).send();
    }
  });
});

/**
 * Delete a TODO from the list
 * curl -v -X "DELETE" http://localhost:8082/v1/todos/<id-value>
 *
 * Nb: You'll need to change "<id-value>" to the "id" value of one of your todo items
 */
router.delete("/:id", (req, res) => {
  const IdToDelete = req.params.id;

  Todos.findByIdAndDelete(IdToDelete, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send();
    } else {
      res.status(204).send();
    }
  });
});

/**
 * Logs request metadata to terminal
 * @param {Request} req 
 */
const logMetadata = (req) => {
  console.log(
    `URL:  /v1/todos${req.url == "/" ? "" : req.url}, Method:  ${
      req.method
    }, Timestamp: ${new Date()}`
  );
};

module.exports = router;
