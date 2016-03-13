'use strict';

var chai = require('chai');
var chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
var request = chai.request;
var expect = chai.expect;
var fs = require('fs');
require(__dirname + '/../server.js');



describe('http server', () => {
  it('should respond to /info post by storing body in json file', (done) => {
    request('localhost:3000')
    .post('/info')
    .send('{"type":"Spruce"}')
    .end((err, res) => {
      fs.readdir('./data', (err, files) =>{
        var oap = files.length -1;
        fs.readFile('./data/'+ files[oap], (err, data) => {
          var jsonContent = JSON.parse(data.toString()).type;
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res).to.have.header('content-type','text/html');
          expect(jsonContent).to.eql('Spruce');
          done();
        });
      });
    });
  });

  it('should respond to /info get requests with the contents of the stored files', (done) => {
    request('localhost:3000')
    .get('/info')
    .end((err, res) => {
      fs.readdir('./data', (err, files) =>{
        var count = 0;
        var infoList = '';
        files.forEach((file) => {
          fs.readFile('./data/'+ file, (err, data) => {
            count++;
            infoList += JSON.parse(data.toString()).type + ' ';
            if(count === files.length){
              expect(err).to.eql(null);
              expect(res).to.have.status(200);
              expect(res).to.have.header('content-type','text/html');
              expect(res.text).to.eql(infoList);
              done();
            }
          });
        });
      });
    });
  });

  it('should respond to /info/:id delete requests by deleting the specified file', (done) =>{
    request('localhost:3000')
    .del('/info/1')
    .end((err, res) => {
      fs.readdir('./data', (err, files) =>{
        console.log(files)
        expect(files.indexOf('1.json')).to.eql(-1);
        expect(res).to.have.header('content-type','text/html');
        expect(res).to.have.status(200);
        done();
      });
    });
  });

  it('should respond to /info/:id put requests by changing the specified file contents',(done) =>{
      
  });
});
