/* 
 * NOTE: This is a basic server.js file to test client-side/server-side interactions
 * with index.js/html whenever it's added
 */

var fs = require("fs")
var express = require("express");
var exphbs = require("express-handlebars");
var user_data = require("./leaderboards.json");
//var bodyParser = require("body-parser")

console.log(user_data);

var app = express();
var port = process.env.PORT || 3001;

app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

//test

//app.use(bodyParser.json())
app.use(express.json())
app.use(express.static('public'));

app.post("/leaderboards/addEntry", function(req, res) {
	console.log("== req.body:", req.body)
	res.status(200).send()
	console.log("== user_data[" + person + "]:", user_data[person])
})

app.get(["/ttt", "/"], function (req, res, next) {
	res.status(200).render('gamePage',{


	});
})

app.get('*', function (req, res, next) {

	res.status(404).render ('404');

})

app.listen(port, function () {
	console.log("== Server is listening on port", port);
})

