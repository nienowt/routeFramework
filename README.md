vs-route
========

vs-route is a simple http routing framework.


Installation
-----------
In the command line:

    npm install vs-route



Use
--------
Require vs-route:

    var Route = require('vs-route')
    var router = new Route()



Create new http server:
---------------------------

    router.start(thePortYouWantToUse);



Set up routes for REST methods:
-----------------------------
[Reference(HTTP)](https://nodejs.org/dist/latest-v4.x/docs/api/http.html)

**Methods: GET, POST, PUT, DELETE**


**Example** -

    router.get('/yourRoute', (req, res) => {
      //whatever you want to happen
    })

**By id example** -

    router.get('/yourRoute/:id', (req, res) => {
      //whatever you want to happen
    })



##Built in (very) basic storage will take json data and store it in a new directory in your project's route directory:
-----------------------
**Methods: POST, PUT, DELETE**

    router.basicPost('/yourRoute', 'directoryName', 'ContentType')

Post example:

    superagent localhost:3000/yourRoute post '{"so":"great"}'

Store json data sent to /yourRoute in a directory named directoryName created in your projects root directory.

    router.basicPut('/yourRoute', 'directoryName', 'ContentType')

Change data at /yourRoute/:id in directoryName

    router.basicIdDel('/yourRoute', directoryName)

Deletes data at /yourRoute/:id from directoryName



license
-------
 ISC
