'use strict';
var http = require('http');
var urlink = require('url');
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
  // console.log('routerside ', this.routes.GET[route])
  console.log('route '+route);
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

Router.prototype.route = function(){  ///maybe add another option that wouldnt hard code 404 handling?
  return (req, res) => {
    var urlId = req.url.split('/')
    if(urlId[2]){
      console.log('got this far')
      var routeFunction = this.routes[req.method]['/'+urlId[1]+'/'+':id'];
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
  })
}
