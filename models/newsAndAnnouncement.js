var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var newsSchema = new mongoose.Schema({
    postNumber: Number,
    category: String,
    title: String,
    content:  {type: String, default: ' '},
    publishDate: {type: Date, default: Date.now()},
    path:  {type: String, default: ''},
    archive: {type: Boolean, default: false}
});


module.exports = mongoose.model("News", newsSchema);
