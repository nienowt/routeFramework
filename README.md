vs-route
========

vs-route is a simple http routing framework for REST methods.


Installation
-----------
npm install vs-route


Use
--------
Require vs-route:

var Route = require('vs-route')
var router = new Route()


New http server:
---------------------------

router.start(thePortYouWantToUse);


Set up routes for REST methods:
-----------------------------

Methods: GET, POST, PUT, DELETE

Example -
router.get('/yourRoute', (req, res) => {
  //whatever you want to happen
})

By id example -
router.get('/yourRoute/:id', (req, res) => {
  //whatever you want to happen
})



Built in basic storage will take json data and store it in a new directory
in your project's route directory:
-----------------------
Methods: POST, PUT, DELETE

router.basicPost('/yourRoute', 'directoryName', 'ContentType')
--Store data sent to /yourRoute in a directory named directoryName--

router.basicPut('/yourRoute', 'directoryName', 'ContentType')
--Change data at /yourRoute/:id in directoryName--

router.basicIdDel('/yourRoute', directoryName)
--Deletes data at /yourRoute/:id from directoryName--
