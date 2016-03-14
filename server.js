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

// myApp.post('/info', (req, res) => {
//   console.log('/info post route hit');
//   res.writeHead(200, {'content-type':'text/html'});
//   req.on('data', (data) => {
//     var info = data.toString();
//     fs.mkdir(__dirname + '/data', () => {
//       fs.readdir('./data',(err, files) => {
//
//         var fileId = function(){
//           var count = files.length;
//           files.forEach((file)=>{
//             if (file === files.length + '.json'){
//               count++;
//             }
//           });
//           return count;
//         };
//         fs.writeFile('./data/' + fileId() + '.json', info, () =>{
//           console.log('File saved');
//         });
//       });
//     });
//     req.on('end', () =>{
//       return res.end();
//     });
//   });
// });
// myApp.put('/info/:id', (req, res) => {
//   console.log('put hit');
//   var fileId = req.url.split('/')[2] + '.json';
//
//   res.writeHead(200,{'content-type':'text/html'});
//   req.on('data', (data) => {
//     fs.readFile('./data/'+ fileId, (err, fileData) => {
//       var cur = JSON.parse(fileData.toString());
//       var change = JSON.parse(data.toString());
//
//       if(!fileData) return res.end(console.log('File does not exist')); //won't just write new file
//
//       if (cur.type === change.type){ //won't write if no change
//         console.log('File Not Changed');
//         return res.end();
//       }
//       var info = data.toString();
//
//       fs.writeFile('./data/' + fileId, info, () => {
//         console.log('File Changed');
//       });
//       return res.end();
//     });
//   });
// });




// myApp.delete('/info/:id', (req, res) => {
//   var fileId = req.url.split('/')[2];
//   res.writeHead(200,{'content-type':'text/html'});
//   fs.unlink('./data/' + fileId + '.json', (err) =>{
//       return res.end();
//     } else {
//       console.log('del hit');
//       return res.end();
//     }
//   });
// });
