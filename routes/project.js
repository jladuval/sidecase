var mongoose = require('mongoose-q')(require('mongoose')),
    ProjectSchema = require('../data/projectschema.js').Project;

exports.index = function(req, res){
  res.render('newproject');
};

exports.save = function(req, res){
    var project = new ProjectSchema();
    project.email = req.body.email;
    project.url = req.body.url;
    project.teamsize = req.body.teamsize;
    project.saveQ()
    .then(function(){
        res.redirect('');
    });
};

exports.getprojects = function(req, res){
    ProjectSchema.findQ({})
    .then(function(data){
        console.log(data);
        res.json(data);
    });
}