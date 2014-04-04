var mongoose = require('mongoose-q')(require('mongoose')),
    ProjectSchema = require('../data/projectschema.js').Project,
    GitHubApi = require("github"),
    path = require("path"),
    Readable = require('stream').Readable,
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

function getGitHub(){
    var github = new GitHubApi({
        // required
        version: "3.0.0",
        // optional
        protocol: "https",
        timeout: 5000
    });
    github.authenticate({
        type: "oauth",
        key: process.env.githubclientid,
        secret: process.env.githubsecret
    }); 
    return github;
}

exports.getprojects = function(req, res){
    var github = getGitHub();
    ProjectSchema.findQ({})
    .then(function(data){
        var projectsRes = [];
        var counter =  0;
        var funcs = [];
        for(var i = 0; i < data.length; i++){
            funcs.push(function(user, repo, teamsize, email){                
                github.repos.get(
                {
                    user: user,
                    repo: repo
                },
                function(err, ghres) {

                    counter++;
                    if(err == null)
                        projectsRes.push({
                            owner : ghres.owner.login,
                            name : ghres.name, 
                            url : ghres.html_url,
                            mainlang : ghres.language,
                            description: ghres.description,
                            collaborators: [],
                            teamsize: teamsize,
                            email : email
                        });
                    else
                        console.log(err);
                    if(counter === data.length){
                        res.json(projectsRes);
                    }
                });
            })
        }
        for(var i = 0; i < data.length; i++){
            var url = data[i].url;
            var ghpath = urlparse.parse(url).pathname
            var user = ghpath.split('/')[1];
            var repo = ghpath.split('/')[2];
            funcs[i](user, repo, data[i].teamsize, data[i].email);
        }
    });
}

exports.collaborators = function(req, res){
    var github = getGitHub();
    github.repos.getCollaborators(
    {
        user: req.query.owner,
        repo: req.query.name
    },
    function(err, ghres) {
        if(err){
            res.end();
            return;
        }
        else
        var collaborators = [];
        for(var i = 0; i < ghres.length; i++){
            collaborators.push({
                avatar : ghres[i].avatar_url,
                url : ghres[i].html_url,
                name: ghres[i].login
            });
        }        
        res.json(collaborators);
    });
}