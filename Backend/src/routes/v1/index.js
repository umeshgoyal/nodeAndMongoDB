const express = require("express");
const todoRoute = require("./todo.route");
const captureDateMiddleware = require("../../middleware/middleware");
const router = express.Router();

// router.use("/randomRoute", todoRoute);
router.use("/todos", todoRoute);

// router.use(captureDateMiddleware);

// Uncomment in Milestone 5
const testRoute = require("./test.route");
router.use("/test", testRoute);

module.exports = router;