'use strict';

var http = require('http');
var path = require('path');
var fs = require('fs');

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
    var routeFunction;

    if (this.routes[req.method][req.url]){
      routeFunction = this.routes[req.method][req.url];
      routeFunction(req, res);

    } else if (this.routes[req.method][dirname + ':id']) {
      routeFunction = this.routes[req.method][dirname +':id'];
      routeFunction(req, res);

    } else {
      console.log('404');
      res.write('404');
      res.end();
    }
  };
};


Router.prototype.start = function(port){
  http.createServer(this.route()).listen(port, () => {
    console.log('live ' + port);
  });
};

///-------really basic data storage-------///

Router.prototype.basicPost = function(route, dirName, contentType){
  this.post(route, (req, res) => {
    console.log(route + ' post route hit');
    res.writeHead(200, {'content-type':contentType});
    req.on('data', (data) => {
      var info = data.toString();
      fs.mkdir(__dirname + '/' + dirName, () => {
        fs.readdir('./' + dirName,(err, files) => {
          if (err) return err;
          var fileId = function(){
            var count = files.length;
            files.forEach((file)=>{
              if (file === files.length + '.json'){
                count++;
              }
            });
            return count;
          };
          fs.writeFile('./' + dirName + '/' + fileId() + '.json', info, () =>{
            console.log('File saved');
          });
        });
      });
      req.on('end', () =>{
        return res.end();
      });
    });
  });
};

Router.prototype.basicPut = function(route, dirName, contentType){
  this.put(route + '/:id', (req, res) => {
    console.log('put hit');
    var fileId = path.basename(req.url) + '.json';

    res.writeHead(200,{'content-type':contentType});
    req.on('data', (data) => {
      fs.readFile('./'+ dirName +'/'+ fileId, (err, fileData) => {
        if(!fileData) return res.end(console.log('File does not exist')); //won't just write new file
        var cur = JSON.parse(fileData.toString());
        var change = JSON.parse(data.toString());
        var info = data.toString();

        if (cur === change){ //won't overwrite if no change
          console.log('File Not Changed');
          return res.end();
        }
        fs.writeFile('./' + dirName + '/' + fileId, info, () => {
          console.log('File Changed');
        });
        return res.end();
      });
    });
  });
};

Router.prototype.basicIdDel = function(route, dirName){
  this.delete(route + '/:id', (req, res) => {
    var fileId = path.basename(req.url) + '.json';
    res.writeHead(200,{'content-type':'text/html'});
    fs.unlink('./' + dirName + '/' + fileId, () =>{
      if(!fileId) return res.end(console.log('File does not exist'));

      console.log('del hit');
      return res.end();
    });
  });
};
