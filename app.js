const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const routes = require('./routes');
const mongoose = require('mongoose');
const captureDate = require('./middleware/middleware');

mongoose.connect("mongodb://localhost:27017/TODOAPP",{useCreateIndex:true,useUnifiedTopology:true, useNewUrlParser:true});

app.use(captureDate);
app.use(bodyParser.urlencoded({
        extended: true
}));

app.use('/', routes); 

app.listen(3000, function(){
    console.log("App is running");
});