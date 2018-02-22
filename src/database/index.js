const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/festarest');
mongoose.Promise = global.Promise;

module.exports = mongoose;