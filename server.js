/* 
 * NOTE: This is a basic server.js file to test client-side/server-side interactions
 * with index.js/html whenever it's added
 */

var fs = require("fs")
var express = require("express");
var user_data = require("./leaderboards");
//var bodyParser = require("body-parser")
console.log(user_data);

var app = express();
var port = process.env.PORT || 3001;

//test

//app.use(bodyParser.json())
app.use(express.json())
app.use(express.static('public'));
/*
app.post("/leaderboards/addEntry", function(req, res, next) {
	console.log("== req.body:", req.body)
	if (req.body && req.body.name && req.body.score) {
		res.status(200).send()
		user_data.player.push({
			name: req.body.name,
			score: req.body.score
		})
		console.log("== user_data[" + person + "]:", user_data[person])
		fs.writeFile(
			__dirname + '/leaderboards.json',
			JSON.stringify(user_data, null, 2),
			function (err){
				if(err){
					res.status(500).send("Error writing new data. Try again")
				} else{
					res.status(200).send()
				}
			}
		)
	} else {
		res.status(400).send("Request needs a JSON obdy with 'name' and 'score'")
	}
})

*/
app.post('/user/add', function (req, res, next) {
	var person = req.body
	console.log("== person:", person)
	var score = person.score
	console.log("== score:", score)

	//read leaderboards.json
	//check for duplicate name
	if (user_data[person.name]){
		console.log("user found")

		//update name/score if exists already
		user_data[person.name].score++

		fs.writeFile(__dirname + "/leaderboards.json",
		JSON.stringify(user_data, null, 2),
		function (err) {
			if(err){
				res.status(500).send("Error writing new data. Try again")
			} else{
				res.status(200).send()
			}			
		})

//else push new name/score to leaderboards.json
	} else {
		console.log("new user")

		user_data[person.name] = {
			"score": 1
		}

		fs.writeFile(__dirname + "/leaderboards.json",
			JSON.stringify(user_data, null, 2),
		function (err) {
			if(err){
				res.status(500).send("Error writing new data. Try again")
			} else{
				res.status(200).send()
			}			
		})			
	}
})


app.get("/", function (req, res, next) {
	res.status(200).sendFile(__dirname + '/public/index.html');
})


app.listen(port, function () {
	console.log("== Server is listening on port", port);
})

