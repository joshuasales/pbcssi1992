var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var logSchema = new mongoose.Schema({
  email: String,
  logNumber: Number,
  name: String,
  logtype: String,
  logDate: { type: Date, default: Date.now()},
  usertype: String,
});

module.exports = mongoose.model('Log', logSchema);
