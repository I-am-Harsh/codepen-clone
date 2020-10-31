const mongoose = require('mongoose');

var codeSchema = mongoose.Schema({
    url : String,
    js : String,
    xml : String,
    css : String
});

var Code = mongoose.model('Code',codeSchema);

module.exports = Code;