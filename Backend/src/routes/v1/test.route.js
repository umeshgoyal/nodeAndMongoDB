const express = require("express");
const router = express.Router();
const captureDateMiddleware = require("../../middleware/middleware");

// router.use(captureDateMiddleware);

// NOTE - Test route for Milestone 5
// curl http://localhost:8082/v1/test
router.get("/", (req, res) => {
    res.send("Hey there!")
})

module.exports = router;