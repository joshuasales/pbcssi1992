var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var messagesSchema = new mongoose.Schema({
    email: String,
    subject: String,
    content: String,
    publishDate: {
        type: Date,
        default: Date.now()
    },
    archive: {type: Boolean, default: false}
});


module.exports = mongoose.model("Messages", messagesSchema);