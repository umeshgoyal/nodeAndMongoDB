const express = require('express');
const bodyParser = require("body-parser");
// const methodOverride = require("method-override");
const routes = require('./routes/v1');
const mongoose = require('mongoose');
const captureDate = require('./middleware/middleware');
const cors = require('cors');
const dotenv = require("dotenv")

mongoose.connect("mongodb://localhost:27017/TODOAPP",{useCreateIndex:true,useUnifiedTopology:true, useNewUrlParser:true});

const app = express();

app.use(cors());
app.use(express.json());

// FIXME - See if used
app.use(captureDate);

app.use(bodyParser.urlencoded({
        extended: true
}));

app.use('/v1', routes); 

// Load config from .env file to `process.env`
dotenv.config()

// Start the Node server
app.listen(process.env.PORT, function(){
    console.log(`App is running on port ${process.env.PORT}`);
});