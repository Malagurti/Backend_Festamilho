const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/festarest');

mongoose.Promise = global.Promise;

module.exports = mongoose;