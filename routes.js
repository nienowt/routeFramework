'use strict';

var http = require('http');
var path = require('path');

var Router = module.exports = function(){
  this.routes = {
    'GET': {},
    'POST': {},
    'PUT': {},
    'DELETE': {}
  };
};

Router.prototype.get = function(route, cb){
  this.routes.GET[route] = cb;
};

Router.prototype.post = function(route, cb){
  this.routes.POST[route] = cb;
};

Router.prototype.put = function(route, cb){
  this.routes.PUT[route] = cb;
};

Router.prototype.delete = function(route, cb){
  this.routes.DELETE[route] = cb;
};

Router.prototype.route = function(){
  return (req, res) => {
    var dirname = path.dirname(req.url) + '/';

    if(this.routes[req.method][dirname + ':id']){
      console.log('got this far')
      var routeFunction = this.routes[req.method][dirname +':id'];
      routeFunction(req, res);

    } else if (this.routes[req.method][req.url]){
      var routeFunction = this.routes[req.method][req.url];
      routeFunction(req, res);

    } else {
      console.log('404')
      res.write('404 mf')
      res.end();
    }
  };
};

Router.prototype.start = function(newRouter, port){
  http.createServer(newRouter).listen(port, () => {
    console.log('live ' + port)
  });
};
