const express = require("express");
const app = express();
const bodyParser = require("body-parser");
// const methodOverride = require("method-override");
const routes = require("./routes/v1");
const mongoose = require("mongoose");
const captureDate = require("./middleware/middleware");
const cors = require("cors");
const config = require("./config/config")

mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  console.log("Connected to MongoDB");

  // Start the Node server
  app.listen(config.port, function () {
    console.log(`App is running on port ${process.env.PORT}`);
  });
});

app.use(cors());

app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// FIXME - See if used 
app.use(captureDate);

app.use("/v1", routes);
