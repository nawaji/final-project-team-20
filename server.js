/* 
 * NOTE: This is a basic server.js file to test client-side/server-side interactions
 * with index.js/html whenever it's added
 */

var fs = require("fs")
var express = require("express");
var user_data = require("./leaderboards.json");
//var bodyParser = require("body-parser")

console.log(user_data);

var app = express();
var port = process.env.PORT || 3001;

//test

//app.use(bodyParser.json())
app.use(express.json())
app.use(express.static('public'));

app.post("/leaderboards/addEntry", function(req, res) {
	console.log("== req.body:", req.body)
	res.status(200).send()
	console.log("== user_data[" + person + "]:", user_data[person])
})


app.get("/ttt", function (req, res, next) {
	res.status(200).sendFile(__dirname + '/public/index.html');
})

//Sort LeaderBoard
var i;
var j;
var key;
for(i = 0; i < user_data.length();i++){
	key = user_data[i].score
	for(j = i-1; j >= 0; j--){
		if(user_data[j].score > key){
			user_data[j+1] = user_data[j]
		}
	}
	user_data[j+1].score = key
}

app.listen(port, function () {
	console.log("== Server is listening on port", port);
})

