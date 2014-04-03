
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var project = require('./routes/project');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var conf = require('./conf.js');

var app = express();

mongoose.connect(conf.db);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/about', routes.about);
app.get('/prizes', routes.prizes);
app.get('/getprojects', project.getprojects);
app.get('/newproject', project.index);
app.get('/collaborators', project.collaborators);
app.post('/project/save', project.save);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
