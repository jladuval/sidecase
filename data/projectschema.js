var mongoose = require('mongoose-q')(require('mongoose'));
    

var projectSchema = new mongoose.Schema({
    email: String,
    teamsize: Number,
    url: String
});

exports.Project = mongoose.model('Project', projectSchema);