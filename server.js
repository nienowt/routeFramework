var Route = require('./routes.js');
var myApp = new Route();
var fs = require('fs');

myApp.basicPost('/info', 'data', 'text/html');
myApp.basicPut('/info', 'data', 'text/html');
myApp.basicIdDel('/info','data');
myApp.start(3000);

myApp.get('/info', (req, res)  => {
  console.log('/info get route hit');
  res.writeHead(200, {'content-type':'text/html'});
  fs.readdir('./data', (err, files) => {
    var count = 0;
    var infoList = '';
    files.forEach((file) => {
      fs.readFile('./data/'+ file, (err, data) => {
        if (err) throw err;
        count++;
        infoList += JSON.parse(data.toString()).type + ' ';
        if(count === files.length){
          res.write( infoList);
          return res.end();
        }
      });
    });
  });
});

myApp.delete('/info/all', (req, res) => {
  res.writeHead(200,{'content-type':'text/html'});
  fs.readdir('./data', (err, files) =>{
    files.forEach((file) => {
      fs.unlink('./data/' + file, (err) =>{
        if (err) {
          return res.end();
        } else {
          console.log('del hit');
          return res.end();
        }
      });
    });
  });
});
