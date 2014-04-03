var mongoose = require('mongoose-q')(require('mongoose')),
    ProjectSchema = require('../data/projectschema.js').Project,
    conf = require('../conf.js'),
    getRepoRegex = /([^\/]+)$/,
    GitHubApi = require("github"),
    path = require("path"),
    urlparse = require("url");
    


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
    var github = new GitHubApi({
        // required
        version: "3.0.0",
        // optional
        debug: true,
        protocol: "https",
        timeout: 5000
    });
    github.authenticate({
        type: "oauth",
        key: conf.githubclientid,
        secret: conf.githubsecret
    }); 
    ProjectSchema.findQ({})
    .then(function(data){
        var projectsRes = [];
        for(var i = 0; i < data.length; i++){
            var url = data[i].url;
            var ghpath = urlparse.parse(url).pathname
            var user = ghpath.split('/')[1];
            var repo = ghpath.split('/')[2];
            github.repos.get(
            {
                user: user,
                repo: repo
            },
            function(err, ghres) {
                console.log(ghres);
            });
        }       
        res.json(data);
        res.end();
    });
}