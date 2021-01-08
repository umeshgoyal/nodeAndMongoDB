const mongoose = require('mongoose');
const todoSchema = new mongoose.Schema({
	id:Number,
    name: String,
    startDate: {type : Date},
    endDate: {type : Date},
    dateCreated: {type : Date},
    pending: Boolean
});
module.exports = mongoose.model("Todos",todoSchema);