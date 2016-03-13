'use strict';

var chai = require('chai');
var chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
var request = chai.request;
var expect = chai.expect;
var fs = require('fs');
require(__dirname + '/../server.js');


describe('http server', () => {
  before((done) =>{
    request('localhost:3000')
    .post('/info')
    .send('{"type":"Great"}')
    .end(done());
  });
  it('should respond to /info post by storing body in json file', (done) => {
    request('localhost:3000')
    .post('/info')
    .send('{"type":"Great"}')
    .end((err, res) => {
      fs.readFile('./data/0.json', (err, data) => {
        var jsonContent = JSON.parse(data.toString()).type;
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res).to.have.header('content-type','text/html');
        expect(jsonContent).to.eql('Great');
        done();
      });
    });
  });
});

describe('get route', () => {
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
});

describe('put route' , () => {
  it('should respond to /info/:id put requests by changing the specified file contents',(done) =>{
    request('localhost:3000')
    .put('/info/1')
    .send('{"type":"Terrible"}')
    .end((err,res) => {
      fs.readFile('./data/1.json', (err, data) => {
        var jsonContent = JSON.parse(data.toString()).type;
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res).to.have.header('content-type','text/html');
        expect(jsonContent).to.eql('Terrible');
        done();
      });
    });
  });
});

describe('delete route', () => {
  before((done) =>{
    request('localhost:3000')
    .post('/info')
    .send('{"type":"Great"}')
    .end(done());
  });
  it('should respond to /info/:id delete requests by deleting the specified file', (done) =>{
    fs.readdir('./data', (err, files) =>{
      console.log(files);
    });
    request('localhost:3000')
    .del('/info/1')
    .end((err, res) => {
      fs.readdir('./data', (err, files) =>{
        console.log(files);
        expect(res).to.have.status(200);
        expect(res).to.have.header('content-type','text/html');
        expect(files.indexOf('1.json')).to.eql(-1);
        done();
      });
    });
  });
});

after((done) =>{
  fs.readdir('./data', (err, files) =>{
    files.forEach((file) => {
      fs.unlink('./data/' + file, () =>{
        done();
      });
    });
  });
});
