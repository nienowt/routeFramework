var Route = require('./routes.js');
var myApp = new Route();
var fs = require('fs')

myApp.get('/info', (req, res)  => {
  console.log('/info get route hit');
  res.writeHead(200, {'content-type':'text/html'});
    fs.readdir('./data', (err, files) => {
    var count = 0;
    var infoList = '';
    files.forEach((file) => {
      fs.readFile('./data/'+ file, (err, data) => {
        count++;
        infoList += JSON.parse(data.toString()).type + ' ';
        if(count === files.length){
          res.write( infoList);
          return res.end();
        }
      });
    });
  });
})

myApp.post('/info', (req, res) => {
  console.log('/info post route hit');
  res.writeHead(200, {'content-type':'text/html'});
  req.on('data', (data) => {
    var info = data.toString();

    fs.mkdir(__dirname + '/data', () => {
      fs.readdir('./data',(err, files) => {
        fs.writeFile('./data/' + files.length + '.json', info, () =>{
          console.log('File saved');
        });
      });
    });
    req.on('end', () =>{
      return res.end();
    });
  });
});

myApp.put('/info/:id', (req, res) => {
  console.log('put hit');
  res.writeHead(200,{'content-type':'text/html'});
  res.end();
})

myApp.delete('/info', (req, res) => {
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
      })
    })
  })
})

myApp.delete('/info/:id', (req, res) => {
  var fileId = req.url.split('/')[2];
  res.writeHead(200,{'content-type':'text/html'});
  fs.readdir('./data', (err, files) =>{
    files.forEach((file) => {
      fs.unlink('./data/' + fileId + '.json', (err) =>{
        if (err) {
          return res.end();
        } else {
        console.log('del hit');
        return res.end();
        }
      })
    })
  })
})




myApp.start(myApp.route(), 3000);
