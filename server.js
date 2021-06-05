/* 
 * NOTE: This is a basic server.js file to test client-side/server-side interactions
 * with index.js/html whenever it's added
 */

var fs = require("fs")
var express = require("express");
var user_data = require("./leaderboards.json");

console.log(user_data);
console.log(user_data["test"]);

var app = express();
var port = process.env.PORT || 3001;

app.use(express.static('public'));

app.get("/ttt", function (req, res, next) {
	res.status(200).sendFile(__dirname + '/public/index.html');
})

app.listen(port, function () {
	console.log("== Server is listening on port", port);
})

