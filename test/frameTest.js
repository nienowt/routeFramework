'use strict'
var chai = require('chai');
var request = chai.request;
var expect = chai.expect;

var Route = require(__dirname + '/../routes.js');
var router = new Route();

describe('router', () => {
  before((done) => {
    router.get('/info', (req,res) =>{});
    router.post('/info', (req,res) =>{});
    router.put('/info', (req,res) =>{});
    router.delete('/info', (req,res) =>{});
    done();
  });

  it('router.(methods) should be a function', () =>{
    expect(router.get).to.be.an('function');
    expect(router.post).to.be.an('function');
    expect(router.put).to.be.an('function');
    expect(router.delete).to.be.an('function');
  });


  it('router.routes.(METHOD) should be an object', () =>{
    expect(router.routes.PUT).to.be.an('object');
    expect(router.routes.GET).to.be.an('object');
    expect(router.routes.POST).to.be.an('object');
    expect(router.routes.DELETE).to.be.an('object');
  });
});
