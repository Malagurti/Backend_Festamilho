const mongoose = require('mongoose');

mongoose.connect('mongodb://35.231.60.8/festarest' {useMongoClient: true});
mongoose.Promise = global.Promise;

module.exports = mongoose;