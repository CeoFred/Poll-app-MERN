const mongoose = require('mongoose');

let db = 'vote';



mongoose.set('debug',true);
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://localhost/${db}`);

module.exports.User =  require('./user');
module.exports.Poll =  require('./poll');
