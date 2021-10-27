const express = require("express");
const routes = require("./routes/v1");
const mongoose = require("mongoose");
const captureDateMiddleware = require("./middleware/middleware");
const cors = require("cors");
const config = require("./config/config");

const app = express();

app.use(cors());
app.use(express.json());

// NOTE - Uncomment in Milestone 5
// Middleware to log API request metadata
// app.use(captureDateMiddleware);

app.use("/v1", routes);

// TODO - Create a MongoDB connection using Mongoose
mongoose.connect(config.mongoose.url,config.mongoose.options).then(()=>{
  console.log("Connected to MongoDB");
  // Start the Node server
  app.listen(config.port, () => {
    console.log(`App is running on port ${config.port}`);
});
}).catch((e)=>{
  console.log(e);
});


