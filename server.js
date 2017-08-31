var http = require('http'), 

    fs = require('fs'), 

    url = require('url'),

    port = 8080;



/* Global variables */

var listingData, server;



var requestHandler = function(request, response) {

  var parsedUrl = url.parse(request.url);



  /*

    Your request handler should send listingData in the JSON format if a GET request 

    is sent to the '/listings' path. Otherwise, it should send a 404 error. 



    HINT: explore the request object and its properties 

    http://stackoverflow.com/questions/17251553/nodejs-request-object-documentation

   */
   if (parsedUrl.pathname == "/listings"){
    response.writeHead(200, {"Content-Type": "application/json"});
    response.write(listingData);
    response.end();
   }

   else{
    response.writeHead(404, {"Content-Type": "text/plain"});
    response.write("Bad gateway error");
    response.end();
   }

};



fs.readFile('listings.json', 'utf8', function(err, data) {

  /*

    This callback function should save the data in the listingData variable, 

    then start the server. 

   */
   if (err){
    console.log(err);
    return;
   }

   else {
    listingData = data;

    server = http.createServer( requestHandler);
    server.listen(8080);
    console.log("server listening on: http://localhost:8080");
   }

});