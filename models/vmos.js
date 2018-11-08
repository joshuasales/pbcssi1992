var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var vmosSchema = new mongoose.Schema({
    vision: {
    	type: String,
    	default: 'vision'
    },
    mission: {
    	type: String,
    	default: 'mission'
    },
    philosophy: {
        type: String,
        default: 'mission'
    },
    objectives: {
        type: String,
        default: 'mission'
    },
    publishDate: {
        type: Date,
        default: Date.now()
    },
});


module.exports = mongoose.model("Vmos", vmosSchema);